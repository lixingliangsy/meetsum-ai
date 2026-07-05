// pages/api/generate.js
// 科研图表生成 API - 从数据或描述生成科研图表

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { description, discipline, template, style, colorScheme, data } = req.body

    if (!description && !data) {
      return res.status(400).json({ error: 'Missing description or data' })
    }

    // 模拟：生成科研图表
    const figure = generateFigure({
      description: description,
      discipline: discipline || 'biology',
      template: template || 'auto',
      style: style || 'professional',
      colorScheme: colorScheme || 'default',
      data: data,
    })

    res.status(200).json({
      success: true,
      figure: figure,
    })
  } catch (error) {
    console.error('Generate error:', error)
    res.status(500).json({ error: 'Failed to generate figure', details: error.message })
  }
}

// 生成科研图表
function generateFigure(config) {
  const { description, discipline, template, style, colorScheme, data } = config

  // 自动检测图表类型
  let figureType = template
  if (figureType === 'auto') {
    figureType = detectFigureType(description, data)
  }

  // 生成图表数据
  const figureData = generateFigureData(figureType, data, description)

  // 生成 SVG
  const svg = generateSVG(figureType, figureData, style, colorScheme)

  // 生成 LaTeX 代码（用于论文发表）
  const latex = generateLatex(figureType, figureData)

  return {
    id: `fig-${Date.now()}`,
    type: figureType,
    discipline: discipline,
    style: style,
    colorScheme: colorScheme,
    data: figureData,
    svg: svg,
    latex: latex,
    metadata: {
      title: extractTitle(description),
      caption: generateCaption(description, figureType),
      width: '8.5cm', // 标准期刊宽度
      height: 'auto',
      dpi: 300,
      format: 'PDF',
    },
    createdAt: new Date().toISOString(),
  }
}

// 检测图表类型
function detectFigureType(description, data) {
  const desc = (description || '').toLowerCase()

  if (desc.includes('flow') || desc.includes('流程')) return 'flowchart'
  if (desc.includes('bar') || desc.includes('柱状')) return 'bar'
  if (desc.includes('line') || desc.includes('折线')) return 'line'
  if (desc.includes('scatter') || desc.includes('散点')) return 'scatter'
  if (desc.includes('pie') || desc.includes('饼')) return 'pie'
  if (desc.includes('heatmap') || desc.includes('热图')) return 'heatmap'
  if (desc.includes('box') || desc.includes('箱线')) return 'boxplot'
  if (desc.includes('venn') || desc.includes('韦恩')) return 'venn'
  if (desc.includes('network') || desc.includes('网络')) return 'network'
  if (desc.includes('tree') || desc.includes('树')) return 'tree'

  // 默认：基于数据类型判断
  if (data && data.length > 0) {
    if (data[0].hasOwnProperty('category') && data[0].hasOwnProperty('value')) return 'bar'
    if (data[0].hasOwnProperty('x') && data[0].hasOwnProperty('y')) return 'scatter'
  }

  return 'bar' // 默认柱状图
}

// 生成图表数据
function generateFigureData(type, data, description) {
  if (data && data.length > 0) {
    return data
  }

  // 模拟数据
  const mockData = {
    'bar': [
      { category: 'Group A', value: 35 },
      { category: 'Group B', value: 48 },
      { category: 'Group C', value: 29 },
      { category: 'Group D', value: 52 },
    ],
    'line': [
      { x: 0, y: 10 },
      { x: 1, y: 25 },
      { x: 2, y: 40 },
      { x: 3, y: 35 },
      { x: 4, y: 55 },
    ],
    'scatter': [
      { x: 1.2, y: 2.3, label: 'Sample 1' },
      { x: 2.1, y: 3.5, label: 'Sample 2' },
      { x: 1.8, y: 2.8, label: 'Sample 3' },
      { x: 3.0, y: 4.2, label: 'Sample 4' },
    ],
    'flowchart': {
      nodes: [
        { id: 'n1', label: 'Step 1' },
        { id: 'n2', label: 'Step 2' },
        { id: 'n3', label: 'Step 3' },
      ],
      links: [
        { source: 'n1', target: 'n2' },
        { source: 'n2', target: 'n3' },
      ],
    },
  }

  return mockData[type] || mockData['bar']
}

// 生成 SVG
function generateSVG(type, data, style, colorScheme) {
  // 模拟：生成 SVG 字符串
  const colors = getColorScheme(colorScheme)

  let svg = `<?xml version="1.0" encoding="UTF-8"?>\n`
  svg += `<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">\n`
  svg += `  <rect width="100%" height="100%" fill="white"/>\n`

  if (type === 'bar') {
    svg += `  <!-- Bar Chart -->\n`
    data.forEach((item, index) => {
      const x = 100 + index * 150
      const y = 500 - item.value * 8
      const height = item.value * 8
      svg += `  <rect x="${x}" y="${y}" width="100" height="${height}" fill="${colors[index % colors.length]}"/>\n`
      svg += `  <text x="${x + 50}" y="${y - 10}" text-anchor="middle" font-size="14">${item.category}</text>\n`
    })
  }

  svg += `</svg>`

  return svg
}

// 生成 LaTeX 代码
function generateLatex(type, data) {
  return [
    `\\begin{figure}[htbp]`,
    `  \\centering`,
    `  \\includegraphics[width=\\linewidth]{figure.pdf}`,
    `  \\caption{Caption for the figure.}`,
    `  \\label{fig:example}`,
    `\\end{figure}`,
  ]
}

// 获取配色方案
function getColorScheme(scheme) {
  const schemes = {
    'default': ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd'],
    'journal': ['#000000', '#808080', '#ffffff'],
    'colorblind': ['#0173b2', '#de8f05', '#cc78bc', '#ca9161', '#948b3d'],
    'viridis': ['#440154', '#31688e', '#35b779', '#6ece58', '#fde725'],
  }

  return schemes[scheme] || schemes['default']
}

// 提取标题
function extractTitle(description) {
  if (!description) return 'Untitled Figure'
  const firstSentence = description.split(/[。！？\.]/)[0]
  return firstSentence.substring(0, 100)
}

// 生成图注
function generateCaption(description, type) {
  const typeNames = {
    'bar': 'Bar chart',
    'line': 'Line graph',
    'scatter': 'Scatter plot',
    'flowchart': 'Flowchart',
    'heatmap': 'Heatmap',
    'boxplot': 'Box plot',
  }

  const typeName = typeNames[type] || 'Figure'
  return `${typeName} showing the results. Error bars represent mean ± s.d. (n = 3).`
}
