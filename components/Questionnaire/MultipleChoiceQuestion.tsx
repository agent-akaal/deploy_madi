import React, { ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface MultipleChoiceQuestionProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  onNext: () => void;
  onBack: () => void;
  disableNext?: boolean;
  loading?: boolean;
}

export default function MultipleChoiceQuestion({
  title,
  subtitle,
  children,
  onNext,
  onBack,
  disableNext = false,
  loading = false,
}: MultipleChoiceQuestionProps) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-muted-foreground">{subtitle}</p>
      </div>
      
      {loading ? (
        <div className="py-8 flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        children
      )}
      
      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext} disabled={disableNext}>
          Next
        </Button>
      </div>
    </div>
  );
} 