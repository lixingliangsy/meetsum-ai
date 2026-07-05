const clients = [];

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  if (req.method === 'GET') {
    const { trainerId } = req.query;
    
    let filtered = clients;
    if (trainerId) {
      filtered = filtered.filter(c => c.trainerId === trainerId);
    }
    
    res.status(200).json({ 
      success: true, 
      clients: filtered,
      count: filtered.length 
    });
  } else if (req.method === 'POST') {
    const { 
      trainerId,
      name, 
      email, 
      phone, 
      fitnessGoal,
      startDate 
    } = req.body;
    
    if (!trainerId || !name || !email) {
      return res.status(400).json({ 
        success: false, 
        error: 'Trainer ID, name, and email are required' 
      });
    }
    
    const client = {
      id: clients.length + 1,
      trainerId,
      name,
      email,
      phone: phone || '',
      fitnessGoal: fitnessGoal || '',
      startDate: startDate || new Date().toISOString().split('T')[0],
      status: 'active',
      trainingHistory: [],
      progressReports: [],
      createdAt: new Date().toISOString()
    };
    
    clients.push(client);
    
    res.status(201).json({ 
      success: true, 
      client,
      message: 'Client added successfully' 
    });
  } else if (req.method === 'PUT') {
    const { id, status, trainingSession, progressReport } = req.body;
    
    if (!id) {
      return res.status(400).json({ 
        success: false, 
        error: 'Client ID is required' 
      });
    }
    
    const index = clients.findIndex(c => c.id === parseInt(id));
    if (index === -1) {
      return res.status(404).json({ 
        success: false, 
        error: 'Client not found' 
      });
    }
    
    if (status) clients[index].status = status;
    if (trainingSession) {
      clients[index].trainingHistory.push(trainingSession);
    }
    if (progressReport) {
      clients[index].progressReports.push(progressReport);
    }
    
    res.status(200).json({ 
      success: true, 
      client: clients[index],
      message: 'Client updated successfully' 
    });
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}