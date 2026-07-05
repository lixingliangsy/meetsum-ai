import { useState } from 'react'

type InputType = 'text' | 'url' | 'pdf'

interface SummaryResult {
  summary: string
  keyPoints: string[]
  citations: {
    apa: string
    mla: string
    chicago: string
    bibtex: string
  }
}

const Summarizer: React.FC = () => {
  const [inputType, setInputType] = useState<InputType>('text')
  const [inputText, setInputText] = useState('')
  const [url, setUrl] = useState('')
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [summaryLength, setSummaryLength] = useState<'short' | 'medium' | 'long'>('medium')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<SummaryResult | null>(null)
  const [error, setError] = useState('')
  const [useMock, setUseMock] = useState(true)

  const handleSubmit = async () => {
    setLoading(true)
    setError('')
    setResult(null)

    try {
      let content = ''

      if (inputType === 'text') {
        content = inputText
      } else if (inputType === 'url') {
        content = url
      } else if (inputType === 'pdf' && pdfFile) {
        // 在实际应用中，这里应该上传PDF到服务器
        content = 'PDF内容：' + pdfFile.name
      }

      if (!content) {
        throw new Error('请输入内容')
      }

      const response = await fetch('/api/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
          inputType,
          summaryLength,
          useMock
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || '摘要生成失败')
      }

      setResult(data)
    } catch (err: any) {
      setError(err.message || '发生错误')
    } finally {
      setLoading(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPdfFile(e.target.files[0])
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert('已复制到剪贴板')
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">文章摘要</h2>
          <label className="flex items-center cursor-pointer">
            <span className="mr-2 text-sm text-gray-600">Mock模式</span>
            <input
              type="checkbox"
              checked={useMock}
              onChange={(e) => setUseMock(e.target.checked)}
              className="toggle toggle-primary"
            />
            <span className="ml-2 text-xs text-gray-500">
              {useMock ? '（无需API Key）' : '（需要API Key）'}
            </span>
          </label>
        </div>

        {/* 输入类型选择 */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setInputType('text')}
            className={`px-4 py-2 rounded-md ${
              inputType === 'text'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            文本
          </button>
          <button
            onClick={() => setInputType('url')}
            className={`px-4 py-2 rounded-md ${
              inputType === 'url'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            URL
          </button>
          <button
            onClick={() => setInputType('pdf')}
            className={`px-4 py-2 rounded-md ${
              inputType === 'pdf'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            PDF
          </button>
        </div>

        {/* 输入区域 */}
        {inputType === 'text' && (
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="粘贴文章内容..."
            className="w-full h-48 p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        )}

        {inputType === 'url' && (
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="输入文章URL..."
            className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        )}

        {inputType === 'pdf' && (
          <div className="border-2 border-dashed border-gray-300 rounded-md p-8 text-center">
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="hidden"
              id="pdf-upload"
            />
            <label
              htmlFor="pdf-upload"
              className="cursor-pointer text-primary-600 hover:text-primary-700"
            >
              {pdfFile ? pdfFile.name : '点击上传PDF文件'}
            </label>
          </div>
        )}

        {/* 摘要长度选择 */}
        <div className="mt-4 mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            摘要长度
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => setSummaryLength('short')}
              className={`px-4 py-2 rounded-md ${
                summaryLength === 'short'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              短（150字）
            </button>
            <button
              onClick={() => setSummaryLength('medium')}
              className={`px-4 py-2 rounded-md ${
                summaryLength === 'medium'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              中（300字）
            </button>
            <button
              onClick={() => setSummaryLength('long')}
              className={`px-4 py-2 rounded-md ${
                summaryLength === 'long'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              长（500字）
            </button>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-primary-600 text-white py-3 px-4 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? '生成中...' : '生成摘要'}
        </button>
      </div>

      {/* 错误提示 */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
          {error}
        </div>
      )}

      {/* 结果展示 */}
      {result && (
        <div className="space-y-6">
          {/* 摘要 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">摘要</h3>
            <p className="text-gray-700 leading-relaxed">{result.summary}</p>
          </div>

          {/* 关键要点 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">关键要点</h3>
            <ul className="list-disc pl-5 space-y-2">
              {result.keyPoints.map((point, index) => (
                <li key={index} className="text-gray-700">{point}</li>
              ))}
            </ul>
          </div>

          {/* 引用 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">引用格式</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">APA</h4>
                  <button
                    onClick={() => copyToClipboard(result.citations.apa)}
                    className="text-sm text-primary-600 hover:text-primary-700"
                  >
                    复制
                  </button>
                </div>
                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                  {result.citations.apa}
                </p>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">MLA</h4>
                  <button
                    onClick={() => copyToClipboard(result.citations.mla)}
                    className="text-sm text-primary-600 hover:text-primary-700"
                  >
                    复制
                  </button>
                </div>
                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                  {result.citations.mla}
                </p>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">Chicago</h4>
                  <button
                    onClick={() => copyToClipboard(result.citations.chicago)}
                    className="text-sm text-primary-600 hover:text-primary-700"
                  >
                    复制
                  </button>
                </div>
                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                  {result.citations.chicago}
                </p>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">BibTeX</h4>
                  <button
                    onClick={() => copyToClipboard(result.citations.bibtex)}
                    className="text-sm text-primary-600 hover:text-primary-700"
                  >
                    复制
                  </button>
                </div>
                <pre className="text-sm text-gray-600 bg-gray-50 p-3 rounded overflow-x-auto">
                  {result.citations.bibtex}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Summarizer
