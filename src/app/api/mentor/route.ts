import { NextRequest, NextResponse } from "next/server";
import { buildSystemPrompt, chat, type MentorContext, type MentorMessage } from "@/lib/ai";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      context: MentorContext;
      messages: MentorMessage[];
    };
    if (!body?.messages?.length) {
      return NextResponse.json({ error: "No messages provided" }, { status: 400 });
    }
    const system = buildSystemPrompt(body.context);
    const reply = await chat({ system, messages: body.messages });
    return NextResponse.json({ reply });
  } catch (e) {
    return NextResponse.json(
      { reply: "Oops — I had a little hiccup. Try asking again in a moment! 🙂" },
      { status: 200 }
    );
  }
}
