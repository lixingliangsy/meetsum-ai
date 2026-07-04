// pages/api/notifications/index.js
// API route for managing notifications

import { getNotifications, addNotification, markAsDisplayed, markAsClicked, getNotificationStats, generateDemoNotifications, formatNotification } from '../../../lib/notifications.js';

export default async function handler(req, res) {
  // Ensure UTF-8 encoding for all responses
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  
  // Handle GET request - retrieve notifications
  if (req.method === 'GET') {
    try {
      const {
        widgetId,
        type,
        limit,
        includeDisplayed,
        since,
        stats,
      } = req.query;
      
      // Return stats if requested
      if (stats === 'true') {
        const notificationStats = getNotificationStats(widgetId || 'default');
        return res.status(200).json({
          success: true,
          stats: notificationStats,
        });
      }
      
      // Generate demo data if requested
      if (req.query.demo === 'true') {
        const demoNotifications = generateDemoNotifications(widgetId || 'default', parseInt(limit) || 10);
        return res.status(200).json({
          success: true,
          message: 'Demo notifications generated',
          count: demoNotifications.length,
          notifications: demoNotifications.map(formatNotification),
        });
      }
      
      // Get notifications
      const notifications = getNotifications({
        widgetId: widgetId || 'default',
        type,
        limit: parseInt(limit) || 10,
        includeDisplayed: includeDisplayed === 'true',
        since,
      });
      
      return res.status(200).json({
        success: true,
        count: notifications.length,
        notifications: notifications.map(formatNotification),
      });
    } catch (error) {
      console.error('Notifications API error:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to fetch notifications',
        details: error.message,
      });
    }
  }
  
  // Handle POST request - add new notification
  if (req.method === 'POST') {
    try {
      const notification = req.body;
      
      // Validate required fields
      if (!notification.type) {
        return res.status(400).json({
          success: false,
          error: 'Missing required field: type',
        });
      }
      
      // Validate notification type
      const validTypes = ['sale', 'signup', 'review', 'visit', 'custom'];
      if (!validTypes.includes(notification.type)) {
        return res.status(400).json({
          success: false,
          error: `Invalid notification type: ${notification.type}. Must be one of: ${validTypes.join(', ')}`,
        });
      }
      
      const created = addNotification(notification);
      
      return res.status(201).json({
        success: true,
        message: 'Notification added successfully',
        notification: formatNotification(created),
      });
    } catch (error) {
      console.error('Add notification API error:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to add notification',
        details: error.message,
      });
    }
  }
  
  // Handle PUT request - mark notification as displayed/clicked
  if (req.method === 'PUT') {
    try {
      const { id, action } = req.body;
      
      if (!id || !action) {
        return res.status(400).json({
          success: false,
          error: 'Missing required fields: id and action',
        });
      }
      
      if (action === 'displayed') {
        markAsDisplayed(id);
      } else if (action === 'clicked') {
        markAsClicked(id);
      } else {
        return res.status(400).json({
          success: false,
          error: `Invalid action: ${action}. Must be 'displayed' or 'clicked'`,
        });
      }
      
      return res.status(200).json({
        success: true,
        message: `Notification ${action} status updated`,
      });
    } catch (error) {
      console.error('Update notification API error:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to update notification',
        details: error.message,
      });
    }
  }
  
  // Method not allowed
  return res.status(405).json({
    success: false,
    error: 'Method not allowed',
  });
}
