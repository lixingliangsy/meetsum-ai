
// pages/api/features.js
// 功能列表API

export default function handler(req, res) {
  res.status(200).json({
    product: 'scifigure-pro',
    features: [
      {
        id: 'feature_001',
        name: 'Figure Generation from Description',
        status: 'implemented',
        description: 'Generate scientific figures by describing them in plain text. Supports 8+ figure types (bar, line, scatter, flowchart, heatmap, boxplot, venn, network).',
        apiEndpoint: '/api/generate',
        example: 'POST /api/generate with {"description": "bar chart showing gene expression levels"}'
      },
      {
        id: 'feature_002',
        name: 'Figure Templates Library',
        status: 'implemented',
        description: '8+ pre-built templates for common scientific figures across disciplines (biology, statistics, general). Includes CRISPR flowchart, gene expression heatmap, etc.',
        apiEndpoint: '/api/templates',
        example: 'GET /api/templates?discipline=biology'
      },
      {
        id: 'feature_003',
        name: 'SVG Export',
        status: 'implemented',
        description: 'Export figures as editable SVG format. Compatible with Adobe Illustrator, Inkscape, and other vector graphics editors.',
        apiEndpoint: '/api/generate',
        outputFormat: 'svg'
      },
      {
        id: 'feature_004',
        name: 'LaTeX Code Generation',
        status: 'implemented',
        description: 'Automatically generate LaTeX code for figure inclusion in academic papers. Includes proper figure environment, caption, and label.',
        apiEndpoint: '/api/generate',
        outputFormat: 'latex'
      },
      {
        id: 'feature_005',
        name: 'Multiple Figure Types',
        status: 'implemented',
        description: 'Support for 8 figure types: bar chart, line graph, scatter plot, flowchart, heatmap, box plot, Venn diagram, and network diagram. Auto-detection based on description.',
        figureTypes: ['bar', 'line', 'scatter', 'flowchart', 'heatmap', 'boxplot', 'venn', 'network']
      },
      {
        id: 'feature_006',
        name: 'Color Scheme Options',
        status: 'implemented',
        description: 'Multiple color schemes for accessibility and journal compliance: default, journal (black/white/gray), colorblind-friendly, and viridis.',
        colorSchemes: ['default', 'journal', 'colorblind', 'viridis']
      },
      {
        id: 'feature_007',
        name: 'Discipline-Specific Templates',
        status: 'implemented',
        description: 'Templates tailored for specific scientific disciplines: biology (CRISPR flowchart, gene expression), statistics (box plot, scatter), general (bar, line, venn, network).',
        disciplines: ['biology', 'statistics', 'general']
      },
      {
        id: 'feature_008',
        name: 'Mock Mode for Testing',
        status: 'implemented',
        description: 'Built-in mock mode that generates sample figures without requiring API keys. Perfect for testing and demonstration purposes.',
        mockMode: true
      }
    ],
    upcoming: [
      {
        id: 'upcoming_001',
        name: 'Batch Figure Processing',
        status: 'in_development',
        expectedRelease: '2026-Q3',
        description: 'Process multiple figures at once with consistent styling and formatting.'
      },
      {
        id: 'upcoming_002',
        name: 'Journal-Specific Export Templates',
        status: 'in_development',
        expectedRelease: '2026-Q3',
        description: 'Pre-configured export settings for specific journals (Nature, Science, Cell, etc.) with automatic compliance checking.'
      },
      {
        id: 'upcoming_003',
        name: 'API Access for Automation',
        status: 'planned',
        expectedRelease: '2026-Q4',
        description: 'RESTful API for programmatic figure generation and integration into existing workflows.'
      }
    ]
  });
}
