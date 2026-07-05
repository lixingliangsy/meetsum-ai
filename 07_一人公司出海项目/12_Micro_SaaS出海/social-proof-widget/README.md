# 🔥 Social Proof Widget

> Boost conversions with real-time social proof widgets. Show recent purchases, reviews, and signups.

## ✨ Features (v1.0.0)

- ✅ **Notification System**: Support for sales, signups, reviews, visits, and custom notifications
- ✅ **Widget Configuration**: Full customization (position, colors, animation, timing)
- ✅ **Embed Code Generation**: JavaScript snippet to embed on any website
- ✅ **REST API**: Complete API for managing notifications, configuration, and analytics
- ✅ **Analytics Dashboard**: Track impressions, clicks, CTR, and time-series data
- ✅ **Demo Mode**: Generate fake notifications for testing and demonstration
- ✅ **Multi-Widget Support**: Manage multiple widgets from a single dashboard
- ✅ **Notification Formatting**: Automatic formatting with avatars and time ago strings
- 🚧 **Database Persistence**: Coming in Q3 2026
- 🚧 **Real-time Updates**: Coming in Q3 2026
- 🚧 **A/B Testing**: Coming in Q4 2026
- 🚧 **Platform Integrations**: Coming in Q4 2026

## 🚀 Quick Start

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Build

```bash
npm run build
npm start
```

## 📡 API Documentation

### 1. Add Notification

**Endpoint**: `POST /api/notifications`

**Request Body**:
```json
{
  "type": "sale",
  "name": "John D.",
  "product": "Pro Plan",
  "amount": 99,
  "widgetId": "default"
}
```

**Notification Types**:
- `sale` - Recent purchase notification
- `signup` - New user signup notification
- `review` - New review notification
- `visit` - Live visitor count notification
- `custom` - Custom notification

**Example**:
```bash
curl -X POST "http://localhost:3000/api/notifications" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "sale",
    "name": "John D.",
    "product": "Pro Plan",
    "amount": 99,
    "widgetId": "default"
  }'
```

**Response**:
```json
{
  "success": true,
  "message": "Notification added successfully",
  "notification": {
    "id": 1,
    "type": "sale",
    "title": "Recent Sale",
    "message": "John D. just purchased Pro Plan",
    "icon": "🛒",
    "name": "John D.",
    "createdAt": "2026-01-01T00:00:00.000Z",
    "timeAgo": "just now"
  }
}
```

### 2. Get Notifications

**Endpoint**: `GET /api/notifications`

**Parameters**:
- `widgetId` (optional): Widget ID (default: "default")
- `type` (optional): Filter by notification type
- `limit` (optional): Max number of notifications (default: 10)
- `includeDisplayed` (optional): Include displayed notifications (default: false)
- `stats` (optional): Set to 'true' to get statistics instead of notifications

**Example**:
```bash
# Get notifications
curl "http://localhost:3000/api/notifications?widgetId=default&limit=5"

# Get statistics
curl "http://localhost:3000/api/notifications?widgetId=default&stats=true"

# Generate demo notifications
curl "http://localhost:3000/api/notifications?widgetId=default&demo=true&limit=10"
```

### 3. Update Notification Status

**Endpoint**: `PUT /api/notifications`

**Request Body**:
```json
{
  "id": 1,
  "action": "displayed"
}
```

**Actions**:
- `displayed` - Mark notification as displayed
- `clicked` - Mark notification as clicked

**Example**:
```bash
curl -X PUT "http://localhost:3000/api/notifications" \
  -H "Content-Type: application/json" \
  -d '{"id": 1, "action": "displayed"}'
```

### 4. Get Widget Configuration

**Endpoint**: `GET /api/widget/config`

**Parameters**:
- `widgetId` (optional): Widget ID (default: "default")

**Example**:
```bash
curl "http://localhost:3000/api/widget/config?widgetId=default"
```

**Response**:
```json
{
  "success": true,
  "widgetId": "default",
  "config": {
    "position": "bottom-left",
    "animation": "slide",
    "delay": 5000,
    "interval": 8000,
    "displayTime": 5000,
    "theme": "light",
    "backgroundColor": "#ffffff",
    "textColor": "#333333",
    "borderRadius": 8,
    "shadow": true,
    "showAvatar": true,
    "showTimeAgo": true,
    "clickthrough": true,
    "pauseOnHover": true,
    "closeButton": true
  }
}
```

### 5. Save Widget Configuration

**Endpoint**: `POST /api/widget/config`

**Request Body**:
```json
{
  "widgetId": "default",
  "config": {
    "position": "bottom-right",
    "backgroundColor": "#000000",
    "textColor": "#ffffff"
  }
}
```

**Example**:
```bash
curl -X POST "http://localhost:3000/api/widget/config" \
  -H "Content-Type: application/json" \
  -d '{
    "widgetId": "default",
    "config": {
      "position": "bottom-right",
      "backgroundColor": "#000000",
      "textColor": "#ffffff"
    }
  }'
```

