"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";

type Question1Props = {
  defaultValue?: string;
  onContinue: (value: string) => void;
};

export default function Question1({ defaultValue, onContinue }: Question1Props) {
  const options = ["Beginner", "Intermediate", "Advanced"];
  const [selected, setSelected] = useState<string>(defaultValue || options[0]);

  return (
    <div>
      <h2 className="question-header text-xl font-semibold mb-2">
        What's your current skill level?
      </h2>
      <div className="space-y-2">
        {options.map((option, index) => (
          <label key={`${option}-${index}`} className="block">
            <input
              type="radio"
              name="q1"
              value={option}
              checked={selected === option}
              onChange={() => setSelected(option)}
              className="mr-2"
            />
            {option}
          </label>
        ))}
      </div>
      <div className="flex justify-between mt-4">
        <Button variant="outline" onClick={() => console.log("Back to Home")}>
          ← Back
        </Button>
        <Button onClick={() => onContinue(selected)}>Continue →</Button>
      </div>
    </div>
  );
}
