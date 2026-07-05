import React, { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'

interface Challenge {
  id: string
  title: string
  description: string
  duration: number
  participants: number
  difficulty: string
  category: string
  startDate: string
  endDate: string
  dailyGoal: string
}

export default function ChallengeDetail() {
  const router = useRouter()
  const { id } = router.query
  const [joined, setJoined] = useState(false)
  const [progress, setProgress] = useState<number[]>([])

  // 模拟挑战数据
  const challenge: Challenge = {
    id: id as string,
    title: '30天俯卧撑挑战',
    description: '从每天10个俯卧撑开始，逐步增加到每天100个。这个挑战将帮助你增强上肢力量，改善体态。',
    duration: 30,
    participants: 156,
    difficulty: 'medium',
    category: '力量',
    startDate: '2026-01-01',
    endDate: '2026-01-30',
    dailyGoal: '完成当日俯卧撑次数'
  }

  const handleJoin = () => {
    setJoined(true)
    alert('成功加入挑战！')
  }

  const handleLogProgress = (day: number) => {
    if (!progress.includes(day)) {
      setProgress([...progress, day])
    }
  }

  return (
    <Layout>
      <Head>
        <title>{challenge.title} - 健身挑战追踪器</title>
      </Head>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">{challenge.title}</h2>
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                challenge.difficulty === 'easy' ? 'bg-green-100 text-green-800' : 
                challenge.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' : 
                'bg-red-100 text-red-800'
              }`}>
                {challenge.difficulty === 'easy' ? '简单' : challenge.difficulty === 'medium' ? '中等' : '困难'}
              </span>
            </div>
            
            {!joined ? (
              <button
                onClick={handleJoin}
                className="bg-primary-600 text-white px-6 py-3 rounded-md hover:bg-primary-700 transition"
              >
                加入挑战
              </button>
            ) : (
              <span className="bg-green-100 text-green-800 px-4 py-2 rounded-md font-medium">
                已加入 ✓
              </span>
            )}
          </div>
          
          <p className="text-gray-600 mb-6">{challenge.description}</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-50 p-4 rounded-md">
              <div className="text-sm text-gray-500">持续时间</div>
              <div className="text-xl font-semibold">{challenge.duration}天</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-md">
              <div className="text-sm text-gray-500">参与人数</div>
              <div className="text-xl font-semibold">{challenge.participants}</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-md">
              <div className="text-sm text-gray-500">开始日期</div>
              <div className="text-xl font-semibold">{challenge.startDate}</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-md">
              <div className="text-sm text-gray-500">结束日期</div>
              <div className="text-xl font-semibold">{challenge.endDate}</div>
            </div>
          </div>

          <div className="bg-primary-50 p-4 rounded-md">
            <h3 className="font-semibold text-primary-800 mb-2">每日目标</h3>
            <p className="text-primary-700">{challenge.dailyGoal}</p>
          </div>
        </div>

        {joined && (
          <div className="bg-white rounded-lg shadow-md p-8">
            <h3 className="text-2xl font-semibold mb-6">进度追踪</h3>
            <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
              {Array.from({ length: challenge.duration }, (_, i) => i + 1).map(day => (
                <button
                  key={day}
                  onClick={() => handleLogProgress(day)}
                  className={`p-2 rounded-md text-center ${
                    progress.includes(day) 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                已完成 {progress.length} / {challenge.duration} 天 ({Math.round(progress.length / challenge.duration * 100)}%)
              </p>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}