### 6. Generate Embed Code

**Endpoint**: `POST /api/widget/generate` or `GET /api/widget/generate`

**Parameters**:
- `widgetId` (optional): Widget ID (default: "default")
- `apiUrl` (optional): API base URL
- `format` (optional): Output format - 'javascript' (default) or 'html'

**Example**:
```bash
# Generate JavaScript embed code
curl -X POST "http://localhost:3000/api/widget/generate" \
  -H "Content-Type: application/json" \
  -d '{"widgetId": "default", "apiUrl": "https://your-domain.com"}'

# Get embed code via GET
curl "http://localhost:3000/api/widget/generate?widgetId=default&format=javascript"
```

**Response**:
```json
{
  "success": true,
  "widgetId": "default",
  "embedCode": "<!-- Social Proof Widget - Start -->\n<script>...",
  "instructions": "Copy and paste this code into your website before the closing </body> tag."
}
```

### 7. Get Analytics

**Endpoint**: `GET /api/analytics`

**Parameters**:
- `widgetId` (optional): Widget ID (default: "default")
- `period` (optional): Time period - 'day' (default), 'week', or 'month'

**Example**:
```bash
# Get analytics for today
curl "http://localhost:3000/api/analytics?widgetId=default&period=day"

# Get analytics for the week
curl "http://localhost:3000/api/analytics?widgetId=default&period=week"
```

**Response**:
```json
{
  "success": true,
  "widgetId": "default",
  "period": "day",
  "stats": {
    "total": 50,
    "byType": {
      "sale": 30,
      "signup": 15,
      "review": 5
    },
    "displayed": 45,
    "clicked": 10,
    "lastHour": 5,
    "lastDay": 50,
    "ctr": "22.22%"
  },
  "timeSeries": [
    {
      "timestamp": "2026-01-01T00:00:00.000Z",
      "label": "0:00",
      "notifications": 10,
      "impressions": 100,
      "clicks": 20
    }
  ]
}
```

### 8. Feature List

**Endpoint**: `GET /api/features`

```bash
curl "http://localhost:3000/api/features"
```

### 9. Health Check

**Endpoint**: `GET /api/health`

```bash
curl "http://localhost:3000/api/health"
```

## 💰 Pricing

| Plan | Price | Features |
|------|-------|----------|
| Starter | Free | 1 widget, basic notifications |
| Pro | $39/mo | 5 widgets, analytics, custom branding |
| Enterprise | $99/mo | Unlimited widgets, API access, integrations |

## 🛠 Tech Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Vercel

## 📦 Project Structure

```
social-proof-widget/
├── lib/
│   ├── notifications.js  # Notification data management
│   └── widget.js         # Widget configuration and generation
├── pages/
│   ├── api/
│   │   ├── notifications/
│   │   │   └── index.js  # Notifications API
│   │   ├── widget/
│   │   │   ├── config.js # Widget configuration API
│   │   │   └── generate.js # Embed code generation API
│   │   ├── analytics/
│   │   │   └── index.js  # Analytics API
│   │   ├── features.js   # Feature list API
│   │   ├── health.js     # Health check
│   │   └── export.js     # Data export
│   └── index.tsx         # Main page (App Router)
├── public/
│   ├── faq.html          # FAQ page
│   └── support.html      # Support page
└── package.json
```

## 🌐 Live Demo

🔗 https://social-proof-widget.vercel.app

## 📸 Screenshots

(Add screenshots here)

## 📝 License

MIT

## 🐛 Known Limitations

- Currently uses in-memory storage (data lost on server restart)
- Widget JavaScript is a basic implementation (production version should include more features)
- Analytics data includes mock data for demonstration
- Database persistence and real-time updates are planned for Q3 2026

## 🚧 Upcoming Features

- Database Persistence (Q3 2026)
- Real-time Updates with WebSockets (Q3 2026)
- A/B Testing (Q4 2026)
- Platform Integrations (Stripe, Shopify, WooCommerce) (Q4 2026)
- Custom Templates (Q4 2026)

## 🔧 Embedding on Your Website

1. **Generate Embed Code**:
   ```bash
   curl -X POST "http://localhost:3000/api/widget/generate" \
     -H "Content-Type: application/json" \
     -d '{"widgetId": "default", "apiUrl": "https://your-domain.com"}'
   ```

2. **Copy the Embed Code** from the response

3. **Paste into Your Website** before the closing `</body>` tag

4. **Add Notifications** via the API:
   ```bash
   curl -X POST "http://localhost:3000/api/notifications" \
     -H "Content-Type: application/json" \
     -d '{"type": "sale", "name": "John D.", "product": "Pro Plan"}'
   ```

5. **Watch the Widget** display notifications on your website!

## 🧪 Testing with Demo Data

Generate fake notifications for testing:
```bash
curl "http://localhost:3000/api/notifications?widgetId=default&demo=true&limit=10"
```

This will create 10 fake notifications that you can use to test the widget display.
