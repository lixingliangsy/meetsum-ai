// pages/api/changelog/generate.js
// Generate changelog from GitHub commits

import { fetchAllCommits } from '../../../lib/github.js';
import { generateMarkdown, generateHTML, generateJSON, suggestVersion } from '../../../lib/changelog.js';

export default async function handler(req, res) {
  if (req.method !== 'POST' && req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    let params;
    
    if (req.method === 'POST') {
      params = req.body;
    } else {
      params = req.query;
    }

    const {
      owner,
      repo,
      since,
      until,
      version,
      title,
      format = 'markdown',
      includeAuthor = 'true',
      includeDate = 'false',
      linkCommits = 'true',
      token,
      commits: clientCommits, // Allow passing commits directly
    } = params;

    let commits;

    // If commits are provided directly (from client), use them
    if (clientCommits && Array.isArray(clientCommits)) {
      commits = clientCommits;
    } else {
      // Validate required parameters for GitHub fetch
      if (!owner || !repo) {
        return res.status(400).json({ 
          error: 'Missing required parameters: owner and repo (or provide commits directly)' 
        });
      }

      // Fetch commits from GitHub
      console.log(`Fetching commits from ${owner}/${repo}...`);
      commits = await fetchAllCommits(owner, repo, {
        since,
        until,
        token,
        max: parseInt(params.max) || 500,
      });
    }

    if (!commits || commits.length === 0) {
      return res.status(200).json({
        success: true,
        message: 'No commits found for the given criteria',
        changelog: format === 'json' ? {} : '',
        stats: { totalCommits: 0 },
      });
    }

    // Generate version if not provided
    const finalVersion = version || suggestVersion(
      commits.map((c) => ({ 
        type: (c.commit ? c.commit.message : c.message || '').split(':')[0] || 'other',
        body: c.commit ? c.commit.message : c.message || ''
      })),
      '1.0.0'
    );

    // Generate changelog in requested format
    const generateOptions = {
      commits,
      version: finalVersion,
      title: title || `${owner}/${repo} Changelog`,
      date: new Date().toISOString().split('T')[0],
      includeAuthor: includeAuthor === 'true',
      includeDate: includeDate === 'true',
      linkCommits: linkCommits === 'true',
    };

    let changelog;
    let stats;

    switch (format.toLowerCase()) {
      case 'html':
        changelog = generateHTML(generateOptions);
        stats = generateJSON(generateOptions);
        break;
      
      case 'json':
        stats = generateJSON(generateOptions);
        changelog = stats;
        break;
      
      case 'markdown':
      default:
        changelog = generateMarkdown(generateOptions);
        stats = generateJSON(generateOptions);
        break;
    }

    // Calculate stats
    const typeCounts = {};
    for (const commit of commits) {
      const message = commit.commit ? commit.commit.message : commit.message || '';
      const type = message.split(':')[0] || 'other';
      typeCounts[type] = (typeCounts[type] || 0) + 1;
    }

    return res.status(200).json({
      success: true,
      owner: owner || null,
      repo: repo || null,
      version: finalVersion,
      format,
      generatedAt: new Date().toISOString(),
      stats: {
        totalCommits: commits.length,
        typeCounts,
        dateRange: {
          since: since || null,
          until: until || null,
        },
      },
      changelog,
    });
  } catch (error) {
    console.error('Changelog generation error:', error);
    
    if (error.message.includes('404')) {
      return res.status(404).json({ 
        error: 'Repository not found. Please check owner and repo name.' 
      });
    }
    
    return res.status(500).json({ 
      error: 'Failed to generate changelog',
      details: error.message 
    });
  }
}
