// pages/api/export-word.js
// Word 导出 API - 将优化后的简历导出为 Word 格式

import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx'
import fs from 'fs'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { resumeData, template = 'modern' } = req.body

    if (!resumeData) {
      return res.status(400).json({ error: 'Missing resume data' })
    }

    // 生成 Word 文档
    const doc = generateWordDocument(resumeData)

    // 生成 buffer
    const buffer = await Packer.toBuffer(doc)

    // 返回 Word 文件
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')
    res.setHeader('Content-Disposition', `attachment; filename="resume-${Date.now()}.docx"`)
    res.status(200).send(buffer)
  } catch (error) {
    console.error('Word export error:', error)
    res.status(500).json({ error: 'Failed to export Word', details: error.message })
  }
}

// 生成 Word 文档
function generateWordDocument(data) {
  const name = data.personalInfo?.name || 'Your Name'
  const email = data.personalInfo?.email || ''
  const phone = data.personalInfo?.phone || ''
  const location = data.personalInfo?.location || ''
  const summary = data.summary || ''
  const experience = data.experience || []
  const education = data.education || []
  const skills = data.skills || []
  const projects = data.projects || []

  const children = []

  // 姓名
  children.push(
    new Paragraph({
      text: name,
      heading: HeadingLevel.HEADING_1,
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
    })
  )

  // 联系信息
  const contactInfo = [email, phone, location].filter(Boolean).join(' | ')
  if (contactInfo) {
    children.push(
      new Paragraph({
        text: contactInfo,
        alignment: AlignmentType.CENTER,
        spacing: { after: 200 },
      })
    )
  }

  // 个人简介
  if (summary) {
    children.push(
      new Paragraph({
        text: '个人简介',
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 400, after: 200 },
      })
    )
    children.push(
      new Paragraph({
        text: summary,
        spacing: { after: 200 },
      })
    )
  }

  // 工作经验
  if (experience.length > 0) {
    children.push(
      new Paragraph({
        text: '工作经验',
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 400, after: 200 },
      })
    )

    experience.forEach(exp => {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: exp.title || 'Position',
              bold: true,
            }),
            new TextRun({
              text: `\t${exp.period || ''}`,
            }),
          ],
          spacing: { after: 100 },
        })
      )

      if (exp.company) {
        children.push(
          new Paragraph({
            text: exp.company,
            spacing: { after: 100 },
          })
        )
      }

      if (exp.description) {
        children.push(
          new Paragraph({
            text: exp.description,
            spacing: { after: 200 },
          })
        )
      }
    })
  }

  // 教育背景
  if (education.length > 0) {
    children.push(
      new Paragraph({
        text: '教育背景',
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 400, after: 200 },
      })
    )

    education.forEach(edu => {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: edu.degree || 'Degree',
              bold: true,
            }),
            new TextRun({
              text: `\t${edu.year || ''}`,
            }),
          ],
          spacing: { after: 100 },
        })
      )

      if (edu.school) {
        children.push(
          new Paragraph({
            text: edu.school,
            spacing: { after: 200 },
          })
        )
      }
    })
  }

  // 专业技能
  if (skills.length > 0) {
    children.push(
      new Paragraph({
        text: '专业技能',
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 400, after: 200 },
      })
    )

    children.push(
      new Paragraph({
        text: skills.join(', '),
        spacing: { after: 200 },
      })
    )
  }

  // 项目经验
  if (projects.length > 0) {
    children.push(
      new Paragraph({
        text: '项目经验',
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 400, after: 200 },
      })
    )

    projects.forEach(proj => {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: proj.name || 'Project',
              bold: true,
            }),
            new TextRun({
              text: `\t${proj.period || ''}`,
            }),
          ],
          spacing: { after: 100 },
        })
      )

      if (proj.description) {
        children.push(
          new Paragraph({
            text: proj.description,
            spacing: { after: 200 },
          })
        )
      }
    })
  }

  return new Document({
    sections: [
      {
        properties: {},
        children: children,
      },
    ],
  })
}
