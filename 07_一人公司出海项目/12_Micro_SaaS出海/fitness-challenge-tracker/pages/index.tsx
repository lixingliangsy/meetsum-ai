import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/Layout'

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>健身挑战追踪器 - 创建和追踪健身挑战</title>
        <meta name="description" content="创建和追踪健身挑战，与朋友一起健身，让健身更有趣" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          让健身变得有趣
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          创建或加入健身挑战，追踪进度，与朋友一起保持健康的生活方式
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className="text-4xl mb-4">🎯</div>
          <h3 className="text-xl font-semibold mb-2">创建挑战</h3>
          <p className="text-gray-600">
            创建自定义健身挑战，设置目标和规则
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className="text-4xl mb-4">📊</div>
          <h3 className="text-xl font-semibold mb-2">追踪进度</h3>
          <p className="text-gray-600">
            记录每日进度，查看完成情况和统计
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className="text-4xl mb-4">🏆</div>
          <h3 className="text-xl font-semibold mb-2">赢得奖励</h3>
          <p className="text-gray-600">
            完成挑战，获得成就徽章和奖励
          </p>
        </div>
      </div>

      <div className="text-center">
        <Link href="/challenges" className="bg-primary-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-primary-700 transition inline-block mr-4">
          浏览挑战
        </Link>
        <Link href="/create" className="bg-secondary-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-secondary-700 transition inline-block">
          创建挑战
        </Link>
      </div>
    </Layout>
  )
}
