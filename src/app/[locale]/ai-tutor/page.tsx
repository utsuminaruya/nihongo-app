"use client";

import { useState, useCallback } from "react";
import ScenarioSelector from "@/components/ai-tutor/ScenarioSelector";
import ChatInterface from "@/components/ai-tutor/ChatInterface";
import FeedbackReport from "@/components/ai-tutor/FeedbackReport";
import { useUserStore } from "@/stores/user-store";

type View = "scenarios" | "chat" | "feedback";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface FeedbackData {
  score: number;
  strengths: string[];
  improvements: string[];
  vocabulary: string[];
  grammarPoints: string[];
}

function generateFeedback(messages: Message[]): FeedbackData {
  // Analyze conversation for basic feedback
  const userMessages = messages.filter((m) => m.role === "user");
  const messageCount = userMessages.length;

  // Generate score based on conversation length
  const baseScore = Math.min(60 + messageCount * 5, 95);

  // Extract potential vocabulary from assistant messages
  const assistantContent = messages
    .filter((m) => m.role === "assistant")
    .map((m) => m.content)
    .join(" ");

  // Find words in ruby/furigana patterns
  const vocabMatches = assistantContent.match(
    /[\u4e00-\u9faf\u3400-\u4dbf]+[（(][^）)]+[）)]/g
  );
  const vocabulary = vocabMatches
    ? Array.from(new Set(vocabMatches)).slice(0, 8)
    : [];

  return {
    score: baseScore,
    strengths: [
      messageCount >= 3
        ? "Active participation in the conversation"
        : "Good start to the conversation",
      "Willingness to practice Japanese",
      messageCount >= 5 ? "Extended dialogue maintained" : "Engaged with the tutor",
    ],
    improvements: [
      "Try using longer sentences",
      "Practice using keigo (polite forms)",
      "Incorporate new vocabulary from the lesson",
    ],
    vocabulary,
    grammarPoints: [
      "~てください (request form)",
      "~ています (ongoing action)",
      "~ましょう (let's ~)",
    ],
  };
}

export default function AiTutorPage() {
  const [view, setView] = useState<View>("scenarios");
  const [selectedScenario, setSelectedScenario] = useState<string>("");
  const [feedback, setFeedback] = useState<FeedbackData | null>(null);
  const profile = useUserStore((s) => s.user);

  const handleSelectScenario = useCallback((scenarioId: string) => {
    setSelectedScenario(scenarioId);
    setView("chat");
  }, []);

  const handleBack = useCallback(() => {
    setView("scenarios");
    setSelectedScenario("");
  }, []);

  const handleEndChat = useCallback((messages: Message[]) => {
    const generatedFeedback = generateFeedback(messages);
    setFeedback(generatedFeedback);
    setView("feedback");
  }, []);

  const handleNewChat = useCallback(() => {
    setView("scenarios");
    setSelectedScenario("");
    setFeedback(null);
  }, []);

  if (view === "chat") {
    return (
      <ChatInterface
        scenario={selectedScenario}
        level={profile?.currentLevel || "N5"}
        nativeLanguage={profile?.nativeLanguage || "English"}
        onBack={handleBack}
        onEndChat={handleEndChat}
      />
    );
  }

  if (view === "feedback" && feedback) {
    return <FeedbackReport feedback={feedback} onNewChat={handleNewChat} />;
  }

  return <ScenarioSelector onSelect={handleSelectScenario} />;
}
