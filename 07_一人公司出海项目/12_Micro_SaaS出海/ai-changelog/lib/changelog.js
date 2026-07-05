// lib/changelog.js
// Changelog generation algorithm - converts commits to structured changelog

import { parseConventionalCommit } from './github.js';

/**
 * Commit type to changelog section mapping
 */
export const TYPE_TO_SECTION = {
  feat: 'Features',
  fix: 'Bug Fixes',
  docs: 'Documentation',
  style: 'Styles',
  refactor: 'Code Refactoring',
  perf: 'Performance Improvements',
  test: 'Tests',
  build: 'Build System',
  ci: 'CI/CD',
  chore: 'Chores',
  revert: 'Reverts',
  other: 'Other Changes',
};

/**
 * Process raw commits into structured format for changelog
 * @param {Array} commits - Raw commit objects from GitHub API
 * @returns {Array} Processed commit objects
 */
export function processCommits(commits) {
  return commits.map((commit) => {
    const message = commit.commit ? commit.commit.message : commit.message;
    const parsed = parseConventionalCommit(message || '');
    const sha = commit.sha;
    const shortSha = sha ? sha.substring(0, 7) : 'unknown';
    const author = commit.commit ? commit.commit.author.name : (commit.author || 'Unknown');
    const authorUsername = commit.author ? commit.author.login : null;
    const date = commit.commit ? commit.commit.author.date : (commit.date || new Date().toISOString());
    const url = commit.html_url || (commit.url || '');
    
    return {
      sha,
      shortSha,
      message: message ? message.split('\n')[0] : '',
      body: parsed.body,
      type: parsed.type,
      scope: parsed.scope,
      subject: parsed.subject,
      isConventional: parsed.isConventional,
      author,
      authorUsername,
      date,
      url,
      section: TYPE_TO_SECTION[parsed.type] || 'Other Changes',
    };
  });
}

/**
 * Group processed commits by type/section
 * @param {Array} processedCommits - Processed commit objects
 * @returns {object} Commits grouped by section
 */
export function groupBySection(processedCommits) {
  const groups = {};
  
  for (const commit of processedCommits) {
    const section = commit.section;
    if (!groups[section]) {
      groups[section] = [];
    }
    groups[section].push(commit);
  }
  
  return groups;
}

/**
 * Group processed commits by author
 * @param {Array} processedCommits - Processed commit objects
 * @returns {object} Commits grouped by author
 */
export function groupByAuthor(processedCommits) {
  const groups = {};
  
  for (const commit of processedCommits) {
    const author = commit.authorUsername || commit.author;
    if (!groups[author]) {
      groups[author] = {
        name: commit.author,
        username: commit.authorUsername,
        commits: [],
      };
    }
    groups[author].commits.push(commit);
  }
  
  return groups;
}

/**
 * Generate a version tag based on commits (simple semantic versioning)
 * @param {Array} processedCommits - Processed commit objects
 * @param {string} currentVersion - Current version (e.g., "1.0.0")
 * @returns {string} New version string
 */
export function suggestVersion(processedCommits, currentVersion = '1.0.0') {
  const hasBreaking = processedCommits.some((c) => 
    c.body && c.body.toLowerCase().includes('breaking change')
  );
  const hasFeature = processedCommits.some((c) => c.type === 'feat');
  const hasFix = processedCommits.some((c) => c.type === 'fix');
  
  const [major, minor, patch] = currentVersion.split('.').map(Number);
  
  if (hasBreaking) {
    return `${major + 1}.0.0`;
  } else if (hasFeature) {
    return `${major}.${minor + 1}.0`;
  } else if (hasFix) {
    return `${major}.${minor}.${patch + 1}`;
  }
  
  return `${major}.${minor}.${patch + 1}`;
}

/**
 * Generate changelog in Markdown format
 * @param {object} options - Generation options
 * @returns {string} Markdown formatted changelog
 */
