import { env } from './env';
import OpenAI from 'openai';

const openaiClient = new OpenAI({ apiKey: env.OPENAI_API_KEY });

function withTimeout<T>(p: Promise<T>, ms = 8000): Promise<T> {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), ms);
  // @ts-ignore fetch promise generic
  return Promise.race([p, new Promise((_, rej) => ctrl.signal.addEventListener('abort', () => rej(new Error('timeout'))))]).finally(() => clearTimeout(t));
}

async function callJsPuter(prompt: string): Promise<string | null> {
  if (!env.JSPUTER_API_KEY) return null;
  try {
    const res = await withTimeout(
      fetch('https://api.jsputer.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${env.JSPUTER_API_KEY}`,
        },
        body: JSON.stringify({ model: 'jp-1', prompt }),
      })
    );
    const json = (await res.json()) as { text?: string };
    return json.text ?? null;
  } catch {
    return null;
  }
}

async function callLlm7(prompt: string): Promise<string | null> {
  if (!env.LLM7_API_KEY) return null;
  try {
    const res = await withTimeout(
      fetch('https://api.llm7.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${env.LLM7_API_KEY}`,
        },
        body: JSON.stringify({ model: 'llm7-chat', prompt }),
      })
    );
    const json = (await res.json()) as { message?: string };
    return json.message ?? null;
  } catch {
    return null;
  }
}

export async function generateAIResponse(prompt: string): Promise<string> {
  let reply = await callJsPuter(prompt);
  if (reply) return reply;

  reply = await callLlm7(prompt);
  if (reply) return reply;

  // fallback to OpenAI
  const completion = await openaiClient.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'user', content: prompt },
    ],
  });
  return completion.choices[0].message.content ?? '';
}