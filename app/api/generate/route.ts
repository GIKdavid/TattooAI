import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export const runtime = "nodejs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "Invalid or missing prompt" },
        { status: 400 }
      );
    }

    const response = await openai.images.generate({
      model: "gpt-image-1",
      prompt: `${prompt}. Fine line tattoo illustration, clean thin lines, minimal shading, high detail, must look like a tattoo stencil, no color, balanced composition.`,
      n: 3,
      size: "1024x1024",
    });

    const images = response.data.map((img) => img.url).filter(Boolean);

    return NextResponse.json({ images }, { status: 200 });

  } catch (error: any) {
    console.error("OpenAI Error:", error);
    return NextResponse.json(
      { error: "Server error", details: error?.message || String(error) },
      { status: 500 }
    );
  }
}
