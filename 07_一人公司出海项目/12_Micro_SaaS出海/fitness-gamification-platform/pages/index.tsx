import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import UserProfile from '../components/UserProfile'
import ChallengeList from '../components/ChallengeList'
import BadgeCollection from '../components/BadgeCollection'
import Leaderboard from '../components/Leaderboard'
import { UserProfile as UserProfileType, Badge, Challenge, UserChallenge, LeaderboardEntry } from '../types'

export default function Home() {
  const [user, setUser] = useState<UserProfileType | null>(null)
  const [badges, setBadges] = useState<Badge[]>([])
  const [challenges, setChallenges] = useState<Challenge[]>([])
  const [userChallenges, setUserChallenges] = useState<UserChallenge[]>([])
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      const [userRes, badgesRes, challengesRes, leaderboardRes] = await Promise.all([
        fetch('/api/user?userId=user-001'),
        fetch('/api/badges?userId=user-001'),
        fetch('/api/challenges?userId=user-001'),
        fetch('/api/leaderboard'),
      ])

      if (!userRes.ok || !badgesRes.ok || !challengesRes.ok || !leaderboardRes.ok) {
        throw new Error('Failed to fetch data')
      }

      const [userData, badgesData, challengesData, leaderboardData] = await Promise.all([
        userRes.json(),
        badgesRes.json(),
        challengesRes.json(),
        leaderboardRes.json(),
      ])

      setUser(userData)
      setBadges(badgesData)
      setChallenges(challengesData.challenges || [])
      setUserChallenges(challengesData.userChallenges || [])
      setLeaderboard(leaderboardData)
    } catch (error) {
      console.error('Error fetching data:', error)
      setError('加载数据失败，请刷新页面重试')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCompleteChallenge = async (challengeId: string) => {
    try {
      const response = await fetch('/api/challenges', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          challengeId,
          userId: 'user-001' 
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to complete challenge')
      }

      const data = await response.json()
      
      // 更新挑战列表
      setChallenges(data.challenges || [])
      setUserChallenges(data.userChallenges || [])
      
      // 刷新用户数据（积分已更新）
      const userRes = await fetch('/api/user?userId=user-001')
      if (userRes.ok) {
        const userData = await userRes.json()
        setUser(userData)
      }
      
      // 刷新排行榜
      const leaderboardRes = await fetch('/api/leaderboard')
      if (leaderboardRes.ok) {
        const leaderboardData = await leaderboardRes.json()
        setLeaderboard(leaderboardData)
      }
      
      // 刷新徽章（可能解锁新徽章）
      const badgesRes = await fetch('/api/badges?userId=user-001')
      if (badgesRes.ok) {
        const badgesData = await badgesRes.json()
        setBadges(badgesData)
      }
      
      alert(`挑战完成！获得 ${data.pointsEarned || 0} 积分`)
    } catch (error) {
      console.error('Error completing challenge:', error)
      alert('完成挑战失败，请重试')
    }
  }

  const handleLogWorkout = async (workoutType: string, duration: number, calories: number) => {
    try {
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          userId: 'user-001',
          workoutType,
          duration,
          calories 
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to log workout')
      }

      const data = await response.json()
      
      // 更新用户数据
      setUser(data.user)
      
      // 刷新排行榜
      const leaderboardRes = await fetch('/api/leaderboard')
      if (leaderboardRes.ok) {
        const leaderboardData = await leaderboardRes.json()
        setLeaderboard(leaderboardData)
      }
      
      // 刷新徽章（可能解锁新徽章）
      const badgesRes = await fetch('/api/badges?userId=user-001')
      if (badgesRes.ok) {
        const badgesData = await badgesRes.json()
        setBadges(badgesData)
      }
      
      alert(`训练记录成功！获得 ${data.pointsEarned || 0} 积分`)
    } catch (error) {
      console.error('Error logging workout:', error)
      alert('记录训练失败，请重试')
    }
  }

  if (isLoading) {
    return (
      <Layout>
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          <p className="text-gray-600 mt-4">加载中...</p>
        </div>
      </Layout>
    )
  }

  if (error) {
    return (
      <Layout>
        <div className="text-center py-12">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={fetchData}
            className="btn-primary"
          >
            重试
          </button>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div>
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            🎮 让健身变得有趣
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            通过游戏化机制，让健身变成一种习惯。完成挑战、解锁徽章、登上排行榜！
          </p>
        </div>

        {/* User Profile */}
        {user && (
          <div id="profile" className="mb-8">
            <UserProfile user={user} badges={badges} />
          </div>
        )}

        {/* Quick Action: Log Workout */}
        <div className="mb-8 card">
          <h3 className="text-xl font-bold mb-4">📝 记录训练</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button 
              onClick={() => handleLogWorkout('strength', 1800, 200)}
              className="btn-primary"
            >
              💪 力量训练 (30分钟)
            </button>
            <button 
              onClick={() => handleLogWorkout('running', 1200, 300)}
              className="btn-primary"
            >
              🏃 跑步 (20分钟)
            </button>
            <button 
              onClick={() => handleLogWorkout('yoga', 2400, 150)}
              className="btn-primary"
            >
              🧘 瑜伽 (40分钟)
            </button>
          </div>
        </div>

        {/* Features Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="card text-center">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold mb-2">挑战任务</h3>
            <p className="text-gray-600">
              完成每日、每周、每月挑战，获得积分奖励
            </p>
          </div>
          <div className="card text-center">
            <div className="text-4xl mb-4">🏅</div>
            <h3 className="text-xl font-semibold mb-2">徽章成就</h3>
            <p className="text-gray-600">
              解锁各种成就徽章，展示你的健身历程
            </p>
          </div>
          <div className="card text-center">
            <div className="text-4xl mb-4">🏆</div>
            <h3 className="text-xl font-semibold mb-2">排行榜</h3>
            <p className="text-gray-600">
              与好友竞争，登上排行榜顶端
            </p>
          </div>
        </div>

        {/* Challenges */}
        <div id="challenges" className="mb-8">
          <ChallengeList
            challenges={challenges}
            userChallenges={userChallenges}
            onCompleteChallenge={handleCompleteChallenge}
          />
        </div>

        {/* Badges */}
        <div id="badges" className="mb-8">
          <BadgeCollection badges={badges} />
        </div>

        {/* Leaderboard */}
        <div id="leaderboard" className="mb-8">
          <Leaderboard
            entries={leaderboard}
            currentUserId={user?.id || ''}
          />
        </div>

        {/* How It Works */}
        <div className="mt-12 card">
          <h2 className="text-2xl font-bold mb-6">如何玩转健身游戏化</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-primary-500 text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-lg font-semibold mb-2">完成训练</h3>
              <p className="text-gray-600">
                完成每日训练，获得积分和经验
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary-500 text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-lg font-semibold mb-2">挑战任务</h3>
              <p className="text-gray-600">
                接受挑战任务，获得额外奖励
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary-500 text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-lg font-semibold mb-2">解锁徽章</h3>
              <p className="text-gray-600">
                达成成就，解锁专属徽章
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary-500 text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="text-lg font-semibold mb-2">登上榜首</h3>
              <p className="text-gray-600">
                积累积分，登上排行榜顶端
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
