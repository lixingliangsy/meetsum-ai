import React from 'react'
import Head from 'next/head'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>ResumeForge - 专业简历生成器</title>
        <meta name="description" content="AI驱动的简历生成器，创建专业简历" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <header className="bg-red-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">ResumeForge</h1>
          <p className="mt-2 text-red-100">专业简历生成器</p>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">创建专业简历</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            AI驱动的简历生成器，帮助您创建专业的简历，获得更多面试机会
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-4">📄</div>
            <h3 className="text-xl font-semibold mb-2">专业模板</h3>
            <p className="text-gray-600">多种专业简历模板可选</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-semibold mb-2">AI优化</h3>
            <p className="text-gray-600">AI智能优化简历内容</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-4">📧</div>
            <h3 className="text-xl font-semibold mb-2">一键导出</h3>
            <p className="text-gray-600">导出PDF，轻松分享</p>
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
          <p className="text-center">&copy; 2026 ResumeForge. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
