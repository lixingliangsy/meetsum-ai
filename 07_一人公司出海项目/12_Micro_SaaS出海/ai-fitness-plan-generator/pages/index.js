import React from 'react'
import Head from 'next/head'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>AI Fitness Plan Generator - AI健身计划生成器</title>
        <meta name="description" content="基于AI的个性化健身计划生成器" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <header className="bg-green-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">AI Fitness Plan Generator</h1>
          <p className="mt-2 text-green-100">个性化健身计划生成器</p>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">AI驱动的个性化健身计划</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            根据您的目标、水平和可用设备，生成专属健身计划
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold mb-2">个性化定制</h3>
            <p className="text-gray-600">根据您的需求生成专属计划</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-semibold mb-2">AI驱动</h3>
            <p className="text-gray-600">基于先进的AI技术生成计划</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-2">全面方案</h3>
            <p className="text-gray-600">包含训练、饮食等全方位指导</p>
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
          <p className="text-center">&copy; 2026 AI Fitness Plan Generator. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
