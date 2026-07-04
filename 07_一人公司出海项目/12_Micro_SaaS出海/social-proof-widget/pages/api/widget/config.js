// pages/api/widget/config.js
// API route for widget configuration

import { getWidgetConfig, saveWidgetConfig, validateWidgetConfig, resetWidgetConfig, DEFAULT_CONFIG } from '../../../lib/widget.js';

export default async function handler(req, res) {
  // Set UTF-8 charset for all responses
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  
  // Handle GET request - get widget configuration
  if (req.method === 'GET') {
    try {
      const { widgetId } = req.query;
      const config = getWidgetConfig(widgetId || 'default');
      
      return res.status(200).json({
        success: true,
        widgetId: widgetId || 'default',
        config,
      });
    } catch (error) {
      console.error('Widget config API error:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to fetch widget configuration',
        details: error.message,
      });
    }
  }
  
  // Handle POST request - save widget configuration
  if (req.method === 'POST') {
    try {
      const { widgetId, config } = req.body;
      
      if (!config) {
        return res.status(400).json({
          success: false,
          error: 'Missing required field: config',
        });
      }
      
      // Validate configuration
      const validation = validateWidgetConfig(config);
      if (!validation.valid) {
        return res.status(400).json({
          success: false,
          error: 'Invalid configuration',
          details: validation.errors,
        });
      }
      
      const updatedConfig = saveWidgetConfig(widgetId || 'default', config);
      
      return res.status(200).json({
        success: true,
        message: 'Widget configuration saved successfully',
        widgetId: widgetId || 'default',
        config: updatedConfig,
      });
    } catch (error) {
      console.error('Save widget config API error:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to save widget configuration',
        details: error.message,
      });
    }
  }
  
  // Handle DELETE request - reset widget configuration
  if (req.method === 'DELETE') {
    try {
      const { widgetId } = req.query;
      const resetConfig = resetWidgetConfig(widgetId || 'default');
      
      return res.status(200).json({
        success: true,
        message: 'Widget configuration reset to default',
        widgetId: widgetId || 'default',
        config: resetConfig,
      });
    } catch (error) {
      console.error('Reset widget config API error:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to reset widget configuration',
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
