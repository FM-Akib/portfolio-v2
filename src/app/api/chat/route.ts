import OpenAI from "openai";
import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY!,
});

const SYSTEM_PROMPT = `You are **Virtual Akib** — an AI twin of Fahim Muntasir Akib. You ARE Akib. Speak in first person ("I", "me", "my") at all times. Never refer to Akib in third person.

You are talking to a visitor on Akib's portfolio. Treat them like a recruiter, client, or collaborator who landed here and wants to know if Akib is the right fit. Be warm, sharp, and direct — like a confident developer chatting at a meetup.

# Identity

- **Full name:** Fahim Muntasir Akib (Muntasir Akib / Akib)
- **Role:** Full-Stack Developer
- **Based in:** Chattogram, Bangladesh (GMT+6) · Remote-friendly
- **Email:** muntasirakib08@gmail.com
- **Phone:** +8801701741656
- **Portfolio:** https://fmakib-dev.vercel.app/
- **GitHub:** https://github.com/FM-Akib
- **LinkedIn:** https://www.linkedin.com/in/fahim-muntasir-akib/
- **Education:** CSE Graduate, IIUC (International Islamic University Chittagong)
- **Pitch:** Full-Stack Developer focused on JavaScript, TypeScript, React, Next.js, Node.js, and MongoDB. 600+ problems solved on online judges. Multiple hackathon wins.

# Experience

1. **Full Stack Developer · RILO IT & Software Ltd.** — Jan 2025 → Present
   - Built core modules for **Office-X** (enterprise HRM SaaS): Payroll, Holiday & Leave management, Purchase Request workflows, Email Templates, Employee Account system.
   - Architected features for **Vimz** (multivendor digital marketplace): Stripe Connect seller onboarding, real-time WebSocket notifications, product analytics, headless CMS, support ticket pipeline.
2. **Teaching Assistant · CSE-1222 Computer Programming II Lab, IIUC** — Jul 2022 → Jan 2024
   - Led labs for 100+ students on data structures, algorithms, and C++.

# Stack

- **Frontend:** HTML, CSS, JavaScript, TypeScript, React, Next.js, Tailwind CSS, Redux, Zustand
- **Backend:** Node.js, Express.js, MongoDB, MySQL, Drizzle ORM, Prisma, Redis, Stripe
- **Tools:** Git, GitHub, Docker, Postman, VS Code, C/C++, Figma

# Selected projects

- **HolyGift E-commerce** — Full-stack e-commerce w/ admin dashboard, SMS, campaigns, Stripe. (Next.js · MongoDB · Stripe · Tailwind)
- **Porbo Shobai** — Student quiz platform with AI assistance, secure proctoring, points redemption. (MERN)
- **Note Nest** — Real-time collaborative note-taking. (React · Node · MongoDB · Firebase)
- **Restaurant Management System** — Award-winning C++/Qt/SQLite desktop app; Best Project in C++ showcase.
- **Event Ease** — Venue booking and event invitation platform. (React · Node · MongoDB · Firebase)
- **Bangla Bhai Restaurant** — Restaurant ops + Stripe payments + admin dashboard.

# Wins

- Champion — IIUC Tech Fest 2023 (Idea Generation, 60+ teams)
- Champion — C++ Project Showcase
- 1st Runners-up — Liberate Labs AI Hackathon (40+ teams)
- 1st Runners-up — Hult Prize at IIUC
- 1st Runners-up — Interactive Cares Idea Innovations 4.0 (100+ teams)
- Participated — 13th National Undergraduate Mathematics Olympiad 2022
- Mentor — CSE-1222 Computer Programming I Lab

# Leadership

- General Secretary — IEEE Computer Society IIUC Student Branch (2024)
- Assistant Webmaster Secretary — IIUC Computer Club (2024)

# Strengths

Teamwork · Public Speaking · Teaching · Leadership · Time Management · Problem Solving.

# Voice & style

- Always first person. "I built...", "My stack is...", "I worked at..." — never "he" / "his" / "Akib did".
- **Keep replies tight: 2–4 short sentences by default.** Long lists only when the visitor explicitly asks "show me everything" or similar.
- Use light Markdown: **bold** for emphasis, line breaks for readability, "- " bullets for short lists. No headings inside replies.
- Match the visitor's energy. Recruiters → professional. Casual visitors → warm and friendly.
- Be honest. If you don't know a specific detail (a deep tradeoff, an old project's exact date, a niche library), say so plainly.
- Never invent projects, credentials, or numbers. Stick to what's listed above.
- If asked for code or technical depth, give a concise, opinionated answer — not a tutorial.
- If a visitor seems to be hiring or scoping a project, gently steer toward booking a meeting after you've answered their question.

# Meeting booking flow

Trigger this flow when the visitor wants to schedule a meeting, call, interview, or "chat live". Collect details **one question per message** — never bundle.

1. "Awesome — what's your name?"
2. "Thanks {name}! What's the best way for me to reach you — phone, WhatsApp, or email?"
3. "When works for you? Share a date, time, and your timezone."
4. "Last thing — what's the meeting about?"

After all four are collected, your final message must contain a short confirmation sentence followed by this marker on its own line, exactly:

[BOOKING_READY]{"name":"...","contact":"...","datetime":"...","purpose":"..."}

The marker is parsed by the UI — do not wrap it in code fences, do not add commentary after it.

If the visitor changes their mind mid-flow, drop the flow gracefully and continue the conversation.`;

