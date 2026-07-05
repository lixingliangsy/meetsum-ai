const standups = [];

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Get all standup submissions
    const { team, date } = req.query;
    
    let filtered = standups;
    if (team) {
      filtered = filtered.filter(s => s.team === team);
    }
    if (date) {
      filtered = filtered.filter(s => s.date === date);
    }
    
    res.status(200).json({ 
      success: true, 
      standups: filtered,
      count: filtered.length 
    });
  } else if (req.method === 'POST') {
    // Submit a new standup
    const { 
      team, 
      member, 
      yesterday, 
      today, 
      blockers, 
      date 
    } = req.body;
    
    if (!team || !member) {
      return res.status(400).json({ 
        success: false, 
        error: 'Team and member are required' 
      });
    }
    
    const standup = {
      id: standups.length + 1,
      team,
      member,
      yesterday: yesterday || '',
      today: today || '',
      blockers: blockers || '',
      date: date || new Date().toISOString().split('T')[0],
      timestamp: new Date().toISOString()
    };
    
    standups.push(standup);
    
    res.status(201).json({ 
      success: true, 
      standup,
      message: 'Standup submitted successfully' 
    });
  } else if (req.method === 'DELETE') {
    // Delete a standup (admin only)
    const { id } = req.query;
    
    if (!id) {
      return res.status(400).json({ 
        success: false, 
        error: 'Standup ID is required' 
      });
    }
    
    const index = standups.findIndex(s => s.id === parseInt(id));
    if (index === -1) {
      return res.status(404).json({ 
        success: false, 
        error: 'Standup not found' 
      });
    }
    
    standups.splice(index, 1);
    
    res.status(200).json({ 
      success: true, 
      message: 'Standup deleted successfully' 
    });
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
