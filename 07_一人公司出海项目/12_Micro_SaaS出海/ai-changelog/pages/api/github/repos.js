// pages/api/github/repos.js
// List GitHub repositories for a user or organization

import { listRepositories, fetchRepoInfo } from '../../../lib/github.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { username, token, owner, repo } = req.query;

    // If owner and repo are provided, fetch single repo info
    if (owner && repo) {
      const repoInfo = await fetchRepoInfo(owner, repo, token);
      return res.status(200).json({
        success: true,
        repository: {
          name: repoInfo.name,
          fullName: repoInfo.full_name,
          description: repoInfo.description,
          url: repoInfo.html_url,
          apiUrl: repoInfo.url,
          cloneUrl: repoInfo.clone_url,
          sshUrl: repoInfo.ssh_url,
          defaultBranch: repoInfo.default_branch,
          isPrivate: repoInfo.private,
          createdAt: repoInfo.created_at,
          updatedAt: repoInfo.updated_at,
          pushedAt: repoInfo.pushed_at,
          size: repoInfo.size,
          stargazersCount: repoInfo.stargazers_count,
          watchersCount: repoInfo.watchers_count,
          forksCount: repoInfo.forks_count,
          openIssuesCount: repoInfo.open_issues_count,
          language: repoInfo.language,
          license: repoInfo.license ? repoInfo.license.name : null,
        },
      });
    }

    // List repositories
    const repos = await listRepositories(username, token);

    return res.status(200).json({
      success: true,
      count: repos.length,
      repositories: repos.map((repo) => ({
        name: repo.name,
        fullName: repo.full_name,
        description: repo.description,
        url: repo.html_url,
        defaultBranch: repo.default_branch,
        isPrivate: repo.private,
        language: repo.language,
        stargazersCount: repo.stargazers_count,
        forksCount: repo.forks_count,
        updatedAt: repo.updated_at,
      })),
    });
  } catch (error) {
    console.error('GitHub repos API error:', error);
    
    if (error.message.includes('404')) {
      return res.status(404).json({ 
        error: 'User or repository not found.' 
      });
    }
    if (error.message.includes('403')) {
      return res.status(403).json({ 
        error: 'Access forbidden. Check your token permissions.' 
      });
    }
    
    return res.status(500).json({ 
      error: 'Failed to fetch repositories',
      details: error.message 
    });
  }
}
