import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function AnalyticsPage() {
  const [stats, setStats] = useState(null);
  const [trend, setTrend] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchAnalytics = async () => {
    setLoading(true);
    
    try {
      const res = await fetch('/api/analytics');
      const data = await res.json();
      
      if (data.success) {
        setStats(data.stats);
        setTrend(data.trend);
      }
    } catch (err) {
      console.error('Failed to fetch analytics:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  return (
    <div>
      <Head>
        <title>Data Analytics - Fitalliance Pro</title>
      </Head>
      
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
        <h1>📊 Data Analytics</h1>
        <p>View your training statistics and trends.</p>
        
        <button
          onClick={fetchAnalytics}
          disabled={loading}
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            background: '#667eea',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Loading...' : 'Refresh Data'}
        </button>
        
        {stats ? (
          <div style={{ marginTop: '30px' }}>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '20px',
              marginBottom: '30px'
            }}>
              <div style={{ 
                padding: '20px', 
                background: 'white', 
                border: '1px solid #ddd',
                borderRadius: '5px',
                textAlign: 'center'
              }}>
                <h3 style={{ color: '#667eea' }}>Total Workouts</h3>
                <p style={{ fontSize: '2em', fontWeight: 'bold' }}>{stats.totalWorkouts}</p>
              </div>
              <div style={{ 
                padding: '20px', 
                background: 'white', 
                border: '1px solid #ddd',
                borderRadius: '5px',
                textAlign: 'center'
              }}>
                <h3 style={{ color: '#667eea' }}>Total Duration</h3>
                <p style={{ fontSize: '2em', fontWeight: 'bold' }}>{stats.totalDuration} min</p>
              </div>
              <div style={{ 
                padding: '20px', 
                background: 'white', 
                border: '1px solid #ddd',
                borderRadius: '5px',
                textAlign: 'center'
              }}>
                <h3 style={{ color: '#667eea' }}>Calories Burned</h3>
                <p style={{ fontSize: '2em', fontWeight: 'bold' }}>{stats.totalCalories}</p>
              </div>
              <div style={{ 
                padding: '20px', 
                background: 'white', 
                border: '1px solid #ddd',
                borderRadius: '5px',
                textAlign: 'center'
              }}>
                <h3 style={{ color: '#667eea' }}>Average Rating</h3>
                <p style={{ fontSize: '2em', fontWeight: 'bold' }}>{stats.averageRating.toFixed(1)}</p>
              </div>
            </div>
            
            {trend && (
              <div style={{ 
                padding: '20px', 
                background: 'white', 
                border: '1px solid #ddd',
                borderRadius: '5px'
              }}>
                <h3>Trend Analysis</h3>
                <p><strong>Workouts Trend:</strong> <span style={{ 
                  color: trend.workoutsTrend === 'increasing' ? '#28a745' : 
                         trend.workoutsTrend === 'decreasing' ? '#dc3545' : '#6c757d',
                  fontWeight: 'bold'
                }}>{trend.workoutsTrend}</span></p>
                <p><strong>Duration Trend:</strong> <span style={{ 
                  color: trend.durationTrend === 'increasing' ? '#28a745' : 
                         trend.durationTrend === 'decreasing' ? '#dc3545' : '#6c757d',
                  fontWeight: 'bold'
                }}>{trend.durationTrend}</span></p>
                <p><strong>Rating Trend:</strong> <span style={{ 
                  color: trend.ratingTrend === 'increasing' ? '#28a745' : 
                         trend.ratingTrend === 'decreasing' ? '#dc3545' : '#6c757d',
                  fontWeight: 'bold'
                }}>{trend.ratingTrend}</span></p>
              </div>
            )}
          </div>
        ) : (
          <div style={{ 
            padding: '40px', 
            textAlign: 'center', 
            background: '#f8f9fa',
            borderRadius: '5px',
            marginTop: '30px'
          }}>
            <p>No data available yet. Add training data to see analytics.</p>
          </div>
        )}
      </div>
    </div>
  );
}