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

// NOTA: Los precios y Stripe Price IDs ahora son administrables desde el panel
// de administración y se almacenan en la entidad PlanConfig (fuente única de verdad).
// No definir precios hardcodeados aquí para evitar inconsistencias.

// Traducciones de modos de pago para UI
export const PAYMENT_MODE_LABELS = {
  es: {
    [PAYMENT_MODES.SUBSCRIPTION]: 'Suscripción',
    [PAYMENT_MODES.ONETIME]: 'Adelanto (50%)'
  },
  en: {
    [PAYMENT_MODES.SUBSCRIPTION]: 'Subscription',
    [PAYMENT_MODES.ONETIME]: 'Deposit (50%)'
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