// lib/widget.js
// Widget configuration and generation for social proof widget

/**
 * Default widget configuration
 */
export const DEFAULT_CONFIG = {
  // Display settings
  position: 'bottom-left', // 'bottom-left', 'bottom-right', 'top-left', 'top-right'
  animation: 'slide', // 'slide', 'fade', 'bounce'
  animationDuration: 300, // ms
  
  // Timing
  delay: 5000, // ms before first notification
  interval: 8000, // ms between notifications
  displayTime: 5000, // ms to display each notification
  
  // Appearance
  theme: 'light', // 'light', 'dark', 'auto'
  backgroundColor: '#ffffff',
  textColor: '#333333',
  linkColor: '#3b82f6',
  borderRadius: 8, // px
  shadow: true,
  blur: false,
  
  // Content
  showAvatar: true,
  showTimeAgo: true,
  showIcon: true,
  maxNotifications: 10, // maximum notifications to show
  
  // Behavior
  clickthrough: true, // allow clicking on notifications
  pauseOnHover: true,
  closeButton: true,
  sound: false, // play sound on new notification
  
  // Filters
  enabledTypes: ['sale', 'signup', 'review'], // which types to show
  minTimeBetween: 2000, // ms minimum between notifications
  
  // Advanced
  customCSS: '', // custom CSS to inject
  customJS: '', // custom JS to run
  debug: false,
};

/**
 * Widget positions with CSS values
 */
export const WIDGET_POSITIONS = {
  'bottom-left': {
    bottom: '20px',
    left: '20px',
  },
  'bottom-right': {
    bottom: '20px',
    right: '20px',
  },
  'top-left': {
    top: '20px',
    left: '20px',
  },
  'top-right': {
    top: '20px',
    right: '20px',
  },
};

/**
 * In-memory storage for widget configurations (for MVP)
 * In production, this should use a database
 */
let widgetConfigs = {};

/**
 * Get widget configuration
 * @param {string} widgetId - Widget ID
 * @returns {object} Widget configuration
 */
export function getWidgetConfig(widgetId = 'default') {
  if (!widgetConfigs[widgetId]) {
    widgetConfigs[widgetId] = { ...DEFAULT_CONFIG };
  }
  return widgetConfigs[widgetId];
}

/**
 * Save widget configuration
 * @param {string} widgetId - Widget ID
 * @param {object} config - Configuration object
 * @returns {object} Updated configuration
 */
export function saveWidgetConfig(widgetId = 'default', config) {
  widgetConfigs[widgetId] = {
    ...DEFAULT_CONFIG,
    ...widgetConfigs[widgetId],
    ...config,
  };
  return widgetConfigs[widgetId];
}

/**
 * Generate widget JavaScript snippet
 * @param {object} options - Generation options
 * @param {string} options.widgetId - Widget ID
 * @param {string} options.apiUrl - API base URL
 * @param {object} options.config - Widget configuration (optional, uses stored config if not provided)
 * @returns {string} JavaScript snippet to embed on website
 */
