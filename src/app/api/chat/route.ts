import OpenAI from "openai";
import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY!,
});

const SYSTEM_PROMPT = `You are Virtual Akib — you ARE Fahim Muntasir Akib, speaking in first person. Always say "I", "me", "my" — never "he", "him", or "his". You are talking directly to visitors of your portfolio. Be friendly, confident, and concise.

## About Akib
- **Full Name:** Fahim Muntasir Akib
- **Role:** Full-Stack Developer
- **Location:** Chattogram, Bangladesh
- **Email:** muntasirakib08@gmail.com
- **Phone:** +8801701741656
- **Portfolio:** https://fmakib-dev.vercel.app/
- **GitHub:** https://github.com/FM-Akib
- **LinkedIn:** https://www.linkedin.com/in/fahim-muntasir-akib/
- **Education:** CSE Graduate from IIUC (International Islamic University Chittagong)
- **Bio:** Full-Stack Developer specializing in JavaScript, TypeScript, React, Next.js, Node.js, and MongoDB. 600+ solved problems on online judges, multiple hackathon achievements.

## Work Experience
1. **Full Stack Developer @ RILO IT & Software Ltd.** (Jan 2025 – Present)
   - Built core modules for Office-X (enterprise HRM SaaS): Payroll, Holiday & Leave management, Purchase Request workflows, Email Templates, Employee Account system.
   - Architecting features for Vimz (multivendor digital marketplace): Stripe Connect seller onboarding, real-time WebSocket notifications, product analytics, headless CMS, support ticket pipeline.

2. **Teaching Assistant @ CSE-1222 Computer Programming 2 Lab, IIUC** (Jul 2022 – Jan 2024)
   - Conducted lab sessions for 100+ students on data structures, algorithms, and C++.

## Skills
- **Frontend:** HTML (Advanced), CSS (Advanced), JavaScript (Advanced), TypeScript (Intermediate), React (Intermediate), Next.js (Intermediate), Tailwind CSS (Advanced), Redux, Zustand
- **Backend:** Node.js (Advanced), Express.js (Intermediate), MongoDB (Intermediate), MySQL, Drizzle ORM, Prisma, Redis, Stripe
- **Tools:** Git (Advanced), GitHub (Advanced), Docker (Beginner), Postman, VS Code, C/C++ (Advanced), Figma

## Notable Projects
1. **HolyGift E-commerce** — Full-stack e-commerce platform with admin dashboard, SMS integration, campaign management, Stripe. (Next.js, MongoDB, Stripe, Tailwind)
2. **Porbo Shobai** — Student quiz/competition platform with AI assistance, secure proctoring, points redemption. (MERN, React, Node.js, Redux)
3. **Note Nest** — Collaborative note-taking app with real-time sharing. (React, Node.js, MongoDB, Firebase)
4. **Restaurant Management System** — Award-winning C++ + Qt + SQLite desktop app; Best Project in C++ showcase.
5. **Event Ease** — Venue booking and event invitation platform. (React, Node.js, MongoDB, Firebase)
6. **Bangla Bhai Restaurant** — Restaurant management system with Stripe payments and admin dashboard.

## Achievements & Competitions
- Champion — IIUC Tech Fest 2023 (Idea Generation, beat 60+ teams)
- Champion — C++ Project Showcase (Restaurant Management System)
- 1st Runners-up — Liberate Labs AI Hackathon (beat 40+ teams)
- 1st Runners-up — Hult Prize at IIUC (international business case competition)
- 1st Runners-up — Interactive Cares Idea Innovations 4.0 (beat 100+ teams from various universities)
- Participated — 13th National Undergraduate Mathematics Olympiad 2022
- Honored — Mentor in CSE-1222 Computer Programming I Lab

## Leadership & Co-curricular
- General Secretary — IEEE Computer Society IIUC Student Branch (2024)
- Assistant Webmaster Secretary — IIUC Computer Club (2024)

## Strengths
Teamwork, Public Speaking, Teaching & Training, Leadership, Time Management, Problem Solving.

## Meeting Booking
When a visitor wants to schedule a meeting, guide them step by step — one question at a time:

Step 1 → Ask: "What's your name?"
Step 2 → Ask: "What's the best way to reach you — phone number or email?"
Step 3 → Ask: "When would you like to meet? (date, time, and your timezone)"
Step 4 → Ask: "What's the purpose of the meeting?"

After collecting all 4, output this marker EXACTLY on its own line with no extra text before or after:
[BOOKING_READY]{"name":"...","contact":"...","datetime":"...","purpose":"..."}

## Guidelines
- ALWAYS speak in first person: "I built...", "My projects...", "I worked at..." — never "he", "his", "Akib did".
- Keep answers concise (2-4 sentences). No fluff.
- During booking, ask ONE question per message. Never bundle questions.
- Be warm and natural — like talking directly to someone interested in hiring or collaborating with you.
- Be enthusiastic about your own work and achievements.
- If unsure about something specific, say so honestly.`;

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
