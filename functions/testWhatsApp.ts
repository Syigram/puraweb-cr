import { createClientFromRequest } from 'npm:@base44/sdk@0.8.4';

const WHATSAPP_ACCESS_TOKEN = Deno.env.get('WHATSAPP_ACCESS_TOKEN');
const WHATSAPP_PHONE_NUMBER_ID = Deno.env.get('WHATSAPP_PHONE_NUMBER_ID');

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { phone, planName, amount, paymentType } = await req.json();

    if (!phone) {
      return Response.json({ error: 'Phone number is required' }, { status: 400 });
    }

    // Format phone number (remove spaces, hyphens, etc.)
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
    
    // Ensure it starts with +
    const formattedPhone = cleanPhone.startsWith('+') ? cleanPhone : `+${cleanPhone}`;

    // Send WhatsApp template
    const whatsappUrl = `https://graph.facebook.com/v21.0/${WHATSAPP_PHONE_NUMBER_ID}/messages`;
    
    const messageBody = {
      messaging_product: "whatsapp",
      to: formattedPhone,
      type: "template",
      template: {
        name: "payment_confirmation",
        language: {
          code: "es"
        },
        components: [
          {
            type: "body",
            parameters: [
              {
                type: "text",
                text: planName || "Plan Profesional"
              },
              {
                type: "text",
                text: amount || "₡100,000"
              },
              {
                type: "text",
                text: paymentType || "Suscripción Mensual"
              }
            ]
          }
        ]
      }
    };

    const whatsappResponse = await fetch(whatsappUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(messageBody)
    });

    const whatsappData = await whatsappResponse.json();

    if (!whatsappResponse.ok) {
      console.error('WhatsApp API error:', whatsappData);
      return Response.json({ 
        error: 'Failed to send WhatsApp message',
        details: whatsappData 
      }, { status: 500 });
    }

    return Response.json({ 
      success: true,
      message: `WhatsApp sent to ${formattedPhone}`,
      whatsappResponse: whatsappData
    });

  } catch (error) {
    console.error('Error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});