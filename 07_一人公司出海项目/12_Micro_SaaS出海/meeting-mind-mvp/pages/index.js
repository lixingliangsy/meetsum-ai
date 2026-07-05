import React from 'react'
import Head from 'next/head'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Meeting Mind - 会议管理工具</title>
        <meta name="description" content="智能会议管理工具，提升会议效率" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <header className="bg-cyan-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">Meeting Mind</h1>
          <p className="mt-2 text-cyan-100">智能会议管理工具</p>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">提升会议效率</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            智能会议管理工具，帮助您规划、执行和总结会议
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-4">📋</div>
            <h3 className="text-xl font-semibold mb-2">会议规划</h3>
            <p className="text-gray-600">智能规划会议议程</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-4">⏱️</div>
            <h3 className="text-xl font-semibold mb-2">时间管理</h3>
            <p className="text-gray-600">有效控制会议时间</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-4">📝</div>
            <h3 className="text-xl font-semibold mb-2">会议总结</h3>
            <p className="text-gray-600">自动生成会议纪要</p>
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
          <p className="text-center">&copy; 2026 Meeting Mind. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
