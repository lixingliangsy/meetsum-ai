export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { 
      goal, 
      fitnessLevel, 
      equipment, 
      daysPerWeek, 
      sessionDuration 
    } = req.body;
    
    if (!goal || !fitnessLevel) {
      return res.status(400).json({ 
        success: false, 
        error: 'Goal and fitness level are required' 
      });
    }
    
    // Exercise database
    const exerciseDB = {
      'Chest': ['Push-ups', 'Bench Press', 'Chest Fly'],
      'Back': ['Pull-ups', 'Deadlifts', 'Rows'],
      'Legs': ['Squats', 'Lunges', 'Leg Press'],
      'Shoulders': ['Overhead Press', 'Lateral Raise', 'Front Raise'],
      'Arms': ['Bicep Curls', 'Tricep Extensions', 'Hammer Curls'],
      'Core': ['Plank', 'Crunches', 'Russian Twist'],
      'Full Body': ['Burpees', 'Mountain Climbers', 'Kettlebell Swing']
    };
    
    // Plan generation algorithm
    const generatePlan = () => {
      const plan = {
        goal,
        fitnessLevel,
        equipment: equipment || 'None',
        daysPerWeek: daysPerWeek || 3,
        sessionDuration: sessionDuration || 60,
        workouts: []
      };
      
      // Generate workouts based on goal
      const workoutsPerWeek = plan.daysPerWeek;
      const musclesPerWorkout = goal === 'strength' ? 2 : 3;
      
      for (let day = 1; day <= workoutsPerWeek; day++) {
        const workout = {
          day,
          name: `Day ${day}`,
          exercises: []
        };
        
        // Select muscles for this workout
        const availableMuscles = Object.keys(exerciseDB);
        const selectedMuscles = [];
        for (let i = 0; i < musclesPerWorkout; i++) {
          const randomMuscle = availableMuscles[Math.floor(Math.random() * availableMuscles.length)];
          if (!selectedMuscles.includes(randomMuscle)) {
            selectedMuscles.push(randomMuscle);
          }
        }
        
        // Add exercises for selected muscles
        selectedMuscles.forEach(muscle => {
          const muscleExercises = exerciseDB[muscle];
          const exerciseName = muscleExercises[Math.floor(Math.random() * muscleExercises.length)];
          
          workout.exercises.push({
            name: exerciseName,
            muscle,
            sets: fitnessLevel === 'beginner' ? 3 : fitnessLevel === 'intermediate' ? 4 : 5,
            reps: goal === 'strength' ? 6 : goal === 'hypertrophy' ? 10 : 12,
            rest: goal === 'strength' ? 90 : 60
          });
        });
        
        plan.workouts.push(workout);
      }
      
      return plan;
    };
    
    const generatedPlan = generatePlan();
    
    res.status(200).json({ 
      success: true, 
      plan: generatedPlan,
      message: 'Fitness plan generated successfully' 
    });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}