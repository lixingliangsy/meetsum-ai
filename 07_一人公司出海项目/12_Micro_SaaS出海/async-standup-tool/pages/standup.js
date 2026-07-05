import { useState } from 'react';
import Head from 'next/head';

export default function StandupPage() {
  const [team, setTeam] = useState('');
  const [member, setMember] = useState('');
  const [yesterday, setYesterday] = useState('');
  const [today, setToday] = useState('');
  const [blockers, setBlockers] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const res = await fetch('/api/standups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ team, member, yesterday, today, blockers })
      });
      
      const data = await res.json();
      
      if (data.success) {
        setSubmitted(true);
        setTeam('');
        setMember('');
        setYesterday('');
        setToday('');
        setBlockers('');
      } else {
        setError(data.error || 'Failed to submit standup');
      }
    } catch (err) {
      setError('Failed to submit standup. Please try again.');
    }
  };

  return (
    <div>
      <Head>
        <title>Async Standup - Submit Your Update</title>
      </Head>
      
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
        <h1>📝 Async Standup</h1>
        <p>Submit your daily standup update asynchronously.</p>
        
        {submitted ? (
          <div style={{ 
            padding: '20px', 
            background: '#d4edda', 
            border: '1px solid #c3e6cb',
            borderRadius: '5px',
            marginTop: '20px'
          }}>
            <h3>✅ Standup Submitted!</h3>
            <p>Your standup has been recorded successfully.</p>
            <button 
              onClick={() => setSubmitted(false)}
              style={{
                padding: '10px 20px',
                background: '#667eea',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                marginTop: '10px'
              }}
            >
              Submit Another
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ marginTop: '30px' }}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Team Name *
              </label>
              <input
                type="text"
                value={team}
                onChange={(e) => setTeam(e.target.value)}
                required
                placeholder="e.g., frontend-team"
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  fontSize: '16px'
                }}
              />
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Your Name *
              </label>
              <input
                type="text"
                value={member}
                onChange={(e) => setMember(e.target.value)}
                required
                placeholder="e.g., John Doe"
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  fontSize: '16px'
                }}
              />
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                What did you do yesterday?
              </label>
              <textarea
                value={yesterday}
                onChange={(e) => setYesterday(e.target.value)}
                placeholder="Describe what you accomplished yesterday..."
                rows={4}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  fontSize: '16px',
                  fontFamily: 'inherit'
                }}
              />
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                What will you do today?
              </label>
              <textarea
                value={today}
                onChange={(e) => setToday(e.target.value)}
                placeholder="Describe what you plan to do today..."
                rows={4}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  fontSize: '16px',
                  fontFamily: 'inherit'
                }}
              />
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Any blockers?
              </label>
              <textarea
                value={blockers}
                onChange={(e) => setBlockers(e.target.value)}
                placeholder="Describe any blockers or challenges (optional)..."
                rows={3}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  fontSize: '16px',
                  fontFamily: 'inherit'
                }}
              />
            </div>
            
            {error && (
              <div style={{ 
                padding: '10px', 
                background: '#f8d7da', 
                border: '1px solid #f5c6cb',
                borderRadius: '5px',
                marginBottom: '20px',
                color: '#721c24'
              }}>
                {error}
              </div>
            )}
            
            <button
              type="submit"
              style={{
                padding: '12px 30px',
                background: '#667eea',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                fontSize: '16px',
                cursor: 'pointer'
              }}
            >
              Submit Standup
            </button>
          </form>
        )}
        
        <div style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #ddd' }}>
          <a href="/reports" style={{ color: '#667eea', textDecoration: 'none' }}>
            ← View Standup Reports
          </a>
        </div>
      </div>
    </div>
  );
}
