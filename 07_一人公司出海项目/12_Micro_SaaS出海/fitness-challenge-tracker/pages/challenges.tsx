import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Layout from '../components/Layout'
import ChallengeCard from '../components/ChallengeCard'

interface Challenge {
  id: string
  title: string
  description: string
  duration: number
  participants: number
  difficulty: string
  category: string
}

export default function Challenges() {
  const [challenges, setChallenges] = useState<Challenge[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    // 模拟API调用
    setTimeout(() => {
      setChallenges([
        {
          id: '1',
          title: '30天俯卧撑挑战',
          description: '从每天10个俯卧撑开始，逐步增加到每天100个',
          duration: 30,
          participants: 156,
          difficulty: 'medium',
          category: '力量'
        },
        {
          id: '2',
          title: '30天跑步挑战',
          description: '从每天1公里开始，逐步增加到每天5公里',
          duration: 30,
          participants: 89,
          difficulty: 'easy',
          category: '有氧'
        },
        {
          id: '3',
          title: '30天瑜伽挑战',
          description: '每天15分钟瑜伽，提高柔韧性和平衡性',
          duration: 30,
          participants: 234,
          difficulty: 'easy',
          category: '柔韧性'
        },
        {
          id: '4',
          title: '30天平板支撑挑战',
          description: '从30秒开始，逐步增加到5分钟',
          duration: 30,
          participants: 67,
          difficulty: 'hard',
          category: '核心'
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const filteredChallenges = filter === 'all' 
    ? challenges 
    : challenges.filter(c => c.category === filter)

  return (
    <Layout>
      <Head>
        <title>挑战列表 - 健身挑战追踪器</title>
      </Head>

      <h2 className="text-3xl font-bold text-gray-800 mb-8">健身挑战列表</h2>

      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-md ${filter === 'all' ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          全部
        </button>
        <button
          onClick={() => setFilter('力量')}
          className={`px-4 py-2 rounded-md ${filter === '力量' ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          力量
        </button>
        <button
          onClick={() => setFilter('有氧')}
          className={`px-4 py-2 rounded-md ${filter === '有氧' ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          有氧
        </button>
        <button
          onClick={() => setFilter('柔韧性')}
          className={`px-4 py-2 rounded-md ${filter === '柔韧性' ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          柔韧性
        </button>
        <button
          onClick={() => setFilter('核心')}
          className={`px-4 py-2 rounded-md ${filter === '核心' ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          核心
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          <p className="mt-4 text-gray-600">加载中...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChallenges.map(challenge => (
            <ChallengeCard key={challenge.id} challenge={challenge} />
          ))}
        </div>
      )}
    </Layout>
  )
}
