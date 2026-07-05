import React from 'react'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-primary-600">
                🎮 健身游戏化平台
              </h1>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href="#profile" className="text-gray-600 hover:text-primary-600">
                我的档案
              </a>
              <a href="#challenges" className="text-gray-600 hover:text-primary-600">
                挑战任务
              </a>
              <a href="#badges" className="text-gray-600 hover:text-primary-600">
                徽章成就
              </a>
              <a href="#leaderboard" className="text-gray-600 hover:text-primary-600">
                排行榜
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            <a href="/terms.html" className="text-gray-600 hover:text-primary-600">Terms</a>
            <a href="/privacy.html" className="text-gray-600 hover:text-primary-600">Privacy</a>
            <a href="/pricing.html" className="text-gray-600 hover:text-primary-600">Pricing</a>
            <a href="/support.html" className="text-gray-600 hover:text-primary-600">Support</a>
            <a href="/refund-policy.html" className="text-gray-600 hover:text-primary-600">Refund Policy</a>
          </div>
          <p className="text-center text-gray-500 text-sm">
            © 2024 健身游戏化平台 - 让健身变得有趣
          </p>
        </div>
      </footer>
    </div>
  )
}
