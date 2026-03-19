import { NextRequest, NextResponse } from 'next/server';

type AudioType = 'standard' | 'fast' | 'elderly';

// ElevenLabs voice IDs (multilingual v2 対応)
// env var で上書き可能
const VOICE_ID_STANDARD = process.env.ELEVENLABS_VOICE_STANDARD || 'EXAVITQu4vr4xnSDxMaL'; // Sarah
const VOICE_ID_ELDERLY = process.env.ELEVENLABS_VOICE_ELDERLY || 'VR6AewLTigWG4xSOukaG';  // Arnold (elderly male)

const VOICE_SETTINGS: Record<AudioType, {
  voice_id: string;
  stability: number;
  similarity_boost: number;
  speed: number;
}> = {
  standard: {
    voice_id: VOICE_ID_STANDARD,
    stability: 0.5,
    similarity_boost: 0.75,
    speed: 1.0,
  },
  fast: {
    voice_id: VOICE_ID_STANDARD,
    stability: 0.5,
    similarity_boost: 0.75,
    speed: 1.3,
  },
  elderly: {
    voice_id: VOICE_ID_ELDERLY,
    stability: 0.3,
    similarity_boost: 0.5,
    speed: 0.8,
  },
};

export async function GET(request: NextRequest) {
  const text = request.nextUrl.searchParams.get('text');
  const type = (request.nextUrl.searchParams.get('type') || 'standard') as AudioType;

  if (!text) {
    return NextResponse.json({ error: 'text is required' }, { status: 400 });
  }

  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'ELEVENLABS_API_KEY not configured' }, { status: 503 });
  }

  const settings = VOICE_SETTINGS[type] || VOICE_SETTINGS.standard;

  try {
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${settings.voice_id}`,
      {
        method: 'POST',
        headers: {
          'xi-api-key': apiKey,
          'Content-Type': 'application/json',
          Accept: 'audio/mpeg',
        },
        body: JSON.stringify({
          text,
          model_id: 'eleven_multilingual_v2',
          voice_settings: {
            stability: settings.stability,
            similarity_boost: settings.similarity_boost,
            speed: settings.speed,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('ElevenLabs error:', response.status, errorText);
      return NextResponse.json(
        { error: `ElevenLabs API error: ${response.status}` },
        { status: response.status }
      );
    }

    const audioBuffer = await response.arrayBuffer();

    return new NextResponse(audioBuffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        // テキスト＋タイプ単位で1日キャッシュ
        'Cache-Control': 'public, max-age=86400, immutable',
      },
    });
  } catch (err) {
    console.error('Audio generation failed:', err);
    return NextResponse.json({ error: 'Failed to generate audio' }, { status: 500 });
  }
}