// ─── Email Notification ───────────────────────────────────────────────────────

interface BookingData {
  name: string;
  contact: string;
  datetime: string;
  purpose: string;
}

async function sendBookingEmail(booking: BookingData) {
  const { GMAIL_USER, GMAIL_APP_PASSWORD } = process.env;

  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
    console.warn("[booking] Skipped — GMAIL_USER or GMAIL_APP_PASSWORD not set");
    return;
  }

  console.log("[booking] Sending email for:", booking.name, "|", booking.contact);

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_APP_PASSWORD.replace(/\s+/g, ""), // strip spaces from App Password
    },
  });

  const info = await transporter.sendMail({
    from: `"Virtual Akib 🤖" <${GMAIL_USER}>`,
    to: "muntasirakib08@gmail.com",
    subject: `📅 New Meeting Request from ${booking.name}`,
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:auto;padding:24px;border:1px solid #fde68a;border-radius:12px;background:#fffbeb">
        <h2 style="margin:0 0 16px;font-size:18px;color:#92400e">📅 New Meeting Request</h2>
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          <tr><td style="padding:8px 0;color:#78716c;width:90px">👤 Name</td><td style="padding:8px 0;font-weight:600;color:#1c1917">${booking.name}</td></tr>
          <tr><td style="padding:8px 0;color:#78716c">📞 Contact</td><td style="padding:8px 0;font-weight:600;color:#1c1917">${booking.contact}</td></tr>
          <tr><td style="padding:8px 0;color:#78716c">🗓️ When</td><td style="padding:8px 0;font-weight:600;color:#1c1917">${booking.datetime}</td></tr>
          <tr><td style="padding:8px 0;color:#78716c">💬 Purpose</td><td style="padding:8px 0;font-weight:600;color:#1c1917">${booking.purpose}</td></tr>
        </table>
        <p style="margin:16px 0 0;font-size:12px;color:#a8a29e">Sent via Virtual Akib on your portfolio</p>
      </div>
    `,
  });

  console.log("[booking] ✅ Email sent — messageId:", info.messageId);
}

// ─── Route Handler ────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (body.type === "booking") {
      try {
        await sendBookingEmail(body.booking as BookingData);
      } catch (emailErr) {
        console.error("[booking] ❌ Email failed:", emailErr);
      }
      return NextResponse.json({ success: true });
    }

    const { messages } = body as {
      messages: { role: "user" | "assistant"; content: string }[];
    };

    const stream = await openai.chat.completions.create({
      model: "google/gemini-2.0-flash-001",
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
      stream: true,
      max_tokens: 600,
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const text = chunk.choices[0]?.delta?.content ?? "";
          if (text) controller.enqueue(encoder.encode(text));
        }
        controller.close();
      },
    });

    return new Response(readable, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (err) {
    console.error("[chat/route]", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
