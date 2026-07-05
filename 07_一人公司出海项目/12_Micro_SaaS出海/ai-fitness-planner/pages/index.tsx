import React from 'react'
import Head from 'next/head'
import Layout from '../components/Layout'
import PlanGenerator from '../components/PlanGenerator'

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>AI健身计划生成器 - 个性化健身计划</title>
        <meta name="description" content="基于AI的个性化健身计划生成器，根据您的目标、水平和可用设备生成专属健身计划" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          智能生成您的专属健身计划
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          只需填写简单信息，AI将为您生成个性化的健身计划，包括训练安排、具体动作、饮食建议等
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className="text-4xl mb-4">🎯</div>
          <h3 className="text-xl font-semibold mb-2">个性化定制</h3>
          <p className="text-gray-600">
            根据您的目标、水平、可用时间和设备生成专属计划
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className="text-4xl mb-4">🤖</div>
          <h3 className="text-xl font-semibold mb-2">AI驱动</h3>
          <p className="text-gray-600">
            基于先进的AI技术，生成科学有效的健身计划
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className="text-4xl mb-4">📊</div>
          <h3 className="text-xl font-semibold mb-2">全面方案</h3>
          <p className="text-gray-600">
            包含训练、饮食、恢复等全方位的健身指导
          </p>
        </div>
      </div>

      <PlanGenerator />
    </Layout>
  )
}
