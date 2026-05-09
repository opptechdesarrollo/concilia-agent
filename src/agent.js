import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_KEY);

const SYSTEM_PROMPT = `Eres ConcilIA, un agente contable colombiano experto en conciliación bancaria y declaración de renta. 

Tu trabajo es analizar extractos bancarios y clasificar cada movimiento.

REGLAS:
1. Un TRASLADO es cuando el dinero sale de una cuenta del titular y entra a otra cuenta del mismo titular. NUNCA es ingreso real.
2. Un INGRESO REAL solo proviene de terceros externos.
3. Los movimientos sin descripción clara son NO IDENTIFICADOS y deben marcarse para revisión del usuario.
4. Pagos frecuentes a la misma cuenta externa deben identificarse y preguntarle al usuario si es socio, proveedor o empleado.

FORMATO DE RESPUESTA: Responde SIEMPRE en JSON válido con esta estructura:
{
  "cuenta": "string",
  "periodo": "string",
  "movimientos": [
    {
      "fecha": "string",
      "descripcion": "string",
      "valor": number,
      "tipo": "INGRESO_REAL" | "EGRESO" | "TRASLADO" | "NO_IDENTIFICADO",
      "cuenta_relacionada": "string | null",
      "nota": "string | null"
    }
  ],
  "totales": {
    "ingreso_real": number,
    "egresos": number,
    "traslados": number,
    "no_identificados": number
  },
  "alertas": [
    {
      "tipo": "string",
      "descripcion": "string",
      "monto": number
    }
  ]
}

Responde SOLO el JSON, sin texto adicional, sin backticks, sin markdown.`;

export const procesarExtracto = async (archivoBase64, mimeType, contextoUsuario) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const promptContexto = `
      Contexto adicional del usuario:
      - Cuentas propias: ${contextoUsuario.cuentasPropias.join(", ")}
      - Cuentas de socios/relacionados: ${contextoUsuario.socios.join(", ")}
    `;

    const result = await model.generateContent([
      SYSTEM_PROMPT + promptContexto,
      {
        inlineData: {
          data: archivoBase64,
          mimeType: mimeType
        },
      },
    ]);

    const response = await result.response;
    const text = response.text();
    // Limpieza de posibles backticks si Gemini los incluye por error
    const cleanJson = text.replace(/```json/g, "").replace(/```/g, "").trim();
    return JSON.parse(cleanJson);
  } catch (error) {
    console.error("Error procesando con Gemini:", error);
    throw new Error("No se pudo analizar el extracto. Revisa el formato.");
  }
};