import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Line, Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
)

export default function Progress() {
  const router = useRouter()
  const [plans, setPlans] = useState([])
  const [selectedPlanId, setSelectedPlanId] = useState('')
  const [trainingLogs, setTrainingLogs] = useState([])
  const [showAddLog, setShowAddLog] = useState(false)
  const [progressData, setProgressData] = useState(null)
  const [loading, setLoading] = useState(false)

  // 表单状态
  const [logForm, setLogForm] = useState({
    date: new Date().toISOString().split('T')[0],
    type: 'run',
    distance: '',
    duration: '',
    paceMinutes: '',
    paceSeconds: '',
    avgHeartRate: '',
    notes: '',
    week: 1,
    completed: true,
  })

  useEffect(() => {
    // 加载保存的计划
    const savedPlans = JSON.parse(localStorage.getItem('plans') || '[]')
    setPlans(savedPlans)

    // 加载训练日志
    const logs = JSON.parse(localStorage.getItem('trainingLogs') || '[]')
    setTrainingLogs(logs)
  }, [])

  const handleLogChange = (e) => {
    const { name, value, type, checked } = e.target
    setLogForm({
      ...logForm,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  const addTrainingLog = (e) => {
    e.preventDefault()

    const newLog = {
      id: Date.now().toString(),
      ...logForm,
      distance: parseFloat(logForm.distance) || 0,
      duration: parseInt(logForm.duration) || 0,
      pace: {
        minutes: parseInt(logForm.paceMinutes) || 0,
        seconds: parseInt(logForm.paceSeconds) || 0,
      },
      avgHeartRate: parseInt(logForm.avgHeartRate) || null,
      createdAt: new Date().toISOString(),
    }

    const updatedLogs = [...trainingLogs, newLog]
    setTrainingLogs(updatedLogs)
    localStorage.setItem('trainingLogs', JSON.stringify(updatedLogs))

    setShowAddLog(false)
    setLogForm({
      date: new Date().toISOString().split('T')[0],
      type: 'run',
      distance: '',
      duration: '',
      paceMinutes: '',
      paceSeconds: '',
      avgHeartRate: '',
      notes: '',
      week: 1,
      completed: true,
    })
  }

  const loadProgress = async () => {
    if (!selectedPlanId) return

    setLoading(true)

    try {
      const plan = JSON.parse(localStorage.getItem(`plan_${selectedPlanId}`) || '{}')

      const response = await fetch('/api/progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          trainingData: { runs: trainingLogs, logs: trainingLogs },
          planData: plan,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to load progress')
      }

      setProgressData(data.progress)
    } catch (err) {
      console.error('Progress error:', err)
      // 使用本地计算的数据显示
      generateLocalProgress()
    } finally {
      setLoading(false)
    }
  }

  const generateLocalProgress = () => {
    if (trainingLogs.length === 0) return

    // 本地计算进度数据
    const sortedLogs = [...trainingLogs].sort((a, b) => new Date(a.date) - new Date(b.date))

    // 里程趋势
    const mileageLabels = sortedLogs.map(l => l.date)
    const mileageData = sortedLogs.map(l => l.distance)

    // 配速趋势
    const paceLabels = sortedLogs.filter(l => l.pace).map(l => l.date)
    const paceData = sortedLogs.filter(l => l.pace).map(l => l.pace.minutes * 60 + l.pace.seconds)

    setProgressData({
      mileageChart: {
        chartType: 'line',
        title: '里程趋势',
        labels: mileageLabels,
        datasets: [
          {
            label: '跑步距离 (km)',
            data: mileageData,
            borderColor: 'rgb(34, 197, 94)',
            backgroundColor: 'rgba(34, 197, 94, 0.1)',
          },
        ],
      },
      paceChart: {
        chartType: 'line',
        title: '配速趋势',
        labels: paceLabels,
        datasets: [
          {
            label: '配速 (秒/km)',
            data: paceData,
            borderColor: 'rgb(239, 68, 68)',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
          },
        ],
      },
      overallStats: {
        totalRuns: trainingLogs.length,
        totalDistance: trainingLogs.reduce((sum, l) => sum + l.distance, 0),
        totalTime: trainingLogs.reduce((sum, l) => sum + l.duration, 0),
      },
    })
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>进度追踪 - Running Training Plan</title>
      </Head>

      <header className="bg-green-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">进度追踪</h1>
              <p className="mt-2 text-green-100">查看您的训练进度和数据分析</p>
            </div>
            <a href="/" className="text-white hover:text-green-200">
              首页
            </a>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* 操作栏 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <div className="flex gap-4 items-center">
                <select
                  value={selectedPlanId}
                  onChange={(e) => setSelectedPlanId(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">选择训练计划</option>
                  {plans.map((plan) => (
                    <option key={plan.id} value={plan.id}>
                      {plan.goal} - {new Date(plan.createdAt).toLocaleDateString()}
                    </option>
                  ))}
                </select>

                <button
                  onClick={loadProgress}
                  disabled={loading || trainingLogs.length === 0}
                  className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:opacity-50"
                >
                  {loading ? '加载中...' : '刷新进度'}
                </button>
              </div>

              <button
                onClick={() => setShowAddLog(!showAddLog)}
                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              >
                {showAddLog ? '取消' : '+ 添加训练记录'}
              </button>
            </div>
          </div>

          {/* 添加训练记录表单 */}
          {showAddLog && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-800 mb-4">添加训练记录</h3>
              <form onSubmit={addTrainingLog} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">日期</label>
                    <input
                      type="date"
                      name="date"
                      value={logForm.date}
                      onChange={handleLogChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">距离 (km)</label>
                    <input
                      type="number"
                      name="distance"
                      value={logForm.distance}
                      onChange={handleLogChange}
                      step="0.01"
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="5.5"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">时长 (分钟)</label>
                    <input
                      type="number"
                      name="duration"
                      value={logForm.duration}
                      onChange={handleLogChange}
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="30"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">配速 (分)</label>
                    <input
                      type="number"
                      name="paceMinutes"
                      value={logForm.paceMinutes}
                      onChange={handleLogChange}
                      min="0"
                      max="59"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="6"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">配速 (秒)</label>
                    <input
                      type="number"
                      name="paceSeconds"
                      value={logForm.paceSeconds}
                      onChange={handleLogChange}
                      min="0"
                      max="59"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="30"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">平均心率 (bpm)</label>
                    <input
                      type="number"
                      name="avgHeartRate"
                      value={logForm.avgHeartRate}
                      onChange={handleLogChange}
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="150"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="completed"
                    checked={logForm.completed}
                    onChange={handleLogChange}
                    id="completed"
                  />
                  <label htmlFor="completed" className="text-sm text-gray-700">已完成训练</label>
                </div>

                <button
                  type="submit"
                  className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700"
                >
                  保存记录
                </button>
              </form>
            </div>
          )}

          {/* 总体统计 */}
          {progressData?.overallStats && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-md text-center">
                <div className="text-3xl font-bold text-green-600">{progressData.overallStats.totalRuns || trainingLogs.length}</div>
                <div className="text-sm text-gray-600">总训练次数</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {(progressData.overallStats.totalDistance || trainingLogs.reduce((sum, l) => sum + l.distance, 0)).toFixed(1)}
                </div>
                <div className="text-sm text-gray-600">总里程 (km)</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md text-center">
                <div className="text-3xl font-bold text-purple-600">
                  {Math.round((progressData.overallStats.totalTime || trainingLogs.reduce((sum, l) => sum + l.duration, 0)) / 60)}h
                </div>
                <div className="text-sm text-gray-600">总训练时长</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md text-center">
                <div className="text-3xl font-bold text-orange-600">{trainingLogs.length > 0 ? '🔥' : '-'}</div>
                <div className="text-sm text-gray-600">连续训练</div>
              </div>
            </div>
          )}

          {/* 图表 */}
          {progressData && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {progressData.mileageChart && (
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">📈 里程趋势</h3>
                  <div className="h-64">
                    <Line data={progressData.mileageChart} options={chartOptions} />
                  </div>
                </div>
              )}

              {progressData.paceChart && (
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">⏱️ 配速趋势</h3>
                  <div className="h-64">
                    <Line data={progressData.paceChart} options={chartOptions} />
                  </div>
                </div>
              )}

              {progressData.heartRateChart && (
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">❤️ 心率趋势</h3>
                  <div className="h-64">
                    <Line data={progressData.heartRateChart} options={chartOptions} />
                  </div>
                </div>
              )}

              {progressData.completionChart && (
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">✅ 训练完成率</h3>
                  <div className="h-64">
                    <Bar data={progressData.completionChart} options={chartOptions} />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 训练记录列表 */}
          {trainingLogs.length > 0 && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-800 mb-4">训练记录</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-2 text-left">日期</th>
                      <th className="px-4 py-2 text-left">距离 (km)</th>
                      <th className="px-4 py-2 text-left">时长</th>
                      <th className="px-4 py-2 text-left">配速</th>
                      <th className="px-4 py-2 text-left">心率</th>
                      <th className="px-4 py-2 text-left">状态</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...trainingLogs]
                      .sort((a, b) => new Date(b.date) - new Date(a.date))
                      .map((log) => (
                        <tr key={log.id} className="border-t">
                          <td className="px-4 py-2">{log.date}</td>
                          <td className="px-4 py-2">{log.distance.toFixed(1)}</td>
                          <td className="px-4 py-2">{log.duration} 分钟</td>
                          <td className="px-4 py-2">
                            {log.pace?.minutes}:{log.pace?.seconds?.toString().padStart(2, '0')}
                          </td>
                          <td className="px-4 py-2">{log.avgHeartRate || '-'}</td>
                          <td className="px-4 py-2">
                            {log.completed ? (
                              <span className="text-green-600">✓ 完成</span>
                            ) : (
                              <span className="text-gray-400">未完成</span>
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {trainingLogs.length === 0 && !progressData && (
            <div className="bg-white p-12 rounded-lg shadow-md text-center">
              <div className="text-6xl mb-4">📊</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">暂无训练数据</h3>
              <p className="text-gray-600 mb-4">添加训练记录以查看进度分析</p>
              <button
                onClick={() => setShowAddLog(true)}
                className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700"
              >
                添加第一条记录
              </button>
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
