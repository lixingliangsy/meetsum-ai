// pages/api/widget/generate.js
// API route for generating widget embed code

import { getWidgetConfig, generateWidgetSnippet } from '../../../lib/widget.js';

export default async function handler(req, res) {
  if (req.method !== 'POST' && req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed',
    });
  }
  
  try {
    let params;
    
    if (req.method === 'POST') {
      params = req.body;
    } else {
      params = req.query;
    }
    
    const {
      widgetId,
      apiUrl,
      format = 'javascript', // 'javascript' or 'html'
    } = params;
    
    // Get widget configuration
    const config = getWidgetConfig(widgetId || 'default');
    
    // Generate embed code
    const embedCode = generateWidgetSnippet({
      widgetId: widgetId || 'default',
      apiUrl: apiUrl || (req.headers.origin || 'https://your-domain.com'),
      config,
    });
    
    // Return based on format
    if (format === 'html') {
      return res.status(200).json({
        success: true,
        widgetId: widgetId || 'default',
        embedCode: `<script>\n${embedCode}\n</script>`,
        instructions: 'Copy and paste this code into your website before the closing </body> tag.',
      });
    }
    
    return res.status(200).json({
      success: true,
      widgetId: widgetId || 'default',
      embedCode,
      instructions: 'Copy and paste this code into your website before the closing </body> tag.',
      previewUrl: `/widget/preview?widgetId=${widgetId || 'default'}`,
    });
  } catch (error) {
    console.error('Generate widget API error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to generate widget embed code',
      details: error.message,
    });
  }
}
