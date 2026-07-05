import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function ChallengesPage() {
  const [challenges, setChallenges] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchChallenges = async () => {
    try {
      const res = await fetch('/api/challenges');
      const data = await res.json();
      if (data.success) {
        setChallenges(data.challenges);
      }
    } catch (err) {
      console.error('Failed to fetch challenges:', err);
    }
  };

  useEffect(() => {
    fetchChallenges();
  }, []);

  const createChallenge = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch('/api/challenges', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          creatorId: 'user-' + Date.now(), 
          title,
          description,
          startDate,
          endDate
        })
      });
      
      const data = await res.json();
      
      if (data.success) {
        setTitle('');
        setDescription('');
        setStartDate('');
        setEndDate('');
        fetchChallenges();
      }
    } catch (err) {
      console.error('Failed to create challenge:', err);
    } finally {
      setLoading(false);
    }
  };

  const joinChallenge = async (challengeId) => {
    try {
      await fetch('/api/challenges', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          id: challengeId, 
          action: 'join',
          userId: 'current-user' // In real app, would get from auth
        })
      });
      fetchChallenges();
    } catch (err) {
      console.error('Failed to join challenge:', err);
    }
  };

  return (
    <div>
      <Head>
        <title>Challenges - Fitness Community</title>
      </Head>
      
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
        <h1>🏆 Fitness Challenges</h1>
        <p>Create and join fitness challenges to stay motivated.</p>
        
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
            <h3>Create Challenge</h3>
            <form onSubmit={createChallenge}>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '5px' }}
                />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '5px' }}
                />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                  style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '5px' }}
                />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>End Date</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                  style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '5px' }}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: '#667eea',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: loading ? 'not-allowed' : 'pointer'
                }}
              >
                {loading ? 'Creating...' : 'Create Challenge'}
              </button>
            </form>
          </div>
          
          <div>
            <h3>Active Challenges</h3>
            {challenges.length > 0 ? (
              <div>
                {challenges.map((challenge, index) => (
                  <div key={index} style={{ 
                    padding: '20px', 
                    background: 'white', 
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    marginBottom: '15px'
                  }}>
                    <h4>{challenge.title}</h4>
                    <p>{challenge.description}</p>
                    <p><strong>Duration:</strong> {challenge.startDate} to {challenge.endDate}</p>
                    <p><strong>Participants:</strong> {challenge.participants.length}</p>
                    <button
                      onClick={() => joinChallenge(challenge.id)}
                      style={{
                        marginTop: '10px',
                        padding: '8px 16px',
                        background: '#28a745',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                      }}
                    >
                      Join Challenge
                    </button>
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
                <p>No challenges yet. Create one to get started!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}