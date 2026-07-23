# 工程第 4 步 · 阶段 1 融合（P1 补闭环）· 实施计划（基于真实代码核查）

> 规划依据：`step4-plan.md` 阶段 1；P0 已 PASS（`p0-fixes.md`）。
> 核查日期：2026-07-17。本计划基于主理人亲自读码核查的真实状态，非照搬规划草稿。
> 性质：**实施层**。凡改动均标注「文件·函数 + 意图」，每步主理人亲自读码 + 跑检查验收（不盲信 agent）。

---

## 0. 真实代码状态（核查结论，与 step4-plan 草稿的差异）

| 核查项 | 真实状态 | 对 P1 的影响 |
|---|---|---|
| `products.json` 位置 | `data/products.json`（7887B，07-15）；非仓库根。`run_auto_tasks.py:13` 已正确引用 | P1-06 补 proof / netdisk 以此为准 |
| `config/` | 仅 `config.json`（734B，04-12）；**无 `selectors.json`** | P1-05 需新建 |
| `notification.py` | **不存在** | P1-03 需新建独立模块 |
| 字体硬编码 | `generate_carousel.py:14 FONT="C:/Windows/Fonts/simhei.ttf"`、`generate_title_covers.py:30 FONT_PATH="C:/Windows/Fonts/simhei.ttf"` | P1-02 需 `resolve_font()` 容错 |
| retry/backoff | 业务代码**无任何 retry/tenacity/backoff**（仅 venv 库内含） | P1-03 需加 |
| 主入口接线 | `xhs_auto_main.py` **未接** compliance_gate / cookie 过期拦截 / 重试熔断 / MCP 能力层 | P1 核心补强点 |
| `mcp.json` | 现有 18 个登记（autofigure/paper_orchestra/patent/...）路径全为 `/mnt/e/...`（WSL 风格）+ `python3`；step4 提到的 `media_enhancement_mcp`/`chart_router`/`browser_automation_mcp`/`markitdown_mcp` **未登记** | P1-01 需核实真实存在、修正 Windows 路径、补登记 + 薄封装 adapter |

---

## 1. P1 实施清单（按确定性 / 风险排序）

| # | 项 | 文件 / 动作 | 风险 | 状态 |
|---|---|---|---|---|
| **P1-02** | 字体容错 `resolve_font()` | 改 `generate_carousel.py` / `generate_title_covers.py`：`Path(__file__).parent` 容错 + 系统字体回退 | 低（局部小改） | ✅ 已完成（实测 2026-07-17） |
| **P1-03** | `notification.py`（告警 + retry 装饰器 + 阈值熔断） | 新建独立模块，供主入口 / 上传 / 发布调用 | 低（纯新增） | ✅ 已完成（实测 2026-07-17） |
| P1-05 | `selectors.json` 集中 | 抽 `note_publisher.py` / `qianfan_uploader.py` 散落选择器字符串 → `config/selectors.json`；调用处改读配置 | 中（需先定位选择器） | 待办 |
| P1-04 | cookie 过期拦截 + 临近预警 | 接 `check_xhs_cookies.py` + `cookie_utils`，`publish_notes` / `upload_products` 前检查；过期则暂停 + 告警 | 中 | 待办 |
| P1-06 | 合规落地（3 风险类目归桶 / 8 商品补 proof / netdisk_link 回填） | 接 `compliance_gate`；`run_auto_tasks` T6 过合规门；netdisk 回填依赖 baidu-netdisk 授权 | 高（外部依赖） | 待办 |
| P1-01 | capability-registry（mcp.json 登记 + 薄封装 adapter） | 核实 `media_enhancement_mcp` 等真实存在；修正 WSL→Windows 路径；登记；建 `content_gen_adapter` / `browser_adapter` | 高（环境不确定） | 待办 |

---

## 2. 硬约束（全程维持）

- **D-08 半自动**：禁无人值守批量发布；保留人工目检 + 扫码重登。
- 不改业务主逻辑，仅加固 / 接入；每个改动可单独回滚。
- 每步主理人**亲自读码 + 跑检查（py_compile / 单元调用）**验收，不盲信 agent 报告。
- P1 验收标准（呼应 step4 阶段二）：① 内容图经 MCP 增强且 guide 图无二维码/微信号；② 发布前 cookie 过期自动暂停+告警；③ 选择器改版只改一处；④ 上架前合规门全过才提交；⑤ 网盘链接真实回填（非占位）。

---

## 3. 本轮交付（P1-02 + P1-03）

- **P1-02**：在 `generate_carousel.py` / `generate_title_covers.py` 增加 `resolve_font()`（依次尝试：同目录字体 → 系统 `C:/Windows/Fonts/simhei.ttf` → `Path(__file__).parent` 回退 → 抛清晰错误），替换硬编码 `FONT` / `FONT_PATH` 赋值。
- **P1-03**：新建 `notification.py`，提供：
  - `alert(level, msg, webhook=None)` —— 日志 + 可选 webhook 告警（config 驱动）。
  - `retry(times=3, backoff=2.0, exceptions=(Exception,))` —— 装饰器，指数退避。
  - `CircuitBreaker(threshold=5, window=3600)` —— 简单失败率熔断（供发布/上架调用）。
  - 通过 `py_compile` + 直接调用验证。

---

## 4. 验收记录（逐轮追加，主理人亲自验证）

### 2026-07-17 · P1-02 + P1-03 ✅
- **P1-02 字体容错**：`generate_carousel.py` / `generate_title_covers.py` 硬编码 `C:/Windows/Fonts/simhei.ttf` → `resolve_font()`（同目录→系统→其他字体→glob 回退）。实测 `import` 两模块 `FONT`/`FONT_PATH` 均解析为 `C:/Windows/Fonts/simhei.ttf`（真实存在），`py_compile` OK。
- **P1-03 notification.py**：新建 `alert()` / `retry()` 装饰器 / `CircuitBreaker`。实测：alert 打印落盘；retry 成功返 yes、失败重试 2 次后抛 ValueError；CircuitBreaker 阈值 3 触发后 `allow()=False`。`py_compile` OK。
- 两项均为低风险局部改动 / 纯新增，未碰主逻辑；维持 D-08 半自动。

*（本文档为 P1 实施层计划，基于 2026-07-17 对 `xiaohongshu_automation/` 真实代码核查；逐轮推进并主理人亲自验收。）*
