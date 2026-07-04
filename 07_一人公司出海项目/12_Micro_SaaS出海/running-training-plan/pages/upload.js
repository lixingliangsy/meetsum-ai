import React, { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

export default function UploadData() {
  const router = useRouter()
  const [file, setFile] = useState(null)
  const [fileType, setFileType] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [parsedData, setParsedData] = useState(null)

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (!selectedFile) return

    setFile(selectedFile)

    // 自动检测文件类型
    const fileName = selectedFile.name.toLowerCase()
    if (fileName.endsWith('.gpx')) {
      setFileType('gpx')
    } else if (fileName.endsWith('.tcx')) {
      setFileType('tcx')
    } else {
      setError('不支持的文件格式，请上传 .gpx 或 .tcx 文件')
      setFile(null)
    }
  }

  const handleUpload = async (e) => {
    e.preventDefault()
    if (!file || !fileType) {
      setError('请选择要上传的文件')
      return
    }

    setLoading(true)
    setError('')

    try {
      // 读取文件内容
      const fileContent = await readFileAsText(file)

      const response = await fetch('/api/parse-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fileContent,
          fileType,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to parse file')
      }

      setParsedData(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const readFileAsText = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => resolve(e.target.result)
      reader.onerror = (e) => reject(e)
      reader.readAsText(file)
    })
  }

  const formatTime = (seconds) => {
    if (!seconds) return '-'
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = Math.floor(seconds % 60)
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`
  }

  const formatPace = (pace) => {
    if (!pace) return '-'
    return `${pace.minutes}:${pace.seconds.toString().padStart(2, '0')} min/km`
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>上传跑步数据 - Running Training Plan</title>
      </Head>

      <header className="bg-green-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">上传跑步数据</h1>
              <p className="mt-2 text-green-100">支持 GPX 和 TCX 格式</p>
            </div>
            <a href="/" className="text-white hover:text-green-200">
              首页
            </a>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {!parsedData ? (
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">上传GPS数据文件</h2>

              {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded">
                  {error}
                </div>
              )}

              <form onSubmit={handleUpload}>
                {/* 文件上传 */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    选择文件 (.gpx 或 .tcx)
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-green-500 transition-colors">
                    <div className="space-y-1 text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 0 0-4 4v20m32-12v8m0 0v8a4 4 0 0 1-4 4H12a4 4 0 0 1-4-4v-4m32-4l-3.172-3.172a4 4 0 0 0-5.656 0L28 28M8 32l9.172-9.172a4 4 0 0 1 5.656 0L28 28m0 0l4 4m-4-4v12"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none"
                        >
                          <span>上传文件</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            accept=".gpx,.tcx"
                            onChange={handleFileChange}
                            className="sr-only"
                          />
                        </label>
                        <p className="pl-1">或拖拽文件到此处</p>
                      </div>
                      <p className="text-xs text-gray-500">GPX 或 TCX 格式</p>
                    </div>
                  </div>
                  {file && (
                    <div className="mt-2 text-sm text-gray-600">
                      已选择：{file.name} ({(file.size / 1024).toFixed(2)} KB)
                      {fileType && <span className="ml-2 text-green-600">· {fileType.toUpperCase()} 格式</span>}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading || !file}
                  className="w-full bg-green-600 text-white py-3 px-6 rounded-md font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? '解析中...' : '上传并解析'}
                </button>
              </form>

              <div className="mt-8 bg-blue-50 p-4 rounded-md">
                <h3 className="font-semibold text-blue-800 mb-2">支持的文件格式</h3>
                <ul className="space-y-1 text-sm text-blue-700">
                  <li><strong>GPX (GPS Exchange Format)</strong> - 通用的GPS数据格式，包含轨迹点、航点等</li>
                  <li><strong>TCX (Training Center XML)</strong> - Garmin 等设备使用的训练数据格式，包含心率、配速等</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* 解析成功提示 */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-center mb-4">
                  <div className="text-6xl mb-2">✅</div>
                  <h2 className="text-2xl font-bold text-gray-800">解析成功！</h2>
                  <p className="text-gray-600">文件类型：{parsedData.fileType.toUpperCase()}</p>
                </div>

                <button
                  onClick={() => { setParsedData(null); setFile(null); setFileType('') }}
                  className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-md font-medium hover:bg-gray-300"
                >
                  上传新文件
                </button>
              </div>

              {/* 统计数据 */}
              {parsedData.data.statistics && (
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">统计数据</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-4 rounded-md">
                      <div className="text-sm text-blue-600">总距离</div>
                      <div className="text-2xl font-bold text-blue-800">
                        {parsedData.data.statistics.totalDistanceKm || (parsedData.data.statistics.totalDistance / 1000).toFixed(2)} km
                      </div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-md">
                      <div className="text-sm text-green-600">总点数</div>
                      <div className="text-2xl font-bold text-green-800">{parsedData.data.totalPoints}</div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-md">
                      <div className="text-sm text-purple-600">总时长</div>
                      <div className="text-2xl font-bold text-purple-800">
                        {formatTime(parsedData.data.statistics.totalTime)}
                      </div>
                    </div>
                    {parsedData.data.statistics.averagePace && (
                      <div className="bg-orange-50 p-4 rounded-md">
                        <div className="text-sm text-orange-600">平均配速</div>
                        <div className="text-2xl font-bold text-orange-800">
                          {formatPace(parsedData.data.statistics.averagePace)}
                        </div>
                      </div>
                    )}
                    {parsedData.data.statistics.totalElevationGain > 0 && (
                      <div className="bg-red-50 p-4 rounded-md">
                        <div className="text-sm text-red-600">累计爬升</div>
                        <div className="text-2xl font-bold text-red-800">
                          {parsedData.data.statistics.totalElevationGain} m
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* GPX 轨迹数据 */}
              {parsedData.data.format === 'GPX' && parsedData.data.tracks && (
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">轨迹数据</h3>
                  <div className="space-y-4">
                    {parsedData.data.tracks.map((track, index) => (
                      <div key={index} className="border border-gray-200 rounded-md p-4">
                        <h4 className="font-semibold text-gray-700 mb-2">{track.name}</h4>
                        <div className="text-sm text-gray-600">
                          段落数：{track.segments.length}
                        </div>
                        {track.segments[0] && (
                          <div className="mt-2 max-h-48 overflow-y-auto">
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="bg-gray-50">
                                  <th className="px-2 py-1 text-left">序号</th>
                                  <th className="px-2 py-1 text-left">纬度</th>
                                  <th className="px-2 py-1 text-left">经度</th>
                                  <th className="px-2 py-1 text-left">海拔</th>
                                </tr>
                              </thead>
                              <tbody>
                                {track.segments[0].slice(0, 10).map((point, pIdx) => (
                                  <tr key={pIdx} className="border-t">
                                    <td className="px-2 py-1">{pIdx + 1}</td>
                                    <td className="px-2 py-1">{point.latitude?.toFixed(6)}</td>
                                    <td className="px-2 py-1">{point.longitude?.toFixed(6)}</td>
                                    <td className="px-2 py-1">{point.elevation?.toFixed(1)} m</td>
                                  </tr>
                                ))}
                                {track.segments[0].length > 10 && (
                                  <tr>
                                    <td colSpan="4" className="px-2 py-1 text-center text-gray-500">
                                      ... 还有 {track.segments[0].length - 10} 个点
                                    </td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TCX 活动数据 */}
              {parsedData.data.format === 'TCX' && parsedData.data.activities && (
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">活动数据</h3>
                  <div className="space-y-4">
                    {parsedData.data.activities.map((activity, index) => (
                      <div key={index} className="border border-gray-200 rounded-md p-4">
                        <h4 className="font-semibold text-gray-700 mb-2">
                          {activity.sport} - {activity.laps.length} 个段落
                        </h4>
                        <div className="space-y-2">
                          {activity.laps.map((lap, lapIdx) => (
                            <div key={lapIdx} className="bg-gray-50 p-3 rounded">
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                                <div>
                                  <span className="text-gray-500">时长：</span>
                                  {formatTime(lap.totalTimeSeconds)}
                                </div>
                                <div>
                                  <span className="text-gray-500">距离：</span>
                                  {(lap.distanceMeters / 1000).toFixed(2)} km
                                </div>
                                {lap.averageHeartRateBpm && (
                                  <div>
                                    <span className="text-gray-500">平均心率：</span>
                                    {lap.averageHeartRateBpm} bpm
                                  </div>
                                )}
                                {lap.calories && (
                                  <div>
                                    <span className="text-gray-500">卡路里：</span>
                                    {lap.calories} cal
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <footer className="bg-gray-800 text-white mt-12">
        <div className="container mx-auto px-4 py-6 text-center">
          <p>&copy; 2026 Running Training Plan. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
