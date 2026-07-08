# -*- coding: utf-8 -*-
"""
审计 12_Micro_SaaS出海 全部产品的支付接入度。
排除 node_modules/.next/.vercel/.git，扫描源码判断：
  - 是否有 checkout 路由
  - 是否有 webhook 路由（waffo）
  - 引用了哪些支付相关环境变量（WAFFO_*/STRIPE_*/NEXT_PUBLIC_APP_URL）
  - 前端是否有 升级/订阅/定价 按钮
输出 JSON + 控制台摘要。
"""
import os, re, json

BASE = r"e:\AgentCPM\07_一人公司出海项目\12_Micro_SaaS出海"
EXCLUDE = {".next", "node_modules", ".vercel", ".git", ".turbo", "dist", "build"}

env_pat = re.compile(r"process\.env\.([A-Z_][A-Z0-9_]*)")
checkout_pat = re.compile(r"checkout", re.I)
webhook_pat = re.compile(r"webhooks?[/\\]waffo", re.I)
pay_ui_pat = re.compile(r"(upgrade|subscribe|订阅|升级|定价|pricing|buy now|立即购买|¥|\$[\d])", re.I)

results = []

def walk_product(product):
    d = os.path.join(BASE, product)
    has_checkout = False
    has_webhook = False
    env_vars = set()
    has_pay_ui = False
    src_files = 0
    for root, dirs, files in os.walk(d):
        dirs[:] = [x for x in dirs if x not in EXCLUDE]
        for f in files:
            if not f.endswith((".ts", ".tsx", ".js", ".jsx", ".mjs")):
                continue
            fp = os.path.join(root, f)
            # 路由探测
            rel = os.path.relpath(fp, d).replace("\\", "/")
            if checkout_pat.search(rel):
                has_checkout = True
            if webhook_pat.search(rel):
                has_webhook = True
            try:
                with open(fp, "r", encoding="utf-8", errors="ignore") as fh:
                    txt = fh.read()
            except Exception:
                continue
            src_files += 1
            for m in env_pat.findall(txt):
                if m.startswith(("WAFFO", "STRIPE", "NEXT_PUBLIC_APP_URL", "NEXT_PUBLIC_WAFFO")):
                    env_vars.add(m)
            if not has_pay_ui and pay_ui_pat.search(txt):
                has_pay_ui = True
    return {
        "product": product,
        "has_checkout": has_checkout,
        "has_webhook": has_webhook,
        "has_pay_ui": has_pay_ui,
        "src_files": src_files,
        "env_vars": sorted(env_vars),
    }

def main():
    products = []
    for name in sorted(os.listdir(BASE)):
        p = os.path.join(BASE, name)
        if not os.path.isdir(p):
            continue
        # 只把含 package.json 或 pages/ 或 src/ 的视为产品
        if not (os.path.exists(os.path.join(p, "package.json"))
                or os.path.isdir(os.path.join(p, "pages"))
                or os.path.isdir(os.path.join(p, "src"))
                or os.path.isdir(os.path.join(p, "app"))):
            continue
        products.append(name)
    for prod in products:
        results.append(walk_product(prod))
    # 写 JSON
    out = os.path.join(BASE, "..", "payment_readiness_audit.json")
    with open(out, "w", encoding="utf-8") as fh:
        json.dump(results, fh, ensure_ascii=False, indent=2)
    # 控制台摘要
    print(f"扫描产品数: {len(results)}")
    print(f"{'产品':<32}{'checkout':<10}{'webhook':<9}{'付费UI':<8}env数")
    print("-" * 78)
    for r in results:
        print(f"{r['product']:<32}{'Y' if r['has_checkout'] else '-':<10}"
              f"{'Y' if r['has_webhook'] else '-':<9}{'Y' if r['has_pay_ui'] else '-':<8}{len(r['env_vars'])}")
    print("-" * 78)
    ready = [r["product"] for r in results if r["has_checkout"] and r["has_webhook"]]
    print(f"已接支付(有checkout+webhook): {len(ready)} 个")
    print("  " + ", ".join(ready))
    no_pay = [r["product"] for r in results if not r["has_checkout"]]
    print(f"无checkout(暂不能收款): {len(no_pay)} 个")
    print("  " + ", ".join(no_pay))

if __name__ == "__main__":
    main()
