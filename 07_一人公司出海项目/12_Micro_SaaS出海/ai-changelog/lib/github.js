// lib/github.js
// GitHub API integration using @octokit/rest

import { Octokit } from '@octokit/rest';

/**
 * Create an Octokit instance with optional authentication
 * @param {string} token - GitHub personal access token (optional)
 * @returns {Octokit} Octokit instance
 */
export function createOctokit(token) {
  return new Octokit({
    auth: token || process.env.GITHUB_TOKEN,
    userAgent: 'ai-changelog-app v1.0.0',
  });
}

/**
 * Fetch commits from a GitHub repository
 * @param {string} owner - Repository owner (username or org)
 * @param {string} repo - Repository name
 * @param {object} options - Options for fetching commits
 * @returns {Promise<Array>} Array of commit objects
 */
export async function fetchCommits(owner, repo, options = {}) {
  const octokit = createOctokit(options.token || process.env.GITHUB_TOKEN);
  
  const params = {
    owner,
    repo,
    per_page: options.per_page || 100,
    page: options.page || 1,
  };
  
  if (options.since) params.since = options.since;
  if (options.until) params.until = options.until;
  
  try {
    const { data } = await octokit.repos.listCommits(params);
    return data;
  } catch (error) {
    console.error('Error fetching commits:', error);
    throw new Error(`Failed to fetch commits: ${error.message}`);
  }
}

/**
 * Fetch all commits (with pagination)
 * @param {string} owner - Repository owner
 * @param {string} repo - Repository name
 * @param {object} options - Options
 * @returns {Promise<Array>} All commits
 */
export async function fetchAllCommits(owner, repo, options = {}) {
  const octokit = createOctokit(options.token || process.env.GITHUB_TOKEN);
  const allCommits = [];
  let page = 1;
  const perPage = 100;
  
  while (true) {
    const params = {
      owner,
      repo,
      per_page: perPage,
      page: page,
    };
    
    if (options.since) params.since = options.since;
    if (options.until) params.until = options.until;
    
    try {
      const { data } = await octokit.repos.listCommits(params);
      
      if (data.length === 0) break;
      
      allCommits.push(...data);
      
      if (data.length < perPage) break;
      page++;
      
      // Safety limit
      if (allCommits.length >= (options.max || 1000)) break;
    } catch (error) {
      console.error('Error fetching commits page', page, ':', error);
      throw new Error(`Failed to fetch commits: ${error.message}`);
    }
  }
  
  return allCommits;
}

/**
 * Fetch repository information
 * @param {string} owner - Repository owner
 * @param {string} repo - Repository name
 * @param {string} token - GitHub token (optional)
 * @returns {Promise<object>} Repository information
 */
export async function fetchRepoInfo(owner, repo, token) {
  const octokit = createOctokit(token || process.env.GITHUB_TOKEN);
  
  try {
    const { data } = await octokit.repos.get({ owner, repo });
    return data;
  } catch (error) {
    console.error('Error fetching repo info:', error);
    throw new Error(`Failed to fetch repository info: ${error.message}`);
  }
}

/**
 * List repositories for a user or organization
 * @param {string} username - GitHub username (optional, defaults to authenticated user)
 * @param {string} token - GitHub token
 * @returns {Promise<Array>} Array of repositories
 */
export async function listRepositories(username, token) {
  const octokit = createOctokit(token || process.env.GITHUB_TOKEN);
  
  try {
    let data;
    if (username) {
      ({ data } = await octokit.repos.listForUser({ username, per_page: 100 }));
    } else {
      ({ data } = await octokit.repos.listForAuthenticatedUser({ per_page: 100 }));
    }
    return data;
  } catch (error) {
    console.error('Error listing repositories:', error);
    throw new Error(`Failed to list repositories: ${error.message}`);
  }
}

/**
 * Get commit details (including full diff if needed)
 * @param {string} owner - Repository owner
 * @param {string} repo - Repository name
 * @param {string} ref - Commit SHA or branch/tag name
 * @param {string} token - GitHub token (optional)
 * @returns {Promise<object>} Commit details
 */
export async function fetchCommitDetails(owner, repo, ref, token) {
  const octokit = createOctokit(token || process.env.GITHUB_TOKEN);
  
  try {
    const { data } = await octokit.repos.getCommit({ owner, repo, ref });
    return data;
  } catch (error) {
    console.error('Error fetching commit details:', error);
    throw new Error(`Failed to fetch commit details: ${error.message}`);
  }
}

/**
 * Parse conventional commit message
 * @param {string} message - Commit message
 * @returns {object} Parsed commit { type, scope, subject, body }
 */
export function parseConventionalCommit(message) {
  const conventionalCommitRegex = /^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)(\(([^)]+)\))?: (.+)$/s;
  const match = message.match(conventionalCommitRegex);
  
  if (match) {
    return {
      type: match[1],
      scope: match[3] || null,
      subject: match[4].split('\n')[0],
      body: message.split('\n').slice(1).join('\n').trim(),
      isConventional: true,
    };
  }
  
  return {
    type: 'other',
    scope: null,
    subject: message.split('\n')[0],
    body: message.split('\n').slice(1).join('\n').trim(),
    isConventional: false,
  };
}
