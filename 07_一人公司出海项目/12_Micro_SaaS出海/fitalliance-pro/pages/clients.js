import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function ClientsPage() {
  const [clients, setClients] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [fitnessGoal, setFitnessGoal] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchClients = async () => {
    try {
      const res = await fetch('/api/clients?trainerId=trainer-1');
      const data = await res.json();
      if (data.success) {
        setClients(data.clients);
      }
    } catch (err) {
      console.error('Failed to fetch clients:', err);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const addClient = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch('/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          trainerId: 'trainer-1', 
          name, 
          email, 
          phone, 
          fitnessGoal 
        })
      });
      
      const data = await res.json();
      
      if (data.success) {
        setName('');
        setEmail('');
        setPhone('');
        setFitnessGoal('');
        fetchClients();
      }
    } catch (err) {
      console.error('Failed to add client:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Head>
        <title>Client Management - Fitalliance Pro</title>
      </Head>
      
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <h1>👥 Client Management</h1>
        <p>Manage your client profiles and track their progress.</p>
        
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
            <h3>Add New Client</h3>
            
            <form onSubmit={addClient}>
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
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '5px' }}
                />
              </div>
              
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Phone</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '5px' }}
                />
              </div>
              
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Fitness Goal</label>
                <input
                  type="text"
                  value={fitnessGoal}
                  onChange={(e) => setFitnessGoal(e.target.value)}
                  placeholder="e.g., Weight loss, Muscle gain"
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
                  fontSize: '16px',
                  cursor: loading ? 'not-allowed' : 'pointer'
                }}
              >
                {loading ? 'Adding...' : 'Add Client'}
              </button>
            </form>
          </div>
          
          <div>
            <h3>Client List</h3>
            {clients.length > 0 ? (
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
                gap: '20px' 
              }}>
                {clients.map((client, index) => (
                  <div key={index} style={{ 
                    padding: '20px', 
                    background: 'white', 
                    border: '1px solid #ddd',
                    borderRadius: '5px'
                  }}>
                    <h4>{client.name}</h4>
                    <p><strong>Email:</strong> {client.email}</p>
                    {client.phone && <p><strong>Phone:</strong> {client.phone}</p>}
                    {client.fitnessGoal && <p><strong>Goal:</strong> {client.fitnessGoal}</p>}
                    <p><strong>Status:</strong> <span style={{ 
                      color: client.status === 'active' ? '#28a745' : '#6c757d',
                      fontWeight: 'bold'
                    }}>{client.status}</span></p>
                    <p><strong>Start Date:</strong> {client.startDate}</p>
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
                <p>No clients yet. Add one to get started!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}