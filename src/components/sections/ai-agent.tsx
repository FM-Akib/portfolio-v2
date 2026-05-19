"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Loader2,
  Calendar,
  CheckCircle2,
  X,
  Minimize2,
  Sparkles,
  ChevronUp,
  MessageCircle,
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
  { label: "Tech stack", query: "What's your tech stack?" },
  { label: "Projects", query: "Tell me about your best projects" },
  { label: "Experience", query: "Walk me through your work experience" },
  { label: "Achievements", query: "What are your top achievements?" },
  { label: "Book a meeting", query: "I'd like to book a meeting with Akib" },
];

const BOOKING_REGEX =
  /\[BOOKING_READY\](\{[\s\S]*?"name"[\s\S]*?"contact"[\s\S]*?"datetime"[\s\S]*?"purpose"[\s\S]*?\})/;

const OPEN_EVENT = "open-ai-chat";

// ─── Markdown-lite inline renderer ────────────────────────────────────────────

function renderInline(text: string) {
  const parts: (string | { bold: string })[] = [];
  const regex = /\*\*(.+?)\*\*/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));
    parts.push({ bold: match[1] });
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts.map((p, i) =>
    typeof p === "string" ? (
      <span key={i}>{p}</span>
    ) : (
      <strong key={i} className="font-semibold">
        {p.bold}
      </strong>
    ),
  );
}

function MessageContent({ text }: { text: string }) {
  const lines = text.split("\n");
  return (
    <>
      {lines.map((line, i) => {
        const trimmed = line.trimStart();
        if (/^[-•*]\s+/.test(trimmed)) {
          return (
            <div key={i} className="flex gap-2 pl-1">
              <span className="select-none text-primary mt-0.5">›</span>
              <span className="flex-1">
                {renderInline(trimmed.replace(/^[-•*]\s+/, ""))}
              </span>
            </div>
          );
        }
        return (
          <div key={i}>
            {line === "" ? " " : renderInline(line)}
          </div>
        );
      })}
    </>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-2 py-1.5">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-primary"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.18 }}
        />
      ))}
    </div>
  );
}

