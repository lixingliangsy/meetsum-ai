import React, { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-primary-600">
              ArticleSumm Pro
            </h1>
            <nav className="flex gap-4">
              <a href="/" className="text-gray-600 hover:text-primary-600">
                首页
              </a>
              <a href="#features" className="text-gray-600 hover:text-primary-600">
                功能
              </a>
              <a href="#pricing" className="text-gray-600 hover:text-primary-600">
                定价
              </a>
            </nav>
          </div>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      
      <footer className="bg-gray-800 text-white mt-auto">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">ArticleSumm Pro</h3>
              <p className="text-gray-400">
                AI驱动的文章摘要工具，帮助研究人员和学生快速理解长篇文献
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">功能</h3>
              <ul className="space-y-2 text-gray-400">
                <li>文章摘要</li>
                <li>关键要点提取</li>
                <li>问答系统</li>
                <li>引用生成</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">联系</h3>
              <p className="text-gray-400">
                如有问题或建议，请联系我们
              </p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <div className="flex flex-wrap justify-center gap-4 mb-4">
              <a href="/terms.html" className="text-gray-400 hover:text-white">Terms</a>
              <a href="/privacy.html" className="text-gray-400 hover:text-white">Privacy</a>
              <a href="/refund-policy.html" className="text-gray-400 hover:text-white">Refund Policy</a>
              <a href="/pricing.html" className="text-gray-400 hover:text-white">Pricing</a>
              <a href="/support.html" className="text-gray-400 hover:text-white">Support</a>
            </div>
            <p>&copy; 2026 ArticleSumm Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout
