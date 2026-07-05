import React from 'react'
import Head from 'next/head'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>AI Changelog - 智能更新日志</title>
        <meta name="description" content="AI驱动的更新日志工具，自动追踪和生成软件更新日志" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <header className="bg-indigo-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">AI Changelog</h1>
          <p className="mt-2 text-indigo-100">智能更新日志工具</p>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">自动追踪和生成软件更新日志</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            基于AI技术，自动分析代码变更，生成清晰、专业的更新日志
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-2">自动追踪</h3>
            <p className="text-gray-600">自动追踪代码变更，无需手动维护</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-4">🎨</div>
            <h3 className="text-xl font-semibold mb-2">美观展示</h3>
            <p className="text-gray-600">生成美观的更新日志页面</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-4">🔄</div>
            <h3 className="text-xl font-semibold mb-2">持续更新</h3>
            <p className="text-gray-600">与您的开发流程无缝集成</p>
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
          <p className="text-center">&copy; 2026 AI Changelog. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
