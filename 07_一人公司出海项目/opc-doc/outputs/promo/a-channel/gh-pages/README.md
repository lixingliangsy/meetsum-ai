# A 渠道钩子 · GitHub Pages 自托管包

本目录 `index.html` 即「免费测AI率」零凭证钩子页（纯前端，文本不上传任何服务器），
已通过合规自检：本地启发式估算、非代写代做声明、零凭证（D-08/D-09/D-11）。

## 为什么用 GitHub Pages

当前 CloudStudio 沙箱 URL（`https://fbfb4e17ac1940f68a1e6afce5ee3d09.app.codebuddy.work`）
是**临时沙箱地址，可能过期**。公众号菜单挂载需要一个**永久 HTTPS**，
GitHub Pages 免费、永久、自带 HTTPS，且契合 H0 上线链路，是最稳的承载方案。

> 上线前仍仅作「零凭证初诊 + 等待列表登记」，不接单代写（D-11）。

## 部署步骤（你来做，约 5 分钟）

### 方式 A：独立仓库（推荐，最简单）

1. 在 GitHub 新建一个空仓库，例如 `purepen-ai-rate`。
2. 把本目录的 `index.html` 作为仓库根目录文件提交并 push 到 `main` 分支。
3. 仓库 **Settings → Pages → Build and deployment → Source 选 `Deploy from a branch`**，
   Branch 选 `main`、目录选 `/ (root)`，保存。
4. 等待约 1 分钟，访问 `https://<你的用户名>.github.io/<purepen-ai-rate>/` 即生效。

### 方式 B：放进已有仓库的 docs/

1. 把 `index.html` 放到你已有仓库的 `docs/` 目录。
2. Settings → Pages → Branch 选目标分支、目录选 `/docs`。
3. 访问 `https://<用户名>.github.io/<仓库名>/`。

### 可选：绑定自有域名

在 Pages 设置里填 Custom domain（需你 own 一个域名并加 CNAME 解析），
即可拿到 `https://yourdomain.com` 形式的永久地址，品牌感更强。

## 拿到永久 URL 后

1. 把新 URL 回填到 `opc-doc/state/current-stage.json` 的 `a_channel.hook_url`，
   并把 `hook_deployed` 来源标注为 `github-pages`（替代 cloudstudio 临时地址）。
2. 注册订阅号「论文降AI率」后，在菜单「免费测AI率」挂该 URL。
3. H4 每日追踪（h4-daily.csv，channel=wechat）照常回填，与小红书(B渠道)共用同一追踪表。

## 文件说明

- `index.html` —— 钩子页本体（与 `../ai-rate-checker.html`、`../deploy/index.html` 同源）。
- 修改页面只需编辑本目录 `index.html`，重新 push 即更新。
