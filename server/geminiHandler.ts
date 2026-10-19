import { GoogleGenAI } from '@google/genai';
import type { IncomingMessage, ServerResponse } from 'http';

export async function handleGeminiApi(req: IncomingMessage, res: ServerResponse) {
  // Set CORS and JSON content type headers
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.end(JSON.stringify({ error: 'Method not allowed. Use POST.' }));
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    res.statusCode = 503;
    res.end(
      JSON.stringify({
        error: 'GEMINI_API_KEY environment variable is not configured on the server.',
        fallbackAvailable: true,
      })
    );
    return;
  }

  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });

  req.on('end', async () => {
    try {
      const parsedBody = JSON.parse(body || '{}');
      const { prompt, systemInstruction } = parsedBody;

      if (!prompt || typeof prompt !== 'string') {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: 'Valid prompt string is required in request body.' }));
        return;
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          systemInstruction:
            systemInstruction ||
            'You are the career AI engine for Saarthi AI (created by Manav Parmar) — "Your Career. Your Journey. Your Saarthi." Respond strictly with valid JSON conforming to the requested schema. Do not output markdown code fences or conversational pleasantries.',
          responseMimeType: 'application/json',
          temperature: 0.25,
        },
      });

      const text = response.text || '';
      res.statusCode = 200;
      res.end(JSON.stringify({ content: text }));
    } catch (err: any) {
      console.error('Gemini API Error in Server Route:', err);
      res.statusCode = 500;
      res.end(
        JSON.stringify({
          error: err?.message || 'Failed to generate content with Gemini 3.8 Flash.',
          fallbackAvailable: true,
        })
      );
    }
  });
}
