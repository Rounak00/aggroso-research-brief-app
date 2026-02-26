import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Groq from 'groq-sdk';

export async function GET() {
  const health = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    services: {
      server: { status: 'ok' },
      database: { status: 'checking' },
      llm: { status: 'checking' },
    },
  };

  // Check MongoDB
  try {
    await connectDB();
    health.services.database = { status: 'ok', message: 'MongoDB connected' };
  } catch (err) {
    health.services.database = { status: 'error', message: err.message };
    health.status = 'degraded';
  }

  // Check Groq
  try {
    if (!process.env.GROQ_API_KEY) throw new Error('GROQ_API_KEY not set');
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: 'ping' }],
      max_tokens: 5,
    });
    health.services.llm = { status: 'ok', message: 'Groq connected', model: 'llama-3.3-70b-versatile' };
  } catch (err) {
    health.services.llm = { status: 'error', message: err.message };
    health.status = 'degraded';
  }

  const httpStatus = health.status === 'ok' ? 200 : 207;
  return NextResponse.json(health, { status: httpStatus });
}