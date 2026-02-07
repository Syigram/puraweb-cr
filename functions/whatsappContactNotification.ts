import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

const whatsappAccessToken = Deno.env.get("WHATSAPP_ACCESS_TOKEN");
const whatsappPhoneNumberId = Deno.env.get("WHATSAPP_PHONE_NUMBER_ID");
const copyPhoneNumber = Deno.env.get("WHATSAPP_COPY_PHONE_NUMBER");

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json();
    const { name, phone, email, message } = body;

    if (!name || !email || !message) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!whatsappAccessToken || !whatsappPhoneNumberId || !copyPhoneNumber) {
      console.log('⚠️ WhatsApp credentials not configured, skipping notification');
      return Response.json({ success: false, reason: 'WhatsApp not configured' });
    }

    // Format the destination phone number
    let formattedPhone = copyPhoneNumber.replace(/[\s\-\(\)]/g, '');
    if (formattedPhone.startsWith('+')) {
      formattedPhone = formattedPhone.substring(1);
    }

    const response = await fetch(
      `https://graph.facebook.com/v22.0/${whatsappPhoneNumberId}/messages`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${whatsappAccessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: formattedPhone,
          type: 'template',
          template: {
            name: 'contacto_notificacion_puraweb',
            language: { code: 'es' },
            components: [
              {
                type: 'body',
                parameters: [
                  { type: 'text', text: name },
                  { type: 'text', text: phone || 'No proporcionado' },
                  { type: 'text', text: email },
                  { type: 'text', text: message }
                ]
              }
            ]
          }
        })
      }
    );

    const result = await response.json();

    if (response.ok) {
      console.log(`✅ WhatsApp contact notification sent to ${formattedPhone}`);
      return Response.json({ success: true });
    } else {
      console.error('❌ WhatsApp API error:', result);
      return Response.json({ success: false, error: result });
    }
  } catch (error) {
    console.error('❌ Error sending WhatsApp contact notification:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});