function Avatar({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const dim = size === "lg" ? "h-10 w-10 text-base" : size === "sm" ? "h-6 w-6 text-[10px]" : "h-8 w-8 text-xs";
  return (
    <div
      className={cn(
        "shrink-0 rounded-full bg-foreground text-background grid place-items-center font-display italic",
        dim,
      )}
    >
      A
    </div>
  );
}

function MessageBubble({ msg }: { msg: Message }) {
  const isUser = msg.role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18 }}
      className={cn("flex gap-2 items-end", isUser && "flex-row-reverse")}
    >
      {!isUser && <Avatar size="sm" />}
      <div
        className={cn(
          "max-w-[82%] rounded-2xl px-3.5 py-2 text-[13px] leading-relaxed break-words space-y-1",
          isUser
            ? "bg-primary text-primary-foreground rounded-br-sm"
            : "bg-muted text-foreground rounded-bl-sm border border-border/60",
        )}
      >
        <MessageContent text={msg.content} />
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
      className="mx-3 mb-2 rounded-md border border-border bg-card p-3.5"
    >
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border/60">
        <Calendar className="h-3.5 w-3.5 text-primary" />
        <p className="meta text-foreground">Confirm meeting request</p>
      </div>
      <dl className="space-y-1.5 text-[12px] mb-3">
        {[
          ["Name", booking.name],
          ["Contact", booking.contact],
          ["When", booking.datetime],
          ["Purpose", booking.purpose],
        ].map(([k, v]) => (
          <div key={k} className="flex gap-2">
            <dt className="meta text-muted-foreground w-16 shrink-0">{k}</dt>
            <dd className="text-foreground flex-1">{v}</dd>
          </div>
        ))}
      </dl>
      <div className="flex gap-2">
        <button
          onClick={onConfirm}
          disabled={loading}
          className="flex-1 h-8 text-xs rounded-full bg-foreground text-background font-medium hover:bg-primary transition-colors disabled:opacity-60 grid place-items-center"
        >
          {loading ? <Loader2 className="h-3 w-3 animate-spin" /> : "Confirm & send"}
        </button>
        <button
          onClick={onCancel}
          disabled={loading}
          className="h-8 px-3 text-xs rounded-full border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors disabled:opacity-60"
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
      className="mx-3 mb-2 rounded-md border border-border bg-card p-3.5 text-center"
    >
      <CheckCircle2 className="h-5 w-5 text-emerald-500 mx-auto mb-1.5" />
      <p className="text-sm font-medium text-foreground">Request sent</p>
      <p className="meta text-muted-foreground mt-1">
        Akib will reach out shortly
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
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className="group relative flex items-center gap-2.5 rounded-full border border-border bg-card pl-1.5 pr-4 py-1.5 shadow-2xl shadow-foreground/20 cursor-pointer"
      aria-label="Open chat with Virtual Akib"
    >
      <span className="relative grid place-items-center">
        <span
          aria-hidden
          className="absolute inset-0 rounded-full bg-primary/30 animate-ping"
        />
        <Avatar size="lg" />
        <span className="absolute -bottom-0 -right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-card" />
      </span>
      <span className="text-left">
        <span className="block font-display text-[15px] leading-none text-foreground">
          Virtual Akib
        </span>
        <span className="meta block text-muted-foreground mt-1 leading-none">
          Chat with me →
        </span>
      </span>
      {hasUnread && (
        <span className="absolute -top-1 -right-1 grid h-4 w-4 place-items-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground ring-2 ring-background">
          1
        </span>
      )}
    </motion.button>
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
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 12, scale: 0.97 }}
      transition={{ type: "spring", damping: 24, stiffness: 280 }}
      className="flex flex-col rounded-lg border border-border bg-card shadow-2xl shadow-foreground/25 overflow-hidden w-[min(calc(100vw-2rem),22rem)] sm:w-[24rem] h-[min(calc(100vh-7rem),34rem)]"
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-background/50 backdrop-blur-sm shrink-0">
        <Avatar size="md" />
        <div className="flex-1 min-w-0">
          <p className="font-display text-base leading-none text-foreground flex items-center gap-1.5">
            Virtual Akib
            <Sparkles className="h-3 w-3 text-primary" />
          </p>
          <p className="meta text-muted-foreground mt-1 leading-none flex items-center gap-1.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            Online · AI assistant
          </p>
        </div>
        <button
          onClick={onMinimize}
          className="h-7 w-7 grid place-items-center rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          aria-label="Minimize"
        >
          <Minimize2 className="h-3.5 w-3.5" />
        </button>
        <button
          onClick={onClose}
          className="h-7 w-7 grid place-items-center rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          aria-label="Close"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3 scroll-smooth">
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
              <Avatar size="sm" />
              <div className="bg-muted border border-border/60 rounded-2xl rounded-bl-sm">
                <TypingDots />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={bottomRef} />
      </div>

      {/* Quick questions */}
      {messages.length === 1 && !streaming && (
        <div className="px-3 pb-2.5 flex flex-wrap gap-1.5">
          {QUICK_QUESTIONS.map((q) => (
            <button
              key={q.label}
              onClick={() => onSend(q.query)}
              className="meta px-2.5 py-1 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground/40 hover:bg-muted transition-all"
            >
              {q.label}
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
      <div className="px-3 py-3 border-t border-border bg-background/30 shrink-0">
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
            placeholder="Ask anything…"
            rows={1}
            disabled={streaming}
            className={cn(
              "flex-1 resize-none rounded-md border border-border bg-background px-3 py-2 text-[13px] text-foreground",
              "placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary/60",
              "transition-all min-h-9 max-h-24 leading-relaxed",
              "disabled:opacity-60 disabled:cursor-not-allowed",
            )}
            style={{ scrollbarWidth: "none" }}
            onInput={(e) => {
              const el = e.currentTarget;
              el.style.height = "auto";
              el.style.height = `${Math.min(el.scrollHeight, 96)}px`;
            }}
          />
          <button
            onClick={() => onSend(input)}
            disabled={streaming || !input.trim()}
            className="h-9 w-9 rounded-md bg-foreground text-background grid place-items-center hover:bg-primary transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
            aria-label="Send message"
          >
            {streaming ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Send className="h-3.5 w-3.5" />
            )}
          </button>
        </div>
        <p className="meta text-muted-foreground text-center mt-2 text-[9px]">
          Powered by AI · Press Enter to send
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
      className="flex items-center gap-2.5 pl-2 pr-4 py-1.5 rounded-full border border-border bg-card shadow-lg cursor-pointer"
    >
      <MessageCircle className="h-4 w-4 text-primary" />
      <span className="text-xs font-medium text-foreground">Virtual Akib</span>
      <ChevronUp className="h-3.5 w-3.5 text-muted-foreground" />
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
        "Hey, I'm **Virtual Akib** — Fahim Muntasir Akib's AI twin. 👋\n\nAsk me about my projects, stack, experience, or book a quick meeting. What would you like to know?",
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

  const handleOpen = useCallback(() => {
    setOpen(true);
    setMinimized(false);
    setHasUnread(false);
    setTimeout(() => inputRef.current?.focus(), 300);
  }, []);

  useEffect(() => {
    const handler = () => handleOpen();
    window.addEventListener(OPEN_EVENT, handler);
    return () => window.removeEventListener(OPEN_EVENT, handler);
  }, [handleOpen]);

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
          const visible = fullText.replace(BOOKING_REGEX, "").trim();
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId ? { ...m, content: visible } : m,
            ),
          );
        }

        const match = BOOKING_REGEX.exec(fullText);
        if (match) {
          try {
            const booking = JSON.parse(match[1]) as BookingData;
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
                  content:
                    "Hmm, something went wrong on my end. Mind trying that again?",
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
    </div>
  );
}

export function openAIChat() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(OPEN_EVENT));
  }
}
