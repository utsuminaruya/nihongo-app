import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { message, locale, category, history } = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Anthropic APIキーが設定されている場合はClaude使用
    if (process.env.ANTHROPIC_API_KEY) {
      const { anthropic, MEDI_SYSTEM_PROMPT } = await import('@/lib/anthropic');

      const messages = [
        ...(history || []).map((msg: { role: string; content: string }) => ({
          role: msg.role as 'user' | 'assistant',
          content: msg.content,
        })),
        { role: 'user' as const, content: message },
      ];

      const response = await anthropic.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        system: `${MEDI_SYSTEM_PROMPT}\n\nユーザーの言語: ${locale}\nカテゴリ: ${category}`,
        messages,
      });

      const reply = response.content[0].type === 'text' ? response.content[0].text : '';

      return NextResponse.json({ reply });
    }

    // APIキー未設定時はデモ応答
    const demoReplies: Record<string, string> = {
      ja: `ご質問ありがとうございます。「${message}」についてお答えします。\n\n現在デモモードで動作しています。実際のAI応答を利用するには、ANTHROPIC_API_KEYを設定してください。\n\nMediLifeでは、ビザ、医療、生活、仕事、日本語学習など、日本での生活に関するあらゆる相談に対応しています。`,
      vi: `Cảm ơn câu hỏi của bạn. Về "${message}":\n\nHiện đang chạy ở chế độ demo. Để sử dụng AI thực, vui lòng cấu hình ANTHROPIC_API_KEY.\n\nMediLife hỗ trợ mọi vấn đề liên quan đến cuộc sống tại Nhật Bản.`,
      en: `Thank you for your question about "${message}".\n\nCurrently running in demo mode. To use the real AI, please configure ANTHROPIC_API_KEY.\n\nMediLife supports all aspects of life in Japan including visa, healthcare, daily life, and more.`,
    };

    const reply = demoReplies[locale] || demoReplies['en'];
    return NextResponse.json({ reply });
  } catch (error) {
    console.error('AI Assistant error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
