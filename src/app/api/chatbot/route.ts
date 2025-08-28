import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // Parse the JSON body from the request
    const { message } = await req.json();

    // Make the request to Hugging Face API
    const response = await fetch("https://router.huggingface.co/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HF_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [
          {
            role: "user",
            content: message,
          },
        ],
        model: "openai/gpt-oss-20b:novita",
      }),
    });

    const data = await response.json();
    // console.log(data.choices);

    if (!response.ok) {
      console.error("Error:", data);
      return NextResponse.json({ error: "Model error", details: data }, { status: 500 });
    }

    const reply =
      data?.choices?.[0]?.message?.content || "No response from model";
    const reasoning = data?.choices?.[0]?.message?.reasoning_content || "";

    return NextResponse.json({ response: reply, reasoning });
  } catch (error: any) {
    console.error("Exception:", error);
    return NextResponse.json({ error: error.message || "Unexpected error" }, { status: 500 });
  }
}
