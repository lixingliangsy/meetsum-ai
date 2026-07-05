// pages/api/github/commits.js
// Fetch commits from a GitHub repository

import { fetchCommits, fetchAllCommits, fetchCommitDetails } from '../../../lib/github.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      owner,
      repo,
      since,
      until,
      per_page,
      page,
      all,
      sha,
      token,
    } = req.query;

    // Validate required parameters
    if (!owner || !repo) {
      return res.status(400).json({ 
        error: 'Missing required parameters: owner and repo' 
      });
    }

    // If sha is provided, fetch single commit details
    if (sha) {
      const commit = await fetchCommitDetails(owner, repo, sha, token);
      return res.status(200).json({
        success: true,
        commit,
      });
    }

    // Fetch commits
    let commits;
    if (all === 'true') {
      commits = await fetchAllCommits(owner, repo, {
        since,
        until,
        token,
        max: parseInt(req.query.max) || 1000,
      });
    } else {
      commits = await fetchCommits(owner, repo, {
        since,
        until,
        per_page: parseInt(per_page) || 30,
        page: parseInt(page) || 1,
        token,
      });
    }

    return res.status(200).json({
      success: true,
      owner,
      repo,
      count: commits.length,
      commits: commits.map((commit) => ({
        sha: commit.sha,
        message: commit.commit ? commit.commit.message.split('\n')[0] : (commit.message || '').split('\n')[0],
        author: commit.commit ? commit.commit.author.name : commit.author,
        authorEmail: commit.commit ? commit.commit.author.email : '',
        date: commit.commit ? commit.commit.author.date : commit.date,
        url: commit.html_url || commit.url,
        authorAvatar: commit.author ? commit.author.avatar_url : null,
        authorUsername: commit.author ? commit.author.login : null,
      })),
    });
  } catch (error) {
    console.error('GitHub commits API error:', error);
    
    // Handle GitHub API specific errors
    if (error.message.includes('404')) {
      return res.status(404).json({ 
        error: 'Repository not found. Please check owner and repo name.' 
      });
    }
    if (error.message.includes('403')) {
      return res.status(403).json({ 
        error: 'Access forbidden. Check your token permissions.' 
      });
    }
    
    return res.status(500).json({ 
      error: 'Failed to fetch commits',
      details: error.message 
    });
  }
}
