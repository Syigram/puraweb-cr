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
          title: "1. Subscription and Payment Model",
          content: "The service is provided under a monthly subscription model.\n\n• Service Access: Payment of the monthly fee grants the Client the right to use the platform and publish their website.\n• Service Interruptions: Failure to pay on agreed dates will result in automatic suspension of website visibility until the situation is regularized."
        },
        {
          title: "2. Intellectual Property and Copyright",
          content: "It is essential to distinguish between the technical structure and the material provided by the Client:\n\n• Agency Property: The Agency retains at all times the intellectual property, copyright, source code, structural design, software and any technical development carried out. The Client does not acquire ownership rights to the website, but a license to use it while maintaining their active subscription.\n• Client Property: The Client is the sole owner of specific content they have created or uploaded (texts, logos, their own photographs, blog articles, their own customer data)."
        },
        {
          title: "3. Cancellation Policy",
          content: "We want our clients to stay because of service quality and not because of contractual obligation.\n\n• No Commitment: The Client can cancel their subscription at any time.\n• No Penalties: There are no fines or additional charges for early termination of service. The service will remain active until the end of the already paid period."
        },
        {
          title: "4. Fair Use Policy - Business Plan",
          content: "For the Business Plan that allows unlimited page creation, a Fair Use Policy applies to ensure infrastructure stability:\n\n• Technical Capacity: The term \"unlimited\" is subject to requests not exceeding the Agency's technical and physical capabilities.\n• Abuse Limits: If the volume of page creation or generated traffic puts at risk the integrity of servers or the operational capacity of the Agency's human team, the Client will be notified to adjust the workflow or migrate to a dedicated server solution.\n• Reasonable Use: The service is designed for organic business growth of the Client, not for massive resale or use of automated site generation scripts."
        },
        {
          title: "5. Data Export Upon Service Termination",
          content: "In case of definitive cancellation, the Agency guarantees the portability of the Client's information:\n\n• Content: The Client may request delivery of their information. The Agency will export in text format (CSV or JSON) the database information corresponding to the content.\n• Multimedia: All images and multimedia files that the Client originally uploaded to the platform will be delivered.\n• Exclusion: Under no circumstances will source code, proprietary design templates, database scripts or system configuration files that are intellectual property of the Agency be delivered.\n• Export: Upon service termination, the Client can request export of their database (text in CSV/JSON) and multimedia files. The Agency will have up to 30 business days to complete this request after receiving the order."
        },
        {
          title: "6. Support and Maintenance",
          content: "• Unlimited Support: Clients have access to unlimited inquiries about the status, use and operation of their website.\n• Response Times (SLA): Response time to requests will vary according to the SLA (Service Level Agreement) of each contracted plan.\n• Service Hours: Support will be provided during the Agency's business days and hours, except for the Business Plan, which has 24/7 service.\n• Bug Fixes: The Agency is responsible for fixing any technical failure or site problem. Execution time will depend on the complexity of the situation.\n• Monthly Changes: Clients are entitled to a specific number of hours for aesthetic or functional changes. The Business Plan enjoys unlimited changes subject to the Fair Use Policy.\n• Nature of Changes: \"Monthly changes\" are considered those aesthetic modifications or new functionalities that are not due to system execution errors.\n• Examples of Changes: Includes modifying texts, images, colors, adding/removing sections and adding/removing functionalities.\n• Minimum Time Unit: Any monthly change request will have a minimum charge of 30 minutes, regardless of whether execution takes less time (e.g. changing a single image).\n• Complexity Notification: For complex changes, the Agency will notify the Client in advance of the estimated time in hours for execution.\n• Hour Advance (Time Bank): If a change exceeds the monthly hours of the plan, the client can negotiate the use of hours from future periods. Up to a maximum of 3 periods can be grouped. Example: If the plan is 5 hours, 15 hours can be used for a large project, waiving new changes for the next 3 months.\n• Additional Hours: If the request exceeds available hours (including negotiated future periods), each additional hour will cost 20,000 colones or $40 USD."
        },
        {
          title: "7. Plans and Billing",
          content: "• Recurrence: All services are billed monthly on a recurring basis. The billing cycle starts on the day the first payment is made.\n• Payment Currency: Plan prices are fixed in Costa Rican Colones (CRC).\n• Payment Processing: For security and efficiency, payments are processed exclusively through the international Stripe platform. The Agency does not store credit or debit card data on its servers.\n• Automatic Renewal: To ensure service continuity and avoid website downtime, subscriptions automatically renew at the end of each monthly period, unless the Client requests prior cancellation.\n• Initial Satisfaction Guarantee: Payment of the first monthly fee will be made only when the Client has expressed satisfaction with the initial design and implementation of the website. Once this first payment is made, it is understood that the service has been delivered satisfactorily.\n• Voluntary Cancellation: The Client maintains the right to cancel their subscription at any time. There are no permanence clauses or penalties for terminating the contract.\n• Refund Policy: As this is an immediate availability and continuous maintenance service, no refunds are offered for unused time periods or for monthly fees already charged before the cancellation request."
        },
        {
          title: "8. Disclaimer and Limitation of Warranties",
          content: "• Third Party Content: The Agency is not responsible for the legality, veracity or accuracy of content published by the Client on their website. The Client assumes all civil and criminal liability derived from information, images or data they choose to host, including violation of copyright or intellectual property of third parties.\n• Cyber Attacks and Security: Although the Agency implements standard security measures to protect websites, the Client acknowledges that no system on the internet is 100% secure. The Agency will not be responsible for damages, data loss or service interruptions caused by external computer attacks, viruses, malicious code injections (malware) or \"hacking\" actions perpetrated by third parties.\n• Account Use: The Client is solely responsible for safeguarding their access credentials. Any action performed within the platform with the Client's username and password will be considered authorized by them, exempting the Agency from responsibility for unauthorized use.\n• Third Party Services: The Agency uses external providers (such as Stripe for payments and Amazon Web Services or Google Cloud for hosting). The Agency is not responsible for technical failures, server outages or payment gateway errors that are directly attributable to these external providers.\n• Loss of Profits: In no case will the Agency be responsible to the Client or third parties for indirect, incidental or consequential damages, including, among others, loss of profits, loss of earnings, business interruption or data loss arising from use or inability to use the service.\n• Indemnification: The Client agrees to hold harmless the Agency, its employees and collaborators from any claim, demand or legal expense (including attorney fees) arising as a consequence of misuse of the service or breach of these Terms and Conditions."
        },
        {
          title: "9. Stripe Implementation on Websites",
          content: "For clients who require e-commerce functionalities or online payments, the Agency will integrate Stripe technology, under the following conditions:\n\n• Payment Methods: The platform allows configuring both one-time payments (direct sales) and recurring payments (subscription models), according to the Client's needs.\n• Supported Currencies: Payments will be accepted in any currency compatible with Stripe, including Costa Rican Colones (CRC) and US Dollars (USD).\n• Payment Gateway: Stripe will be the exclusive processor for credit and debit card transactions, guaranteeing international security standards.\n• Stripe Commission Structure: The Client acknowledges that Stripe, as an external provider, applies its own commission rates for each successful transaction. Taking Stripe policies as reference, estimated rates are:\n  - Base Rate: 2.9% + $0.30 USD per transaction.\n  - International Cards: An additional 1.5% applies for cards issued outside the United States.\n  - Currency Conversion: Because Stripe operates primarily in dollars, charges made in colones are subject to a currency conversion commission of between 1% and 2%.\n  - Cross-Border Transfer: Moving funds from the Stripe account (USA) to a bank account in Costa Rica carries an additional operating cost of between 1% and 2%.\n• Total Estimated Commission (USD): For sales processed in Dollars, the Client should anticipate a total accumulated commission of approximately 6%.\n• Total Estimated Commission (CRC): For sales processed in Colones, due to conversion and transfer factors, the Client should anticipate a total accumulated commission of approximately 8%.\n• Note: The Agency acts solely as a technical integrator. These commissions are retained directly by Stripe and banking entities; the Agency does not receive any benefit from these processing rates."
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
                      {section.content.split('\n').map((line, lineIdx) => {
                        // Format lines with colons (e.g., "Title:" becomes bold)
                        const parts = line.split(':');
                        if (parts.length > 1 && line.startsWith('•')) {
                          return (
                            <p key={lineIdx} className="pl-4">
                              <span className="font-semibold text-gray-900">{parts[0]}:</span>
                              {parts.slice(1).join(':')}
                            </p>
                          );
                        } else if (parts.length > 1 && !line.includes('http') && parts[0].length < 80) {
                          return (
                            <p key={lineIdx}>
                              <span className="font-semibold text-gray-900">{parts[0]}:</span>
                              {parts.slice(1).join(':')}
                            </p>
                          );
                        }
                        return line ? <p key={lineIdx}>{line}</p> : <br key={lineIdx} />;
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