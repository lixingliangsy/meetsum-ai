# -*- coding: utf-8 -*-
"""
一键为所有「已接支付」的产品配置 Vercel 支付环境变量。

前置：
  1. 在 payment_config/secrets.env 填入真实 Waffo 凭证（从 secrets.env.example 复制）
  2. 已登录 Vercel CLI（vercel login）
  3. 每个产品目录已 `vercel link`（或部署过，已自动关联）

运行：
  python payment_config/setup_payment_env.py

逻辑：
  - 读取 payment_readiness_audit.json，筛选 has_checkout && has_webhook 的产品
  - 读取 secrets.env 中的 WAFFO_* 变量
  - 进入每个产品目录，执行 `vercel env add <NAME> <VALUE> production`
  - 已存在的变量自动跳过（幂等）
"""
import os, re, json, subprocess, sys

ROOT = r"e:\AgentCPM\07_一人公司出海项目"
PRODUCTS_DIR = os.path.join(ROOT, "12_Micro_SaaS出海")
AUDIT = os.path.join(ROOT, "payment_readiness_audit.json")
SECRETS = os.path.join(ROOT, "payment_config", "secrets.env")
AUDIT_JSON = os.path.join(ROOT, "payment_readiness_audit.json")

# Vercel CLI 路径：优先用环境变量 VERCEL_BIN，否则用默认托管路径
VERCEL = os.environ.get("VERCEL_BIN", r"C:\Users\lixingliang\.workbuddy\binaries\node\versions\22.22.2\vercel.cmd")

# 所有产品统一写入的账户级支付变量
CORE_VARS = [
    "WAFFO_MERCHANT_ID",
    "WAFFO_PRIVATE_KEY",
    "NEXT_PUBLIC_WAFFO_PUBLIC_KEY",
    "WAFFO_API_BASE_URL",
    "WAFFO_WEBHOOK_SECRET",
]

# 产品名 -> secrets.env 中 NEXT_PUBLIC_APP_URL_<NAME> 后缀映射
APP_URL_SUFFIX = {
    "ai-fitness-planner": "AI_FITNESS_PLANNER",
    "articlesumm-pro": "ARTICLESUMM_PRO",
    "fitness-challenge-tracker": "FITNESS_CHALLENGE_TRACKER",
    "fitness-gamification-platform": "FITNESS_GAMIFICATION",
    "calorie-tracker": "CALORIE_TRACKER",
}


def load_secrets(path):
    vals = {}
    if not os.path.exists(path):
        print(f"[错误] 找不到 {path}\n请先复制 secrets.env.example 为 secrets.env 并填入凭证。")
        sys.exit(1)
    with open(path, "r", encoding="utf-8") as fh:
        for line in fh:
            line = line.strip()
            if not line or line.startswith("#"):
                continue
            if "=" not in line:
                continue
            k, v = line.split("=", 1)
            vals[k.strip()] = v.strip()
    return vals


def payment_ready_products():
    if not os.path.exists(AUDIT_JSON):
        print(f"[错误] 找不到审计文件 {AUDIT_JSON}，请先运行 audit_payment_readiness.py")
        sys.exit(1)
    with open(AUDIT_JSON, "r", encoding="utf-8") as fh:
        data = json.load(fh)
    return [r["product"] for r in data if r.get("has_checkout") and r.get("has_webhook")]


def run_env_add(product, name, value):
    d = os.path.join(PRODUCTS_DIR, product)
    if not os.path.isdir(d):
        return False, f"目录不存在: {d}"
    try:
        proc = subprocess.run(
            [VERCEL, "env", "add", name, value, "production"],
            cwd=d, capture_output=True, text=True, encoding="utf-8", errors="ignore",
            timeout=60,
        )
    except Exception as e:
        return False, str(e)
    out = (proc.stdout + proc.stderr)
    if proc.returncode == 0:
        return True, "ok"
    if "already exists" in out.lower() or "already" in out.lower():
        return True, "已存在(跳过)"
    return False, out.strip()[:200]


def main():
    if not os.path.exists(VERCEL):
        print(f"[错误] 找不到 vercel CLI: {VERCEL}\n请设置环境变量 VERCEL_BIN 指向你的 vercel.cmd/vercel")
        sys.exit(1)
    secrets = load_secrets(SECRETS)
    products = payment_ready_products()
    print(f"已接支付产品数: {len(products)} -> {', '.join(products)}\n")

    total_ok, total_fail = 0, 0
    for prod in products:
        print(f"### {prod}")
        # 账户级变量
        for var in CORE_VARS:
            if var not in secrets or secrets[var].startswith("x") or "xxxx" in secrets[var]:
                print(f"  跳过 {var}（未填或仍为占位符）")
                continue
            ok, msg = run_env_add(prod, var, secrets[var])
            mark = "✅" if ok else "❌"
            print(f"  {mark} {var}: {msg}")
            total_ok += ok
            total_fail += (0 if ok else 1)
        # 产品级 APP_URL
        suffix = APP_URL_SUFFIX.get(prod)
        if suffix:
            key = f"NEXT_PUBLIC_APP_URL_{suffix}"
            if key in secrets and "xxxx" not in secrets[key]:
                ok, msg = run_env_add(prod, "NEXT_PUBLIC_APP_URL", secrets[key])
                mark = "✅" if ok else "❌"
                print(f"  {mark} NEXT_PUBLIC_APP_URL(来自{key}): {msg}")
                total_ok += ok
                total_fail += (0 if ok else 1)
        print()
    print(f"完成：成功 {total_ok} 项，失败 {total_fail} 项")
    if total_fail:
        print("失败项多为变量已存在（可忽略）或密钥未填。配置后请重新部署各产品使变量生效。")


if __name__ == "__main__":
    main()
