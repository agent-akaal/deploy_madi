import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, subject } = body;

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    // Call the FastAPI backend
    const fastApiUrl = process.env.NEXT_PUBLIC_FASTAPI_URL || 'http://localhost:8000';
    
    const response = await fetch(`${fastApiUrl}/get_ollama_response`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        subject,
      }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `API error: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    const text = data.response;

    if (!text) {
      return NextResponse.json({ options: [] });
    }

    // Split the text into an array using newline as the delimiter
    let options = text.trim().split("\n");

    // If the first element looks like a stringified list, try parsing it
    if (options.length > 0 && options[0].startsWith("[") && options[0].endsWith("]")) {
      try {
        const parsed = JSON.parse(options[0]);
        if (Array.isArray(parsed)) {
          options = parsed;
        }
      } catch (err) {
        console.error("Error parsing stringified list:", err);
      }
    }

    // Clean up each option by trimming unwanted characters
    let cleanedOptions = options.map((opt: string) =>
      opt.trim().replace(/^[\[\]"',;]+|[\[\]"',;]+$/g, "")
    );

    // Ensure we have exactly 4 options by padding or trimming the array
    if (cleanedOptions.length < 4) {
      const diff = 4 - cleanedOptions.length;
      for (let i = 0; i < diff; i++) {
        cleanedOptions.push(`Option ${cleanedOptions.length + 1}`);
      }
    } else if (cleanedOptions.length > 4) {
      cleanedOptions = cleanedOptions.slice(0, 4);
    }
    
    return NextResponse.json({
      options: cleanedOptions,
    });
  } catch (error) {
    console.error("Error in Ollama API route:", error);
    return NextResponse.json({
      options: [
        "Default Option 1",
        "Default Option 2",
        "Default Option 3",
        "Default Option 4",
      ]
    });
  }
}
