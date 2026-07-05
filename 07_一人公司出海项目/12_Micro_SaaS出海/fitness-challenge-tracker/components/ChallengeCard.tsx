import React from 'react'
import Link from 'next/link'

interface Challenge {
  id: string
  title: string
  description: string
  duration: number
  participants: number
  difficulty: string
  category: string
}

interface ChallengeCardProps {
  challenge: Challenge
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenge }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'hard': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <Link href={`/challenge/${challenge.id}`}>
      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition cursor-pointer">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-gray-800">{challenge.title}</h3>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(challenge.difficulty)}`}>
            {challenge.difficulty === 'easy' ? '简单' : challenge.difficulty === 'medium' ? '中等' : '困难'}
          </span>
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-2">{challenge.description}</p>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <span>📅 {challenge.duration}天</span>
            <span>👥 {challenge.participants}人参与</span>
          </div>
          <span className="bg-primary-100 text-primary-800 px-2 py-1 rounded">
            {challenge.category}
          </span>
        </div>
      </div>
    </Link>
  )
}

export default ChallengeCard