export function generateMarkdown(options = {}) {
  const {
    commits,
    version,
    title = 'Changelog',
    date = new Date().toISOString().split('T')[0],
    includeAuthor = true,
    includeDate = false,
    linkCommits = true,
    sections,
  } = options;
  
  if (!commits || commits.length === 0) {
    return '# No changes to report.\n';
  }
  
  const processed = processCommits(commits);
  const grouped = groupBySection(processed);
  
  // Default section order (put most important first)
  const defaultSections = [
    'Features',
    'Bug Fixes',
    'Performance Improvements',
    'Code Refactoring',
    'Documentation',
    'Styles',
    'Tests',
    'Build System',
    'CI/CD',
    'Chores',
    'Reverts',
    'Other Changes',
  ];
  
  const sectionOrder = sections || defaultSections;
  
  let markdown = '';
  
  // Header
  if (version) {
    markdown += `## [${version}] - ${date}\n\n`;
  } else {
    markdown += `## ${title} - ${date}\n\n`;
  }
  
  // Generate sections
  for (const section of sectionOrder) {
    if (!grouped[section] || grouped[section].length === 0) continue;
    
    markdown += `### ${section}\n\n`;
    
    for (const commit of grouped[section]) {
      const commitRef = linkCommits
        ? `[${commit.shortSha}](${commit.url})`
        : `\`${commit.shortSha}\``;
      
      let line = `- ${commit.subject} (${commitRef}`;
      
      if (includeAuthor) {
        line += `, @${commit.authorUsername || commit.author}`;
      }
      
      if (includeDate) {
        const commitDate = new Date(commit.date).toISOString().split('T')[0];
        line += `, ${commitDate}`;
      }
      
      line += `)\n`;
      markdown += line;
    }
    
    markdown += '\n';
  }
  
  return markdown;
}

/**
 * Generate changelog in HTML format
 * @param {object} options - Same as generateMarkdown
 * @returns {string} HTML formatted changelog
 */
export function generateHTML(options = {}) {
  const {
    commits,
    version,
    title = 'Changelog',
    date = new Date().toISOString().split('T')[0],
    includeAuthor = true,
    includeDate = false,
    linkCommits = true,
  } = options;
  
  if (!commits || commits.length === 0) {
    return '<h1>No changes to report.</h1>';
  }
  
  const processed = processCommits(commits);
  const grouped = groupBySection(processed);
  
  const defaultSections = [
    'Features',
    'Bug Fixes',
    'Performance Improvements',
    'Code Refactoring',
    'Documentation',
    'Styles',
    'Tests',
    'Build System',
    'CI/CD',
    'Chores',
    'Reverts',
    'Other Changes',
  ];
  
  let html = '<div class="changelog">';
  
  // Header
  if (version) {
    html += `<h2 class="changelog-version">[${version}] - ${date}</h2>`;
  } else {
    html += `<h2 class="changelog-title">${title} - ${date}</h2>`;
  }
  
  // Generate sections
  for (const section of defaultSections) {
    if (!grouped[section] || grouped[section].length === 0) continue;
    
    html += `<div class="changelog-section">`;
    html += `<h3 class="changelog-section-title">${section}</h3>`;
    html += `<ul class="changelog-list">`;
    
    for (const commit of grouped[section]) {
      const commitLink = linkCommits
        ? `<a href="${commit.url}" class="changelog-commit-link">${commit.shortSha}</a>`
        : `<code>${commit.shortSha}</code>`;
      
      html += `<li class="changelog-item">`;
      html += `<span class="changelog-subject">${escapeHTML(commit.subject)}</span> `;
      html += `<span class="changelog-meta">(${commitLink}`;
      
      if (includeAuthor) {
        html += `, @${escapeHTML(commit.authorUsername || commit.author)}`;
      }
      
      if (includeDate) {
        const commitDate = new Date(commit.date).toISOString().split('T')[0];
        html += `, ${commitDate}`;
      }
      
      html += `)</span>`;
      html += `</li>`;
    }
    
    html += `</ul></div>`;
  }
  
  html += '</div>';
  
  return html;
}

/**
 * Generate changelog in JSON format
 * @param {object} options - Generation options
 * @returns {object} JSON object with structured changelog
 */
export function generateJSON(options = {}) {
  const {
    commits,
    version,
    title = 'Changelog',
    date = new Date().toISOString().split('T')[0],
  } = options;
  
  if (!commits || commits.length === 0) {
    return { version, title, date, sections: {} };
  }
  
  const processed = processCommits(commits);
  const grouped = groupBySection(processed);
  const authorGroups = groupByAuthor(processed);
  
  const sections = {};
  for (const [section, sectionCommits] of Object.entries(grouped)) {
    sections[section] = sectionCommits.map((c) => ({
      sha: c.sha,
      shortSha: c.shortSha,
      subject: c.subject,
      scope: c.scope,
      type: c.type,
      author: c.author,
      authorUsername: c.authorUsername,
      date: c.date,
      url: c.url,
    }));
  }
  
  return {
    version,
    title,
    date,
    totalCommits: processed.length,
    sections,
    authors: Object.keys(authorGroups).map((author) => ({
      name: authorGroups[author].name,
      username: authorGroups[author].username,
      commitCount: authorGroups[author].commits.length,
    })),
  };
}

/**
 * Escape HTML special characters
 * @param {string} str - String to escape
 * @returns {string} Escaped string
 */
function escapeHTML(str) {
  return (str || '').toString()
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
