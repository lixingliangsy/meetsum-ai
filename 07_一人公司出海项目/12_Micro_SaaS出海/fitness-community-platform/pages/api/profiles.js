const profiles = [];

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { userId } = req.query;
    
    let filtered = profiles;
    if (userId) {
      filtered = filtered.filter(p => p.userId === userId);
    }
    
    res.status(200).json({ 
      success: true, 
      profiles: filtered,
      count: filtered.length 
    });
  } else if (req.method === 'POST') {
    const { 
      userId,
      name, 
      bio, 
      fitnessGoals, 
      achievements 
    } = req.body;
    
    if (!userId || !name) {
      return res.status(400).json({ 
        success: false, 
        error: 'User ID and name are required' 
      });
    }
    
    const profile = {
      id: profiles.length + 1,
      userId,
      name,
      bio: bio || '',
      fitnessGoals: fitnessGoals || [],
      achievements: achievements || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    profiles.push(profile);
    
    res.status(201).json({ 
      success: true, 
      profile,
      message: 'Profile created successfully' 
    });
  } else if (req.method === 'PUT') {
    const { id, name, bio, fitnessGoals, achievements } = req.body;
    
    if (!id) {
      return res.status(400).json({ 
        success: false, 
        error: 'Profile ID is required' 
      });
    }
    
    const index = profiles.findIndex(p => p.id === parseInt(id));
    if (index === -1) {
      return res.status(404).json({ 
        success: false, 
        error: 'Profile not found' 
      });
    }
    
    if (name) profiles[index].name = name;
    if (bio !== undefined) profiles[index].bio = bio;
    if (fitnessGoals) profiles[index].fitnessGoals = fitnessGoals;
    if (achievements) profiles[index].achievements = achievements;
    profiles[index].updatedAt = new Date().toISOString();
    
    res.status(200).json({ 
      success: true, 
      profile: profiles[index],
      message: 'Profile updated successfully' 
    });
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}