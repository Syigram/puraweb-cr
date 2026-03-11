export function buildKnowledgeBasePrompt({ language, knowledgeBaseEntries, conversationHistory, userMessage }) {
  const roleUser = language === "es" ? "Usuario" : "User";
  const roleAssistant = language === "es" ? "Asistente" : "Assistant";
  const knowledgeBaseContext = knowledgeBaseEntries.length
    ? knowledgeBaseEntries
        .map((entry) => `[${entry.category}] ${entry.title}\n${entry.content}`)
        .join("\n\n")
    : language === "es"
      ? "La base de conocimiento no tiene entradas publicadas."
      : "The knowledge base has no published entries.";

  if (language === "es") {
    return `Eres el asistente virtual de PuraWeb CR.

Debes responder solo usando la base de conocimiento proporcionada abajo.
- Sé amable, claro y conciso.
- No inventes información.
- Si la respuesta no está en la base de conocimiento, di que no está disponible y sugiere contactar al equipo.
- Prioriza precios, servicios, proceso, contacto y contenido corporativo cuando sea relevante.

BASE DE CONOCIMIENTO:
${knowledgeBaseContext}

HISTORIAL DE CONVERSACIÓN:
${conversationHistory || "Sin historial previo."}

${roleUser}: ${userMessage}

${roleAssistant}:`;
  }

  return `You are the virtual assistant for PuraWeb CR.

You must answer only with the knowledge base provided below.
- Be friendly, clear and concise.
- Do not invent information.
- If the answer is not in the knowledge base, say it is not available and suggest contacting the team.
- Prioritize pricing, services, process, contact and corporate content when relevant.

KNOWLEDGE BASE:
${knowledgeBaseContext}

CONVERSATION HISTORY:
${conversationHistory || "No previous history."}

${roleUser}: ${userMessage}

${roleAssistant}:`;
}