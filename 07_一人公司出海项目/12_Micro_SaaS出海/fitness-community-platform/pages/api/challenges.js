const challenges = [];

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { status } = req.query;
    
    let filtered = challenges;
    if (status) {
      filtered = filtered.filter(c => c.status === status);
    }
    
    res.status(200).json({ 
      success: true, 
      challenges: filtered,
      count: filtered.length 
    });
  } else if (req.method === 'POST') {
    const { 
      creatorId,
      title, 
      description, 
      startDate,
      endDate,
      goal 
    } = req.body;
    
    if (!creatorId || !title || !startDate || !endDate) {
      return res.status(400).json({ 
        success: false, 
        error: 'Creator ID, title, start date, and end date are required' 
      });
    }
    
    const challenge = {
      id: challenges.length + 1,
      creatorId,
      title,
      description: description || '',
      startDate,
      endDate,
      goal: goal || '',
      participants: [creatorId],
      status: 'active',
      createdAt: new Date().toISOString()
    };
    
    challenges.push(challenge);
    
    res.status(201).json({ 
      success: true, 
      challenge,
      message: 'Challenge created successfully' 
    });
  } else if (req.method === 'PUT') {
    const { id, action, userId } = req.body;
    
    if (!id || !action || !userId) {
      return res.status(400).json({ 
        success: false, 
        error: 'Challenge ID, action, and user ID are required' 
      });
    }
    
    const index = challenges.findIndex(c => c.id === parseInt(id));
    if (index === -1) {
      return res.status(404).json({ 
        success: false, 
        error: 'Challenge not found' 
      });
    }
    
    if (action === 'join') {
      if (!challenges[index].participants.includes(userId)) {
        challenges[index].participants.push(userId);
      }
    } else if (action === 'leave') {
      challenges[index].participants = challenges[index].participants.filter(p => p !== userId);
    }
    
    res.status(200).json({ 
      success: true, 
      challenge: challenges[index],
      message: 'Challenge updated successfully' 
    });
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}