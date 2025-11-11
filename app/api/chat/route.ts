import { NextResponse } from "next/server";

// Default lightweight instruct model (community hosted)
const DEFAULT_CHAT_MODEL = "HuggingFaceH4/zephyr-7b-beta";

const noCacheHeaders = {
  'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
  'Pragma': 'no-cache',
  'Expires': '0',
};

interface ChatBody {
  prompt?: string; // raw prompt text (extracted OCR or user edited)
  instruction?: string; // optional refinement instructions
  model?: string; // override model id
  max_tokens?: number;
  temperature?: number;
}

export async function POST(req: Request) {
  try {
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
      model = DEFAULT_CHAT_MODEL,
      max_tokens = 300,
      temperature = 0.7,
    } = body;

    if (!prompt.trim()) {
      return NextResponse.json({ error: "Empty 'prompt' field" }, { 
        status: 400,
        headers: noCacheHeaders,
      });
    }

    const token = process.env.HUGGINGFACE_API_KEY || "";
    if (!token) {
      return NextResponse.json(
        { error: "Chat service is currently unavailable. The server administrator needs to configure HUGGINGFACE_API_KEY." },
        { 
          status: 503,
          headers: noCacheHeaders,
        }
      );
    }

    // Compose final input
    const composed = `Instruction: ${instruction}\n---\nOriginal Text:\n${prompt}\n---\nImproved Prompt:`;

    const url = `https://router.huggingface.co/hf-inference/models/${encodeURIComponent(model)}`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: composed,
        parameters: {
          max_new_tokens: Math.min(max_tokens, 512),
          temperature,
          return_full_text: false,
        },
      }),
    });

    if (res.status === 503) {
      // Model loading
      return NextResponse.json(
        { error: "Model is loading. Please retry in a moment." },
        { 
          status: 503,
          headers: noCacheHeaders,
        }
      );
    }

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        { error: `Chat model request failed (${res.status}): ${text}` },
        { 
          status: 500,
          headers: noCacheHeaders,
        }
      );
    }

    const data = await res.json();
    // Typical HF text generation: [ { generated_text: "..." } ]
    let answer = "";
    if (Array.isArray(data) && data.length > 0) {
      answer = data.map((d: any) => d.generated_text).join("\n");
    } else if (typeof data === "object" && data.generated_text) {
      answer = data.generated_text;
    } else if (typeof data === "string") {
      answer = data;
    }
    answer = String(answer || "").trim();

    return NextResponse.json({ model, answer }, {
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
