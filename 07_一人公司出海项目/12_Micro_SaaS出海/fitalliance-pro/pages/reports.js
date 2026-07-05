import { useState } from 'react';
import Head from 'next/head';

export default function ReportsPage() {
  const [clientId, setClientId] = useState('');
  const [trainerId, setTrainerId] = useState('');
  const [reportType, setReportType] = useState('progress');
  const [period, setPeriod] = useState('monthly');
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generateReport = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const res = await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientId, trainerId, reportType, period })
      });
      
      const data = await res.json();
      
      if (data.success) {
        setReport(data.report);
      } else {
        setError(data.error || 'Failed to generate report');
      }
    } catch (err) {
      setError('Failed to generate report. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Head>
        <title>Reports - Fitalliance Pro</title>
      </Head>
      
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
        <h1>📄 Generate Report</h1>
        <p>Generate progress reports for your clients.</p>
        
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
            <h3>Report Parameters</h3>
            
            <form onSubmit={generateReport}>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Client ID</label>
                <input
                  type="text"
                  value={clientId}
                  onChange={(e) => setClientId(e.target.value)}
                  required
                  placeholder="Enter client ID"
                  style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '5px' }}
                />
              </div>
              
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Trainer ID</label>
                <input
                  type="text"
                  value={trainerId}
                  onChange={(e) => setTrainerId(e.target.value)}
                  required
                  placeholder="Enter trainer ID"
                  style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '5px' }}
                />
              </div>
              
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Report Type</label>
                <select
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '5px' }}
                >
                  <option value="progress">Progress Report</option>
                  <option value="summary">Summary Report</option>
                  <option value="detailed">Detailed Report</option>
                </select>
              </div>
              
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Period</label>
                <select
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                  style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '5px' }}
                >
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                </select>
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
                type="submit"
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
                {loading ? 'Generating...' : 'Generate Report'}
              </button>
            </form>
          </div>
          
          <div>
            <h3>Generated Report</h3>
            {report ? (
              <div style={{ 
                padding: '20px', 
                background: 'white', 
                border: '1px solid #ddd',
                borderRadius: '5px'
              }}>
                <h4>Report Summary</h4>
                <div style={{ 
                  padding: '15px', 
                  background: '#d4edda', 
                  border: '1px solid #c3e6cb',
                  borderRadius: '5px',
                  marginBottom: '20px'
                }}>
                  <p><strong>Total Workouts:</strong> {report.summary.totalWorkouts}</p>
                  <p><strong>Average Rating:</strong> {report.summary.averageRating}</p>
                  <p><strong>Calories Burned:</strong> {report.summary.caloriesBurned}</p>
                  <p><strong>Goal Progress:</strong> {report.summary.goalProgress}</p>
                </div>
                
                <h4>Recommendations</h4>
                <ul style={{ marginLeft: '20px' }}>
                  {report.recommendations.map((rec, index) => (
                    <li key={index} style={{ marginBottom: '10px' }}>{rec}</li>
                  ))}
                </ul>
                
                <div style={{ marginTop: '20px' }}>
                  <a 
                    href={report.downloadUrl} 
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ 
                      display: 'inline-block',
                      padding: '10px 20px',
                      background: '#28a745',
                      color: 'white',
                      textDecoration: 'none',
                      borderRadius: '5px'
                    }}
                  >
                    Download Report (PDF)
                  </a>
                </div>
              </div>
            ) : (
              <div style={{ 
                padding: '40px', 
                textAlign: 'center', 
                background: '#f8f9fa',
                borderRadius: '5px'
              }}>
                <p>Fill in the parameters and click "Generate Report" to create a client report.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}