// lib/notifications.js
// Notification data management for social proof widget

/**
 * Notification types supported by the widget
 */
export const NOTIFICATION_TYPES = {
  SALE: 'sale',
  SIGNUP: 'signup',
  REVIEW: 'review',
  VISIT: 'visit',
  CUSTOM: 'custom',
};

/**
 * Notification templates for different types
 */
export const NOTIFICATION_TEMPLATES = {
  [NOTIFICATION_TYPES.SALE]: {
    title: 'Recent Sale',
    message: '{name} just purchased {product}',
    icon: '🛒',
  },
  [NOTIFICATION_TYPES.SIGNUP]: {
    title: 'New Signup',
    message: '{name} just signed up',
    icon: '👤',
  },
  [NOTIFICATION_TYPES.REVIEW]: {
    title: 'New Review',
    message: '{name} left a {rating} star review',
    icon: '⭐',
  },
  [NOTIFICATION_TYPES.VISIT]: {
    title: 'Live Visitor',
    message: '{count} people are viewing this page',
    icon: '👀',
  },
  [NOTIFICATION_TYPES.CUSTOM]: {
    title: 'Notification',
    message: '{message}',
    icon: '🔔',
  },
};

/**
 * In-memory storage for notifications (for MVP)
 * In production, this should use a database
 */
let notifications = [];
let notificationIdCounter = 1;

/**
 * Add a new notification
 * @param {object} notification - Notification data
 * @param {string} notification.type - Notification type (sale, signup, review, visit, custom)
 * @param {string} notification.name - Customer name (optional)
 * @param {string} notification.email - Customer email (optional, for avatar)
 * @param {string} notification.product - Product name (for sales)
 * @param {number} notification.amount - Purchase amount (for sales)
 * @param {number} notification.rating - Review rating (for reviews)
 * @param {string} notification.message - Custom message (for custom type)
 * @param {string} notification.url - URL to link to (optional)
 * @param {string} notification.imageUrl - Image URL (optional)
 * @param {string} notification.widgetId - Widget ID (for multi-site support)
 * @returns {object} Created notification
 */
export function addNotification(notification) {
  const id = notificationIdCounter++;
  const now = new Date().toISOString();
  
  const newNotification = {
    id,
    type: notification.type || NOTIFICATION_TYPES.CUSTOM,
    name: notification.name || 'Anonymous',
    email: notification.email || null,
    product: notification.product || null,
    amount: notification.amount || null,
    rating: notification.rating || null,
    message: notification.message || '',
    url: notification.url || null,
    imageUrl: notification.imageUrl || null,
    widgetId: notification.widgetId || 'default',
    createdAt: now,
    displayed: false,
    clicked: false,
  };
  
  notifications.unshift(newNotification); // Add to beginning (newest first)
  
  // Keep only last 1000 notifications (configurable)
  if (notifications.length > 1000) {
    notifications = notifications.slice(0, 1000);
  }
  
  return newNotification;
}

/**
 * Get notifications for a widget
 * @param {object} options - Query options
 * @param {string} options.widgetId - Widget ID
 * @param {string} options.type - Filter by type (optional)
 * @param {number} options.limit - Max number of notifications (default: 10)
 * @param {boolean} options.includeDisplayed - Include already displayed notifications (default: false)
 * @param {number} options.since - Only notifications after this timestamp (optional)
 * @returns {Array} Array of notifications
 */
export function getNotifications(options = {}) {
  const {
    widgetId = 'default',
    type,
    limit = 10,
    includeDisplayed = false,
    since,
  } = options;
  
  let filtered = notifications.filter((n) => n.widgetId === widgetId);
  
  if (type) {
    filtered = filtered.filter((n) => n.type === type);
  }
  
  if (!includeDisplayed) {
    filtered = filtered.filter((n) => !n.displayed);
  }
  
  if (since) {
    const sinceDate = new Date(since).toISOString();
    filtered = filtered.filter((n) => n.createdAt >= sinceDate);
  }
  
  return filtered.slice(0, limit);
}

/**
 * Mark notification as displayed
 * @param {number} id - Notification ID
 */
export function markAsDisplayed(id) {
  const notification = notifications.find((n) => n.id === id);
  if (notification) {
    notification.displayed = true;
  }
}

/**
 * Mark notification as clicked
 * @param {number} id - Notification ID
 */
