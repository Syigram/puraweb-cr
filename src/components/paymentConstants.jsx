
// Constantes estandarizadas para tipos de pago y planes
// Usar estos valores en toda la aplicación para evitar inconsistencias

export const PAYMENT_MODES = {
  SUBSCRIPTION: 'subscription',
  ONETIME: 'onetime'
};

export const PLAN_IDS = {
  BASIC: 'basic',
  PROFESSIONAL: 'professional',
  BUSINESS: 'business'
};

export const PAYMENT_STATUS = {
  PENDING: 'pending',
  SUCCEEDED: 'succeeded',
  FAILED: 'failed',
  CANCELED: 'canceled'
};

// Mapeo de IDs de plan a Price IDs de Stripe
export const STRIPE_PRICE_IDS = {
  [PLAN_IDS.BASIC]: 'price_1Sl3etFA0Fkjjug3MNf5Sj9r',
  [PLAN_IDS.PROFESSIONAL]: 'price_1SUE2DFA0Fkjjug3euWqaW5c',
  [PLAN_IDS.BUSINESS]: 'price_1SUE32FA0Fkjjug3khKfal6N'
};

// Precios de planes en centavos CRC
export const PLAN_AMOUNTS = {
  [PLAN_IDS.BASIC]: 6000000,      // 60,000 CRC
  [PLAN_IDS.PROFESSIONAL]: 10000000, // 100,000 CRC
  [PLAN_IDS.BUSINESS]: 15000000   // 150,000 CRC
};

// Traducciones de modos de pago para UI
export const PAYMENT_MODE_LABELS = {
  es: {
    [PAYMENT_MODES.SUBSCRIPTION]: 'Suscripción',
    [PAYMENT_MODES.ONETIME]: 'Pago Único'
  },
  en: {
    [PAYMENT_MODES.SUBSCRIPTION]: 'Subscription',
    [PAYMENT_MODES.ONETIME]: 'One-Time'
  }
};

// Traducciones de nombres de planes para UI
export const PLAN_LABELS = {
  es: {
    [PLAN_IDS.BASIC]: 'Básico',
    [PLAN_IDS.PROFESSIONAL]: 'Profesional',
    [PLAN_IDS.BUSINESS]: 'Empresa'
  },
  en: {
    [PLAN_IDS.BASIC]: 'Basic',
    [PLAN_IDS.PROFESSIONAL]: 'Professional',
    [PLAN_IDS.BUSINESS]: 'Business'
  }
};
