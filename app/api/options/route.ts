// app/api/options/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const optionType = searchParams.get("type");
  const subject = searchParams.get("subject");
  
  // Extract other parameters
  const level = searchParams.get("level") || "";
  const interests = searchParams.get("interests") || "";
  const time = searchParams.get("time") || "";
  const goal = searchParams.get("goal") || "";
  
  if (!optionType || !subject) {
    return NextResponse.json(
      { error: "Option type and subject are required" },
      { status: 400 }
    );
  }
  
  try {
    const fastApiUrl = process.env.NEXT_PUBLIC_FASTAPI_URL || 'http://localhost:8000';
    
    try {
      console.log(`Calling FastAPI at ${fastApiUrl}/get_dynamic_options`);
      console.log("Request body:", {
        optionType,
        subject,
        params: {
          level,
          interests: interests ? interests.split(',') : [],
          time,
          goal
        }
      });
      
      const response = await fetch(`${fastApiUrl}/get_dynamic_options`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          optionType,
          subject,
          params: {
            level,
            interests: interests ? interests.split(',') : [],
            time,
            goal
          }
        }),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to get options: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Response from FastAPI:", data);
      return NextResponse.json(data);
    } catch (fetchError) {
      console.error("Error connecting to FastAPI:", fetchError);
      // Return subject-specific fallback options
      const fallbackOptions = {
        interests: [
          "Core fundamentals",
          "Practical applications",
          "Advanced techniques",
          "Latest developments"
        ],
        outcomes: [
          "Understand basic concepts",
          "Build simple projects",
          "Apply knowledge in real-world scenarios",
          "Teach others what you've learned"
        ],
        challenges: [
          "Finding quality resources",
          "Building consistent study habits",
          "Balancing theory and practice",
          "Staying motivated"
        ]
      };
      
      return NextResponse.json({
        options: fallbackOptions[optionType as keyof typeof fallbackOptions] || [
          "Option 1",
          "Option 2",
          "Option 3",
          "Option 4"
        ]
      });
    }
  } catch (error) {
    console.error("Error fetching dynamic options:", error);
    return NextResponse.json(
      { 
        options: [
          "Default Option 1",
          "Default Option 2",
          "Default Option 3",
          "Default Option 4"
        ] 
      }
    );
  }
}

// Add POST handler that mirrors the GET functionality
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const optionType = body.optionType;
    const subject = body.subject;
    const level = body.level || '';
    const interests = body.interests || [];
    const time = body.time || '';
    const goal = body.goal || '';
    
    if (!optionType || !subject) {
      return NextResponse.json(
        { error: "Option type and subject are required" },
        { status: 400 }
      );
    }
    
    const fastApiUrl = process.env.NEXT_PUBLIC_FASTAPI_URL || 'http://localhost:8000';
    
    try {
      console.log(`Calling FastAPI at ${fastApiUrl}/get_dynamic_options (POST)`);
      console.log("Request body:", {
        optionType,
        subject,
        params: {
          level,
          interests,
          time,
          goal
        }
      });
      
      const response = await fetch(`${fastApiUrl}/get_dynamic_options`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          optionType,
          subject,
          params: {
            level,
            interests,
            time,
            goal
          }
        }),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to get options: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Response from FastAPI:", data);
      return NextResponse.json(data);
    } catch (fetchError) {
      console.error("Error connecting to FastAPI:", fetchError);
      // Return subject-specific fallback options
      const fallbackOptions = {
        interests: [
          "Core fundamentals",
          "Practical applications",
          "Advanced techniques",
          "Latest developments"
        ],
        outcomes: [
          "Understand basic concepts",
          "Build simple projects",
          "Apply knowledge in real-world scenarios",
          "Teach others what you've learned"
        ],
        challenges: [
          "Finding quality resources",
          "Building consistent study habits",
          "Balancing theory and practice",
          "Staying motivated"
        ]
      };
      
      return NextResponse.json({
        options: fallbackOptions[optionType as keyof typeof fallbackOptions] || [
          "Option 1",
          "Option 2",
          "Option 3",
          "Option 4"
        ]
      });
    }
  } catch (error) {
    console.error("Error in POST /api/options:", error);
    return NextResponse.json(
      { 
        options: [
          "Default Option 1",
          "Default Option 2",
          "Default Option 3",
          "Default Option 4"
        ] 
      }
    );
  }
}
