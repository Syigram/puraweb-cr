import React, { useState, useEffect } from "react";
import { useLanguage } from "@/components/LanguageContext";
import SEO from "@/components/SEO";
import { motion } from "framer-motion";
import { FileText, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

export default function TerminosCondiciones() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, [language]);

  const content = {
    es: {
      title: "Términos y Condiciones de Servicio",
      subtitle: "Las reglas y acuerdos para usar nuestros servicios",
      backButton: "Volver a Políticas",
      lastUpdate: "Última actualización: Enero 2026",
      intro: "Los presentes Términos y Condiciones regulan el uso de los servicios de desarrollo, mantenimiento y alojamiento web prestados por PuraWeb CR (en adelante, \"la Agencia\"). Al contratar nuestros servicios, el Cliente acepta de manera íntegra las siguientes cláusulas:",
      sections: [
        {
          title: "1. Modelo de Suscripción y Pago",
          content: "El servicio se presta bajo un modelo de suscripción mensual.\n\n• Acceso al Servicio: El pago de la mensualidad otorga al Cliente el derecho de uso de la plataforma y la publicación de su página web.\n• Cortes de Servicio: La falta de pago en las fechas acordadas resultará en la suspensión automática de la visualización del sitio web hasta que se regularice la situación."
        },
        {
          title: "2. Propiedad Intelectual y Derechos de Autor",
          content: "Es fundamental distinguir entre la estructura técnica y el material proporcionado por el Cliente:\n\n• Propiedad de la Agencia: La Agencia retiene en todo momento la propiedad intelectual, los derechos de autor, el código fuente, el diseño estructural, el software y cualquier desarrollo técnico realizado. El Cliente no adquiere derecho de propiedad sobre el sitio web, sino una licencia de uso mientras mantenga su suscripción activa.\n• Propiedad del Cliente: El Cliente es el único propietario de los contenidos específicos que haya creado o subido (textos, logotipos, fotografías propias, artículos de blog, datos de sus propios clientes)."
        },
        {
          title: "3. Política de Cancelación",
          content: "Queremos que nuestros clientes se queden por la calidad del servicio y no por obligación contractual.\n\n• Sin Permanencia: El Cliente puede cancelar su suscripción en cualquier momento.\n• Sin Penalizaciones: No existen multas ni cargos adicionales por la terminación anticipada del servicio. El servicio se mantendrá activo hasta el final del periodo ya pagado."
        },
        {
          title: "4. Política de Uso Justo (Fair Use) - Plan Empresarial",
          content: "Para el Plan Empresarial que permite la creación de páginas ilimitadas, se aplica una Política de Uso Justo para garantizar la estabilidad de la infraestructura:\n\n• Capacidad Técnica: El término \"ilimitado\" está sujeto a que las solicitudes no excedan las capacidades técnicas y físicas de la Agencia.\n• Límites de Abuso: Si el volumen de creación de páginas o el tráfico generado pone en riesgo la integridad de los servidores o la capacidad operativa del equipo humano de la Agencia, se notificará al Cliente para ajustar el flujo de trabajo o migrar a una solución de servidor dedicado.\n• Uso Razonable: El servicio está diseñado para el crecimiento orgánico del negocio del Cliente, no para la reventa masiva o el uso de scripts automatizados de generación de sitios."
        },
        {
          title: "5. Exportación de Datos al Finalizar el Servicio",
          content: "En caso de cancelación definitiva, la Agencia garantiza la portabilidad de la información del Cliente:\n\n• Contenido: El Cliente podrá solicitar la entrega de su información. La Agencia exportará en un formato de texto (CSV o JSON) la información de la base de datos correspondiente al contenido.\n• Multimedia: Se entregarán todas las imágenes y archivos multimedia que el Cliente haya subido originalmente a la plataforma.\n• Exclusión: Bajo ninguna circunstancia se entregará el código fuente, plantillas de diseño propietarias, scripts de bases de datos o archivos de configuración del sistema que sean propiedad intelectual de la Agencia.\n• Exportación: Al finalizar el servicio, el Cliente puede solicitar la exportación de su base de datos (texto en CSV/JSON) y archivos multimedia. La Agencia tendrá un plazo de hasta 30 días hábiles para completar esta solicitud tras la recepción del pedido."
        },
        {
          title: "6. Soporte y Mantenimiento",
          content: "• Soporte Ilimitado: Los clientes tienen acceso a consultas ilimitadas sobre el estado, uso y funcionamiento de su sitio web.\n• Tiempos de Respuesta (SLA): El tiempo de respuesta a las solicitudes variará según el SLA (Service Level Agreement) de cada plan contratado.\n• Horarios de Atención: El soporte se brindará en los días y horarios laborales de la Agencia, a excepción del Plan Empresarial, que cuenta con atención 24/7.\n• Corrección de Fallas: La Agencia es responsable de solucionar cualquier falla técnica o problema del sitio. El tiempo de ejecución dependerá de la complejidad de la situación.\n• Cambios Mensuales: Los clientes tienen derecho a una cantidad de horas específicas para cambios estéticos o funcionales. El Plan Empresarial goza de cambios ilimitados sujetos a la Política de Uso Justo.\n• Naturaleza de los Cambios: Se consideran \"cambios mensuales\" aquellas modificaciones estéticas o de funcionalidades nuevas que no se deban a errores de ejecución del sistema.\n• Ejemplos de Cambios: Incluye modificar textos, imágenes, colores, agregar/eliminar secciones y añadir/quitar funcionalidades.\n• Unidad Mínima de Tiempo: Cualquier solicitud de cambio mensual tendrá un cargo mínimo de 30 minutos, independientemente de si la ejecución toma menos tiempo (ej. cambiar una sola imagen).\n• Notificación de Complejidad: Ante cambios complejos, la Agencia notificará previamente al Cliente el tiempo estimado en horas para su ejecución.\n• Adelanto de Horas (Bolsa de Tiempo): Si un cambio excede las horas mensuales del plan, el cliente puede negociar el uso de horas de periodos futuros. Se permite agrupar hasta un máximo de 3 periodos. Ejemplo: Si el plan es de 5 horas, se pueden usar 15 horas para un proyecto grande, renunciando a nuevos cambios durante los siguientes 3 meses.\n• Horas Adicionales: Si la solicitud excede las horas disponibles (incluyendo las negociadas de futuros periodos), cada hora adicional tendrá un costo de 20,000 colones o $40 USD."
        },
        {
          title: "7. Planes y Facturación",
          content: "• Recurrencia: Todos los servicios se facturan mensualmente de forma recurrente. El ciclo de facturación inicia el día en que se realiza el primer pago.\n• Moneda de Pago: Los precios de los planes están fijados en Colones Costarricenses (CRC).\n• Procesamiento de Pagos: Por seguridad y eficiencia, los pagos se procesan de manera exclusiva a través de la plataforma internacional Stripe. La Agencia no almacena datos de tarjetas de crédito o débito en sus servidores.\n• Renovación Automática: Para garantizar la continuidad del servicio y evitar la caída del sitio web, las suscripciones se renuevan automáticamente al final de cada periodo mensual, a menos que el Cliente solicite la cancelación previa.\n• Garantía de Satisfacción Inicial: El pago de la primera mensualidad se realizará únicamente cuando el Cliente haya manifestado su conformidad con el diseño y la implementación inicial del sitio web. Una vez realizado este primer pago, se entiende que el servicio ha sido entregado a satisfacción.\n• Cancelación Voluntaria: El Cliente mantiene el derecho de cancelar su suscripción en cualquier momento. No existen cláusulas de permanencia ni penalizaciones por rescindir el contrato.\n• Política de Reembolsos: Al tratarse de un servicio de disponibilidad inmediata y mantenimiento continuo, no se ofrecen reembolsos por periodos de tiempo no utilizados ni por mensualidades ya cobradas antes de la solicitud de cancelación."
        },
        {
          title: "8. Exención de Responsabilidad y Limitación de Garantías",
          content: "• Contenido de Terceros: La Agencia no se hace responsable por la legalidad, veracidad o exactitud del contenido publicado por el Cliente en su sitio web. El Cliente asume toda la responsabilidad civil y penal derivada de la información, imágenes o datos que decida alojar, incluyendo la violación de derechos de autor o propiedad intelectual de terceros.\n• Ataques Cibernéticos y Seguridad: Aunque la Agencia implementa medidas de seguridad estándar para proteger los sitios web, el Cliente reconoce que ningún sistema en internet es 100% seguro. La Agencia no será responsable por daños, pérdida de datos o interrupciones del servicio causadas por ataques informáticos externos, virus, inyecciones de código malicioso (malware) o acciones de \"hackeo\" perpetradas por terceros.\n• Uso de la Cuenta: El Cliente es el único responsable de la custodia de sus credenciales de acceso. Cualquier acción realizada dentro de la plataforma con el usuario y contraseña del Cliente se considerará autorizada por este, eximiendo a la Agencia de responsabilidad por uso no autorizado.\n• Servicios de Terceros: La Agencia utiliza proveedores externos (como Stripe para pagos y Amazon Web Services o Google Cloud para alojamiento). La Agencia no se hace responsable por fallas técnicas, caídas de servidor o errores en las pasarelas de pago que sean directamente atribuibles a estos proveedores externos.\n• Pérdida de Ganancias: En ningún caso la Agencia será responsable ante el Cliente o terceros por daños indirectos, incidentales o consecuentes, incluyendo, entre otros, la pérdida de beneficios, lucro cesante, interrupción de negocios o pérdida de datos que surjan del uso o la imposibilidad de usar el servicio.\n• Indemnización: El Cliente acepta mantener indemne a la Agencia, sus empleados y colaboradores ante cualquier reclamo, demanda o gasto legal (incluyendo honorarios de abogados) que surja como consecuencia del uso indebido del servicio o el incumplimiento de estos Términos y Condiciones."
        },
        {
          title: "9. Implementación de Stripe en los Sitios Web",
          content: "Para los clientes que requieran funcionalidades de comercio electrónico o cobros en línea, la Agencia integrará la tecnología de Stripe, bajo las siguientes condiciones:\n\n• Modalidades de Cobro: La plataforma permite configurar tanto pagos únicos (ventas directas) como pagos recurrentes (modelos de suscripción), según las necesidades del Cliente.\n• Monedas Soportadas: Se aceptarán pagos en cualquier moneda compatible con Stripe, incluyendo Colones Costarricenses (CRC) y Dólares Estadounidenses (USD).\n• Pasarela de Pago: Stripe será el procesador exclusivo para transacciones con tarjetas de crédito y débito, garantizando estándares internacionales de seguridad.\n• Estructura de Comisiones de Stripe: El Cliente reconoce que Stripe, como proveedor externo, aplica sus propias tasas de comisión por cada transacción exitosa. Tomando como referencia las políticas de Stripe, las tasas estimadas son:\n  - Tarifa Base: 2.9% + $0.30 USD por transacción.\n  - Tarjetas Internacionales: Se aplica un 1.5% adicional para tarjetas emitidas fuera de los Estados Unidos.\n  - Conversión de Moneda: Debido a que Stripe opera principalmente en dólares, los cobros realizados en colones están sujetos a una comisión por conversión de divisa de entre el 1% y 2%.\n  - Transferencia Transfronteriza: El movimiento de fondos desde la cuenta de Stripe (EE.UU.) hacia una cuenta bancaria en Costa Rica conlleva un costo operativo adicional de entre el 1% y 2%.\n• Comisión Total Estimada (USD): Para ventas procesadas en Dólares, el Cliente debe prever una comisión total acumulada de aproximadamente el 6%.\n• Comisión Total Estimada (CRC): Para ventas procesadas en Colones, debido a los factores de conversión y transferencia, el Cliente debe prever una comisión total acumulada de aproximadamente el 8%.\n• Nota: La Agencia actúa únicamente como integrador técnico. Estas comisiones son retenidas directamente por Stripe y las entidades bancarias; la Agencia no percibe beneficio alguno de estas tasas de procesamiento."
        }
      ]
    },
    en: {
      title: "Terms and Conditions of Service",
      subtitle: "The rules and agreements for using our services",
      backButton: "Back to Policies",
      lastUpdate: "Last updated: January 2026",
      intro: "These Terms and Conditions govern the use of web development, maintenance, and hosting services provided by PuraWeb CR (hereinafter, \"the Agency\"). By contracting our services, the Client fully accepts the following clauses:",
      sections: [
        {
          title: "1. Acceptance of Terms",
          content: "By contracting our services or using our website, you accept these terms and conditions. If you do not agree, please do not use our services."
        },
        {
          title: "2. Services Offered",
          content: "PuraWeb CR offers web development services under a subscription model (WaaS - Web as a Service):\n\n• Website development and design\n• Premium hosting and continuous maintenance\n• Security and performance updates\n• Technical support according to contracted plan\n• Automatic backups and data recovery"
        },
        {
          title: "3. Plans and Billing",
          content: "• Plans are billed monthly on a recurring basis\n• Prices are in Costa Rican colones (CRC)\n• Payments are processed through Stripe\n• Subscriptions renew automatically\n• You can cancel at any time without penalty\n• We do not offer refunds for unused time"
        },
        {
          title: "4. Cancellation and Termination",
          content: "• You can cancel your subscription at any time from your user panel\n• Cancellation is effective at the end of the current billing period\n• After cancellation, your site remains active until the end of the paid period\n• You can export your content before cancellation\n• There are no early cancellation fees\n• We reserve the right to suspend or terminate services for breach of terms"
        },
        {
          title: "5. Acceptable Use",
          content: "You agree to:\n\n• Use our services legally and ethically\n• Not host illegal, offensive, or malicious content\n• Not perform activities that affect server performance\n• Respect intellectual property rights\n• Not attempt to access unauthorized systems or data\n• Comply with applicable laws in Costa Rica"
        },
        {
          title: "6. Intellectual Property",
          content: "• Code and design developed by PuraWeb CR is our property\n• Your content and data are your exclusive property\n• We grant you a license to use the website while maintaining your subscription\n• You can export your content at any time\n• PuraWeb CR trademarks and logos are registered property"
        },
        {
          title: "7. Warranties and Limitation of Liability",
          content: "• We guarantee loading times under 2 seconds\n• We guarantee 99.9% uptime (except scheduled maintenance)\n• We guarantee response within 24 business hours\n• We do not guarantee specific business results\n• We are not responsible for linked third-party content\n• Maximum liability is limited to your monthly subscription amount"
        },
        {
          title: "8. Service and Price Modifications",
          content: "We reserve the right to:\n\n• Modify these terms with 30 days prior notice\n• Update prices with 60 days advance notification\n• Suspend services for breach of terms\n• Improve or modify offered functionalities\n• Perform scheduled maintenance with prior notification"
        },
        {
          title: "9. Support and Maintenance",
          content: "• Technical support is provided according to the contracted plan\n• We respond within 24 hours on business days\n• Maintenance includes security and performance updates\n• Automatic backups are performed daily\n• Support does not cover development of new features not included in your plan"
        },
        {
          title: "10. Applicable Law and Jurisdiction",
          content: "These terms are governed by the laws of Costa Rica. Any dispute will be resolved in the courts of San José, Costa Rica. Both parties agree to submit to the exclusive jurisdiction of said courts."
        }
      ]
    }
  };

  const t = content[language];

  return (
    <>
      <SEO
        title={t.title}
        description={t.subtitle}
        canonical={`https://puraweb.cr/${language === 'es' ? 'terminos-condiciones' : 'terms-conditions'}`}
        language={language}
      />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <section className="pt-32 pb-16 px-6">
          <div className="max-w-4xl mx-auto">
            <Button
              variant="ghost"
              onClick={() => navigate(createPageUrl("Politicas"))}
              className="mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t.backButton}
            </Button>

            <motion.div
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-900 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <FileText className="w-4 h-4" />
                {language === 'es' ? 'Términos y Condiciones' : 'Terms and Conditions'}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent">
                  {t.title}
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {t.subtitle}
              </p>
            </motion.div>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">{t.title}</CardTitle>
                <p className="text-sm text-gray-500">{t.lastUpdate}</p>
              </CardHeader>
              <CardContent className="space-y-8">
                {t.intro && (
                  <div className="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <p className="text-gray-700 leading-relaxed">{t.intro}</p>
                  </div>
                )}
                {t.sections.map((section, idx) => (
                  <div key={idx}>
                    <h3 className="text-xl font-semibold mb-4 text-blue-900">{section.title}</h3>
                    <div className="text-gray-700 leading-relaxed space-y-3">
                      {section.content.split('\n').map((paragraph, pIdx) => {
                        if (!paragraph.trim()) return null;
                        
                        // Check if line contains a colon (subtitle format)
                        if (paragraph.includes(':') && !paragraph.startsWith('•')) {
                          const parts = paragraph.split(':');
                          return (
                            <p key={pIdx} className="leading-relaxed">
                              <span className="font-semibold text-gray-900">{parts[0]}:</span>
                              {parts.slice(1).join(':')}
                            </p>
                          );
                        }
                        
                        // Bullet points
                        if (paragraph.trim().startsWith('•')) {
                          return (
                            <p key={pIdx} className="pl-4 leading-relaxed flex items-start gap-2">
                              <span className="text-blue-600 font-bold flex-shrink-0">•</span>
                              <span>{paragraph.trim().substring(1).trim()}</span>
                            </p>
                          );
                        }
                        
                        // Indented sub-bullets (with -)
                        if (paragraph.trim().startsWith('-')) {
                          return (
                            <p key={pIdx} className="pl-8 leading-relaxed flex items-start gap-2">
                              <span className="text-blue-400 flex-shrink-0">-</span>
                              <span className="text-gray-600">{paragraph.trim().substring(1).trim()}</span>
                            </p>
                          );
                        }
                        
                        // Regular paragraphs
                        return (
                          <p key={pIdx} className="leading-relaxed">
                            {paragraph}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="mt-12 p-6 bg-blue-50 rounded-xl border border-blue-100">
              <h3 className="text-lg font-semibold mb-2 text-blue-900">
                {language === 'es' ? '¿Preguntas sobre los términos?' : 'Questions about the terms?'}
              </h3>
              <p className="text-gray-700 mb-4">
                {language === 'es' 
                  ? 'Si tienes alguna pregunta sobre nuestros términos y condiciones, no dudes en contactarnos.'
                  : 'If you have any questions about our terms and conditions, feel free to contact us.'}
              </p>
              <a 
                href="mailto:info@puraweb.cr" 
                className="text-blue-600 hover:text-blue-800 font-medium underline"
              >
                info@puraweb.cr
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}