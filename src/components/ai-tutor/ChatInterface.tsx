"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Send, ArrowLeft, Square } from "lucide-react";
import ChatMessage from "./ChatMessage";
import VoiceInput from "./VoiceInput";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface ChatInterfaceProps {
  scenario: string;
  level: string;
  nativeLanguage: string;
  onBack: () => void;
  onEndChat: (messages: Message[]) => void;
}

export default function ChatInterface({
  scenario,
  level,
  nativeLanguage,
  onBack,
  onEndChat,
}: ChatInterfaceProps) {
  const t = useTranslations("aiTutor");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [streamingContent, setStreamingContent] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Scroll to bottom when messages change
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingContent, scrollToBottom]);

  // Send initial greeting when component mounts
  useEffect(() => {
    const initChat = async () => {
      setIsLoading(true);
      setStreamingContent("");

      try {
        const controller = new AbortController();
        abortControllerRef.current = controller;

        const response = await fetch("/api/ai/tutor", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [{ role: "user", content: `シナリオ「${scenario}」で会話を始めてください。` }],
            scenario,
            level,
            nativeLanguage,
          }),
          signal: controller.signal,
        });

        if (!response.ok) throw new Error("Failed to get response");
        if (!response.body) throw new Error("No response body");

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let fullContent = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          fullContent += chunk;
          setStreamingContent(fullContent);
        }

        const assistantMessage: Message = {
          id: crypto.randomUUID(),
          role: "assistant",
          content: fullContent,
        };

        setMessages([assistantMessage]);
        setStreamingContent("");
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          console.error("Error fetching initial message:", error);
          // Fallback greeting
          setMessages([
            {
              id: crypto.randomUUID(),
              role: "assistant",
              content: t("greeting"),
            },
          ]);
        }
      } finally {
        setIsLoading(false);
        abortControllerRef.current = null;
      }
    };

    initChat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendMessage = async (messageText?: string) => {
    const text = messageText || input.trim();
    if (!text || isLoading) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);
    setStreamingContent("");

    // Reset textarea height
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
    }

    try {
      const controller = new AbortController();
      abortControllerRef.current = controller;

      const response = await fetch("/api/ai/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          scenario,
          level,
          nativeLanguage,
        }),
        signal: controller.signal,
      });

      if (!response.ok) throw new Error("Failed to get response");
      if (!response.body) throw new Error("No response body");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullContent = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        fullContent += chunk;
        setStreamingContent(fullContent);
      }

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: fullContent,
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setStreamingContent("");
    } catch (error) {
      if ((error as Error).name !== "AbortError") {
        console.error("Error sending message:", error);
      }
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleVoiceTranscript = (text: string) => {
    setInput(text);
    // Auto-send voice input
    sendMessage(text);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    // Auto-resize textarea
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-gray-50">
      {/* Chat Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-navy-800"
            aria-label={t("backToScenarios")}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="font-semibold text-navy-800 text-sm">
              {t("sakuraSensei")}
            </h2>
            <p className="text-xs text-gray-500">
              {isLoading ? "..." : "Online"}
            </p>
          </div>
        </div>
        <button
          onClick={() => onEndChat(messages)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-sakura-600 bg-sakura-50 hover:bg-sakura-100 rounded-lg transition-colors"
        >
          <Square className="w-3.5 h-3.5" />
          {t("endChat")}
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            role={message.role}
            content={message.content}
          />
        ))}
        {streamingContent && (
          <ChatMessage
            role="assistant"
            content={streamingContent}
            isStreaming={true}
          />
        )}
        {isLoading && !streamingContent && (
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-sakura-100 flex items-center justify-center flex-shrink-0">
              <div className="w-5 h-5 text-sakura-600 flex items-center gap-0.5">
                <span className="w-1.5 h-1.5 bg-sakura-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 bg-sakura-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 bg-sakura-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 bg-white px-4 py-3">
        <div className="flex items-end gap-2 max-w-4xl mx-auto">
          <VoiceInput
            onTranscript={handleVoiceTranscript}
            disabled={isLoading}
          />
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder={t("messagePlaceholder")}
              disabled={isLoading}
              rows={1}
              className="w-full resize-none rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-navy-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sakura-300 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ maxHeight: "120px" }}
            />
          </div>
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim() || isLoading}
            className="p-2.5 rounded-full bg-sakura-500 text-white hover:bg-sakura-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-sakura-500"
            aria-label={t("send")}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
