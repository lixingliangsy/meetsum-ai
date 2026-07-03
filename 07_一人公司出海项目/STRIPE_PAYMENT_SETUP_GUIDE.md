# 💳 Stripe支付系统配置指南（详细手动步骤）

## 📋 概述

**目标**: 为20个Micro SaaS产品配置支付系统，实现收费  
**方案**: Stripe Payment Links（无需后端代码，最快方案）  
**预计时间**: 1-2小时（手动操作） + 30分钟（自动化生成页面）

---

## 🔴 任务1: 创建Stripe账户（手动操作）

### 预计时间: 10-15分钟

### 详细步骤

#### 1. 注册Stripe账户

1. **访问Stripe官网**  
   - 英文: https://stripe.com/
   - 中文: https://stripe.com/en-hk

2. **点击"Start now"或"创建账户"**

3. **填写注册信息**
   - Email: 你的邮箱（建议用企业邮箱）
   - 密码: 强密码
   - 国家/地区: 选择你的实际位置（如果需要接收付款，需要真实商业实体）

4. **验证邮箱**
   - 检查邮箱，点击验证链接

5. **激活账户**（重要！）
   - 登录Stripe Dashboard: https://dashboard.stripe.com/
   - 点击"Activate your account"或"激活账户"
   - 填写商业信息:
     - 商业名称: 你的公司名或个人姓名
     - 商业类型: Individual（个人）或 Company（公司）
     - 商业地址: 你的地址
     - 税务信息: 根据当地法律填写
   - 添加银行账户（用于接收付款）

6. **获取API密钥**
   - 在Dashboard中，点击"Developers" > "API keys"
   - 复制"Publishable key"（以 `pk_test_` 开头）
   - 点击"Reveal test key"复制"Secret key"（以 `sk_test_` 开头）
   - **注意**: 先使用测试模式（Test mode），上线前再切换到生产模式（Live mode）

---

## 🔴 任务2: 创建产品和价格（手动操作）

### 预计时间: 30-45分钟（20个产品）

### 详细步骤

#### 1. 进入产品管理

1. **登录Stripe Dashboard**  
   - https://dashboard.stripe.com/

2. **进入产品页面**  
   - 点击左侧菜单 "Products" > "Add product"
   - 或直接访问: https://dashboard.stripe.com/products

#### 2. 为每个产品创建价格（示例：scifigure-pro）

**产品1: SciFigure Pro**

1. **点击"Add product"**

2. **填写产品信息**
   - Product name: `SciFigure Pro`
   - Description: `AI-powered scientific figure generation and optimization`
   - Image: 上传产品Logo（可选）

3. **添加价格**
   - Pricing model: `One-time`（一次性付费）或 `Recurring`（订阅）
   - Amount: `29.00`（建议$29/月或$290/年）
   - Currency: `USD`
   - 推荐方案:
     - Free: $0（限制功能）
     - Pro: $29/月（全部功能）
     - Enterprise: $99/月（团队功能）

4. **保存产品**
   - 点击"Add product"
   - 复制产品的 `Price ID`（以 `price_` 开头）

5. **创建Payment Link**
   - 在产品页面，点击刚创建的产品
   - 点击"Create payment link"
   - 配置:
     - Success URL: `https://scifigure.pro/thank-you`
     - Cancel URL: `https://scifigure.pro/pricing`
   - 点击"Create link"
   - 复制Payment Link URL（以 `https://buy.stripe.com/` 开头）

6. **重复以上步骤**，为所有20个产品创建价格

---

## 🟢 任务3: 自动生成定价页面（我会自动完成）

### 预计时间: 30分钟（自动化）

### 我会做的事情

1. **创建定价页面模板**（`pricing.html`）
   - 响应式设计（移动端友好）
   - 3个价格方案（Free / Pro / Enterprise）
   - Stripe Payment Link按钮

2. **为所有20个产品生成定价页面**
   - 使用产品信息（从FAQ/文章中获取）
   - 插入对应的Stripe Payment Link

3. **创建感谢页面**（`thank-you.html`）
   - 支付成功后的确认页面
   - 提供下一步操作指南

4. **提交到GitHub**
   - 推送到GitHub
   - 触发Vercel部署

---

## 🔴 任务4: 配置Stripe Webhook（手动操作 - 可选）

### 预计时间: 15-20分钟

### 说明

Webhook用于自动处理支付成功事件（如：创建用户账户、发送邮件等）。

**如果产品是静态页面**（无后端），可以跳过此步骤，手动处理订单。

### 详细步骤（如果需要）

1. **在Stripe Dashboard中创建Webhook**
   - 进入 "Developers" > "Webhooks"
   - 点击"Add endpoint"
   - Endpoint URL: `https://your-backend.com/api/stripe-webhook`
   - 选择事件: `checkout.session.completed`
   - 复制 "Signing secret"

2. **在后端中实现Webhook处理**
   - 验证Stripe签名
   - 处理支付成功事件
   - 创建用户账户或发送访问码

---

## 📝 产品定价建议（20个产品）

### 定价策略

