import React from 'react'
import Head from 'next/head'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>SciFigure Pro - 科研图表生成器</title>
        <meta name="description" content="专业的科研图表生成工具" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <header className="bg-blue-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">SciFigure Pro</h1>
          <p className="mt-2 text-blue-100">科研图表生成器</p>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">生成专业的科研图表</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            专为科研人员设计的图表生成工具，创建符合发表标准的科研图表
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-2">专业图表</h3>
            <p className="text-gray-600">生成符合期刊要求的图表</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-4">🎨</div>
            <h3 className="text-xl font-semibold mb-2">精美设计</h3>
            <p className="text-gray-600">美观的图表设计</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-4">📐</div>
            <h3 className="text-xl font-semibold mb-2">精确控制</h3>
            <p className="text-gray-600">精确控制图表参数</p>
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
          <p className="text-center">&copy; 2026 SciFigure Pro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
