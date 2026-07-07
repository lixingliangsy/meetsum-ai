import { useState, useEffect } from 'react';

interface FoodLog {
  id: string;
  foodName: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  mealType: string;
  date: string;
  servings: number;
}

const mealTypes = ['breakfast', 'lunch', 'dinner', 'snack'];
const mealLabels: Record<string, string> = {
  breakfast: 'Breakfast',
  lunch: 'Lunch',
  dinner: 'Dinner',
  snack: 'Snack',
};

export default function Home() {
  const [logs, setLogs] = useState<FoodLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    foodId: '1',
    foodName: '',
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    mealType: 'breakfast',
    date: new Date().toISOString().split('T')[0],
    servings: 1,
  });

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const res = await fetch('/api/logs');
      const data = await res.json();
      setLogs(data);
    } catch (err) {
      console.error('Failed to fetch logs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        await fetchLogs();
        setShowForm(false);
        setFormData({ ...formData, foodName: '', calories: 0, protein: 0, carbs: 0, fat: 0 });
      }
    } catch (err) {
      console.error('Failed to add log:', err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/logs?id=${id}`, { method: 'DELETE' });
      setLogs(logs.filter(log => log.id !== id));
    } catch (err) {
      console.error('Failed to delete log:', err);
    }
  };

  const totalCalories = logs.reduce((sum, log) => sum + log.calories, 0);
  const totalProtein = logs.reduce((sum, log) => sum + log.protein, 0);
  const totalCarbs = logs.reduce((sum, log) => sum + log.carbs, 0);
  const totalFat = logs.reduce((sum, log) => sum + log.fat, 0);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      <header style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ fontSize: '2rem', color: '#333' }}>Calorie Tracker</h1>
        <p style={{ color: '#666' }}>Track your daily food intake and nutrition</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '30px' }}>
        <div style={{ background: '#f0f4ff', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#3b82f6' }}>{totalCalories}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>Calories</div>
        </div>
        <div style={{ background: '#fef3f2', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#ef4444' }}>{totalProtein}g</div>
          <div style={{ fontSize: '12px', color: '#666' }}>Protein</div>
        </div>
        <div style={{ background: '#fffbeb', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#f59e0b' }}>{totalCarbs}g</div>
          <div style={{ fontSize: '12px', color: '#666' }}>Carbs</div>
        </div>
        <div style={{ background: '#f0fdf4', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#22c55e' }}>{totalFat}g</div>
          <div style={{ fontSize: '12px', color: '#666' }}>Fat</div>
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            background: '#3b82f6', color: 'white', border: 'none', padding: '10px 20px',
            borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: '500'
          }}
        >
          {showForm ? 'Cancel' : '+ Add Food Log'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} style={{ background: '#f9fafb', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <input
              type="text" placeholder="Food name" required
              value={formData.foodName}
              onChange={e => setFormData({ ...formData, foodName: e.target.value })}
              style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
            <select
              value={formData.mealType}
              onChange={e => setFormData({ ...formData, mealType: e.target.value })}
              style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            >
              {mealTypes.map(m => <option key={m} value={m}>{mealLabels[m]}</option>)}
            </select>
            <input type="number" placeholder="Calories" required
              value={formData.calories || ''}
              onChange={e => setFormData({ ...formData, calories: Number(e.target.value) })}
              style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
            <input type="number" placeholder="Protein (g)"
              value={formData.protein || ''}
              onChange={e => setFormData({ ...formData, protein: Number(e.target.value) })}
              style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
            <input type="number" placeholder="Carbs (g)"
              value={formData.carbs || ''}
              onChange={e => setFormData({ ...formData, carbs: Number(e.target.value) })}
              style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
            <input type="number" placeholder="Fat (g)"
              value={formData.fat || ''}
              onChange={e => setFormData({ ...formData, fat: Number(e.target.value) })}
              style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
            <input type="number" placeholder="Servings" min="1"
              value={formData.servings}
              onChange={e => setFormData({ ...formData, servings: Number(e.target.value) })}
              style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
            <input type="date"
              value={formData.date}
              onChange={e => setFormData({ ...formData, date: e.target.value })}
              style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
          </div>
          <button type="submit" style={{
            marginTop: '12px', background: '#22c55e', color: 'white', border: 'none',
            padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: '500'
          }}>
            Save Log
          </button>
        </form>
      )}

      {loading ? (
        <p style={{ textAlign: 'center', color: '#666' }}>Loading...</p>
      ) : logs.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#999' }}>No food logs yet. Start tracking!</p>
      ) : (
        <div>
          {mealTypes.map(mealType => {
            const mealLogs = logs.filter(log => log.mealType === mealType);
            if (mealLogs.length === 0) return null;
            return (
              <div key={mealType} style={{ marginBottom: '20px' }}>
                <h2 style={{ fontSize: '16px', color: '#333', borderBottom: '2px solid #eee', paddingBottom: '6px' }}>
                  {mealLabels[mealType]} ({mealLogs.reduce((s, l) => s + l.calories, 0)} cal)
                </h2>
                {mealLogs.map(log => (
                  <div key={log.id} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '10px', background: '#fff', border: '1px solid #eee',
                    borderRadius: '6px', marginBottom: '8px'
                  }}>
                    <div>
                      <div style={{ fontWeight: '500', color: '#333' }}>{log.foodName}</div>
                      <div style={{ fontSize: '12px', color: '#999' }}>
                        {log.calories} cal | P: {log.protein}g | C: {log.carbs}g | F: {log.fat}g | {log.servings} serving(s)
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(log.id)}
                      style={{ background: '#ef4444', color: 'white', border: 'none', padding: '4px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
