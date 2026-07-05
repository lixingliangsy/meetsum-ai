// pages/api/social.js
// 社交分享 API - 分享挑战进度，邀请朋友参与

export default function handler(req, res) {
  if (req.method === 'GET') {
    // 获取挑战的社交动态
    const { challengeId } = req.query

    if (!challengeId) {
      return res.status(400).json({ error: 'Missing challengeId' })
    }

    // 模拟：获取社交动态
    const feed = getSocialFeed(challengeId)

    return res.status(200).json(feed)
  }

  if (req.method === 'POST') {
    const { action } = req.query
    const { userId, challengeId, data } = req.body

    if (!action) {
      return res.status(400).json({ error: 'Missing action' })
    }

    let result = null

    switch (action) {
      case 'invite':
        // 邀请朋友参与挑战
        result = inviteFriend(userId, challengeId, data.email)
        break

      case 'share':
        // 分享进度到社交平台
        result = shareProgress(userId, challengeId, data.platform)
        break

      case 'comment':
        // 添加评论
        result = addComment(userId, challengeId, data.comment)
        break

      case 'like':
        // 点赞
        result = likePost(userId, data.postId)
        break

      default:
        return res.status(400).json({ error: 'Invalid action' })
    }

    return res.status(200).json(result)
  }

  return res.status(405).json({ error: 'Method not allowed' })
}

// 获取社交动态
function getSocialFeed(challengeId) {
  // 模拟社交动态
  const mockFeed = {
    challengeId: challengeId,
    participants: 156,
    posts: [
      {
        id: '1',
        userId: 'user-123',
        userName: '张三',
        userAvatar: '/avatars/1.png',
        type: 'progress_update',
        content: '今天完成了第12天！感觉越来越强壮了💪',
        day: 12,
        image: '/uploads/progress-12.jpg',
        likes: 24,
        comments: 5,
        createdAt: '2026-01-27T10:30:00Z',
      },
      {
        id: '2',
        userId: 'user-456',
        userName: '李四',
        userAvatar: '/avatars/2.png',
        type: 'milestone',
        content: '完成了第一个里程碑！连续7天完成挑战🎉',
        milestone: '7天连续',
        likes: 42,
        comments: 8,
        createdAt: '2026-01-26T15:20:00Z',
      },
      {
        id: '3',
        userId: 'user-789',
        userName: '王五',
        userAvatar: '/avatars/3.png',
        type: 'invitation',
        content: '邀请你参加30天俯卧撑挑战！一起来吧💪',
        inviteLink: '/challenge/1?ref=user-789',
        likes: 12,
        comments: 3,
        createdAt: '2026-01-25T09:15:00Z',
      },
    ],
    leaderboard: [
      { rank: 1, userId: 'user-123', userName: '张三', completedDays: 12, streak: 5 },
      { rank: 2, userId: 'user-456', userName: '李四', completedDays: 10, streak: 3 },
      { rank: 3, userId: 'user-789', userName: '王五', completedDays: 8, streak: 2 },
    ],
  }

  return mockFeed
}

// 邀请朋友
function inviteFriend(userId, challengeId, email) {
  // 模拟：发送邀请邮件
  console.log(`Inviting ${email} to challenge ${challengeId} by user ${userId}`)

  return {
    success: true,
    invitation: {
      id: Date.now().toString(),
      userId: userId,
      challengeId: challengeId,
      email: email,
      sentAt: new Date().toISOString(),
    }
  }
}

// 分享进度
function shareProgress(userId, challengeId, platform) {
  // 模拟：生成分享链接
  const shareLink = generateShareLink(userId, challengeId, platform)

  return {
    success: true,
    shareLink: shareLink,
    platform: platform,
  }
}

// 添加评论
function addComment(userId, challengeId, comment) {
  // 模拟：保存评论
  const newComment = {
    id: Date.now().toString(),
    userId: userId,
    challengeId: challengeId,
    content: comment,
    likes: 0,
    createdAt: new Date().toISOString(),
  }

  return {
    success: true,
    comment: newComment,
  }
}

// 点赞
function likePost(userId, postId) {
  // 模拟：点赞帖子
  console.log(`User ${userId} liked post ${postId}`)

  return {
    success: true,
    postId: postId,
    likes: 25, // 更新后的点赞数
  }
}

// 生成分享链接
function generateShareLink(userId, challengeId, platform) {
  const baseUrl = 'https://fitness-challenge-tracker.com'
  const shareUrls = {
    'twitter': `https://twitter.com/intent/tweet?text=Check out my fitness challenge!&url=${baseUrl}/challenge/${challengeId}`,
    'facebook': `https://www.facebook.com/sharer/sharer.php?u=${baseUrl}/challenge/${challengeId}`,
    'linkedin': `https://www.linkedin.com/sharing/share-offsite/?url=${baseUrl}/challenge/${challengeId}`,
    'whatsapp': `https://wa.me/?text=Join me in this fitness challenge! ${baseUrl}/challenge/${challengeId}`,
  }

  return shareUrls[platform] || `${baseUrl}/challenge/${challengeId}?ref=${userId}`
}
