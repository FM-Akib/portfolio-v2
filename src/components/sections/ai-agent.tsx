"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  User,
  Loader2,
  Calendar,
  CheckCircle2,
  X,
  Minimize2,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface BookingData {
  name: string;
  contact: string;
  datetime: string;
  purpose: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const QUICK_QUESTIONS = [
  "🛠️ What's your tech stack?",
  "💼 Tell me about your projects",
  "🏆 What are your achievements?",
  "📅 Book a meeting with Akib",
  "💡 What are your strengths?",
];

const BOOKING_REGEX =
  /\[BOOKING_READY\](\{[\s\S]*?"name"[\s\S]*?"contact"[\s\S]*?"datetime"[\s\S]*?"purpose"[\s\S]*?\})/;

// ─── Sub-components ───────────────────────────────────────────────────────────

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-1 py-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-2 h-2 rounded-full bg-amber-500"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 0.55, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  );
}

function MessageBubble({ msg }: { msg: Message }) {
  const isUser = msg.role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 6, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.22 }}
      className={cn("flex gap-2 items-end", isUser && "flex-row-reverse")}
    >
      {/* Avatar */}
      <div
        className={cn(
          "shrink-0 flex items-center justify-center w-6 h-6 rounded-full text-xs mb-0.5",
          isUser
            ? "bg-amber-400 text-amber-950"
            : "bg-amber-50 border border-amber-200 text-amber-600",
        )}
      >
        {isUser ? (
          <User className="w-3 h-3" />
        ) : (
          <span className="text-[10px]">🤖</span>
        )}
      </div>

      {/* Bubble */}
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-3 py-2 text-xs leading-relaxed whitespace-pre-wrap break-words",
          isUser
            ? "bg-amber-200 text-amber-950 rounded-br-sm font-medium"
            : "bg-amber-50 text-gray-800 rounded-bl-sm border border-amber-100",
        )}
      >
        {msg.content}
      </div>
    </motion.div>
  );
}

function BookingConfirmation({
  booking,
  onConfirm,
  onCancel,
  loading,
}: {
  booking: BookingData;
  onConfirm: () => void;
  onCancel: () => void;
  loading: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-3 mb-2 rounded-xl border border-amber-200 bg-amber-50 p-3"
    >
      <p className="text-xs font-semibold text-amber-900 mb-2 flex items-center gap-1.5">
        <Calendar className="w-3.5 h-3.5 text-amber-500" />
        Confirm meeting request
      </p>
      <div className="space-y-1 text-xs text-gray-600 mb-3">
        <p>
          <span className="font-medium text-gray-800">👤</span> {booking.name}
        </p>
        <p>
          <span className="font-medium text-gray-800">📞</span>{" "}
          {booking.contact}
        </p>
        <p>
          <span className="font-medium text-gray-800">🗓️</span>{" "}
          {booking.datetime}
        </p>
        <p>
          <span className="font-medium text-gray-800">💬</span>{" "}
          {booking.purpose}
        </p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={onConfirm}
          disabled={loading}
          className="flex-1 h-7 text-[11px] rounded-lg bg-amber-400 text-amber-950 font-semibold hover:bg-amber-500 transition-colors disabled:opacity-60 flex items-center justify-center"
        >
          {loading ? (
            <Loader2 className="w-3 h-3 animate-spin" />
          ) : (
            "✅ Confirm"
          )}
        </button>
        <button
          onClick={onCancel}
          disabled={loading}
          className="h-7 px-3 text-[11px] rounded-lg border border-amber-200 text-gray-600 hover:bg-amber-100 transition-colors disabled:opacity-60"
        >
          Cancel
        </button>
      </div>
    </motion.div>
  );
}

function BookingSuccess() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="mx-3 mb-2 rounded-xl border border-green-200 bg-green-50 p-3 text-center"
    >
      <CheckCircle2 className="w-6 h-6 text-green-500 mx-auto mb-1" />
      <p className="text-xs font-semibold text-gray-800">Booking Sent! 🎉</p>
      <p className="text-[11px] text-gray-500 mt-0.5">
        Akib has been notified via email. He&apos;ll reach out soon!
      </p>
    </motion.div>
  );
}

