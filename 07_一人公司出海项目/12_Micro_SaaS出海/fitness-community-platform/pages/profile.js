import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function ProfilePage() {
  const [profiles, setProfiles] = useState([]);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [fitnessGoals, setFitnessGoals] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchProfiles = async () => {
    try {
      const res = await fetch('/api/profiles');
      const data = await res.json();
      if (data.success) {
        setProfiles(data.profiles);
      }
    } catch (err) {
      console.error('Failed to fetch profiles:', err);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  const createProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch('/api/profiles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          userId: 'user-' + Date.now(), 
          name, 
          bio, 
          fitnessGoals: fitnessGoals.split(',').map(g => g.trim()) 
        })
      });
      
      const data = await res.json();
      
      if (data.success) {
        setName('');
        setBio('');
        setFitnessGoals('');
        fetchProfiles();
      }
    } catch (err) {
      console.error('Failed to create profile:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Head>
        <title>User Profiles - Fitness Community</title>
      </Head>
      
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
        <h1>👤 User Profiles</h1>
        <p>Create and manage your fitness community profile.</p>
        
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
            <h3>Create Profile</h3>
            <form onSubmit={createProfile}>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '5px' }}
                />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Bio</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={3}
                  style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '5px' }}
                />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Fitness Goals (comma-separated)</label>
                <input
                  type="text"
                  value={fitnessGoals}
                  onChange={(e) => setFitnessGoals(e.target.value)}
                  placeholder="e.g., Lose weight, Build muscle"
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
                {loading ? 'Creating...' : 'Create Profile'}
              </button>
            </form>
          </div>
          
          <div>
            <h3>Community Profiles</h3>
            {profiles.length > 0 ? (
              <div>
                {profiles.map((profile, index) => (
                  <div key={index} style={{ 
                    padding: '20px', 
                    background: 'white', 
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    marginBottom: '15px'
                  }}>
                    <h4>{profile.name}</h4>
                    <p>{profile.bio}</p>
                    {profile.fitnessGoals && profile.fitnessGoals.length > 0 && (
                      <p><strong>Goals:</strong> {profile.fitnessGoals.join(', ')}</p>
                    )}
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
                <p>No profiles yet. Create one to get started!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}