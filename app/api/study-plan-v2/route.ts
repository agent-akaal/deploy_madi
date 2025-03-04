import { NextRequest, NextResponse } from 'next/server';

export const maxDuration = 30;

// Your FastAPI endpoint URL
const FASTAPI_URL = process.env.NEXT_PUBLIC_FASTAPI_URL || 'http://localhost:8000';

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const requestData = await request.json();
    
    // Set a longer timeout for the fetch request
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 300000); // 30 seconds timeout

    // Make the request to the FastAPI backend
    const response = await fetch(`${FASTAPI_URL}/study-plans/v2`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(requestData),
      signal: controller.signal, // Use the abort signal
    });

    clearTimeout(timeoutId); // Clear the timeout if the request completes in time

    // Check if the request was successful
    if (!response.ok) {
      throw new Error(`FastAPI responded with status: ${response.status}`);
    }

    // Parse the response
    const data = await response.json();
    
    // Return the response from the FastAPI server
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in study plan V2 API route:', error);
    return NextResponse.json(
      { error: 'Failed to generate enhanced study plan' },
      { status: 500 }
    );
  }
} 