import React, { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

export default function GeneratePlan() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    goal: '5K',
    currentFitness: 'beginner',
    weeklyMileage: 20,
    weeksAvailable: 12,
    experienceLevel: 'beginner',
    availableDaysPerWeek: 4,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [plan, setPlan] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: name === 'weeklyMileage' || name === 'weeksAvailable' || name === 'availableDaysPerWeek'
        ? parseInt(value) || 0
        : value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/generate-plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate plan')
      }

      // 保存计划到 localStorage
      const planId = Date.now().toString()
      const planWithId = { ...data.plan, id: planId, createdAt: new Date().toISOString() }
      localStorage.setItem(`plan_${planId}`, JSON.stringify(planWithId))

      // 保存计划列表
      const plans = JSON.parse(localStorage.getItem('plans') || '[]')
      plans.push({ id: planId, goal: data.plan.goal, createdAt: planWithId.createdAt })
      localStorage.setItem('plans', JSON.stringify(plans))

      setPlan(planWithId)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const viewPlan = () => {
    if (plan) {
      router.push(`/plan/${plan.id}`)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>生成训练计划 - Running Training Plan</title>
      </Head>

      <header className="bg-green-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">生成训练计划</h1>
              <p className="mt-2 text-green-100">根据您的情况生成专属跑步训练计划</p>
            </div>
            <a href="/" className="text-white hover:text-green-200">
              ← 返回首页
            </a>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {!plan ? (
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">训练计划配置</h2>

              {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded">
                  {error}
                </div>
              )}

              {/* 目标 */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  训练目标 *
                </label>
                <select
                  name="goal"
                  value={formData.goal}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                >
                  <option value="5K">5K（5公里）</option>
                  <option value="10K">10K（10公里）</option>
                  <option value="HalfMarathon">半程马拉松（21.0975公里）</option>
                  <option value="Marathon">全程马拉松（42.195公里）</option>
                </select>
              </div>

              {/* 当前体能水平 */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  当前体能水平
                </label>
                <select
                  name="currentFitness"
                  value={formData.currentFitness}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="beginner">初级 - 刚开始跑步</option>
                  <option value="intermediate">中级 - 有规律跑步习惯</option>
                  <option value="advanced">高级 - 有参赛经验</option>
                </select>
              </div>

              {/* 经验水平 */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  跑步经验
                </label>
                <select
                  name="experienceLevel"
                  value={formData.experienceLevel}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="beginner">新手</option>
                  <option value="intermediate">有一定经验</option>
                  <option value="advanced">经验丰富</option>
                </select>
              </div>

              {/* 每周里程 */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  当前每周跑步里程（公里）：{formData.weeklyMileage} km
                </label>
                <input
                  type="range"
                  name="weeklyMileage"
                  min="5"
                  max="100"
                  step="5"
                  value={formData.weeklyMileage}
                  onChange={handleChange}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>5 km</span>
                  <span>50 km</span>
                  <span>100 km</span>
                </div>
              </div>

              {/* 可用周数 */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  训练周期（周）：{formData.weeksAvailable} 周
                </label>
                <input
                  type="range"
                  name="weeksAvailable"
                  min="4"
                  max="24"
                  step="1"
                  value={formData.weeksAvailable}
                  onChange={handleChange}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>4 周</span>
                  <span>12 周</span>
                  <span>24 周</span>
                </div>
              </div>

              {/* 每周可用天数 */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  每周训练天数
                </label>
                <div className="grid grid-cols-7 gap-2">
                  {[1, 2, 3, 4, 5, 6, 7].map(day => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => setFormData({ ...formData, availableDaysPerWeek: day })}
                      className={`py-2 rounded-md font-medium transition-colors
                        ${formData.availableDaysPerWeek === day
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 text-white py-3 px-6 rounded-md font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? '生成中...' : '生成训练计划'}
              </button>
            </form>
          ) : (
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">✅</div>
                <h2 className="text-2xl font-bold text-gray-800">计划生成成功！</h2>
              </div>

              <div className="bg-green-50 p-4 rounded-md mb-6">
                <h3 className="font-semibold text-green-800 mb-2">计划概览</h3>
                <dl className="grid grid-cols-2 gap-4">
                  <div>
                    <dt className="text-sm text-green-600">目标</dt>
                    <dd className="font-medium text-green-900">{plan.goal}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-green-600">总周数</dt>
                    <dd className="font-medium text-green-900">{plan.totalWeeks} 周</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-green-600">预计完赛时间</dt>
                    <dd className="font-medium text-green-900">{plan.estimatedFinishTime}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-green-600">基础配速</dt>
                    <dd className="font-medium text-green-900">
                      {plan.basePace.minutes}:{plan.basePace.seconds.toString().padStart(2, '0')} min/km
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={viewPlan}
                  className="flex-1 bg-green-600 text-white py-3 px-6 rounded-md font-medium hover:bg-green-700"
                >
                  查看完整计划
                </button>
                <button
                  onClick={() => { setPlan(null); setFormData({ goal: '5K', currentFitness: 'beginner', weeklyMileage: 20, weeksAvailable: 12, experienceLevel: 'beginner', availableDaysPerWeek: 4 }) }}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-md font-medium hover:bg-gray-300"
                >
                  生成新计划
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
