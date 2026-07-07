# 已部署产品 - 推广配图说明

> 本文档为每个已部署的产品提供配图建议，用于 Product Hunt / LinkedIn / Reddit 推广。

---

## 1. meeting-cost-calc
**URL**: https://meeting-cost-calc-bzy48b1it-lixingliangs-projects.vercel.app

### 配图建议（3张）
1. **主图（Hero Image）**：屏幕截图，显示会议成本计算器的主界面
   - 包含：参会人数输入框、时薪输入框、会议时长、计算结果（总分钟数、总人力成本）
   - 风格：简洁的仪表板风格，数字突出显示

2. **场景图（Use Case）**：展示"为什么需要这个工具"的场景
   - 文案："你的1小时会议实际花费了 $XXX"
   - 视觉：对比图（会议时长 vs 实际成本）

3. **分享图（Social Share）**：用于 LinkedIn / Twitter 的方形图
   - 尺寸：1200x630px（ LinkedIn 标准）
   - 包含：产品 Logo、核心价值主张、URL

---

## 2. fitness-gamification-platform
**URL**: https://fitness-gamification-platform-k8hqkrktq-lixingliangs-projects.vercel.app

### 配图建议（3张）
1. **主图**：用户仪表板截图，显示 RPG 角色卡片、XP 进度条、徽章墙
   - 风格：游戏化 UI，色彩鲜明

2. **功能图**：展示"训练关卡"和"成就系统"
   - 文案："Level up your fitness!"
   - 视觉：游戏角色升级的视觉效果

3. **分享图**：健身 + 游戏化的结合
   - 文案："Turn your workout into a game"
   - 背景：健身器材 + 游戏控制器元素

---

## 3. screenshot-annotator
**URL**: https://screenshot-annotator-2cfiv3res-lixingliangs-projects.vercel.app

### 配图建议（3张）
1. **主图**：工具使用截图，显示截图 + 注释工具（箭头、矩形、文字）
   - 风格：干净的工具界面，突出"快"和"简单"

2. **对比图**：注释前 vs 注释后
   - 文案："Explain with visuals, not words"
   - 视觉：左边是模糊的口头描述，右边是清晰的注释截图

3. **分享图**：生产力工具风格
   - 文案："Annotate screenshots in seconds"
   - 背景：渐变色彩，现代化设计

---

## 4. social-proof-widget
**URL**: https://social-proof-widget-m1tikpvek-lixingliangs-projects.vercel.app

### 配图建议（3张）
1. **主图**：Widget 在网站上的实际展示截图
   - 包含：客户评价轮播、用户数量计数器、信任徽章
   - 风格：嵌入到真实网站页面的效果

2. **配置器截图**：后台配置界面
   - 文案："Customize your social proof widget in minutes"
   - 视觉：拖拽式配置界面

3. **分享图**：转化率提升主题
   - 文案："Boost your website conversion by 20%+"
   - 视觉：折线图（安装前 vs 安装后）

---

## 5. running-training-plan
**URL**: https://running-training-plan-j4l8rg19p-lixingliangs-projects.vercel.app

### 配图建议（3张）
1. **主图**：生成的训练计划截图，显示周计划表格
   - 包含：日期、训练类型、距离、配速
   - 风格：专业的训练计划，类似 Garmin / Strava

2. **表单截图**：用户输入目标体重、当前体能的表单
   - 文案："Get your personalized training plan in 30 seconds"
   - 视觉：简洁的表单设计

3. **分享图**：跑步主题
   - 文案："Train smarter, run faster"
   - 背景：跑步者 + 城市天际线（日出/日落）

---

## 配图制作建议

### 方案A：手动截图（推荐）
1. 在浏览器中打开产品 URL
2. 使用 `screenshot-annotator` 本身来截图 😄
3. 或者使用浏览器扩展（如 FireShot、GoFullPage）

### 方案B：自动生成配图（需要设计工具）
- 使用 Canva / Figma 制作推广图
- 尺寸规范：
  - Product Hunt: 1200x630px
  - LinkedIn: 1200x630px
  - Twitter: 1200x675px
  - Reddit: 不强制要求图片，但建议用 1200x630px

### 方案C：使用产品内置的 OG Image（如果已配置）
- 检查每个产品的 `next.config.js` 是否配置了 `og:image`
- 如果有，可以直接用 URL 抓取预览图

---

## 产品截图检查清单

- [ ] meeting-cost-calc 主界面截图
- [ ] fitness-gamification-platform 仪表板截图
- [ ] screenshot-annotator 注释工具截图
- [ ] social-proof-widget 嵌入效果截图
- [ ] running-training-plan 训练计划截图
- [ ] 所有截图保存为 `marketing_content/screenshots/<product>_<type>.png`
- [ ] 更新推广内容文件，插入截图路径

---

*生成时间: 2026-07-07*
*状态: 等待手动截图（或提供浏览器访问权限后自动截图）*
