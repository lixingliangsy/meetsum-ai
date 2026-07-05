const trainingData = [];

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  if (req.method === 'GET') {
    const { userId, startDate, endDate } = req.query;
    
    let filtered = trainingData;
    if (userId) {
      filtered = filtered.filter(d => d.userId === userId);
    }
    if (startDate) {
      filtered = filtered.filter(d => d.date >= startDate);
    }
    if (endDate) {
      filtered = filtered.filter(d => d.date <= endDate);
    }
    
    // Calculate statistics
    const stats = {
      totalWorkouts: filtered.length,
      totalDuration: filtered.reduce((sum, d) => sum + (d.duration || 0), 0),
      totalCalories: filtered.reduce((sum, d) => sum + (d.caloriesBurned || 0), 0),
      averageRating: filtered.length > 0 
        ? filtered.reduce((sum, d) => sum + (d.rating || 0), 0) / filtered.length 
        : 0,
      workoutsByType: {},
      workoutsByMonth: {}
    };
    
    // Group by workout type
    filtered.forEach(d => {
      if (!stats.workoutsByType[d.type]) {
        stats.workoutsByType[d.type] = 0;
      }
      stats.workoutsByType[d.type]++;
    });
    
    // Group by month
    filtered.forEach(d => {
      const month = d.date.substring(0, 7); // YYYY-MM
      if (!stats.workoutsByMonth[month]) {
        stats.workoutsByMonth[month] = 0;
      }
      stats.workoutsByMonth[month]++;
    });
    
    // Trend analysis
    const trend = {
      workoutsTrend: calculateTrend(filtered.map(d => d.date)),
      durationTrend: calculateTrend(filtered.map(d => d.duration || 0)),
      ratingTrend: calculateTrend(filtered.map(d => d.rating || 0))
    };
    
    res.status(200).json({ 
      success: true, 
      data: filtered,
      stats,
      trend,
      count: filtered.length 
    });
  } else if (req.method === 'POST') {
    // Add training data
    const { 
      userId,
      date,
      type,
      duration,
      caloriesBurned,
      rating 
    } = req.body;
    
    if (!userId || !date || !type) {
      return res.status(400).json({ 
        success: false, 
        error: 'User ID, date, and workout type are required' 
      });
    }
    
    const data = {
      id: trainingData.length + 1,
      userId,
      date,
      type,
      duration: duration || 0,
      caloriesBurned: caloriesBurned || 0,
      rating: rating || 0,
      createdAt: new Date().toISOString()
    };
    
    trainingData.push(data);
    
    res.status(201).json({ 
      success: true, 
      data,
      message: 'Training data added successfully' 
    });
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

function calculateTrend(values) {
  if (values.length < 2) return 'stable';
  
  const firstHalf = values.slice(0, Math.floor(values.length / 2));
  const secondHalf = values.slice(Math.floor(values.length / 2));
  
  const firstAvg = firstHalf.reduce((a, b) => a + b, 0) / firstHalf.length;
  const secondAvg = secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length;
  
  const diff = secondAvg - firstAvg;
  const threshold = firstAvg * 0.1; // 10% threshold
  
  if (diff > threshold) return 'increasing';
  if (diff < -threshold) return 'decreasing';
  return 'stable';
}