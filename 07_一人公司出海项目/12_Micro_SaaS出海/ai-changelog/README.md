# 🤖 AI Changelog

> Automatically generate beautiful changelogs from git commits. Save developer time and keep users informed.

## ✨ Features (v1.0.0)

- ✅ **GitHub API Integration**: Connect to GitHub repositories using personal access tokens
- ✅ **Commit Fetching**: Retrieve commits with date range filtering and pagination
- ✅ **Conventional Commit Parsing**: Auto-detect commit types (feat, fix, docs, etc.)
- ✅ **Changelog Generation**: Export in Markdown, HTML, or JSON formats
- ✅ **Commit Grouping**: Group commits by type (Features, Bug Fixes) or author
- ✅ **Version Suggestion**: Auto-suggest semantic version numbers based on commits
- ✅ **Repository Information**: Fetch repo metadata (stars, language, license, etc.)
- 🚧 **GitLab/Bitbucket Support**: Coming in Q3 2026
- 🚧 **Team Collaboration**: Coming in Q4 2026

## 🚀 Quick Start

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env.local` file in the root directory:

```
GITHUB_TOKEN=your_github_personal_access_token
```

> Note: GitHub token is optional for public repositories, but required for private repos.

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

### 1. Fetch Commits

**Endpoint**: `GET /api/github/commits`

**Parameters**:
- `owner` (required): Repository owner (username or org)
- `repo` (required): Repository name
- `since` (optional): Only commits after this date (ISO 8601)
- `until` (optional): Only commits before this date (ISO 8601)
- `per_page` (optional): Commits per page (default: 30, max: 100)
- `page` (optional): Page number (default: 1)
- `all` (optional): Set to 'true' to fetch all commits (with pagination)
- `max` (optional): Max commits when using `all=true` (default: 1000)
- `sha` (optional): Fetch single commit details by SHA
- `token` (optional): GitHub personal access token

**Example**:
```bash
curl "http://localhost:3000/api/github/commits?owner=vercel&repo=next.js&per_page=10"
```

**Response**:
```json
{
  "success": true,
  "owner": "vercel",
  "repo": "next.js",
  "count": 10,
  "commits": [
    {
      "sha": "abc123...",
      "message": "feat: add new feature",
      "author": "username",
      "date": "2026-01-01T00:00:00Z",
      "url": "https://github.com/vercel/next.js/commit/abc123..."
    }
  ]
}
```

### 2. List Repositories / Get Repo Info

**Endpoint**: `GET /api/github/repos`

**Parameters**:
- `username` (optional): GitHub username (to list their repos)
- `owner` (optional): Repository owner (used with `repo`)
- `repo` (optional): Repository name (used with `owner`)
- `token` (optional): GitHub personal access token

**Examples**:
```bash
# List repositories for a user
curl "http://localhost:3000/api/github/repos?username=vercel"

# Get single repository info
curl "http://localhost:3000/api/github/repos?owner=vercel&repo=next.js"
```

### 3. Generate Changelog

**Endpoint**: `POST /api/changelog/generate` or `GET /api/changelog/generate`

**Parameters** (POST body or GET query):
- `owner` (required*): Repository owner
- `repo` (required*): Repository name
- `since` (optional): Only commits after this date
- `until` (optional): Only commits before this date
- `version` (optional): Version string (auto-suggested if not provided)
- `title` (optional): Changelog title
- `format` (optional): Output format - `markdown` (default), `html`, or `json`
- `includeAuthor` (optional): Include author info (default: true)
- `includeDate` (optional): Include date in entries (default: false)
- `linkCommits` (optional): Add links to commit SHAs (default: true)
- `token` (optional): GitHub personal access token
- `max` (optional): Max commits to fetch (default: 500)

*Note: `owner` and `repo` are required unless you provide `commits` directly in the POST body.

**Examples**:
```bash
# Generate Markdown changelog
curl -X POST "http://localhost:3000/api/changelog/generate" \
  -H "Content-Type: application/json" \
  -d '{"owner": "vercel", "repo": "next.js", "format": "markdown"}'

# Generate JSON changelog
curl "http://localhost:3000/api/changelog/generate?owner=vercel&repo=next.js&format=json"
```

**Response** (JSON format):
```json
{
  "success": true,
  "owner": "vercel",
  "repo": "next.js",
  "version": "1.1.0",
  "format": "json",
  "generatedAt": "2026-01-01T00:00:00.000Z",
  "stats": {
    "totalCommits": 150,
    "typeCounts": { "feat": 10, "fix": 5, "docs": 3 }
  },
  "changelog": {
    "version": "1.1.0",
    "date": "2026-01-01",
    "sections": {
      "Features": [...],
      "Bug Fixes": [...]
    }
  }
}
```

### 4. Feature List

**Endpoint**: `GET /api/features`

**Response**: List of implemented features and upcoming features

```bash
curl "http://localhost:3000/api/features"
```

### 5. Health Check

**Endpoint**: `GET /api/health`

```bash
curl "http://localhost:3000/api/health"
```

## 💰 Pricing

| Plan | Price | Features |
|------|-------|----------|
| Starter | Free | 1 repo, monthly updates |
| Pro | $29/mo | Unlimited repos, weekly updates, RSS |
| Enterprise | $79/mo | Custom AI prompts, API access, team collab |

## 🛠 Tech Stack

- Next.js 14
- React 18
- @octokit/rest (GitHub API)
- Tailwind CSS
- Vercel

## 📦 Project Structure

```
ai-changelog/
├── lib/
│   ├── github.js       # GitHub API integration
│   └── changelog.js    # Changelog generation algorithm
├── pages/
│   ├── api/
│   │   ├── github/
│   │   │   ├── commits.js  # Fetch commits
│   │   │   └── repos.js    # List/get repo info
│   │   ├── changelog/
│   │   │   └── generate.js # Generate changelog
│   │   ├── features.js     # Feature list API
│   │   ├── health.js       # Health check
│   │   └── export.js       # Data export
├── public/
│   ├── faq.html          # FAQ page
│   └── support.html      # Support page
└── package.json
```

## 🌐 Live Demo

🔗 https://ai-changelog.vercel.app

## 📸 Screenshots

(Add screenshots here)

## 📝 License

MIT

## 🐛 Known Limitations

- Currently only GitHub is supported (GitLab/Bitbucket coming soon)
- Maximum 1000 commits per request (configurable)
- GitHub token required for private repositories
- Conventional commit format recommended for best results

## 🚧 Upcoming Features

- GitLab API Integration (Q3 2026)
- Bitbucket API Integration (Q3 2026)
- Webhook/CI-CD Automation (Q3 2026)
- Custom Templates (Q4 2026)
- Team Collaboration (Q4 2026)
