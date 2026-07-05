import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function ExercisesPage() {
  const [exercises, setExercises] = useState([]);
  const [muscle, setMuscle] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [equipment, setEquipment] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchExercises = async () => {
    setLoading(true);
    
    try {
      let url = '/api/exercises';
      if (muscle) url += `?muscle=${muscle}`;
      if (difficulty) url += `${muscle ? '&' : '?'}difficulty=${difficulty}`;
      if (equipment) url += `${muscle || difficulty ? '&' : '?'}equipment=${equipment}`;
      
      const res = await fetch(url);
      const data = await res.json();
      
      if (data.success) {
        setExercises(data.exercises);
      }
    } catch (err) {
      console.error('Failed to fetch exercises:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExercises();
  }, []);

  return (
    <div>
      <Head>
        <title>Exercise Library</title>
      </Head>
      
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <h1>�š Exercise Library</h1>
        <p>Browse our exercise database with instructions and video demonstrations.</p>
        
        <div style={{ 
          padding: '20px', 
          background: '#f8f9fa', 
          borderRadius: '5px',
          marginTop: '20px',
          marginBottom: '20px'
        }}>
          <h3>Filter Exercises</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', marginTop: '10px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Muscle Group</label>
              <select
                value={muscle}
                onChange={(e) => setMuscle(e.target.value)}
                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '5px' }}
              >
                <option value="">All Muscles</option>
                <option value="Chest">Chest</option>
                <option value="Back">Back</option>
                <option value="Legs">Legs</option>
                <option value="Shoulders">Shoulders</option>
                <option value="Arms">Arms</option>
                <option value="Core">Core</option>
                <option value="Full Body">Full Body</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Difficulty</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '5px' }}
              >
                <option value="">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Equipment</label>
              <input
                type="text"
                value={equipment}
                onChange={(e) => setEquipment(e.target.value)}
                placeholder="e.g., None, Dumbbell"
                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '5px' }}
              />
            </div>
          </div>
          <button
            onClick={fetchExercises}
            disabled={loading}
            style={{
              marginTop: '15px',
              padding: '10px 20px',
              background: '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Loading...' : 'Filter'}
          </button>
        </div>
        
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <p>Loading exercises...</p>
          </div>
        ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
            gap: '20px' 
          }}>
            {exercises.map((exercise, index) => (
              <div key={index} style={{ 
                padding: '20px', 
                background: 'white', 
                border: '1px solid #ddd',
                borderRadius: '5px'
              }}>
                <h3>{exercise.name}</h3>
                <p><strong>Muscle:</strong> {exercise.muscle}</p>
                <p><strong>Difficulty:</strong> {exercise.difficulty}</p>
                <p><strong>Equipment:</strong> {exercise.equipment}</p>
                {exercise.videoUrl && (
                  <a 
                    href={exercise.videoUrl} 
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ 
                      display: 'inline-block',
                      marginTop: '10px',
                      padding: '8px 16px',
                      background: '#dc3545',
                      color: 'white',
                      textDecoration: 'none',
                      borderRadius: '5px',
                      fontSize: '14px'
                    }}
                  >
                    Watch Video
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
        
        <div style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #ddd' }}>
          <a href="/generator" style={{ color: '#667eea', textDecoration: 'none' }}>
            ← Generate a Fitness Plan
          </a>
        </div>
      </div>
    </div>
  );
}
