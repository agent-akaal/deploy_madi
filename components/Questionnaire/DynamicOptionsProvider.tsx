"use client";

import React, { useState, useEffect, ReactNode } from "react";

interface DynamicOptionsProviderProps {
  optionType: string;
  subject: string;
  params?: {
    level?: string;
    interests?: string[] | string;
    time?: string;
    goal?: string;
  };
  fallbackOptions?: string[];
  children: (props: {
    options: string[];
    loading: boolean;
    error: string | null;
  }) => ReactNode;
}

export default function DynamicOptionsProvider({
  optionType,
  subject,
  params = {},
  fallbackOptions = ["Option 1", "Option 2", "Option 3", "Option 4"],
  children,
}: DynamicOptionsProviderProps) {
  const [options, setOptions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOptions() {
      try {
        // Build query parameters
        const queryParams = new URLSearchParams();
        queryParams.append("type", optionType);
        queryParams.append("subject", subject);
        
        if (params.level) queryParams.append("level", params.level);
        if (params.interests) {
          const interestsStr = Array.isArray(params.interests) 
            ? params.interests.join(',') 
            : params.interests;
          queryParams.append("interests", interestsStr);
        }
        if (params.time) queryParams.append("time", params.time);
        if (params.goal) queryParams.append("goal", params.goal);
        
        const response = await fetch(`/api/options?${queryParams.toString()}`);

        if (!response.ok) {
          throw new Error(`Failed to get response: ${response.status}`);
        }

        const data = await response.json();
        setOptions(data.options || []);
        setError(null);
      } catch (err) {
        console.error("Error fetching options:", err);
        setOptions(fallbackOptions);
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    setLoading(true);
    fetchOptions();
  }, [optionType, subject, params, fallbackOptions]);

  return <>{children({ options, loading, error })}</>;
} 