// ─── Floating Trigger ─────────────────────────────────────────────────────────

function FloatingTrigger({
  onClick,
  hasUnread,
}: {
  onClick: () => void;
  hasUnread: boolean;
}) {
  return (
    <div className="relative flex flex-col items-end gap-2.5">
      {/* Speech-bubble teaser */}
      <motion.div
        initial={{ opacity: 0, y: 8, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.8, type: "spring", stiffness: 280, damping: 22 }}
        className="relative hidden sm:block px-3 py-1.5 rounded-2xl rounded-br-sm bg-white border border-amber-200 shadow-lg shadow-amber-500/10"
      >
        <p className="text-[11px] font-medium text-gray-700 whitespace-nowrap">
          <span className="text-amber-600 font-semibold">Hey!</span> Got questions? <span className="font-semibold">Ask me</span> 👋
        </p>
        <span
          aria-hidden
          className="absolute -bottom-[5px] right-5 w-2.5 h-2.5 bg-white border-r border-b border-amber-200 rotate-45"
        />
      </motion.div>

      {/* Trigger pill */}
      <motion.button
        onClick={onClick}
        whileHover={{ scale: 1.04, y: -2 }}
        whileTap={{ scale: 0.96 }}
        animate={{
          boxShadow: [
            "0 10px 30px -8px rgba(245, 158, 11, 0.5)",
            "0 14px 36px -6px rgba(245, 158, 11, 0.7)",
            "0 10px 30px -8px rgba(245, 158, 11, 0.5)",
          ],
        }}
        transition={{
          boxShadow: { duration: 2.4, repeat: Infinity, ease: "easeInOut" },
        }}
        className="group relative flex items-center gap-2.5 pl-1.5 pr-4 py-1.5 rounded-full bg-linear-to-r from-amber-600 via-amber-500 to-orange-500 cursor-pointer select-none overflow-hidden"
        aria-label="Open AI Chat"
      >
        {/* Shimmer sweep on hover */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/35 to-transparent group-hover:translate-x-full transition-transform duration-1000 ease-out"
        />

        {/* Avatar + pulsing ring + status dot */}
        <div className="relative shrink-0">
          <span
            aria-hidden
            className="absolute inset-0 rounded-full bg-white/50 animate-ping opacity-60"
          />
          <div className="relative w-10 h-10 rounded-full bg-white ring-2 ring-white/90 flex items-center justify-center text-xl shadow-inner">
            <motion.span
              animate={{ rotate: [0, -12, 12, -8, 8, 0] }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                repeatDelay: 2.5,
                ease: "easeInOut",
              }}
              className="inline-block"
            >
              😎
            </motion.span>
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 animate-ping opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500 border-2 border-white" />
          </span>
        </div>

        {/* Label */}
        <div className="relative text-left text-white">
          <div className="flex items-center gap-1">
            <p className="text-[13px] font-extrabold leading-none tracking-tight">
              Virtual Akib
            </p>
            <Sparkles className="w-3 h-3 text-yellow-100 fill-yellow-100" />
          </div>
          <p className="text-[9px] uppercase tracking-[0.12em] font-semibold opacity-90 leading-none mt-1">
            Ask me anything →
          </p>
        </div>

        {/* Unread badge */}
        {hasUnread && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75 animate-ping" />
            <span className="relative inline-flex w-4 h-4 bg-red-500 rounded-full border-2 border-white text-[8px] text-white items-center justify-center font-bold">
              1
            </span>
          </span>
        )}
      </motion.button>
    </div>
  );
}

// ─── Chat Window ──────────────────────────────────────────────────────────────

