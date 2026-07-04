// pages/api/analytics/index.js
// API route for widget analytics

import { getNotificationStats } from '../../../lib/notifications.js';

export default async function handler(req, res) {
  // Set UTF-8 charset for all responses
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  
  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed',
    });
  }
  
  try {
    const { widgetId, period } = req.query;
    
    // Get notification statistics
    const stats = getNotificationStats(widgetId || 'default');
    
    // Calculate additional metrics
    const ctr = stats.displayed > 0 
      ? ((stats.clicked / stats.displayed) * 100).toFixed(2) 
      : 0;
    
    // Mock time-series data (in production, this should come from a database)
    const timeSeriesData = generateTimeSeriesData(widgetId || 'default', period || 'day');
    
    return res.status(200).json({
      success: true,
      widgetId: widgetId || 'default',
      period: period || 'day',
      stats: {
        ...stats,
        ctr: `${ctr}%`,
        conversionRate: ctr, // alias
      },
      timeSeries: timeSeriesData,
      generatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Analytics API error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch analytics data',
      details: error.message,
    });
  }
}

/**
 * Generate mock time-series data (for demo purposes)
 * In production, this should query a database
 */
function generateTimeSeriesData(widgetId, period) {
  const data = [];
  const now = new Date();
  let points = 24; // default: 24 hours
  
  if (period === 'week') {
    points = 7;
  } else if (period === 'month') {
    points = 30;
  }
  
  for (let i = 0; i < points; i++) {
    const timestamp = new Date(now);
    
    if (period === 'day') {
      timestamp.setHours(i);
    } else if (period === 'week') {
      timestamp.setDate(timestamp.getDate() - (points - 1 - i));
    } else if (period === 'month') {
      timestamp.setDate(timestamp.getDate() - (points - 1 - i));
    }
    
    data.push({
      timestamp: timestamp.toISOString(),
      label: period === 'day' 
        ? `${timestamp.getHours()}:00`
        : timestamp.toLocaleDateString(),
      notifications: Math.floor(Math.random() * 50) + 10,
      impressions: Math.floor(Math.random() * 500) + 100,
      clicks: Math.floor(Math.random() * 50) + 5,
    });
  }
  
  return data;
}
