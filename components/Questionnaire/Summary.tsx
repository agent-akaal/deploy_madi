"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type SummaryProps = {
  subject: string;
  answers: { [key: number]: any };
  onRestart?: () => void;
};

export default function Summary({ subject, answers, onRestart }: SummaryProps) {
  const router = useRouter();
  
  // Prepare the request body based on the collected answers
  const requestBody = {
    subject: subject,
    interests: Array.isArray(answers[2]) ? answers[2] : [answers[2]],
    level: answers[1],
    weekly_hours: answers[3]
  };

  const handleGenerateStudyPlan = () => {
    // Store the request data in localStorage for the next page
    localStorage.setItem('studyPlanRequest', JSON.stringify(requestBody));
    
    // Navigate to the study plan page
    router.push('/study-plan');
  };

  return (
    <div className="rounded-md border p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Your Learning Path Summary</h2>
      <div className="space-y-2">
        <p>
          <strong>Subject:</strong> {subject}
        </p>
        <p>
          <strong>Skill Level:</strong> {answers[1]}
        </p>
        <p>
          <strong>Interests:</strong>{" "}
          {Array.isArray(answers[2]) ? answers[2].join(", ") : answers[2]}
        </p>
        <p>
          <strong>Time Commitment:</strong> {answers[3]}
        </p>
        <p>
          <strong>Desired Outcome:</strong> {answers[4]}
        </p>
        <p>
          <strong>Biggest Challenge:</strong> {answers[5]}
        </p>
      </div>

      <div className="mt-6">
        <h3 className="font-semibold mb-2">API Request (JSON):</h3>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-black dark:text-gray-200 text-sm font-mono">
          {JSON.stringify(requestBody, null, 2)}
        </pre>
      </div>

      {/* Optional: Provide a button to restart or go back */}
      {onRestart && (
        <Button className="mt-4" onClick={onRestart}>
          Start Over
        </Button>
      )}
      
      <div className="mt-4 flex gap-2">
        <Button onClick={handleGenerateStudyPlan}>
          Generate Study Plan
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            localStorage.setItem('studyPlanRequest', JSON.stringify(requestBody));
            router.push('/study-plan-v2');
          }}
        >
          Generate Enhanced Study Plan
        </Button>
      </div>
    </div>
  );
}
