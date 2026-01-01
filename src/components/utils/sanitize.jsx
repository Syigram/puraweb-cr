/**
 * Sanitization utilities for user inputs
 * Protects against XSS, HTML injection, and script injection
 */

// HTML entities to escape
const HTML_ENTITIES = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '/': '&#x2F;',
  '`': '&#x60;',
  '=': '&#x3D;'
};

/**
 * Escapes HTML special characters to prevent XSS
 */
export function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/[&<>"'`=/]/g, char => HTML_ENTITIES[char]);
}

/**
 * Removes HTML tags from string
 */
export function stripHtml(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/<[^>]*>/g, '');
}

/**
 * Removes potential script injections
 */
export function removeScripts(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .replace(/data:/gi, '');
}

/**
 * Sanitizes a string for safe display and storage
 * Combines multiple sanitization methods
 */
export function sanitizeInput(str) {
  if (typeof str !== 'string') return '';
  
  let sanitized = str;
  
  // First remove scripts and event handlers
  sanitized = removeScripts(sanitized);
  
  // Strip HTML tags
  sanitized = stripHtml(sanitized);
  
  // Trim whitespace
  sanitized = sanitized.trim();
  
  return sanitized;
}

/**
 * Sanitizes email - only allows valid email characters
 */
export function sanitizeEmail(email) {
  if (typeof email !== 'string') return '';
  
  // Remove any HTML/scripts first
  let sanitized = sanitizeInput(email);
  
  // Only allow valid email characters
  sanitized = sanitized.replace(/[^a-zA-Z0-9@._+-]/g, '');
  
  return sanitized.toLowerCase().trim();
}

/**
 * Sanitizes phone number - only allows digits, spaces, +, -, ()
 */
export function sanitizePhone(phone) {
  if (typeof phone !== 'string') return '';
  
  return phone.replace(/[^0-9\s+\-()]/g, '').trim();
}

/**
 * Sanitizes an object with multiple fields
 */
export function sanitizeFormData(data, fieldTypes = {}) {
  const sanitized = {};
  
  for (const [key, value] of Object.entries(data)) {
    if (typeof value !== 'string') {
      sanitized[key] = value;
      continue;
    }
    
    const fieldType = fieldTypes[key] || 'text';
    
    switch (fieldType) {
      case 'email':
        sanitized[key] = sanitizeEmail(value);
        break;
      case 'phone':
        sanitized[key] = sanitizePhone(value);
        break;
      default:
        sanitized[key] = sanitizeInput(value);
    }
  }
  
  return sanitized;
}