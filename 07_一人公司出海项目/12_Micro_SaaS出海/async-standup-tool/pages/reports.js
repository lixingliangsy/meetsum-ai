import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function ReportsPage() {
  const [reports, setReports] = useState([]);
  const [team, setTeam] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchReports = async () => {
    setLoading(true);
    setError('');
    
    try {
      let url = '/api/reports?format=json';
      if (team) url += `&team=${team}`;
      if (startDate) url += `&startDate=${startDate}`;
      if (endDate) url += `&endDate=${endDate}`;
      
      const res = await fetch(url);
      const data = await res.json();
      
      if (data.success) {
        setReports(data.report.teams || []);
      } else {
        setError(data.error || 'Failed to fetch reports');
      }
    } catch (err) {
      setError('Failed to fetch reports. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const downloadMarkdown = async () => {
    try {
      let url = '/api/reports?format=markdown';
      if (team) url += `&team=${team}`;
      if (startDate) url += `&startDate=${startDate}`;
      if (endDate) url += `&endDate=${endDate}`;
      
      const res = await fetch(url);
      const blob = await res.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = 'standup-report.md';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(downloadUrl);
    } catch (err) {
      setError('Failed to download report.');
    }
  };

  return (
    <div>
      <Head>
        <title>Standup Reports</title>
      </Head>
      
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
        <h1>📊 Standup Reports</h1>
        <p>View and export team standup reports.</p>
        
        <div style={{ 
          padding: '20px', 
          background: '#f8f9fa', 
          borderRadius: '5px',
          marginTop: '20px',
          marginBottom: '20px'
        }}>
          <h3>Filter Reports</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', marginTop: '10px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Team</label>
              <input
                type="text"
                value={team}
                onChange={(e) => setTeam(e.target.value)}
                placeholder="All teams"
                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '5px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '5px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '5px' }}
              />
            </div>
          </div>
          <div style={{ marginTop: '15px' }}>
            <button
              onClick={fetchReports}
              disabled={loading}
              style={{
                padding: '10px 20px',
                background: '#667eea',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: loading ? 'not-allowed' : 'pointer',
                marginRight: '10px'
              }}
            >
              {loading ? 'Loading...' : 'Filter'}
            </button>
            <button
              onClick={downloadMarkdown}
              style={{
                padding: '10px 20px',
                background: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                marginRight: '10px'
              }}
            >
              Download (Markdown)
            </button>
            <a href="/standup" style={{ 
              display: 'inline-block',
              padding: '10px 20px',
              background: '#6c757d',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '5px'
            }}>
              Submit Standup
            </a>
          </div>
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
        
        {reports.length > 0 ? (
          <div>
            {reports.map((group, index) => (
              <div key={index} style={{ 
                padding: '20px', 
                background: 'white', 
                border: '1px solid #ddd',
                borderRadius: '5px',
                marginBottom: '20px'
              }}>
                <h3>Team: {group.team} - {group.date}</h3>
                {group.members.map((member, idx) => (
                  <div key={idx} style={{ 
                    padding: '15px', 
                    background: '#f8f9fa', 
                    borderRadius: '5px',
                    marginTop: '10px'
                  }}>
                    <h4>{member.member}</h4>
                    <p><strong>Yesterday:</strong> {member.yesterday}</p>
                    <p><strong>Today:</strong> {member.today}</p>
                    {member.blockers && <p><strong>Blockers:</strong> {member.blockers}</p>}
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
            <p>No standup reports found. Try adjusting the filters or submit a standup first.</p>
          </div>
        )}
      </div>
    </div>
  );
}
