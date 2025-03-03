"use client";

export const maxDuration = 30;

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import ReactMarkdown from 'react-markdown';
import { parseStudyPlan } from "@/utils/studyPlanParser";

export default function StudyPlanPage() {
  const router = useRouter();
  const [studyPlan, setStudyPlan] = useState<string | null>(null);
  const [parsedPlan, setParsedPlan] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [requestData, setRequestData] = useState<any>(null);

  useEffect(() => {
    // Get the request data from localStorage
    const storedData = localStorage.getItem('studyPlanRequest');
    
    if (!storedData) {
      setError("No request data found. Please complete the questionnaire first.");
      setIsLoading(false);
      return;
    }
    
    const requestBody = JSON.parse(storedData);
    setRequestData(requestBody);
    
    // Make the API request
    const fetchStudyPlan = async () => {
      try {
        const response = await fetch('/api/study-plan', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: storedData,
        });
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        setStudyPlan(data);
        
        // Parse the study plan if it's a string
        if (typeof data === 'string') {
          setParsedPlan(parseStudyPlan(data));
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        console.error('Error fetching study plan:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchStudyPlan();
  }, []);

  // Function to render the parsed study plan
  const renderParsedPlan = () => {
    if (!parsedPlan) return null;
    
    return (
      <div>
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Introduction</h3>
          <div className="prose dark:prose-invert">
            <ReactMarkdown>{parsedPlan.introduction}</ReactMarkdown>
          </div>
        </div>
        
        <div className="space-y-8">
          {parsedPlan.days.map((day: any, index: number) => (
            <div key={index} className="border dark:border-gray-700 rounded-lg overflow-hidden">
              <div className="bg-blue-100 dark:bg-blue-900 p-3">
                <h3 className="text-lg font-bold">{day.name} {day.time}</h3>
              </div>
              
              <div className="p-4 space-y-4">
                {day.resources && day.resources.length > 0 ? (
                  day.resources.map((resource: any, rIndex: number) => (
                    <div key={rIndex} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
                      <h4 className="font-semibold text-lg mb-2">{resource.number}. {resource.title}</h4>
                      <ul className="space-y-2 list-disc pl-5">
                        <li><span className="font-medium">Time:</span> {resource.timeAllocation}</li>
                        <li><span className="font-medium">Reason:</span> {resource.reason}</li>
                        <li>
                          <span className="font-medium">URL:</span>{' '}
                          <a 
                            href={resource.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 dark:text-blue-400 hover:underline break-all"
                          >
                            {resource.url}
                          </a>
                        </li>
                      </ul>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-gray-500 dark:text-gray-400">
                    <p>No resources found for this day. Here's the raw content:</p>
                    <pre className="mt-2 p-3 bg-gray-100 dark:bg-gray-900 rounded overflow-auto text-sm">
                      {day.content}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Fallback rendering for when parsing fails
  const renderFallbackPlan = () => {
    if (typeof studyPlan === 'string') {
      return (
        <div className="prose dark:prose-invert max-w-none">
          <ReactMarkdown>{studyPlan}</ReactMarkdown>
        </div>
      );
    } else {
      return (
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded overflow-auto">
          {JSON.stringify(studyPlan, null, 2)}
        </pre>
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Your Personalized Study Plan</h1>
      
      {requestData && (
        <div className="mb-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-md">
          <h2 className="text-xl font-semibold mb-2">Request Details</h2>
          <p><strong>Subject:</strong> {requestData.subject}</p>
          <p><strong>Level:</strong> {requestData.level}</p>
          <p><strong>Interests:</strong> {Array.isArray(requestData.interests) ? requestData.interests.join(", ") : requestData.interests}</p>
          <p><strong>Weekly Hours:</strong> {requestData.weekly_hours}</p>
        </div>
      )}
      
      {isLoading && (
        <div className="text-center p-8">
          <div className="animate-pulse text-xl">Generating your personalized study plan...</div>
          <p className="mt-2 text-gray-600 dark:text-gray-400">This may take a moment as we analyze resources and create your plan.</p>
        </div>
      )}
      
      {error && (
        <div className="p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 rounded-md">
          <h2 className="text-xl font-semibold mb-2">Error</h2>
          <p>{error}</p>
          <div className="mt-4">
            <Button onClick={() => router.push('/questions')}>
              Return to Questionnaire
            </Button>
          </div>
        </div>
      )}
      
      {studyPlan && !isLoading && (
        <div className="bg-gray-50 dark:bg-gray-800 border dark:border-gray-700 rounded-md shadow-sm">
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Study Plan</h2>
            {parsedPlan ? renderParsedPlan() : renderFallbackPlan()}
          </div>
          
          <div className="border-t dark:border-gray-700 p-4 flex justify-between">
            <Button variant="outline" onClick={() => router.push('/questions')}>
              Back to Questionnaire
            </Button>
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => window.print()}
            >
              Print Study Plan
            </Button>
          </div>
        </div>
      )}
    </div>
  );
} 