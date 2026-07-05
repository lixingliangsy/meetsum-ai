// Exercise database
const exercises = [
  { id: 1, name: 'Push-ups', muscle: 'Chest', difficulty: 'Beginner', equipment: 'None', videoUrl: 'https://youtube.com/watch?v=IODxDxX7oi4' },
  { id: 2, name: 'Pull-ups', muscle: 'Back', difficulty: 'Intermediate', equipment: 'Pull-up bar', videoUrl: 'https://youtube.com/watch?v=eGoSPeSleQs' },
  { id: 3, name: 'Squats', muscle: 'Legs', difficulty: 'Beginner', equipment: 'None', videoUrl: 'https://youtube.com/watch?v=aclHkVaku9U' },
  { id: 4, name: 'Deadlifts', muscle: 'Back', difficulty: 'Advanced', equipment: 'Barbell', videoUrl: 'https://youtube.com/watch?v=r4MyrmcfXo' },
  { id: 5, name: 'Bench Press', muscle: 'Chest', difficulty: 'Intermediate', equipment: 'Barbell', videoUrl: 'https://youtube.com/watch?v=rT7DgCr-UO' },
  { id: 6, name: 'Overhead Press', muscle: 'Shoulders', difficulty: 'Intermediate', equipment: 'Barbell', videoUrl: 'https://youtube.com/watch?v=2yjwXTZQDDU' },
  { id: 7, name: 'Lunges', muscle: 'Legs', difficulty: 'Beginner', equipment: 'None', videoUrl: 'https://youtube.com/watch?v=D7KaRcqtZ08' },
  { id: 8, name: 'Plank', muscle: 'Core', difficulty: 'Beginner', equipment: 'None', videoUrl: 'https://youtube.com/watch?v=pSHjTRCQxI' },
  { id: 9, name: 'Burpees', muscle: 'Full Body', difficulty: 'Intermediate', equipment: 'None', videoUrl: 'https://youtube.com/watch?v=dZgVNMjI8tM' },
  { id: 10, name: 'Mountain Climbers', muscle: 'Core', difficulty: 'Beginner', equipment: 'None', videoUrl: 'https://youtube.com/watch?v=nmwgirApc_E' }
];

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { muscle, difficulty, equipment } = req.query;
    
    let filtered = exercises;
    if (muscle) {
      filtered = filtered.filter(e => e.muscle.toLowerCase() === muscle.toLowerCase());
    }
    if (difficulty) {
      filtered = filtered.filter(e => e.difficulty.toLowerCase() === difficulty.toLowerCase());
    }
    if (equipment) {
      filtered = filtered.filter(e => e.equipment.toLowerCase().includes(equipment.toLowerCase()));
    }
    
    res.status(200).json({ 
      success: true, 
      exercises: filtered,
      count: filtered.length 
    });
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}