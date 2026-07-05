import React from 'react'
import Head from 'next/head'
import Layout from '../components/Layout'
import Summarizer from '../components/Summarizer'

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>ArticleSumm Pro - AI文章摘要工具</title>
        <meta name="description" content="AI驱动的文章摘要工具，支持PDF/URL/文本摘要、关键要点提取、引用生成" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          ArticleSumm Pro
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          智能文章摘要工具，帮助研究人员和学生快速理解长篇文献
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <span className="inline-block bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">
            ✅ 支持PDF
          </span>
          <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
            ✅ 支持URL
          </span>
          <span className="inline-block bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded-full">
            ✅ 支持文本
          </span>
          <span className="inline-block bg-yellow-100 text-yellow-800 text-sm px-3 py-1 rounded-full">
            ✅ Mock模式
          </span>
        </div>
      </div>

      <Summarizer />

      {/* 功能介绍 */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-4xl mb-4">📄</div>
          <h3 className="text-xl font-semibold mb-2">多格式支持</h3>
          <p className="text-gray-600">
            支持PDF、URL和纯文本输入，自动解析内容
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-4xl mb-4">🎯</div>
          <h3 className="text-xl font-semibold mb-2">关键要点</h3>
          <p className="text-gray-600">
            自动提取文章关键发现和结论
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-4xl mb-4">📚</div>
          <h3 className="text-xl font-semibold mb-2">引用生成</h3>
          <p className="text-gray-600">
            自动生成APA、MLA、Chicago、BibTeX格式引用
          </p>
        </div>
      </div>
    </Layout>
  )
}
