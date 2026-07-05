import React from 'react'
import Head from 'next/head'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Fitness Community Platform - 健身社区平台</title>
        <meta name="description" content="健身社区平台，连接健身爱好者" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <header className="bg-teal-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">Fitness Community Platform</h1>
          <p className="mt-2 text-teal-100">健身社区平台</p>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">连接健身爱好者</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            加入健身社区，分享经验，互相鼓励，一起达成健身目标
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-4">👥</div>
            <h3 className="text-xl font-semibold mb-2">社区交流</h3>
            <p className="text-gray-600">与志同道合的健身爱好者交流</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-4">📸</div>
            <h3 className="text-xl font-semibold mb-2">分享进展</h3>
            <p className="text-gray-600">分享你的健身进展和成果</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-4">💪</div>
            <h3 className="text-xl font-semibold mb-2">互相鼓励</h3>
            <p className="text-gray-600">获得社区的支持和鼓励</p>
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
          <p className="text-center">&copy; 2026 Fitness Community Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
