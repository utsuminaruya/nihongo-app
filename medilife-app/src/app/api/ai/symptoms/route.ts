import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { message, locale, history } = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Anthropic APIキーが設定されている場合はClaude使用
    if (process.env.ANTHROPIC_API_KEY) {
      const { anthropic, SYMPTOM_CHECKER_PROMPT } = await import('@/lib/anthropic');

      const messages = [
        ...(history || []).slice(-8).map((msg: { role: string; content: string }) => ({
          role: msg.role as 'user' | 'assistant',
          content: msg.content,
        })),
        { role: 'user' as const, content: message },
      ];

      const response = await anthropic.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        system: `${SYMPTOM_CHECKER_PROMPT}\n\nユーザーの言語: ${locale}`,
        messages,
      });

      const reply = response.content[0].type === 'text' ? response.content[0].text : '';

      return NextResponse.json({ reply });
    }

    // デモ応答
    const demoReplies: Record<string, string> = {
      ja: `「${message}」の症状について分析しました。\n\n📋 考えられる診療科：内科（ないか）\n\n🏥 日本語フレーズ：\n・「${message}があります」\n・「いつからですか？」→ 症状が始まった時期を伝えましょう\n\n⚠️ これは参考情報です。必ず医師の診察を受けてください。\n\n近くの多言語対応病院を検索しますか？`,
      vi: `Phân tích triệu chứng "${message}":\n\n📋 Khoa đề xuất: Nội khoa (ないか - Naika)\n\n🏥 Cụm từ tiếng Nhật:\n・「${message}があります」\n\n⚠️ Đây chỉ là thông tin tham khảo. Hãy đến bác sĩ khám.\n\nBạn muốn tìm bệnh viện hỗ trợ đa ngôn ngữ gần đây?`,
      en: `Analysis of "${message}":\n\n📋 Suggested department: Internal Medicine (内科 - Naika)\n\n🏥 Japanese phrases:\n・"${message} があります" (I have ${message})\n\n⚠️ This is for reference only. Please consult a doctor.\n\nWould you like to search for nearby multilingual hospitals?`,
    };

    const reply = demoReplies[locale] || demoReplies['en'];
    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Symptom checker error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
