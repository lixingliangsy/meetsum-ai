# Resumeforge

AI-powered resume optimization platform that helps job seekers create ATS-friendly resumes and optimize them for specific job descriptions.

## Features Implemented

### 1. Resume Parsing (简历解析)
- Parse PDF and Word (.docx) resumes
- Extract key information:
  - Personal info (name, email, phone, location)
  - Work experience (title, company, period, description)
  - Education (degree, school, year)
  - Skills (automatically detected from content)
  - Projects
- API Endpoint: `POST /api/parse`

### 2. AI Optimization (AI 优化建议)
- Analyze resume content and provide optimization suggestions
- Features:
  - Resume Score (0-100)
  - Personal info completeness check
  - Summary analysis
  - Experience review (quantifiable achievements)
  - Skills assessment
  - Keyword matching (if job description provided)
  - ATS compatibility check
- API Endpoint: `POST /api/optimize`

### 3. PDF Export (PDF 导出)
- Export optimized resume to PDF format
- Professional styling with clean layout
- A4 paper size, print-optimized
- Generated using Puppeteer (headless Chrome)
- API Endpoint: `POST /api/export-pdf`

### 4. Word Export (Word 导出)
- Export optimized resume to Word (.docx) format
- Fully editable
- Preserves all formatting and structure
- Generated using `docx` library
- API Endpoint: `POST /api/export-word`

### 5. ATS Compatibility Check (ATS 兼容性检查)
- Check resume compatibility with Applicant Tracking Systems (ATS)
- Provides optimization tips
- API Endpoint: `POST /api/optimize` (included in optimization)

## Project Structure

```
resumeforge/
├── pages/
│   ├── api/
│   │   ├── parse.js          # Resume parsing API
│   │   ├── optimize.js       # AI optimization API
│   │   ├── export-pdf.js    # PDF export API
│   │   ├── export-word.js   # Word export API
│   │   ├── features.js       # Feature list API
│   │   ├── health.js         # Health check API
│   │   └── export.js        # Data export API
│   └── index.tsx           # Main page (to be implemented)
├── public/
│   ├── faq.html           # FAQ page
│   ├── support.html        # Support page
│   └── ...
├── src/
│   ├── app/                 # App components (to be implemented)
│   └── lib/                 # Utility functions (to be implemented)
├── package.json
├── next.config.js
├── tsconfig.json
└── README.md
```

## Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Dependencies

### Production Dependencies
- `next`: ^14.0.4
- `react`: ^18.2.0
- `react-dom`: ^18.2.0
- `pdf-parse`: ^1.1.1 (PDF parsing)
- `mammoth`: ^1.5.2 (Word parsing)
- `openai`: ^4.0.0 (AI optimization - optional)
- `puppeteer`: ^21.0.0 (PDF generation)
- `docx`: ^8.5.0 (Word generation)
- `formidable`: ^3.4.0 (File upload handling)

### Development Dependencies
- `@types/node`: ^20.10.0
- `@types/react`: ^18.2.0
- `typescript`: ^5.3.0
- `tailwindcss`: ^3.4.0
- `postcss`: ^8.4.0
- `autoprefixer`: ^10.4.0

## API Documentation

### POST /api/parse
Upload and parse a resume file (PDF or Word).

**Request:**
- Method: `POST`
- Content-Type: `multipart/form-data`
- Body: `resume` (file upload)

**Response:**
```json
{
  "success": true,
  "fileName": "resume.pdf",
  "fileType": "pdf",
  "rawText": "...",
  "parsedData": {
    "personalInfo": { "name": "...", "email": "...", "phone": "...", "location": "..." },
    "summary": "...",
    "experience": [...],
    "education": [...],
    "skills": [...],
    "projects": [...]
  }
}
```

### POST /api/optimize
Analyze resume content and provide optimization suggestions.

**Request:**
```json
{
  "resumeData": { ... },
  "jobDescription": "..." (optional)
}
```

**Response:**
```json
{
  "success": true,
  "analysis": {
    "score": 75,
    "rating": "良好",
    "suggestions": [...],
    "keywords": [...],
    "improvements": [...],
    "atsCompatibility": { "score": 85, "tips": [...] }
  }
}
```

### POST /api/export-pdf
Export resume to PDF format.

**Request:**
```json
{
  "resumeData": { ... },
  "template": "modern" (optional)
}
```

**Response:**
- Content-Type: `application/pdf`
- Content-Disposition: `attachment; filename="resume-xxx.pdf"`
- Body: PDF buffer

### POST /api/export-word
Export resume to Word (.docx) format.

**Request:**
```json
{
  "resumeData": { ... },
  "template": "modern" (optional)
}
```

**Response:**
- Content-Type: `application/vnd.openxmlformats-officedocument.wordprocessingml.document`
- Content-Disposition: `attachment; filename="resume-xxx.docx"`
- Body: Word file buffer

## Usage Examples

### 1. Parse a Resume

```javascript
const formData = new FormData()
formData.append('resume', fileInput.files[0])

const response = await fetch('/api/parse', {
  method: 'POST',
  body: formData,
})
const data = await response.json()
console.log(data.parsedData)
```

### 2. Optimize a Resume

```javascript
const response = await fetch('/api/optimize', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    resumeData: parsedData,
    jobDescription: 'Looking for a software engineer with React experience...',
  }),
})
const analysis = await response.json()
console.log(analysis.analysis.suggestions)
```

### 3. Export to PDF

```javascript
const response = await fetch('/api/export-pdf', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ resumeData: optimizedData }),
})
const blob = await response.blob()
const url = window.URL.createObjectURL(blob)
window.open(url)
```

### 4. Export to Word

```javascript
const response = await fetch('/api/export-word', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ resumeData: optimizedData }),
})
const blob = await response.blob()
const url = window.URL.createObjectURL(blob)
const a = document.createElement('a')
a.href = url
a.download = 'resume.docx'
a.click()
```

## Next Steps

### To Be Implemented:
1. Frontend UI components (resume upload, editor, preview)
2. User authentication and account management
3. Multiple resume templates
4. Cover letter generator
5. LinkedIn profile optimizer
6. Interview preparation tools

### Planned Features:
1. Multiple export templates
2. Batch resume processing
3. Team collaboration features
4. Integration with job boards (Indeed, LinkedIn, etc.)

## License

MIT License

## Support

- FAQ: `/public/faq.html`
- Support: `/public/support.html`
- Email: support@resumeforge.com

---

**Status:** Core features implemented and functional. Frontend UI under development.
