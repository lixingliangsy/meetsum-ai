// pages/api/parse.js
// 简历解析 API - 解析 PDF/Word 格式的简历

import formidable from 'formidable'
import pdfParse from 'pdf-parse'
import mammoth from 'mammoth'
import fs from 'fs'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // 解析上传的文件
    const form = formidable({
      multiples: false,
      uploadDir: '/tmp',
      keepExtensions: true,
    })

    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err)
        resolve([fields, files])
      })
    })

    const file = files.resume || files.file
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' })
    }

    const filePath = file.filepath || file.path
    const fileName = file.originalFilename || file.newFilename
    const fileExt = fileName.split('.').pop().toLowerCase()

    let text = ''
    let parsedData = null

    // 根据文件类型解析
    if (fileExt === 'pdf') {
      const dataBuffer = fs.readFileSync(filePath)
      const pdfData = await pdfParse(dataBuffer)
      text = pdfData.text
      parsedData = parseResumeText(text)
    } else if (fileExt === 'docx' || fileExt === 'doc') {
      const result = await mammoth.extractRawText({ path: filePath })
      text = result.value
      parsedData = parseResumeText(text)
    } else {
      return res.status(400).json({ error: 'Unsupported file format. Please upload PDF or Word document.' })
    }

    // 清理临时文件
    try {
      fs.unlinkSync(filePath)
    } catch (e) {
      // 忽略清理错误
    }

    res.status(200).json({
      success: true,
      fileName: fileName,
      fileType: fileExt,
      rawText: text,
      parsedData: parsedData,
    })
  } catch (error) {
    console.error('Parse error:', error)
    res.status(500).json({ error: 'Failed to parse resume', details: error.message })
  }
}

// 解析简历文本内容，提取关键信息
function parseResumeText(text) {
  const data = {
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      location: '',
    },
    summary: '',
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: [],
  }

  // 提取邮箱
  const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/)
  if (emailMatch) {
    data.personalInfo.email = emailMatch[0]
  }

  // 提取电话
  const phoneMatch = text.match(/(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3,4}[-.\s]?\d{4}/)
  if (phoneMatch) {
    data.personalInfo.phone = phoneMatch[0]
  }

  // 提取技能（常见技能关键词）
  const skillKeywords = [
    'JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'C#', 'Go', 'Rust',
    'React', 'Vue', 'Angular', 'Next.js', 'Node.js', 'Express',
    'SQL', 'MySQL', 'PostgreSQL', 'MongoDB', 'Redis',
    'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP',
    'Git', 'CI/CD', 'Agile', 'Scrum',
    'Machine Learning', 'AI', 'Data Analysis',
  ]

  const foundSkills = []
  skillKeywords.forEach(skill => {
    if (text.includes(skill)) {
      foundSkills.push(skill)
    }
  })
  data.skills = foundSkills

  // 提取工作经验（简化版 - 查找日期模式）
  const experiencePattern = /(\d{4}\s*[-–]\s*\d{4}|\d{4}\s*[-–]\s*(Present|Current))/gi
  const experienceMatches = text.match(experiencePattern)
  if (experienceMatches) {
    data.experience = experienceMatches.map((match, index) => ({
      period: match,
      title: '',
      company: '',
      description: '',
    }))
  }

  // 提取教育背景（查找学位关键词）
  const educationKeywords = ['Bachelor', 'Master', 'PhD', 'Degree', 'University', 'College']
  const educationLines = text.split('\n').filter(line => 
    educationKeywords.some(keyword => line.includes(keyword))
  )
  data.education = educationLines.slice(0, 3).map(line => ({
    degree: line.trim(),
    school: '',
    year: '',
  }))

  // 提取摘要/个人简介（查找 Summary 或 Profile 部分）
  const summaryMatch = text.match(/(Summary|Profile|About)[:\s]*([\s\S]*?)(?=\n\n|Experience|Education|Skills)/i)
  if (summaryMatch) {
    data.summary = summaryMatch[2].trim().substring(0, 500)
  }

  return data
}
