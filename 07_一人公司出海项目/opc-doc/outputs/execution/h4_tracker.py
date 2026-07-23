#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
H4 起量追踪器（零凭证 · 半自动）
基于 ② 微信生态六步法验证报告的漏斗阈值，自动计算每日漏斗状态、阈值校验、异常预警，
并在连续达标时生成 H0 上线闸门触发建议。
合规：仅做度量与预警，不发布、不烧凭证（D-08 / D-09 / D-11）。

用法：python h4_tracker.py
输入：同目录 h4-daily.csv（表头 date,channel,exposure,clicks,inquiries,leads,note）
输出：h4-status.md（状态） + h4-alerts.md（预警日志） + 标准输出
可选：设置环境变量 WEBHOOK 可将预警 POST 出去（真实推送）。
"""
import csv
import os
import sys
from datetime import datetime

BASE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(BASE, "h4-daily.csv")
STATUS = os.path.join(BASE, "h4-status.md")
ALERTS = os.path.join(BASE, "h4-alerts.md")

# ---- 阈值配置（校准值，第 1 周结束后按实际数据调整，改这里即可）----
TH = {
    "exposure_stable_min": 30,        # 日均自然曝光下限（滚动 7 日）
    "inquiry_min": 1,                 # 咨询数 > 0（滚动 7 日合计）
    "lead_rate_min": 0.01,            # 留资率 > 1%
    "stable_window": 7,               # 稳定判定窗口（天）
    "trigger_days": 3,                # 连续达标天数 → H0 闸门触发建议
    "exposure_drop_alert": 0.5,       # 日环比骤降 >50% → 预警
    "zero_inquiry_max_days": 3,       # 连续 0 咨询天数上限 → 预警
}


def load_rows(path):
    if not os.path.exists(path):
        return []
    rows = []
    with open(path, encoding="utf-8") as f:
        for r in csv.DictReader(f):
            try:
                rows.append({
                    "date": (r.get("date") or "").strip(),
                    "channel": (r.get("channel") or "all").strip(),
                    "exposure": int(r.get("exposure") or 0),
                    "clicks": int(r.get("clicks") or 0),
                    "inquiries": int(r.get("inquiries") or 0),
                    "leads": int(r.get("leads") or 0),
                    "note": (r.get("note") or "").strip(),
                })
            except Exception:
                continue
    return rows


def main():
    rows = load_rows(DATA)
    if not rows:
        msg = f"[{datetime.now():%Y-%m-%d %H:%M}] 无数据：{DATA} 不存在或为空。请人工录入每日数据后重跑。"
        print(msg)
        with open(STATUS, "w", encoding="utf-8") as f:
            f.write(f"# H4 状态（自动生成）\n\n{msg}\n")
        return

    # 按日期汇总各渠道
    daily = {}
    for r in rows:
        d = daily.setdefault(r["date"], {"exposure": 0, "clicks": 0,
                                         "inquiries": 0, "leads": 0, "note": []})
        d["exposure"] += r["exposure"]
        d["clicks"] += r["clicks"]
        d["inquiries"] += r["inquiries"]
        d["leads"] += r["leads"]
        if r["note"]:
            d["note"].append(r["note"])

    dates = sorted(daily.keys())
    last = dates[-1]
    last_d = daily[last]
    lead_rate = (last_d["leads"] / last_d["exposure"]) if last_d["exposure"] else 0.0

    # 滚动窗口
    w = TH["stable_window"]
    win = dates[-w:]
    win_rows = [daily[d] for d in win]
    avg_exp = sum(x["exposure"] for x in win_rows) / len(win_rows) if win_rows else 0
    sum_inq = sum(x["inquiries"] for x in win_rows)
    win_lead_rates = [(x["leads"] / x["exposure"]) if x["exposure"] else 0 for x in win_rows]
    avg_lead_rate = sum(win_lead_rates) / len(win_lead_rates) if win_lead_rates else 0

    # 状态判定
    s_exp = "达标" if avg_exp >= TH["exposure_stable_min"] else "未达标"
    s_inq = "达标" if sum_inq >= TH["inquiry_min"] else "未达标"
    s_lead = "达标" if avg_lead_rate >= TH["lead_rate_min"] else "未达标"
    all_ok = (s_exp == "达标" and s_inq == "达标" and s_lead == "达标")

    # 连续达标计数（从末尾往前）
    consecutive = 0
    for d in reversed(dates):
        dd = daily[d]
        lr = (dd["leads"] / dd["exposure"]) if dd["exposure"] else 0
        ok = (dd["exposure"] >= TH["exposure_stable_min"]
              and dd["inquiries"] >= TH["inquiry_min"]
              and lr >= TH["lead_rate_min"])
        if ok:
            consecutive += 1
        else:
            break
    trigger = consecutive >= TH["trigger_days"]

    # 异常预警
    alerts = []
    if len(dates) >= 2:
        prev = daily[dates[-2]]
        if prev["exposure"] > 0:
            drop = (prev["exposure"] - last_d["exposure"]) / prev["exposure"]
            if drop >= TH["exposure_drop_alert"]:
                alerts.append(f"曝光骤降：{prev['exposure']}→{last_d['exposure']}"
                              f"（环比 -{drop*100:.0f}%），可能笔记限流/账号异常")
    zero_inq = 0
    for d in reversed(dates):
        if daily[d]["inquiries"] == 0:
            zero_inq += 1
        else:
            break
    if zero_inq >= TH["zero_inquiry_max_days"]:
        alerts.append(f"连续 {zero_inq} 天 0 咨询：钩子可能失效，需换内容/词")

    # 输出
    L = []
    L.append("# H4 起量追踪 · 自动状态（生成于 %s）\n" % datetime.now().strftime("%Y-%m-%d %H:%M"))
    L.append("## 最新一日（%s）汇总\n" % last)
    L.append("| 指标 | 实际值 | 阈值 | 状态 |")
    L.append("|---|---|---|---|")
    L.append(f"| 自然曝光(当日) | {last_d['exposure']} | ≥{TH['exposure_stable_min']}(滚动7日均) | {'达标' if last_d['exposure']>=TH['exposure_stable_min'] else '未达标'} |")
    L.append(f"| 咨询数(当日) | {last_d['inquiries']} | ≥{TH['inquiry_min']} | {'达标' if last_d['inquiries']>=TH['inquiry_min'] else '未达标'} |")
    L.append(f"| 留资数(当日) | {last_d['leads']} | — | — |")
    L.append(f"| 留资率(当日) | {lead_rate*100:.2f}% | ≥{TH['lead_rate_min']*100:.0f}% | {'达标' if lead_rate>=TH['lead_rate_min'] else '未达标'} |")
    L.append("\n## 滚动7日判定（稳定度）\n")
    L.append(f"- 曝光7日均：**{avg_exp:.0f}** → {s_exp}（阈值≥{TH['exposure_stable_min']}）")
    L.append(f"- 咨询7日合计：**{sum_inq}** → {s_inq}（阈值≥{TH['inquiry_min']}）")
    L.append(f"- 留资率7日均：**{avg_lead_rate*100:.2f}%** → {s_lead}（阈值≥{TH['lead_rate_min']*100:.0f}%）")
    L.append(f"- 综合：{'✅ 全部达标' if all_ok else '❌ 未全达标'}")
    L.append(f"- 连续达标天数：**{consecutive}** / 触发门槛 {TH['trigger_days']}\n")
    if trigger:
        L.append("## 🚦 H0 上线闸门触发建议\n")
        L.append(f"连续 {consecutive} 天达标，已达 H0 闸门触发条件。**建议主理人/用户确认后**进入 H0 上线"
                 f"（填 Supabase/LLM/Waffo 凭证 + Vercel 部署）。本脚本不自动烧凭证、不自动发布（D-08 合规）。\n")
    if alerts:
        L.append("## ⚠️ 异常预警\n")
        for a in alerts:
            L.append(f"- {a}")
        L.append("")
    L.append("---\n")
    L.append("来源：② wechat-demand-validation-purepen-20260721.md（漏斗阈值）；"
             "③ review-20260721.md（H4优先/H0受闸门）。合规：仅度量与预警，发布与上线需人工（D-08/D-09/D-11）。")

    out = "\n".join(L)
    with open(STATUS, "w", encoding="utf-8") as f:
        f.write(out)
    with open(ALERTS, "w", encoding="utf-8") as f:
        f.write("# H4 预警日志\n\n" +
                ("\n".join(f"- {datetime.now():%Y-%m-%d} {a}" for a in alerts) if alerts else "- 无异常\n"))
    print(out)
    if trigger:
        print("\n🚦 已生成 H0 闸门触发建议，请人工确认后上线。")

    # 可选真实推送
    wh = os.environ.get("WEBHOOK")
    if wh and alerts:
        try:
            import urllib.request
            urllib.request.urlopen(wh, data=("\n".join(alerts)).encode("utf-8"), timeout=10)
        except Exception as e:
            print(f"[warn] WEBHOOK 推送失败：{e}", file=sys.stderr)


if __name__ == "__main__":
    main()
