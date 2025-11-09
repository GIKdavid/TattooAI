import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "Invalid or missing prompt" },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Missing OPENAI_API_KEY" },
        { status: 500 }
      );
    }

    const response = await fetch(
      "https://api.openai.com/v1/images/generations",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-image-1",
          prompt: `${prompt}. Fine line tattoo illustration, clean thin lines, minimal shading, high detail, the design must look inkable on skin, balanced composition, no background.`,
          n: 3,
          size: "1024x1024"
        }),
      }
    );

    if (!response.ok) {
      const text = await response.text();
      return NextResponse.json(
        { error: "OpenAI error", details: text },
        { status: response.status }
      );
    }

    const data = await response.json();

    const images =
      (data?.data || []).map((item: any) => item.url).filter(Boolean);

    return NextResponse.json({ images }, { status: 200 });

  } catch (error: any) {
    return NextResponse.json(
      { error: "Server error", details: String(error?.message || error) },
      { status: 500 }
    );
  }
}
