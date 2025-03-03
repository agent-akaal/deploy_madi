"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";

type Question3Props = {
  defaultValue?: string;
  onContinue: (value: string) => void;
  onBack: () => void;
};

export default function Question3({ defaultValue, onContinue, onBack }: Question3Props) {
  const options = ["1-2 hours", "3-5 hours", "6-10 hours", "10+ hours"];
  const [selected, setSelected] = useState<string>(defaultValue || options[0]);

  return (
    <div>
      <h2 className="question-header text-xl font-semibold mb-2">
        How many hours can you dedicate weekly?
      </h2>
      <div className="space-y-2">
        {options.map((option, index) => (
          <label key={`${option}-${index}`} className="block">
            <input
              type="radio"
              name="q3"
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
        <Button variant="outline" onClick={onBack}>
          ← Back
        </Button>
        <Button onClick={() => onContinue(selected)}>Continue →</Button>
      </div>
    </div>
  );
}
