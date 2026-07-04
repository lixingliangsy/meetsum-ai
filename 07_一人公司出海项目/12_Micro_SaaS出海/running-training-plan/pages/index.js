import React from 'react'
import Head from 'next/head'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Running Training Plan - 跑步训练计划</title>
        <meta name="description" content="个性化跑步训练计划生成器" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <header className="bg-green-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">Running Training Plan</h1>
          <p className="mt-2 text-green-100">跑步训练计划生成器</p>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">个性化跑步训练计划</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            根据您的目标、水平和时间安排，生成专属跑步训练计划
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <a href="/generate" className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow cursor-pointer block">
            <div className="text-4xl mb-4">🏃</div>
            <h3 className="text-xl font-semibold mb-2">生成训练计划</h3>
            <p className="text-gray-600">根据您的情况生成专属计划</p>
          </a>

          <a href="/upload" className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow cursor-pointer block">
            <div className="text-4xl mb-4">📁</div>
            <h3 className="text-xl font-semibold mb-2">上传跑步数据</h3>
            <p className="text-gray-600">支持 GPX/TCX 格式解析</p>
          </a>

          <a href="/progress" className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow cursor-pointer block">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-2">进度追踪</h3>
            <p className="text-gray-600">查看训练进度和数据分析</p>
          </a>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md mb-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">功能特色</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <div className="text-3xl">🎯</div>
              <div>
                <h4 className="font-semibold text-lg mb-1">个性化训练计划</h4>
                <p className="text-gray-600">根据您的目标（5K/10K/半马/全马）、体能水平和时间安排，智能生成训练计划</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="text-3xl">📊</div>
              <div>
                <h4 className="font-semibold text-lg mb-1">数据可视化</h4>
                <p className="text-gray-600">直观的图表展示您的训练进度、配速趋势和心率数据</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="text-3xl">📁</div>
              <div>
                <h4 className="font-semibold text-lg mb-1">GPS 数据解析</h4>
                <p className="text-gray-600">支持上传 GPX 和 TCX 格式的跑步数据，自动解析轨迹和统计数据</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="text-3xl">💡</div>
              <div>
                <h4 className="font-semibold text-lg mb-1">智能建议</h4>
                <p className="text-gray-600">根据您的训练情况，提供个性化的训练建议和注意事项</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-800 text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            <a href="/terms.html" className="text-gray-300 hover:text-white">Terms</a>
            <a href="/privacy.html" className="text-gray-300 hover:text-white">Privacy</a>
            <a href="/pricing.html" className="text-gray-300 hover:text-white">Pricing</a>
            <a href="/support.html" className="text-gray-300 hover:text-white">Support</a>
            <a href="/refund-policy.html" className="text-gray-300 hover:text-white">Refund Policy</a>
          </div>
          <p className="text-center">&copy; 2026 Running Training Plan. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