function ChatWindow({
  messages,
  streaming,
  input,
  setInput,
  onSend,
  onClose,
  onMinimize,
  pendingBooking,
  setPendingBooking,
  bookingLoading,
  bookingSuccess,
  onConfirmBooking,
  inputRef,
  bottomRef,
}: {
  messages: Message[];
  streaming: boolean;
  input: string;
  setInput: (v: string) => void;
  onSend: (text: string) => void;
  onClose: () => void;
  onMinimize: () => void;
  pendingBooking: BookingData | null;
  setPendingBooking: (b: BookingData | null) => void;
  bookingLoading: boolean;
  bookingSuccess: boolean;
  onConfirmBooking: () => void;
  inputRef: React.RefObject<HTMLTextAreaElement | null>;
  bottomRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <motion.div
      key="chat-window"
      initial={{ opacity: 0, y: 24, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 16, scale: 0.96 }}
      transition={{ type: "spring", damping: 22, stiffness: 280 }}
      className="w-85 sm:w-95 flex flex-col rounded-2xl border border-amber-200 bg-white shadow-2xl shadow-amber-200/50 overflow-hidden"
      style={{ height: "530px" }}
    >
      {/* Header */}
      <div className="flex items-center gap-2.5 px-3.5 py-2.5 bg-linear-to-r from-amber-200 via-amber-300 to-amber-500 text-amber-950 shrink-0">
        <div className="relative w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center text-lg shrink-0">
          😎
          <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-amber-400" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold leading-none">Virtual Akib ✨</p>
          <p className="text-[10px] opacity-70 mt-0.5">
            Online · Always ready to help
          </p>
        </div>
        <button
          onClick={onMinimize}
          className="p-1 rounded-lg hover:bg-amber-500/30 transition-colors"
          aria-label="Minimize"
        >
          <Minimize2 className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-amber-500/30 transition-colors"
          aria-label="Close"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2.5 bg-white scroll-smooth">
        <AnimatePresence initial={false}>
          {messages
            .filter((m) => m.content !== "")
            .map((msg) => (
              <MessageBubble key={msg.id} msg={msg} />
            ))}

          {streaming && messages[messages.length - 1]?.content === "" && (
            <motion.div
              key="typing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex gap-2 items-end"
            >
              <div className="w-6 h-6 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-[10px]">
                🤖
              </div>
              <div className="bg-amber-50 border border-amber-100 rounded-2xl rounded-bl-sm px-3 py-1.5">
                <TypingDots />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={bottomRef} />
      </div>

      {/* Quick questions */}
      {messages.length === 1 && !streaming && (
        <div className="px-3 pb-2 bg-white flex flex-wrap gap-1.5">
          {QUICK_QUESTIONS.map((q) => (
            <button
              key={q}
              onClick={() => onSend(q.replace(/^[^\s]+\s/, ""))}
              className="text-[10px] px-2.5 py-1 rounded-full border border-amber-200 hover:border-amber-400 hover:bg-amber-50 text-gray-500 hover:text-amber-900 transition-all duration-200"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Booking confirmation / success */}
      <AnimatePresence>
        {pendingBooking && (
          <BookingConfirmation
            booking={pendingBooking}
            onConfirm={onConfirmBooking}
            onCancel={() => setPendingBooking(null)}
            loading={bookingLoading}
          />
        )}
        {bookingSuccess && <BookingSuccess />}
      </AnimatePresence>

      {/* Input */}
      <div className="px-3 py-2.5 border-t border-amber-100 bg-amber-50/50 shrink-0">
        <div className="flex items-end gap-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                onSend(input);
              }
            }}
            placeholder="Ask me anything…"
            rows={1}
            disabled={streaming}
            className={cn(
              "flex-1 resize-none rounded-xl border border-amber-200 bg-white px-3 py-2 text-xs text-gray-800",
              "placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-amber-400/50 focus:border-amber-400",
              "transition-all duration-200 min-h-9 max-h-20 leading-relaxed",
              "disabled:opacity-60 disabled:cursor-not-allowed",
            )}
            style={{ scrollbarWidth: "none" }}
            onInput={(e) => {
              const el = e.currentTarget;
              el.style.height = "auto";
              el.style.height = `${Math.min(el.scrollHeight, 80)}px`;
            }}
          />
          <button
            onClick={() => onSend(input)}
            disabled={streaming || !input.trim()}
            className="w-9 h-9 rounded-xl bg-amber-400 text-amber-950 flex items-center justify-center hover:bg-amber-500 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
            aria-label="Send"
          >
            {streaming ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Send className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
        <p className="text-[9px] text-gray-400 text-center mt-1.5">
          Powered by AI · Enter to send
        </p>
      </div>
    </motion.div>
  );
}

// ─── Minimized Bar ────────────────────────────────────────────────────────────

function MinimizedBar({ onExpand }: { onExpand: () => void }) {
  return (
    <motion.button
      key="minimized"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      onClick={onExpand}
      className="flex items-center gap-2.5 pl-3 pr-4 py-2 rounded-full bg-amber-400 text-amber-950 shadow-lg shadow-amber-400/30 cursor-pointer select-none"
    >
      <span className="text-base">😎</span>
      <span className="text-xs font-bold">Virtual Akib</span>
      <ChevronDown className="w-3.5 h-3.5 opacity-70 rotate-180" />
    </motion.button>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export function AIAgent() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hey there! 👋 I'm Virtual Akib — Fahim Muntasir Akib's AI assistant.\n\nAsk me anything about his skills, projects, experience — or book a meeting! 🚀",
    },
  ]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [pendingBooking, setPendingBooking] = useState<BookingData | null>(
    null,
  );
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, pendingBooking, bookingSuccess]);

  const handleOpen = () => {
    setOpen(true);
    setMinimized(false);
    setHasUnread(false);
    setTimeout(() => inputRef.current?.focus(), 300);
  };

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || streaming) return;

      const userMsg: Message = {
        id: crypto.randomUUID(),
        role: "user",
        content: trimmed,
      };
      const updatedMessages = [...messages, userMsg];
      setMessages(updatedMessages);
      setInput("");
      setStreaming(true);

      const assistantId = crypto.randomUUID();
      setMessages((prev) => [
        ...prev,
        { id: assistantId, role: "assistant", content: "" },
      ]);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: updatedMessages.map(({ role, content }) => ({
              role,
              content,
            })),
          }),
        });

        if (!res.ok || !res.body) throw new Error("Stream error");

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let fullText = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          fullText += decoder.decode(value, { stream: true });
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId ? { ...m, content: fullText } : m,
            ),
          );
        }

        const match = BOOKING_REGEX.exec(fullText);
        if (match) {
          try {
            const booking = JSON.parse(match[1]) as BookingData;
            const cleanText = fullText.replace(BOOKING_REGEX, "").trim();
            setMessages((prev) =>
              prev.map((m) =>
                m.id === assistantId ? { ...m, content: cleanText } : m,
              ),
            );
            setPendingBooking(booking);
          } catch {
            /* keep raw text */
          }
        }
      } catch {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId
              ? {
                  ...m,
                  content: "Sorry, something went wrong. Please try again. 🙏",
                }
              : m,
          ),
        );
      } finally {
        setStreaming(false);
        setTimeout(() => inputRef.current?.focus(), 100);
      }
    },
    [messages, streaming],
  );

  const confirmBooking = async () => {
    if (!pendingBooking) return;
    setBookingLoading(true);
    try {
      await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "booking", booking: pendingBooking }),
      });
    } finally {
      setPendingBooking(null);
      setBookingSuccess(true);
      setBookingLoading(false);
    }
  };

  return (
    <div className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence mode="wait">
        {open && !minimized ? (
          <ChatWindow
            key="window"
            messages={messages}
            streaming={streaming}
            input={input}
            setInput={setInput}
            onSend={sendMessage}
            onClose={() => setOpen(false)}
            onMinimize={() => setMinimized(true)}
            pendingBooking={pendingBooking}
            setPendingBooking={setPendingBooking}
            bookingLoading={bookingLoading}
            bookingSuccess={bookingSuccess}
            onConfirmBooking={confirmBooking}
            inputRef={inputRef}
            bottomRef={bottomRef}
          />
        ) : open && minimized ? (
          <MinimizedBar key="minimized" onExpand={() => setMinimized(false)} />
        ) : null}
      </AnimatePresence>

      {(!open || minimized) && (
        <FloatingTrigger onClick={handleOpen} hasUnread={hasUnread} />
      )}

      {!open && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-2 -left-2 pointer-events-none"
        >
          <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
        </motion.div>
      )}
    </div>
  );
}
