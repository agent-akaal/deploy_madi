"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

type Question2Props = {
  subject: string;
  level: string;
  defaultValue?: string[];
  onContinue: (values: string[]) => void;
  onBack: () => void;
};

export default function Question2({ subject, level, defaultValue, onContinue, onBack }: Question2Props) {
  const [options, setOptions] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selected, setSelected] = useState<string[]>(defaultValue || []);

  useEffect(() => {
    async function fetchOptions() {
      setLoading(true);
      try {
        const res = await fetch("/api/options", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            optionType: "interests",
            subject,
            level,
          }),
        });
        
        if (!res.ok) {
          throw new Error(`Failed to get options: ${res.status}`);
        }
        
        const data = await res.json();
        setOptions(data.options || []);
      } catch (err) {
        console.error("Error fetching options:", err);
        setOptions([
          "Foundational concepts",
          "Practical applications",
          "Advanced techniques",
          "Latest developments",
        ]);
      } finally {
        setLoading(false);
      }
    }
    
    fetchOptions();
  }, [subject, level]);

  const handleSelectionChange = (option: string) => {
    setSelected((prev) => {
      if (prev.includes(option)) {
        return prev.filter((item) => item !== option);
      }
      return [...prev, option];
    });
  };

  if (loading) return <div>Loading options...</div>;

  return (
    <div>
      <h2 className="question-header text-xl font-semibold mb-2">
        What specific areas interest you the most?
      </h2>
      <p className="text-muted-foreground mb-4">
        Select one or more areas of {subject} that you'd like to focus on.
      </p>
      <div className="space-y-2">
        {options.map((option, index) => (
          <div key={`${option}-${index}`} className="flex items-center space-x-2">
            <Checkbox
              id={option}
              checked={selected.includes(option)}
              onCheckedChange={() => handleSelectionChange(option)}
            />
            <label
              htmlFor={option}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {option}
            </label>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-4">
        <Button variant="outline" onClick={onBack}>
          ← Back
        </Button>
        <Button 
          onClick={() => onContinue(selected)}
          disabled={selected.length === 0}
        >
          Continue →
        </Button>
      </div>
    </div>
  );
}