| 产品 | 推荐价格（订阅） | 推荐价格（一次性） |
|------|----------------|-------------------|
| scifigure-pro | $29/月 | $290 |
| resumeforge | $19/月 | $190 |
| meeting-mind-mvp | $15/月 | $150 |
| fitness-challenge-tracker | $9/月 | $90 |
| fitalliance-pro | $29/月 | $290 |
| articlesumm-pro | $15/月 | $150 |
| freelancer-portal | $19/月 | $190 |
| chartmind-ai | $25/月 | $250 |
| promptgen-pro | $19/月 | $190 |
| ai-fitness-planner | $15/月 | $150 |
| 其他10个产品 | $9-19/月 | $90-190 |

### 免费方案建议

- **Free tier**: 限制功能（如：每月5次导出、带水印、基础模板）
- **Pro tier**: 全部功能（无限导出、无水印、高级模板、优先级支持）

---

## 🚀 立即行动清单（给你）

### 今天晚上（优先级排序）

#### 1. **创建Stripe账户** ⭐ 最重要
- **预计时间**: 10-15分钟
- **详细步骤**: 见本文档"任务1"
- **完成后**: 告诉我你的Stripe Publishable Key（测试模式）

#### 2. **创建2-3个产品的价格和Payment Link** ⭐ 重要
- **预计时间**: 15-20分钟
- **建议**: 先为 `scifigure-pro` 和 `resumeforge` 创建（作为示例）
- **详细步骤**: 见本文档"任务2"
- **完成后**: 告诉我Payment Link URL

#### 3. **测试支付流程**
- **预计时间**: 10分钟
- **使用Stripe测试卡**:
  - 卡号: `4242 4242 4242 4242`
  - 过期时间: 任意未来日期（如 `12/34`）
  - CVC: 任意3位数字（如 `123`）
- **目标**: 确保支付流程正常工作

---

### 明天（优先级排序）

#### 4. **为所有20个产品创建价格**
- **预计时间**: 30-45分钟
- **操作**: 在Stripe Dashboard中批量创建
- **我会自动生成**: 定价页面（需要你提供Payment Link URL）

#### 5. **上线定价页面**
- **预计时间**: 10分钟
- **操作**: 我会生成定价页面并推送到GitHub
- **你只需要**: 审查并确认

---

## 📊 完成标准

### 支付系统配置完成

- [ ] Stripe账户已创建并激活
- [ ] 至少5个产品已创建价格
- [ ] 至少5个产品已创建Payment Link
- [ ] 测试支付成功（使用测试卡）
- [ ] 定价页面已上线（GitHub + Vercel）

### 产品上架完成

- [ ] 所有20个产品有定价页面
- [ ] 所有20个产品有Payment Link
- [ ] 支付流程测试通过
- [ ] 感谢页面已创建

---

## 💡 关键建议

1. **先测试模式，再上线**
   - 使用 `pk_test_` 和 `sk_test_` 密钥
   - 测试支付成功后再切换到生产模式

2. **定价策略**
   - 订阅模式（Recurring）比一次性付费更好（稳定收入）
   - 提供免费方案（降低试用门槛）
   - 年付折扣（如：年付$290，相当于2个月免费）

3. **合规性**
   - 添加退款政策（Refund Policy）
   - 添加服务条款（Terms of Service）
   - 添加隐私政策（Privacy Policy）

---

## 📞 需要你提供的信息

1. **Stripe Publishable Key**（测试模式）
   - 格式: `pk_test_xxxxx`
   - 获取位置: Stripe Dashboard > Developers > API keys

2. **Payment Link URL**（至少2-3个产品）
   - 格式: `https://buy.stripe.com/xxxxx`
   - 获取位置: Stripe Dashboard > Products > [产品名] > Payment links

3. **产品定价决定**
   - 订阅还是一次性付费？
   - 价格区间？（建议$9-29/月）

---

## 🤖 我会自动完成的任务

| 任务 | 预计时间 | 完成时间 |
|------|----------|----------|
| 创建定价页面模板 | 30分钟 | 今天 |
| 为20个产品生成定价页面 | 1小时 | 明天 |
| 创建感谢页面 | 30分钟 | 今天 |
| 提交到GitHub并部署 | 10分钟 | 明天 |
| 测试定价页面 | 30分钟 | 明天 |

---

## 📁 输出文件

### 我会生成的文件

1. **定价页面模板** (`pricing_template.html`)
2. **20个产品的定价页面** (`产品目录/public/pricing.html`)
3. **感谢页面** (`thank-you.html`)
4. **Stripe配置文档** (`STRIPE_SETUP_GUIDE.md`)

### 你需要手动创建的文件

1. **退款政策** (`refund-policy.html`)
2. **服务条款** (`terms-of-service.html`)
3. **隐私政策** (`privacy-policy.html`)

---

**你现在需要做什么**:

1. **立即**: 创建Stripe账户（任务1）
2. **然后**: 为scifigure-pro创建价格（任务2）
3. **完成后**: 告诉我Stripe Publishable Key和Payment Link URL
4. **我会**: 立即生成定价页面并部署

---

**预计完成时间**:
- Stripe配置: 今天晚上（1-2小时）
- 定价页面上线: 明天（自动化）
- 全部20个产品: 本周内

---

需要我立即开始生成定价页面模板吗？还是你先去创建Stripe账户？
