import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "No prompt provided" }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "No API key set" }, { status: 500 });
    }

    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-image-1",
prompt: `${prompt}. Fine line tattoo illustration, clean thin lines, high detail, symmetric balance, no color, minimal shading.`,
size: "1024x1024",
n: 3
model: "gpt-image-1",
prompt: `${prompt}. Fine line tattoo illustration, clean thin lines, high detail, symmetric balance, no color, minimal shading.`,
size: "1024x1024",
n: 3
      }),
    });

    const data = await response.json();

    const images = data.data?.map((img: any) => img.url) || [];

    return NextResponse.json({ images });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

