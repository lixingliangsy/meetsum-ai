// pages/api/templates.js
// 科研图表模板 API - 提供预设科研图表模板

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { discipline, figureType } = req.query

    // 获取所有模板
    let templates = getAllTemplates()

    // 按学科过滤
    if (discipline) {
      templates = templates.filter(t => t.discipline === discipline)
    }

    // 按图表类型过滤
    if (figureType) {
      templates = templates.filter(t => t.figureType === figureType)
    }

    res.status(200).json({
      success: true,
      total: templates.length,
      templates: templates,
    })
  } catch (error) {
    console.error('Templates error:', error)
    res.status(500).json({ error: 'Failed to get templates', details: error.message })
  }
}

// 获取所有模板
function getAllTemplates() {
  return [
    {
      id: 'tpl-001',
      name: 'Bar Chart (Vertical)',
      description: '垂直柱状图，适合比较分组数据',
      discipline: 'general',
      figureType: 'bar',
      style: 'professional',
      width: '8.5cm',
      height: '6cm',
      dpi: 300,
      exampleData: [
        { category: 'Group A', value: 35 },
        { category: 'Group B', value: 48 },
        { category: 'Group C', value: 29 },
      ],
      latexTemplate: `\\begin{figure}[htbp]
  \\centering
  \\includegraphics[width=\\linewidth]{figure.pdf}
  \\caption{Bar chart showing comparison.}
  \\label{fig:bar}
\\end{figure}`,
    },
    {
      id: 'tpl-002',
      name: 'Line Graph',
      description: '折线图，适合展示趋势数据',
      discipline: 'general',
      figureType: 'line',
      style: 'professional',
      width: '8.5cm',
      height: '6cm',
      dpi: 300,
      exampleData: [
        { x: 0, y: 10 },
        { x: 1, y: 25 },
        { x: 2, y: 40 },
      ],
      latexTemplate: `\\begin{figure}[htbp]
  \\centering
  \\includegraphics[width=\\linewidth]{figure.pdf}
  \\caption{Line graph showing trends over time.}
  \\label{fig:line}
\\end{figure}`,
    },
    {
      id: 'tpl-003',
      name: 'Scatter Plot',
      description: '散点图，适合展示相关性',
      discipline: 'general',
      figureType: 'scatter',
      style: 'professional',
      width: '8.5cm',
      height: '6cm',
      dpi: 300,
      exampleData: [
        { x: 1.2, y: 2.3 },
        { x: 2.1, y: 3.5 },
        { x: 1.8, y: 2.8 },
      ],
    },
    {
      id: 'tpl-004',
      name: 'Flowchart (CRISPR)',
      description: 'CRISPR基因编辑流程图',
      discipline: 'biology',
      figureType: 'flowchart',
      style: 'professional',
      width: '12cm',
      height: '8cm',
      dpi: 300,
      nodes: [
        { id: 'n1', label: 'Guide RNA Design' },
        { id: 'n2', label: 'Cas9 Binding' },
        { id: 'n3', label: 'DNA Cleavage' },
        { id: 'n4', label: 'Gene Editing' },
      ],
    },
    {
      id: 'tpl-005',
      name: 'Heatmap (Gene Expression)',
      description: '基因表达热图',
      discipline: 'biology',
      figureType: 'heatmap',
      style: 'professional',
      width: '10cm',
      height: '8cm',
      dpi: 300,
    },
    {
      id: 'tpl-006',
      name: 'Box Plot',
      description: '箱线图，适合展示数据分布',
      discipline: 'statistics',
      figureType: 'boxplot',
      style: 'professional',
      width: '8.5cm',
      height: '6cm',
      dpi: 300,
    },
    {
      id: 'tpl-007',
      name: 'Venn Diagram',
      description: '韦恩图，适合展示集合关系',
      discipline: 'general',
      figureType: 'venn',
      style: 'professional',
      width: '8cm',
      height: '6cm',
      dpi: 300,
    },
    {
      id: 'tpl-008',
      name: 'Network Diagram',
      description: '网络图，适合展示关系网络',
      discipline: 'general',
      figureType: 'network',
      style: 'professional',
      width: '10cm',
      height: '8cm',
      dpi: 300,
    },
  ]
}
