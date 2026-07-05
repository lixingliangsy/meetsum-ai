export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { exerciseId, muscle } = req.query;
    
    // Video database (in a real app, would integrate with YouTube API)
    const videos = [
      { id: 1, exerciseId: 1, title: 'Push-ups Tutorial', url: 'https://youtube.com/watch?v=IODxDxX7oi4', muscle: 'Chest' },
      { id: 2, exerciseId: 2, title: 'Pull-ups Tutorial', url: 'https://youtube.com/watch?v=eGoSPeSleQs', muscle: 'Back' },
      { id: 3, exerciseId: 3, title: 'Squats Tutorial', url: 'https://youtube.com/watch?v=aclHkVaku9U', muscle: 'Legs' },
      { id: 4, exerciseId: 4, title: 'Deadlifts Tutorial', url: 'https://youtube.com/watch?v=r4MyrmcfXo', muscle: 'Back' },
      { id: 5, exerciseId: 5, title: 'Bench Press Tutorial', url: 'https://youtube.com/watch?v=rT7DgCr-UO', muscle: 'Chest' }
    ];
    
    let filtered = videos;
    if (exerciseId) {
      filtered = filtered.filter(v => v.exerciseId === parseInt(exerciseId));
    }
    if (muscle) {
      filtered = filtered.filter(v => v.muscle.toLowerCase() === muscle.toLowerCase());
    }
    
    res.status(200).json({ 
      success: true, 
      videos: filtered,
      count: filtered.length 
    });
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}