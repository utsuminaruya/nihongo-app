import { anthropic } from "@/lib/anthropic";
import { buildTutorPrompt } from "@/lib/ai-tutor-prompts";

interface TutorRequestBody {
  messages: { role: "user" | "assistant"; content: string }[];
  scenario: string;
  level: string;
  nativeLanguage: string;
}

const MOCK_RESPONSES: Record<string, string> = {
  free_talk:
    "こんにちは！私（わたし）はサクラ先生（せんせい）です。今日（きょう）は何（なに）について話（はな）しましょうか？\n\n**自由（じゆう）に話（はな）してくださいね！**\n\nどんなトピックでも大丈夫（だいじょうぶ）ですよ。最近（さいきん）の出来事（できごと）や、趣味（しゅみ）のことなど、何（なん）でも聞（き）かせてください。",
  hospital_reception:
    "こんにちは！今日（きょう）は病院（びょういん）の受付（うけつけ）で使（つか）う日本語（にほんご）を練習（れんしゅう）しましょう。\n\n**場面（ばめん）**: あなたは病院（びょういん）の受付（うけつけ）スタッフです。患者（かんじゃ）さんが来（き）ました。\n\n「いらっしゃいませ。本日（ほんじつ）はどうされましたか？」\n\nさあ、患者（かんじゃ）さんとして返事（へんじ）してみてください。",
  care_facility:
    "こんにちは！今日（きょう）は介護施設（かいごしせつ）での会話（かいわ）を練習（れんしゅう）しましょう。\n\n**場面（ばめん）**: あなたは介護施設（かいごしせつ）のスタッフです。利用者（りようしゃ）さんの朝（あさ）のケアを始（はじ）めます。\n\n「おはようございます、田中（たなか）さん。今日（きょう）のお体（からだ）の調子（ちょうし）はいかがですか？」\n\n利用者（りようしゃ）さんとして答（こた）えてみてください。",
  emergency_report:
    "こんにちは！今日（きょう）は緊急時（きんきゅうじ）の報告（ほうこく）を練習（れんしゅう）しましょう。\n\n**大切（たいせつ）なポイント**: 緊急時（きんきゅうじ）は「いつ・どこで・誰（だれ）が・何（なに）が起（お）きたか」を正確（せいかく）に伝（つた）えましょう。\n\n**場面（ばめん）**: 利用者（りようしゃ）さんが転倒（てんとう）しました。上司（じょうし）に報告（ほうこく）してください。\n\nどう報告（ほうこく）しますか？",
  handover:
    "こんにちは！今日（きょう）は申（もう）し送（おく）り（引（ひ）き継（つ）ぎ）の練習（れんしゅう）をしましょう。\n\n**申（もう）し送（おく）りの基本（きほん）**: \n1. 利用者（りようしゃ）さんの状態（じょうたい）\n2. 今日（きょう）の注意点（ちゅういてん）\n3. 次（つぎ）のシフトへの連絡事項（れんらくじこう）\n\n**場面（ばめん）**: 夜勤（やきん）が終（お）わり、日勤（にっきん）のスタッフに申（もう）し送（おく）りをします。\n\nさあ、始（はじ）めてみましょう。",
  daily_conversation:
    "こんにちは！今日（きょう）は日常会話（にちじょうかいわ）を練習（れんしゅう）しましょう。\n\n**場面（ばめん）**: あなたは日本（にほん）のコンビニに来（き）ました。店員（てんいん）さんが話（はな）しかけます。\n\n「いらっしゃいませ！ポイントカードはお持（も）ちですか？」\n\nさあ、日本語（にほんご）で答（こた）えてみてください。",
};

function getMockResponse(scenario: string): string {
  return (
    MOCK_RESPONSES[scenario] ||
    MOCK_RESPONSES["free_talk"]
  );
}

function createMockStream(scenario: string): ReadableStream {
  const text = getMockResponse(scenario);
  const encoder = new TextEncoder();

  return new ReadableStream({
    async start(controller) {
      // Simulate streaming by sending a few characters at a time
      const chunkSize = 5;
      for (let i = 0; i < text.length; i += chunkSize) {
        const chunk = text.slice(i, i + chunkSize);
        controller.enqueue(encoder.encode(chunk));
        await new Promise((resolve) => setTimeout(resolve, 30));
      }
      controller.close();
    },
  });
}

export async function POST(request: Request) {
  try {
    const body: TutorRequestBody = await request.json();
    const { messages, scenario, level, nativeLanguage } = body;

    // Check if ANTHROPIC_API_KEY is placeholder or not set
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey || apiKey === "your_anthropic_api_key" || apiKey === "placeholder") {
      // Return mock streaming response
      const stream = createMockStream(scenario);
      return new Response(stream, {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Transfer-Encoding": "chunked",
        },
      });
    }

    // Build the system prompt
    const systemPrompt = buildTutorPrompt({
      nativeLanguage: nativeLanguage || "English",
      currentLevel: level || "N5",
      targetLevel: level || "N4",
      topic: scenario || "free_talk",
    });

    // Call Claude API with streaming
    const stream = await anthropic.messages.stream({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system: systemPrompt,
      messages: messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
    });

    // Convert the Anthropic SDK stream to a ReadableStream
    const encoder = new TextEncoder();
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (
              event.type === "content_block_delta" &&
              event.delta.type === "text_delta"
            ) {
              controller.enqueue(encoder.encode(event.delta.text));
            }
          }
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (error) {
    console.error("AI Tutor API error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to get AI response" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
