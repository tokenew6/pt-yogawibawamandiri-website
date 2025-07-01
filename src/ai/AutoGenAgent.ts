/**
 * AutoGenAgent – minimal stub integration layer
 * In real environment, this would wrap Cognition Labs' Devin/AutoGen or OpenAI functions.
 * Here we expose runAgentTask() that receives a goal string and optional context.
 * The actual implementation can later be swapped with real AutoGen SDK calls.
 */

import OpenAI from 'openai';
import 'dotenv/config';
import { env } from './env';

export interface AgentTaskOptions {
  goal: string;
  context?: Record<string, unknown>;
}

export interface AgentResult {
  success: boolean;
  output: string;
}

const openai = new OpenAI({ apiKey: env.OPENAI_API_KEY });

export async function runAgentTask({ goal, context }: AgentTaskOptions): Promise<AgentResult> {
  console.info('[AutoGenAgent] Running task:', goal);

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    temperature: 0,
    messages: [
      { role: 'system', content: 'You are an autonomous software engineer assistant.' },
      { role: 'user', content: `Goal: ${goal}\nContext: ${JSON.stringify(context ?? {})}` },
    ],
  });

  const output = completion.choices[0].message.content ?? '';

  return {
    success: true,
    output,
  };
}