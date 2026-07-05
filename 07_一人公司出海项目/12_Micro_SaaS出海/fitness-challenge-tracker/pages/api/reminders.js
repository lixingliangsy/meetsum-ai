// pages/api/reminders.js
// 提醒系统 API - 邮件/通知提醒（可选）

export default function handler(req, res) {
  if (req.method === 'GET') {
    // 获取用户的提醒设置
    const { userId } = req.query

    if (!userId) {
      return res.status(400).json({ error: 'Missing userId' })
    }

    // 模拟：获取提醒设置
    const reminders = getReminders(userId)

    return res.status(200).json(reminders)
  }

  if (req.method === 'POST') {
    // 创建新提醒
    const { userId, challengeId, type, time, frequency, enabled } = req.body

    if (!userId || !challengeId || !type || !time) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    // 模拟：保存提醒设置
    const reminder = createReminder(userId, challengeId, type, time, frequency, enabled)

    return res.status(201).json(reminder)
  }

  if (req.method === 'PUT') {
    // 更新提醒设置
    const { reminderId, ...updates } = req.body

    if (!reminderId) {
      return res.status(400).json({ error: 'Missing reminderId' })
    }

    // 模拟：更新提醒
    const result = updateReminder(reminderId, updates)

    return res.status(200).json(result)
  }

  if (req.method === 'DELETE') {
    // 删除提醒
    const { reminderId } = req.query

    if (!reminderId) {
      return res.status(400).json({ error: 'Missing reminderId' })
    }

    // 模拟：删除提醒
    const result = deleteReminder(reminderId)

    return res.status(200).json(result)
  }

  return res.status(405).json({ error: 'Method not allowed' })
}

// 获取提醒设置
function getReminders(userId) {
  // 模拟提醒数据
  const mockReminders = {
    userId: userId,
    reminders: [
      {
        id: 'rem-001',
        challengeId: '1',
        challengeTitle: '30天俯卧撑挑战',
        type: 'email', // email, push, sms
        time: '08:00',
        frequency: 'daily', // daily, weekly, custom
        enabled: true,
        lastSent: '2026-01-27T08:00:00Z',
        createdAt: '2026-01-14T10:00:00Z',
      },
      {
        id: 'rem-002',
        challengeId: '2',
        challengeTitle: '30天跑步挑战',
        type: 'push',
        time: '18:00',
        frequency: 'daily',
        enabled: true,
        lastSent: '2026-01-27T18:00:00Z',
        createdAt: '2026-01-14T10:00:00Z',
      },
    ],
    settings: {
      globalEnabled: true,
      quietHours: {
        enabled: true,
        start: '22:00',
        end: '07:00',
      },
      timezone: 'Asia/Shanghai',
    }
  }

  return mockReminders
}

// 创建提醒
function createReminder(userId, challengeId, type, time, frequency, enabled) {
  // 模拟：保存到数据库
  const newReminder = {
    id: `rem-${Date.now()}`,
    userId: userId,
    challengeId: challengeId,
    type: type, // email, push, sms
    time: time,
    frequency: frequency || 'daily',
    enabled: enabled !== false,
    lastSent: null,
    createdAt: new Date().toISOString(),
  }

  console.log('Created reminder:', newReminder)

  return {
    success: true,
    reminder: newReminder,
  }
}

// 更新提醒
function updateReminder(reminderId, updates) {
  // 模拟：更新数据库
  console.log(`Updating reminder ${reminderId}:`, updates)

  return {
    success: true,
    reminder: {
      id: reminderId,
      ...updates,
      updatedAt: new Date().toISOString(),
    }
  }
}

// 删除提醒
function deleteReminder(reminderId) {
  // 模拟：从数据库删除
  console.log(`Deleting reminder ${reminderId}`)

  return {
    success: true,
    message: 'Reminder deleted successfully',
  }
}
