// pages/api/export-pdf.js
// PDF 导出 API - 将优化后的简历导出为 PDF 格式

import puppeteer from 'puppeteer'
import fs from 'fs'
import path from 'path'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { resumeData, template = 'modern' } = req.body

    if (!resumeData) {
      return res.status(400).json({ error: 'Missing resume data' })
    }

    // 生成 HTML 内容
    const htmlContent = generateResumeHTML(resumeData, template)

    // 启动 puppeteer 生成 PDF
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    })
    const page = await browser.newPage()
    
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' })
    
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20mm',
        right: '15mm',
        bottom: '20mm',
        left: '15mm',
      },
    })
    
    await browser.close()

    // 返回 PDF
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', `attachment; filename="resume-${Date.now()}.pdf"`)
    res.status(200).send(pdfBuffer)
  } catch (error) {
    console.error('PDF export error:', error)
    res.status(500).json({ error: 'Failed to export PDF', details: error.message })
  }
}

// 生成简历 HTML
function generateResumeHTML(data, template) {
  const name = data.personalInfo?.name || 'Your Name'
  const email = data.personalInfo?.email || ''
  const phone = data.personalInfo?.phone || ''
  const location = data.personalInfo?.location || ''
  const summary = data.summary || ''
  const experience = data.experience || []
  const education = data.education || []
  const skills = data.skills || []
  const projects = data.projects || []

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body {
      font-family: 'Helvetica', 'Arial', sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    h1 {
      color: #2c3e50;
      border-bottom: 2px solid #3498db;
      padding-bottom: 10px;
      margin-bottom: 20px;
    }
    h2 {
      color: #34495e;
      border-bottom: 1px solid #bdc3c7;
      padding-bottom: 5px;
      margin-top: 25px;
      margin-bottom: 15px;
    }
    .contact-info {
      display: flex;
      gap: 20px;
      margin-bottom: 20px;
      color: #7f8c8d;
    }
    .section {
      margin-bottom: 20px;
    }
    .item {
      margin-bottom: 15px;
    }
    .item-header {
      display: flex;
      justify-content: space-between;
      font-weight: bold;
      margin-bottom: 5px;
    }
    .item-subheader {
      color: #7f8c8d;
      margin-bottom: 5px;
    }
    .skills {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }
    .skill-tag {
      background: #ecf0f1;
      padding: 5px 10px;
      border-radius: 3px;
      font-size: 14px;
    }
    ul {
      margin: 5px 0;
      padding-left: 20px;
    }
    li {
      margin-bottom: 3px;
    }
  </style>
</head>
<body>
  <h1>${name}</h1>
  
  <div class="contact-info">
    ${email ? `<span>📧 ${email}</span>` : ''}
    ${phone ? `<span>📞 ${phone}</span>` : ''}
    ${location ? `<span>📍 ${location}</span>` : ''}
  </div>

  ${summary ? `
  <div class="section">
    <h2>个人简介</h2>
    <p>${summary}</p>
  </div>
  ` : ''}

  ${experience.length > 0 ? `
  <div class="section">
    <h2>工作经验</h2>
    ${experience.map(exp => `
      <div class="item">
        <div class="item-header">
          <span>${exp.title || 'Position'}</span>
          <span>${exp.period || ''}</span>
        </div>
        <div class="item-subheader">${exp.company || ''}</div>
        ${exp.description ? `<p>${exp.description}</p>` : ''}
      </div>
    `).join('')}
  </div>
  ` : ''}

  ${education.length > 0 ? `
  <div class="section">
    <h2>教育背景</h2>
    ${education.map(edu => `
      <div class="item">
        <div class="item-header">
          <span>${edu.degree || 'Degree'}</span>
          <span>${edu.year || ''}</span>
        </div>
        <div class="item-subheader">${edu.school || ''}</div>
      </div>
    `).join('')}
  </div>
  ` : ''}

  ${skills.length > 0 ? `
  <div class="section">
    <h2>专业技能</h2>
    <div class="skills">
      ${skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
    </div>
  </div>
  ` : ''}

  ${projects.length > 0 ? `
  <div class="section">
    <h2>项目经验</h2>
    ${projects.map(proj => `
      <div class="item">
        <div class="item-header">
          <span>${proj.name || 'Project'}</span>
          <span>${proj.period || ''}</span>
        </div>
        ${proj.description ? `<p>${proj.description}</p>` : ''}
        ${proj.technologies ? `<p><em>技术栈: ${proj.technologies}</em></p>` : ''}
      </div>
    `).join('')}
  </div>
  ` : ''}
</body>
</html>
  `
}
