import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { SYSTEM_PROMPT, buildUserPrompt } from '@/lib/prompt';
import type { CategoryKey, JlptLevel, UILanguage } from '@/lib/types';

const VALID_CATEGORIES: CategoryKey[] = [
  'hospital', 'government', 'daily', 'work',
  'care', 'phone', 'transport', 'emergency',
];
const VALID_LEVELS: JlptLevel[] = ['N5', 'N4', 'N3'];
const VALID_LANGUAGES: UILanguage[] = ['vi', 'en', 'tl', 'id', 'my', 'ja'];

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'API key not configured.' }, { status: 500 });
  }

  let body: { userInput?: string; category?: string; level?: string; language?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request data.' }, { status: 400 });
  }

  const { userInput, category, level, language } = body;

  if (!userInput || typeof userInput !== 'string' || userInput.trim().length === 0) {
    return NextResponse.json({ error: 'Please enter your problem.' }, { status: 400 });
  }
  if (userInput.length > 2000) {
    return NextResponse.json({ error: 'Input too long. Please shorten it.' }, { status: 400 });
  }

  const validCategory: CategoryKey = VALID_CATEGORIES.includes(category as CategoryKey)
    ? (category as CategoryKey)
    : 'daily';
  const validLevel: JlptLevel = VALID_LEVELS.includes(level as JlptLevel)
    ? (level as JlptLevel)
    : 'N4';
  const validLanguage: UILanguage = VALID_LANGUAGES.includes(language as UILanguage)
    ? (language as UILanguage)
    : 'vi';

  const anthropic = new Anthropic({ apiKey });

  try {
    const stream = anthropic.messages.stream({
      model: 'claude-opus-4-6',
      max_tokens: 4096,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: buildUserPrompt(userInput.trim(), validLanguage, validCategory, validLevel),
        },
      ],
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (
              event.type === 'content_block_delta' &&
              event.delta.type === 'text_delta'
            ) {
              controller.enqueue(encoder.encode(event.delta.text));
            }
          }
        } catch (err) {
          const msg = err instanceof Error ? err.message : 'Unknown error';
          controller.enqueue(encoder.encode(JSON.stringify({ error: msg })));
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (err) {
    if (err instanceof Anthropic.APIError && err.status === 429) {
      return NextResponse.json({ error: 'Too many requests. Please wait a moment.' }, { status: 429 });
    }
    return NextResponse.json({ error: 'AI error. Please try again.' }, { status: 500 });
  }
}
