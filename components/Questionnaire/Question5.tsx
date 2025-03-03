"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

type Question5Props = {
  subject: string;
  level: string;
  interests: string[];
  time: string;
  goal: string;
  defaultValue?: string;
  onContinue: (value: string) => void;
  onBack: () => void;
};

export default function Question5({
  subject,
  level,
  interests,
  time,
  goal,
  defaultValue,
  onContinue,
  onBack,
}: Question5Props) {
  const [options, setOptions] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selected, setSelected] = useState<string>(defaultValue || "");

  useEffect(() => {
    async function fetchOptions() {
      setLoading(true);
      try {
        const res = await fetch("/api/options", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            optionType: "challenges",
            subject,
            level,
            interests,
            time,
            goal,
          }),
        });
        const data = await res.json();
        setOptions(data.options || []);
      } catch (err) {
        console.error(err);
        setOptions([]);
      }
      setLoading(false);
    }
    fetchOptions();
  }, [subject, level, interests, time, goal]);

  if (loading) return <div>Loading options...</div>;

  return (
    <div>
      <h2 className="question-header text-xl font-semibold mb-2">
        What's your biggest challenge when learning something new?
      </h2>
      <div className="space-y-2">
        {options.map((option, index) => (
          <label key={`${option}-${index}`} className="block">
            <input
              type="radio"
              name="q5"
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
        <Button onClick={() => onContinue(selected)}>
          Generate Learning Path →
        </Button>
      </div>
    </div>
  );
}