export function generateWidgetSnippet(options = {}) {
  const { widgetId = 'default', apiUrl } = options;
  const config = options.config || getWidgetConfig(widgetId);
  
  const script = `
<!-- Social Proof Widget - Start -->
<script>
(function() {
  var widgetId = '${widgetId}';
  var apiUrl = '${apiUrl || window.location.origin}';
  var config = ${JSON.stringify(config, null, 2)};
  
  // Create widget container
  var container = document.createElement('div');
  container.id = 'social-proof-widget';
  container.style.position = 'fixed';
  container.style.zIndex = '999999';
  container.style.${config.position.includes('bottom') ? 'bottom' : 'top'} = '20px';
  container.style.${config.position.includes('left') ? 'left' : 'right'} = '20px';
  container.style.width = '350px';
  container.style.maxWidth = '90vw';
  document.body.appendChild(container);
  
  // Create notification element
  function createNotification(notification) {
    var el = document.createElement('div');
    el.className = 'spw-notification';
    el.style.backgroundColor = config.backgroundColor;
    el.style.color = config.textColor;
    el.style.borderRadius = config.borderRadius + 'px';
    el.style.padding = '12px 16px';
    el.style.marginBottom = '10px';
    el.style.boxShadow = config.shadow ? '0 4px 12px rgba(0,0,0,0.15)' : 'none';
    el.style.display = 'flex';
    el.style.alignItems = 'center';
    el.style.gap = '12px';
    el.style.transition = 'all ' + config.animationDuration + 'ms ease';
    el.style.cursor = config.clickthrough ? 'pointer' : 'default';
    
    // Avatar
    if (config.showAvatar && notification.imageUrl) {
      var avatar = document.createElement('img');
      avatar.src = notification.imageUrl;
      avatar.style.width = '40px';
      avatar.style.height = '40px';
      avatar.style.borderRadius = '50%';
      avatar.style.flexShrink = '0';
      el.appendChild(avatar);
    }
    
    // Content
    var content = document.createElement('div');
    content.style.flex = '1';
    content.style.minWidth = '0';
    
    var title = document.createElement('div');
    title.style.fontWeight = '600';
    title.style.fontSize = '14px';
    title.style.marginBottom = '2px';
    title.textContent = notification.title;
    content.appendChild(title);
    
    var message = document.createElement('div');
    message.style.fontSize = '13px';
    message.style.color = '#666';
    message.style.overflow = 'hidden';
    message.style.textOverflow = 'ellipsis';
    message.style.whiteSpace = 'nowrap';
    message.textContent = notification.message;
    content.appendChild(message);
    
    if (config.showTimeAgo) {
      var time = document.createElement('div');
      time.style.fontSize = '11px';
      time.style.color = '#999';
      time.style.marginTop = '2px';
      time.textContent = notification.timeAgo;
      content.appendChild(time);
    }
    
    el.appendChild(content);
    
    // Click handler
    if (config.clickthrough && notification.url) {
      el.addEventListener('click', function() {
        window.open(notification.url, '_blank');
      });
    }
    
    return el;
  }
  
  // Show notification
  function showNotification(notification) {
    var el = createNotification(notification);
    container.appendChild(el);
    
    // Trigger animation
    setTimeout(function() {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 10);
    
    // Auto-remove after displayTime
    setTimeout(function() {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      setTimeout(function() {
        if (el.parentNode) el.parentNode.removeChild(el);
      }, config.animationDuration);
    }, config.displayTime);
  }
  
  // Fetch notifications
  function fetchNotifications() {
    var url = apiUrl + '/api/notifications?widgetId=' + widgetId + '&limit=1';
    fetch(url)
      .then(function(res) { return res.json(); })
      .then(function(data) {
        if (data.success && data.notifications && data.notifications.length > 0) {
          showNotification(data.notifications[0]);
        }
      })
      .catch(function(err) { if (config.debug) console.error('Widget error:', err); });
  }
  
  // Start
  setTimeout(fetchNotifications, config.delay);
  setInterval(fetchNotifications, config.interval);
})();
</script>
<!-- Social Proof Widget - End -->
  `.trim();
  
  return script;
}

/**
 * Generate widget CSS
 * @param {object} config - Widget configuration
 * @returns {string} CSS string
 */
export function generateWidgetCSS(config = DEFAULT_CONFIG) {
  return `
#social-proof-widget {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

.spw-notification {
  opacity: 0;
  transform: translateY(20px);
}

.spw-notification:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0,0,0,0.2);
}

${config.customCSS || ''}
  `.trim();
}

/**
 * Validate widget configuration
 * @param {object} config - Configuration to validate
 * @returns {object} { valid: boolean, errors: string[] }
 */
export function validateWidgetConfig(config) {
  const errors = [];
  
  if (config.position && !WIDGET_POSITIONS[config.position]) {
    errors.push(`Invalid position: ${config.position}. Must be one of: ${Object.keys(WIDGET_POSITIONS).join(', ')}`);
  }
  
  if (config.animation && !['slide', 'fade', 'bounce'].includes(config.animation)) {
    errors.push(`Invalid animation: ${config.animation}. Must be one of: slide, fade, bounce`);
  }
  
  if (config.delay && (typeof config.delay !== 'number' || config.delay < 0)) {
    errors.push('Delay must be a positive number');
  }
  
  if (config.interval && (typeof config.interval !== 'number' || config.interval < 1000)) {
    errors.push('Interval must be at least 1000ms');
  }
  
  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Reset widget configuration to default
 * @param {string} widgetId - Widget ID
 */
export function resetWidgetConfig(widgetId = 'default') {
  widgetConfigs[widgetId] = { ...DEFAULT_CONFIG };
  return widgetConfigs[widgetId];
}
