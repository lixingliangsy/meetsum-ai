import { useState } from 'react';
import Head from 'next/head';

export default function GeneratorPage() {
  const [goal, setGoal] = useState('strength');
  const [fitnessLevel, setFitnessLevel] = useState('beginner');
  const [equipment, setEquipment] = useState('None');
  const [daysPerWeek, setDaysPerWeek] = useState(3);
  const [sessionDuration, setSessionDuration] = useState(60);
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generatePlan = async () => {
    setLoading(true);
    setError('');
    
    try {
      const res = await fetch('/api/plans', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ goal, fitnessLevel, equipment, daysPerWeek, sessionDuration })
      });
      
      const data = await res.json();
      
      if (data.success) {
        setPlan(data.plan);
      } else {
        setError(data.error || 'Failed to generate plan');
      }
    } catch (err) {
      setError('Failed to generate plan. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Head>
        <title>AI Fitness Plan Generator</title>
      </Head>
      
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
        <h1>🤖 AI Fitness Plan Generator</h1>
        <p>Generate a personalized fitness plan based on your goals and equipment.</p>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '20px',
          marginTop: '30px'
        }}>
          <div style={{ 
            padding: '20px', 
            background: 'white', 
            border: '1px solid #ddd',
            borderRadius: '5px'
          }}>
            <h3>Plan Parameters</h3>
            
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Goal</label>
              <select
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '5px' }}
              >
                <option value="strength">Strength</option>
                <option value="hypertrophy">Hypertrophy</option>
                <option value="endurance">Endurance</option>
                <option value="weight_loss">Weight Loss</option>
              </select>
            </div>
            
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Fitness Level</label>
              <select
                value={fitnessLevel}
                onChange={(e) => setFitnessLevel(e.target.value)}
                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '5px' }}
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Equipment</label>
              <input
                type="text"
                value={equipment}
                onChange={(e) => setEquipment(e.target.value)}
                placeholder="e.g., None, Dumbbells, Barbell"
                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '5px' }}
              />
            </div>
            
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Days per Week</label>
              <input
                type="number"
                value={daysPerWeek}
                onChange={(e) => setDaysPerWeek(parseInt(e.target.value))}
                min="1"
                max="7"
                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '5px' }}
              />
            </div>
            
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Session Duration (min)</label>
              <input
                type="number"
                value={sessionDuration}
                onChange={(e) => setSessionDuration(parseInt(e.target.value))}
                min="30"
                max="120"
                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '5px' }}
              />
            </div>
            
            {error && (
              <div style={{ 
                padding: '10px', 
                background: '#f8d7da', 
                border: '1px solid #f5c6cb',
                borderRadius: '5px',
                marginBottom: '15px',
                color: '#721c24'
              }}>
                {error}
              </div>
            )}
            
            <button
              onClick={generatePlan}
              disabled={loading}
              style={{
                width: '100%',
                padding: '12px',
                background: '#667eea',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                fontSize: '16px',
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? 'Generating...' : 'Generate Plan'}
            </button>
          </div>
          
          <div>
            <h3>Generated Plan</h3>
            {plan ? (
              <div>
                <div style={{ 
                  padding: '15px', 
                  background: '#d4edda', 
                  border: '1px solid #c3e6cb',
                  borderRadius: '5px',
                  marginBottom: '20px'
                }}>
                  <p><strong>Goal:</strong> {plan.goal}</p>
                  <p><strong>Fitness Level:</strong> {plan.fitnessLevel}</p>
                  <p><strong>Days per Week:</strong> {plan.daysPerWeek}</p>
                  <p><strong>Session Duration:</strong> {plan.sessionDuration} min</p>
                </div>
                
                {plan.workouts.map((workout, index) => (
                  <div key={index} style={{ 
                    padding: '20px', 
                    background: 'white', 
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    marginBottom: '15px'
                  }}>
                    <h4>{workout.name}</h4>
                    {workout.exercises.map((exercise, idx) => (
                      <div key={idx} style={{ 
                        padding: '10px', 
                        background: '#f8f9fa', 
                        borderRadius: '5px',
                        marginTop: '10px'
                      }}>
                        <p><strong>{exercise.name}</strong> ({exercise.muscle})</p>
                        <p>Sets: {exercise.sets} | Reps: {exercise.reps} | Rest: {exercise.rest}s</p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ 
                padding: '40px', 
                textAlign: 'center', 
                background: '#f8f9fa',
                borderRadius: '5px'
              }}>
                <p>Fill in the parameters and click "Generate Plan" to create your personalized fitness plan.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}