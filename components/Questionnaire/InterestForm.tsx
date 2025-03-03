"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface InterestFormProps {
  onSubmit: (interest: string) => void;
}

export default function InterestForm({ onSubmit }: InterestFormProps) {
  const [interest, setInterest] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(interest);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="rounded-md border p-6 shadow-sm">
        <h1 className="text-2xl font-bold mb-4">What do you want to learn today?</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            placeholder="Enter your topic or interest..."
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
          />
          <Button type="submit" className="w-full">
            Continue →
          </Button>
        </form>
      </div>
    </div>
  );
}
