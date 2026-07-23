#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
H4 草稿发布前合规预检（零凭证 · 半自动护栏）
逐篇扫描 opc-doc/outputs/promo/h4-drafts/sample-*.md：
  D-09 不挂链：不得出现 http(s):// / www. / 域名后缀链接（小红书禁止）
  D-11 非代写：须含「非代写」类声明
  标题长度：建议 ≤ 20 字（小红书标题最佳实践）
  钩子非空：须有「钩子/痛点」段
输出：绿灯 / 告警 表；EXIT 0=全绿，1=有告警。
合规：仅做度量与预警，不发布（D-08）。
"""
import glob
import os
import re
import sys

BASE = os.path.dirname(os.path.abspath(__file__))
DRAFTS = os.path.join(BASE, "h4-drafts")

LINK_RE = re.compile(r"https?://|www\.|(?<![一-鿿])(?:[a-z0-9-]+\.)+(?:com|cn|net|io|me|ai|org)(?![一-鿿])", re.I)
NOT_WRITE_RE = re.compile(r"非代写|不代写|不是代写|代写代做".encode("utf-8").decode("utf-8"))  # 占位，下方用字符串


def parse(text):
    m_t = re.search(r"标题（[^）]*）：(.+)", text)
    m_h = re.search(r"钩子/痛点（[^）]*）：(.+)", text)
    title = m_t.group(1).strip() if m_t else ""
    hook = m_h.group(1).strip() if m_h else ""
    return title, hook


def check(path):
    with open(path, encoding="utf-8") as f:
        text = f.read()
    fid = os.path.splitext(os.path.basename(path))[0]
    title, hook = parse(text)

    issues = []
    # D-09 不挂链
    if LINK_RE.search(text):
        issues.append("D-09 疑似挂链(http/www/域名)")
    # D-11 非代写声明
    if not re.search(r"非代写|不代写|不是代写", text):
        issues.append("D-11 缺非代写声明")
    # 标题长度
    if len(title) > 20:
        issues.append(f"标题 {len(title)} 字(>20，建议缩短)")
    # 钩子
    if not hook:
        issues.append("钩子段为空")

    return fid, title, issues


def main():
    files = sorted(glob.glob(os.path.join(DRAFTS, "sample-*.md")))
    if not files:
        print(f"[warn] 未找到草稿：{DRAFTS}/sample-*.md")
        return 1
    print(f"合规预检 {len(files)} 篇（D-09 不挂链 / D-11 非代写 / 标题≤20 / 钩子非空）\n")
    all_ok = True
    for p in files:
        fid, title, issues = check(p)
        if issues:
            all_ok = False
            print(f"⚠️  {fid}：{'；'.join(issues)}")
        else:
            print(f"✅ {fid}：绿灯（标题「{title[:18]}…」合规）")
    print()
    if all_ok:
        print("全部绿灯，可进入人工发布（D-08 半自动）。")
        return 0
    print("存在告警，发布前请修正后再跑本脚本。")
    return 1


if __name__ == "__main__":
    sys.exit(main())
