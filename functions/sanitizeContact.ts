import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

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

function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/[&<>"'`=/]/g, char => HTML_ENTITIES[char]);
}

function stripHtml(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/<[^>]*>/g, '');
}

function removeScripts(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .replace(/data:/gi, '');
}

function sanitizeInput(str) {
  if (typeof str !== 'string') return '';
  let sanitized = str;
  sanitized = removeScripts(sanitized);
  sanitized = stripHtml(sanitized);
  sanitized = sanitized.trim();
  return sanitized;
}

function sanitizeEmail(email) {
  if (typeof email !== 'string') return '';
  let sanitized = sanitizeInput(email);
  sanitized = sanitized.replace(/[^a-zA-Z0-9@._+-]/g, '');
  return sanitized.toLowerCase().trim();
}

function sanitizePhone(phone) {
  if (typeof phone !== 'string') return '';
  return phone.replace(/[^0-9\s+\-()]/g, '').trim();
}

// Validation functions
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidServiceInterest(service) {
  const validServices = ['web_development', 'ecommerce', 'both', 'custom', ''];
  return validServices.includes(service || '');
}

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    
    // Parse request body
    const body = await req.json();
    const { name, email, company, phone, service_interest, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return Response.json({ 
        error: 'Missing required fields: name, email, and message are required' 
      }, { status: 400 });
    }

    // Sanitize all inputs
    const sanitizedData = {
      name: sanitizeInput(name).substring(0, 100),
      email: sanitizeEmail(email).substring(0, 150),
      company: sanitizeInput(company || '').substring(0, 100),
      phone: sanitizePhone(phone || '').substring(0, 20),
      service_interest: isValidServiceInterest(service_interest) ? service_interest : '',
      message: sanitizeInput(message).substring(0, 2000),
      status: 'new'
    };

    // Validate email format after sanitization
    if (!isValidEmail(sanitizedData.email)) {
      return Response.json({ 
        error: 'Invalid email format' 
      }, { status: 400 });
    }

    // Validate message is not empty after sanitization
    if (sanitizedData.message.length === 0) {
      return Response.json({ 
        error: 'Message cannot be empty' 
      }, { status: 400 });
    }

    // Create contact request using service role (no auth required for contact form)
    const contactRequest = await base44.asServiceRole.entities.ContactRequest.create(sanitizedData);

    // Send email notification with escaped HTML content
    const serviceLabels = {
      web_development: "Desarrollo Web",
      ecommerce: "E-Commerce",
      both: "Desarrollo Web y E-Commerce",
      custom: "Solución Personalizada"
    };

    // Escape HTML for email body to prevent XSS in email clients
    const escapedName = escapeHtml(sanitizedData.name);
    const escapedEmail = escapeHtml(sanitizedData.email);
    const escapedCompany = escapeHtml(sanitizedData.company);
    const escapedPhone = escapeHtml(sanitizedData.phone);
    const escapedMessage = escapeHtml(sanitizedData.message).replace(/\n/g, '<br>');

    base44.asServiceRole.integrations.Core.SendEmail({
      to: "purawebsoluciones@gmail.com",
      from_name: escapedName,
      subject: `Consulta de ${escapedName}${escapedCompany ? ` - ${escapedCompany}` : ''}`,
      body: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #002B7F 0%, #0052CC 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; text-align: center; }
    .header h1 { margin: 0; font-size: 24px; }
    .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; border-top: none; }
    .field { margin-bottom: 20px; }
    .label { font-weight: 600; color: #002B7F; margin-bottom: 5px; display: block; }
    .value { color: #374151; }
    .message-box { background: white; padding: 20px; border-left: 4px solid #002B7F; border-radius: 4px; margin-top: 10px; }
    .footer { background: #f3f4f6; padding: 20px; text-align: center; color: #6b7280; font-size: 12px; border-radius: 0 0 8px 8px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📧 Nueva Consulta de Cliente</h1>
    </div>
    
    <div class="content">
      <div class="field">
        <span class="label">👤 Nombre:</span>
        <span class="value">${escapedName}</span>
      </div>
      
      <div class="field">
        <span class="label">✉️ Correo Electrónico:</span>
        <span class="value">${escapedEmail}</span>
      </div>
      
      ${escapedCompany ? `
      <div class="field">
        <span class="label">🏢 Empresa:</span>
        <span class="value">${escapedCompany}</span>
      </div>
      ` : ''}
      
      ${escapedPhone ? `
      <div class="field">
        <span class="label">📱 Teléfono:</span>
        <span class="value">${escapedPhone}</span>
      </div>
      ` : ''}
      
      ${sanitizedData.service_interest ? `
      <div class="field">
        <span class="label">💼 Servicio de Interés:</span>
        <span class="value">${serviceLabels[sanitizedData.service_interest] || sanitizedData.service_interest}</span>
      </div>
      ` : ''}
      
      <div class="field">
        <span class="label">💬 Mensaje:</span>
        <div class="message-box">${escapedMessage}</div>
      </div>
    </div>
    
    <div class="footer">
      Formulario de contacto - PuraWeb CR
    </div>
  </div>
</body>
</html>
      `
    }).catch(err => console.error("Error sending email notification:", err));

    return Response.json({ 
      success: true, 
      id: contactRequest.id 
    });

  } catch (error) {
    console.error("Error processing contact request:", error);
    return Response.json({ 
      error: 'Failed to process contact request' 
    }, { status: 500 });
  }
});