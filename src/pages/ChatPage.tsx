import { useState, useRef, useEffect } from "react";
import { Send, Trash2, Leaf, Wind, BookOpen } from "lucide-react";
import { useChat } from "@/hooks/useChat";
import ChatBubble from "@/components/ChatBubble";
import TypingIndicator from "@/components/TypingIndicator";
import MoodSelector from "@/components/MoodSelector";
import EmergencyBanner, { detectCrisis } from "@/components/EmergencyBanner";
import BreathingExercise from "@/components/BreathingExercise";
import RecommendationsPanel from "@/components/RecommendationsPanel";

const ChatPage = () => {
  const { messages, isLoading, mood, setMood, sendMessage, clearChat } = useChat();
  const [input, setInput] = useState("");
  const [showCrisis, setShowCrisis] = useState(false);
  const [showBreathing, setShowBreathing] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSend = () => {
    if (!input.trim()) return;
    if (detectCrisis(input)) setShowCrisis(true);
    sendMessage(input);
    setInput("");
    if (inputRef.current) inputRef.current.style.height = "auto";
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  const handleTextareaInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    const el = e.target;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 120) + "px";
  };

  const isEmpty = messages.length === 0;

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b bg-card/50 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Leaf className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-display font-bold text-foreground">Serenity</h1>
            <p className="text-xs text-muted-foreground">Your wellness companion</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setShowBreathing(true)}
            className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
            title="Breathing exercises"
          >
            <Wind className="w-4 h-4" />
          </button>
          <button
            onClick={() => setShowRecommendations(true)}
            className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
            title="Wellness resources"
          >
            <BookOpen className="w-4 h-4" />
          </button>
          {messages.length > 0 && (
            <button
              onClick={() => { clearChat(); setShowCrisis(false); }}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              title="Clear chat"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </header>

      {/* Mood selector */}
      <MoodSelector selectedMood={mood} onMoodChange={setMood} />

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto chat-scroll px-4 py-4 space-y-4">
        {isEmpty && (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-4 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Leaf className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-display font-bold text-foreground">Welcome to Serenity 🌿</h2>
              <p className="text-sm text-muted-foreground mt-2 max-w-md">
                I'm here to listen, support, and help you navigate your thoughts and feelings.
                Try a breathing exercise, explore wellness resources, or just chat.
              </p>
            </div>

            {/* Quick action cards */}
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setShowBreathing(true)}
                className="flex flex-col items-center gap-2 p-4 rounded-2xl border border-border bg-card hover:bg-secondary/50 transition-all w-28"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Wind className="w-5 h-5 text-primary" />
                </div>
                <span className="text-xs font-medium text-foreground">Breathe</span>
              </button>
              <button
                onClick={() => setShowRecommendations(true)}
                className="flex flex-col items-center gap-2 p-4 rounded-2xl border border-border bg-card hover:bg-secondary/50 transition-all w-28"
              >
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-accent" />
                </div>
                <span className="text-xs font-medium text-foreground">Resources</span>
              </button>
            </div>

            <div className="flex flex-wrap justify-center gap-2 mt-3">
              {["I'm feeling anxious today", "Help me with overthinking", "I need some calm"].map(s => (
                <button
                  key={s}
                  onClick={() => { setInput(s); inputRef.current?.focus(); }}
                  className="px-4 py-2 rounded-full text-xs font-medium bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors border border-border"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map(msg => (
          <ChatBubble key={msg.id} message={msg} />
        ))}

        {isLoading && !messages[messages.length - 1]?.content && <TypingIndicator />}
      </div>

      {/* Emergency banner */}
      {showCrisis && <EmergencyBanner />}

      {/* Disclaimer */}
      <div className="text-center px-4 py-1">
        <p className="text-[10px] text-muted-foreground">
          ⚕️ Serenity is an AI companion, not a medical professional. For serious concerns, please consult a licensed expert.
        </p>
      </div>

      {/* Input area */}
      <div className="px-4 pb-4 pt-2">
        <div className="flex items-end gap-2 bg-card border border-border rounded-2xl px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-ring/20 transition-shadow">
          <textarea
            ref={inputRef}
            value={input}
            onChange={handleTextareaInput}
            onKeyDown={handleKeyDown}
            placeholder="Share what's on your mind..."
            rows={1}
            className="flex-1 bg-transparent resize-none text-sm text-foreground placeholder:text-muted-foreground focus:outline-none font-body leading-relaxed max-h-[120px]"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="p-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex-shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Overlays */}
      {showBreathing && <BreathingExercise onClose={() => setShowBreathing(false)} />}
      {showRecommendations && <RecommendationsPanel onClose={() => setShowRecommendations(false)} />}
    </div>
  );
};

export default ChatPage;
