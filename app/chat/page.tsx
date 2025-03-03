"use client";  // <-- Add this at the top

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const model = "llama3.2:3b"; // Ensure this matches the model you have downloaded in Ollama
  
    const res = await fetch("/api/ollama", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        model: model, 
        messages: [{ role: "user", content: message }] 
      }),
    });
  
    const data = await res.json();
    console.log("Frontend API Response:", data);
    setResponse(data.choices?.[0]?.message?.content || "(No response)");
  };
  

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input 
          type="text" 
          value={message} 
          onChange={e => setMessage(e.target.value)} 
          placeholder="Ask something..." 
          className="flex-1 rounded border px-3 py-2"
          required 
        />
        <Button type="submit">Send</Button>
      </form>
      {response && (
        <div className="bg-gray-50 border rounded p-3">
          <p><strong>AI:</strong> {response}</p>
        </div>
      )}
    </div>
  );
}
