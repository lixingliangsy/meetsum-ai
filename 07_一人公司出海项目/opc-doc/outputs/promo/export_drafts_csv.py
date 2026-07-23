#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
H4 草稿导出器（小红书发布清单）
解析 opc-doc/outputs/promo/h4-drafts/sample-*.md，
提取 id / 标题 / 正文 / 钩子 / 整篇全文，输出 utf-8-sig CSV。

用法：python export_drafts_csv.py
输出：同目录 h4-drafts-export.csv
合规：仅做格式搬运，不改写文案；D-09 不挂链 / D-11 非代写声明随原文保留。
"""
import csv
import glob
import os
import re

BASE = os.path.dirname(os.path.abspath(__file__))
DRAFTS = os.path.join(BASE, "h4-drafts")
OUT = os.path.join(BASE, "h4-drafts-export.csv")


def parse(path):
    with open(path, encoding="utf-8") as f:
        text = f.read()
    fid = os.path.splitext(os.path.basename(path))[0]

    m_t = re.search(r"标题（[^）]*）：(.+)", text)
    m_h = re.search(r"钩子/痛点（[^）]*）：(.+)", text)
    title = m_t.group(1).strip() if m_t else ""
    hook = m_h.group(1).strip() if m_h else ""

    m_body = re.search(r"正文：\s*\n(.*?)(?=\n钩子/痛点)", text, re.DOTALL)
    body = m_body.group(1).strip() if m_body else ""

    full = (body + "\n\n" + hook) if (body and hook) else (body or hook)
    return {"id": fid, "title": title, "body": body, "hook": hook, "full_post": full}


def main():
    files = sorted(glob.glob(os.path.join(DRAFTS, "sample-*.md")))
    if not files:
        print(f"[warn] 未找到草稿：{DRAFTS}/sample-*.md")
        return
    rows = [parse(p) for p in files]
    with open(OUT, "w", encoding="utf-8-sig", newline="") as f:
        w = csv.DictWriter(f, fieldnames=["id", "title", "body", "hook", "full_post"])
        w.writeheader()
        for r in rows:
            w.writerow(r)
    print(f"导出 {len(rows)} 篇 → {OUT}")
    for r in rows:
        print(f"  - {r['id']}: {r['title'][:24]}")


if __name__ == "__main__":
    main()
