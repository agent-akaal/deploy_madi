"use client";

export const maxDuration = 30;

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import ReactMarkdown from 'react-markdown';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Resource {
  id: string;
  title: string;
  type: string;
  url: string;
  difficulty: string;
  topics: string[] | string;
  time_minutes: number;
}

interface Activity {
  title: string;
  full_description: string;
  start_time: string;
  end_time: string;
  duration_minutes: number;
  resource_id: string | null;
  type: string;
}

interface Day {
  day: string;
  title: string;
  total_minutes: number;
  content: string;
  activities: Activity[];
}

interface StudyPlanV2 {
  plan: string;
  metadata: {
    subject: string;
    interests: string[] | string;
    level: string;
    weekly_hours: string;
    total_resources_found: number;
    resources_included: number;
    total_study_time_minutes: number;
  };
  resources: Resource[];
  daily_schedule: {
    days: Day[];
  };
}

export default function StudyPlanV2Page() {
  const router = useRouter();
  const [studyPlan, setStudyPlan] = useState<StudyPlanV2 | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [requestData, setRequestData] = useState<any>(null);
  const [isWaiting, setIsWaiting] = useState<boolean>(false);

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
    
    // Make the API request to the V2 endpoint
    const fetchStudyPlan = async () => {
      try {
        // Set a longer timeout for the fetch request
        const controller = new AbortController();
        const timeoutId = setTimeout(() => {
          controller.abort();
          setIsWaiting(true);
        }, 300000); // 5 minutes timeout

        const response = await fetch('/api/study-plan-v2', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: storedData,
          signal: controller.signal, // Use the abort signal
        });

        clearTimeout(timeoutId); // Clear the timeout if the request completes in time

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        setStudyPlan(data);
      } catch (err) {
        // Only log the error, do not set it in state
        console.error('Error fetching study plan:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchStudyPlan();
  }, []);

  const getActivityTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return '🎬';
      case 'reading':
        return '📚';
      case 'practice':
        return '💻';
      case 'review':
        return '🔍';
      case 'break':
        return '☕';
      default:
        return '📝';
    }
  }

  const findResource = (resourceId: string | null) => {
    if (!resourceId || !studyPlan?.resources) return null;
    return studyPlan.resources.find(r => r.id === resourceId);
  }

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins > 0 ? `${mins}m` : ''}` : `${mins}m`;
  }

  const renderDailySchedule = () => {
    if (!studyPlan?.daily_schedule) return null;
    
    return (
      <div className="space-y-6">
        {studyPlan.daily_schedule.days.map((day, index) => (
          <Card key={index} className="shadow-sm">
            <CardHeader className="bg-blue-50 dark:bg-blue-950 pb-2">
              <CardTitle className="flex justify-between items-center">
                <span>{day.day}: {day.title}</span>
                <Badge variant="secondary">{formatTime(day.total_minutes)}</Badge>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="pt-4">
              <div className="space-y-4">
                {day.activities.map((activity, actIndex) => {
                  const resource = findResource(activity.resource_id);
                  return (
                    <div key={actIndex} className="border dark:border-gray-700 rounded-md p-3">
                      <div className="flex items-start gap-2">
                        <div className="text-xl">{getActivityTypeIcon(activity.type)}</div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="font-medium">{activity.title}</h4>
                            <Badge variant="outline">{formatTime(activity.duration_minutes)}</Badge>
                          </div>
                          
                          {(activity.start_time && activity.end_time) && (
                            <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                              {activity.start_time} - {activity.end_time}
                            </div>
                          )}
                          
                          {resource && (
                            <div className="mt-2 text-sm">
                              <div className="flex gap-2 mb-1">
                                <Badge variant="outline">{resource.type}</Badge>
                                <Badge variant="outline">{resource.difficulty}</Badge>
                              </div>
                              <a 
                                href={resource.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 dark:text-blue-400 hover:underline block mt-1 break-all"
                              >
                                {resource.title}
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const renderResourceList = () => {
    if (!studyPlan?.resources) return null;
    
    return (
      <div className="space-y-4">
        {studyPlan.resources.map((resource, index) => (
          <Card key={index} className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="flex justify-between items-center text-base">
                <span>{resource.title}</span>
                <Badge>{resource.type}</Badge>
              </CardTitle>
              <CardDescription className="flex gap-2">
                <Badge variant="outline">{resource.difficulty}</Badge>
                <Badge variant="outline">{formatTime(resource.time_minutes)}</Badge>
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pt-2">
              {resource.topics && (
                <div className="flex flex-wrap gap-1 mb-2">
                  {Array.isArray(resource.topics) 
                    ? resource.topics.map((topic, i) => (
                        <Badge key={i} variant="secondary">{topic}</Badge>
                      ))
                    : typeof resource.topics === 'string' &&
                      resource.topics.split(',').map((topic, i) => (
                        <Badge key={i} variant="secondary">{topic.trim()}</Badge>
                      ))
                  }
                </div>
              )}
              <a 
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline block mt-1 break-all"
              >
                {resource.url}
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const renderRawPlan = () => {
    if (!studyPlan?.plan) return null;
    
    return (
      <div className="prose dark:prose-invert max-w-none">
        <ReactMarkdown>{studyPlan.plan}</ReactMarkdown>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Your Enhanced Study Plan</h1>
      
      {requestData && studyPlan?.metadata && (
        <div className="mb-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-md">
          <h2 className="text-xl font-semibold mb-2">Plan Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p><strong>Subject:</strong> {studyPlan.metadata.subject}</p>
              <p><strong>Level:</strong> {studyPlan.metadata.level}</p>
              <p><strong>Interests:</strong> {Array.isArray(studyPlan.metadata.interests) 
                ? studyPlan.metadata.interests.join(", ") 
                : studyPlan.metadata.interests}
              </p>
              <p><strong>Weekly Hours:</strong> {studyPlan.metadata.weekly_hours}</p>
            </div>
            <div>
              <p><strong>Total Resources Found:</strong> {studyPlan.metadata.total_resources_found}</p>
              <p><strong>Resources Included:</strong> {studyPlan.metadata.resources_included}</p>
              <p><strong>Total Study Time:</strong> {formatTime(studyPlan.metadata.total_study_time_minutes)}</p>
            </div>
          </div>
        </div>
      )}
      
      {isLoading && !isWaiting && (
        <div className="text-center p-8">
          <div className="animate-pulse text-xl">Generating your enhanced study plan...</div>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            This may take a moment as we analyze resources and create your personalized schedule.
          </p>
        </div>
      )}
      
      {isWaiting && (
        <div className="text-center p-8">
          <div className="text-xl">Still waiting for your enhanced study plan...</div>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Please be patient, this may take a while.
          </p>
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
          <Tabs defaultValue="schedule">
            <div className="p-4 border-b dark:border-gray-700">
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="schedule">Daily Schedule</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
                <TabsTrigger value="raw">Raw Plan</TabsTrigger>
              </TabsList>
            </div>
            
            <div className="p-6">
              <TabsContent value="schedule">
                <h2 className="text-2xl font-semibold mb-4">Daily Schedule</h2>
                {renderDailySchedule()}
              </TabsContent>
              
              <TabsContent value="resources">
                <h2 className="text-2xl font-semibold mb-4">Learning Resources</h2>
                {renderResourceList()}
              </TabsContent>
              
              <TabsContent value="raw">
                <h2 className="text-2xl font-semibold mb-4">Complete Study Plan</h2>
                {renderRawPlan()}
              </TabsContent>
            </div>
          </Tabs>
          
          <div className="border-t dark:border-gray-700 p-4 flex justify-between">
            <Button variant="outline" onClick={() => router.push('/questions')}>
              Back to Questionnaire
            </Button>
            <div className="flex gap-2">
              <Button 
                variant="outline"
                onClick={() => router.push('/learning-map')}
              >
                View Learning Map
              </Button>
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => window.print()}
              >
                Print Study Plan
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 