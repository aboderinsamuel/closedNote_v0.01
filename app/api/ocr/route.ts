import { NextResponse } from "next/server";

const DEFAULT_OCR_MODEL = "microsoft/trocr-base-printed"; // good for printed text
const HANDWRITING_MODEL = "microsoft/trocr-base-handwritten"; // for handwriting

const noCacheHeaders = {
  'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
  'Pragma': 'no-cache',
  'Expires': '0',
};

async function wait(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

async function callHuggingFaceOCR(
  model: string,
  imageBytes: ArrayBuffer,
  token: string,
  retries = 3
): Promise<string> {
  const url = `https://router.huggingface.co/hf-inference/models/${encodeURIComponent(
    model
  )}`;

  for (let attempt = 0; attempt < retries; attempt++) {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: Buffer.from(imageBytes),
    });

    // 503 often means the model is loading; use small backoff
    if (res.status === 503) {
      await wait(1500 * (attempt + 1));
      continue;
    }

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Hugging Face OCR failed (${res.status}): ${text}`);
    }

    const data = await res.json();
    // Typical response: [{ generated_text: "..." }]
    if (Array.isArray(data) && data.length > 0 && data[0].generated_text) {
      return data[0].generated_text as string;
    }
    // Some models may return a string directly
    if (typeof data === "string") return data;
    // Fallback: try common fields
    const text = data?.generated_text || data?.text || data?.output || "";
    return String(text || "").trim();
  }

  throw new Error("Hugging Face OCR is not available (model loading or rate limited). Try again.");
}

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || "";
    if (!contentType.includes("multipart/form-data")) {
      return NextResponse.json(
        { error: "Expected multipart/form-data with a file field named 'file'" },
        { 
          status: 400,
          headers: noCacheHeaders,
        }
      );
    }

    const form = await request.formData();
    const file = form.get("file");
    const mode = (form.get("mode") || "printed").toString(); // 'printed' | 'handwritten'
    const modelOverride = form.get("model")?.toString();

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Missing image file" }, { 
        status: 400,
        headers: noCacheHeaders,
      });
    }

    const token = process.env.HUGGINGFACE_API_KEY || "";
    if (!token) {
      return NextResponse.json(
        {
          error:
            "OCR service is currently unavailable. The server administrator needs to configure HUGGINGFACE_API_KEY.",
        },
        { 
          status: 503,
          headers: noCacheHeaders,
        }
      );
    }

    const arrayBuf = await file.arrayBuffer();
    const model = modelOverride || (mode === "handwritten" ? HANDWRITING_MODEL : DEFAULT_OCR_MODEL);
    const text = await callHuggingFaceOCR(model, arrayBuf, token);

    return NextResponse.json({ text, model }, {
      headers: noCacheHeaders,
    });
  } catch (err) {
    console.error("/api/ocr error:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, {
      status: 500,
      headers: noCacheHeaders,
    });
  }
}
