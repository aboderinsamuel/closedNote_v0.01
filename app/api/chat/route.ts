import { NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/supabase-server";
import { callOpenAI, callHuggingFace } from "@/lib/llm";

const noCacheHeaders = {
  'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
  'Pragma': 'no-cache',
  'Expires': '0',
};

interface ChatBody {
  prompt?: string;
  instruction?: string;
  model?: string;
  max_tokens?: number;
  temperature?: number;
  userApiKey?: string;
  userHfKey?: string;
}

export async function POST(req: Request) {
  try {
    const user = await getUserFromRequest(req);
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401, headers: noCacheHeaders }
      );
    }

    const contentType = req.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return NextResponse.json({ error: "Expected application/json body" }, {
        status: 400,
        headers: noCacheHeaders,
      });
    }

    const body = (await req.json()) as ChatBody;
    const {
      prompt = "",
      instruction = "Refine and clean up this text into a high-quality reusable AI prompt. Return just the improved prompt.",
      model = "gpt-4o-mini",
      max_tokens = 500,
      temperature = 0.7,
      userApiKey = "",
      userHfKey = "",
    } = body;

    if (!prompt.trim()) {
      return NextResponse.json({ error: "Empty 'prompt' field" }, {
        status: 400,
        headers: noCacheHeaders,
      });
    }

    let answer: string;
    let providerModel: string;

    if (userApiKey.trim()) {
      const res = await callOpenAI(userApiKey.trim(), instruction, prompt, model, max_tokens, temperature);
      answer = res.text;
      providerModel = model;
    } else if (userHfKey.trim()) {
      const res = await callHuggingFace(userHfKey.trim(), instruction, prompt, max_tokens);
      answer = res.text;
      providerModel = "zephyr-7b-beta";
    } else {
      return NextResponse.json(
        { error: "Connect your OpenAI or HuggingFace key in Settings to use AI refinement." },
        { status: 400, headers: noCacheHeaders }
      );
    }

    return NextResponse.json({ model: providerModel, answer }, {
      headers: noCacheHeaders,
    });
  } catch (err) {
    console.error("/api/chat error:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, {
      status: 500,
      headers: noCacheHeaders,
    });
  }
}