export function markAsClicked(id) {
  const notification = notifications.find((n) => n.id === id);
  if (notification) {
    notification.clicked = true;
  }
}

/**
 * Generate fake/notifications for demo purposes
 * @param {string} widgetId - Widget ID
 * @param {number} count - Number of fake notifications to generate
 * @returns {Array} Generated notifications
 */
export function generateDemoNotifications(widgetId = 'default', count = 10) {
  const fakeNames = [
    'John D.', 'Sarah M.', 'Mike R.', 'Emily K.', 'David L.',
    'Lisa T.', 'Alex P.', 'Maria S.', 'Tom W.', 'Jennifer H.',
    'Chris B.', 'Anna L.', 'Mark R.', 'Sophie T.', 'James K.',
  ];
  
  const fakeProducts = [
    'Pro Plan', 'Starter Kit', 'Premium Subscription', 'Annual License',
    'Consultation Package', 'Basic Plan', 'Enterprise Solution',
  ];
  
  const generated = [];
  
  for (let i = 0; i < count; i++) {
    const type = Object.values(NOTIFICATION_TYPES)[Math.floor(Math.random() * 3)]; // Only sale, signup, review
    const name = fakeNames[Math.floor(Math.random() * fakeNames.length)];
    
    const notification = {
      type,
      name,
      widgetId,
      createdAt: new Date(Date.now() - Math.random() * 3600000).toISOString(), // Random time in last hour
    };
    
    if (type === NOTIFICATION_TYPES.SALE) {
      notification.product = fakeProducts[Math.floor(Math.random() * fakeProducts.length)];
      notification.amount = Math.floor(Math.random() * 500) + 50;
    } else if (type === NOTIFICATION_TYPES.REVIEW) {
      notification.rating = Math.floor(Math.random() * 5) + 1;
    }
    
    generated.push(addNotification(notification));
  }
  
  return generated;
}

/**
 * Clear all notifications (for testing)
 */
export function clearNotifications() {
  notifications = [];
  notificationIdCounter = 1;
}

/**
 * Get notification statistics
 * @param {string} widgetId - Widget ID
 * @returns {object} Statistics
 */
export function getNotificationStats(widgetId = 'default') {
  const widgetNotifications = notifications.filter((n) => n.widgetId === widgetId);
  
  const stats = {
    total: widgetNotifications.length,
    byType: {},
    displayed: 0,
    clicked: 0,
    lastHour: 0,
    lastDay: 0,
  };
  
  const now = Date.now();
  const oneHourAgo = new Date(now - 3600000).toISOString();
  const oneDayAgo = new Date(now - 86400000).toISOString();
  
  for (const notification of widgetNotifications) {
    // Count by type
    stats.byType[notification.type] = (stats.byType[notification.type] || 0) + 1;
    
    // Count displayed and clicked
    if (notification.displayed) stats.displayed++;
    if (notification.clicked) stats.clicked++;
    
    // Count recent
    if (notification.createdAt >= oneHourAgo) stats.lastHour++;
    if (notification.createdAt >= oneDayAgo) stats.lastDay++;
  }
  
  return stats;
}

/**
 * Format notification for display
 * @param {object} notification - Notification object
 * @returns {object} Formatted notification for widget display
 */
export function formatNotification(notification) {
  const template = NOTIFICATION_TEMPLATES[notification.type] || NOTIFICATION_TEMPLATES[NOTIFICATION_TYPES.CUSTOM];
  
  let message = template.message;
  message = message.replace('{name}', notification.name);
  message = message.replace('{product}', notification.product || '');
  message = message.replace('{rating}', notification.rating || '');
  message = message.replace('{message}', notification.message || '');
  
  return {
    id: notification.id,
    type: notification.type,
    title: template.title,
    message,
    icon: template.icon,
    name: notification.name,
    imageUrl: notification.imageUrl,
    url: notification.url,
    createdAt: notification.createdAt,
    timeAgo: getTimeAgo(notification.createdAt),
  };
}

/**
 * Get time ago string (e.g., "2 minutes ago")
 * @param {string} isoDate - ISO date string
 * @returns {string} Time ago string
 */
function getTimeAgo(isoDate) {
  const now = new Date();
  const date = new Date(isoDate);
  const seconds = Math.floor((now - date) / 1000);
  
  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
  return `${Math.floor(seconds / 86400)} days ago`;
}
