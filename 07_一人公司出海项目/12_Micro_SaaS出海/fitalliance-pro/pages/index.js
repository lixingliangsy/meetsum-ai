import React from 'react'
import Head from 'next/head'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>FitAlliance Pro - 健身联盟专业版</title>
        <meta name="description" content="健身联盟平台，连接教练和学员" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <header className="bg-orange-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">FitAlliance Pro</h1>
          <p className="mt-2 text-orange-100">健身联盟平台</p>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">连接教练和学员的健身平台</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            专业的健身管理平台，帮助教练管理学员，追踪训练进度
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-4">👥</div>
            <h3 className="text-xl font-semibold mb-2">学员管理</h3>
            <p className="text-gray-600">轻松管理所有学员信息</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-2">进度追踪</h3>
            <p className="text-gray-600">实时追踪学员训练进度</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-4">📈</div>
            <h3 className="text-xl font-semibold mb-2">数据分析</h3>
            <p className="text-gray-600">生成专业的训练报告</p>
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
          </div>
          <p className="text-center">&copy; 2026 FitAlliance Pro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
