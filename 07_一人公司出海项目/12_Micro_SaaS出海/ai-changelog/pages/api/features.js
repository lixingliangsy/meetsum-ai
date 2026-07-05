// pages/api/features.js
// 功能列表API - ai-changelog

export default function handler(req, res) {
  res.status(200).json({
    product: 'ai-changelog',
    version: '1.0.0',
    features: [
      {
        id: 'feature_001',
        name: 'GitHub API Integration',
        status: 'implemented',
        description: 'Connect to GitHub repositories using GitHub API with @octokit/rest. Supports authentication via personal access tokens.',
        implementedIn: 'v1.0.0',
      },
      {
        id: 'feature_002',
        name: 'Commit Fetching',
        status: 'implemented',
        description: 'Fetch commits from GitHub repositories with pagination support. Filter by date range (since/until).',
        implementedIn: 'v1.0.0',
      },
      {
        id: 'feature_003',
        name: 'Conventional Commit Parsing',
        status: 'implemented',
        description: 'Parse conventional commit messages (feat, fix, docs, etc.) and extract type, scope, and subject automatically.',
        implementedIn: 'v1.0.0',
      },
      {
        id: 'feature_004',
        name: 'Changelog Generation - Markdown',
        status: 'implemented',
        description: 'Generate structured changelogs in Markdown format with customizable sections and commit grouping.',
        implementedIn: 'v1.0.0',
      },
      {
        id: 'feature_005',
        name: 'Changelog Generation - HTML',
        status: 'implemented',
        description: 'Generate structured changelogs in HTML format with CSS classes for easy styling.',
        implementedIn: 'v1.0.0',
      },
      {
        id: 'feature_006',
        name: 'Changelog Generation - JSON',
        status: 'implemented',
        description: 'Generate structured changelogs in JSON format for programmatic use and API responses.',
        implementedIn: 'v1.0.0',
      },
      {
        id: 'feature_007',
        name: 'Repository Information',
        status: 'implemented',
        description: 'Fetch and display repository metadata including stars, forks, language, license, and default branch.',
        implementedIn: 'v1.0.0',
      },
      {
        id: 'feature_008',
        name: 'Commit Grouping',
        status: 'implemented',
        description: 'Group commits by type (Features, Bug Fixes, etc.) or by author for organized changelog output.',
        implementedIn: 'v1.0.0',
      },
      {
        id: 'feature_009',
        name: 'Version Suggestion',
        status: 'implemented',
        description: 'Automatically suggest semantic version numbers based on commit types (feat = minor, fix = patch, breaking = major).',
        implementedIn: 'v1.0.0',
      },
    ],
    upcoming: [
      {
        id: 'upcoming_001',
        name: 'GitLab API Integration',
        status: 'planned',
        description: 'Add support for GitLab repositories',
        expectedRelease: '2026-Q3'
      },
      {
        id: 'upcoming_002',
        name: 'Bitbucket API Integration',
        status: 'planned',
        description: 'Add support for Bitbucket repositories',
        expectedRelease: '2026-Q3'
      },
      {
        id: 'upcoming_003',
        name: 'Webhook Integration',
        status: 'in_development',
        description: 'Auto-generate changelog on new commits via webhooks',
        expectedRelease: '2026-Q3'
      },
      {
        id: 'upcoming_004',
        name: 'Custom Templates',
        status: 'planned',
        description: 'Allow users to save and reuse custom changelog templates',
        expectedRelease: '2026-Q4'
      },
      {
        id: 'upcoming_005',
        name: 'Team Collaboration',
        status: 'planned',
        description: 'Invite teammates to review and edit drafts before publishing',
        expectedRelease: '2026-Q4'
      },
    ],
    limitations: [
      {
        note: 'Currently only GitHub is supported. GitLab and Bitbucket support is coming soon.',
      },
      {
        note: 'Authentication via GitHub personal access token required for private repositories.',
      },
      {
        note: 'Maximum 1000 commits per request (configurable).',
      },
    ],
  });
}
