"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

// Define a type for the answers
type Answers = {
  [key: number]: any;
};

export default function Questionnaire() {
  const [currentQuestion, setCurrentQuestion] = useState<number>(1);
  const [answers, setAnswers] = useState<Answers>({});

  // For questions that need a subject, we assume it is set earlier.
  // For this dummy implementation, we use a fixed value.
  const subject = "Python";

  // --- Dummy helper functions ---
  const storeAnswer = (questionId: number, answer: any) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const getAnswer = (questionId: number) => answers[questionId];

  const goBack = (questionId: number) => {
    if (questionId > 1) {
      setCurrentQuestion(questionId - 1);
    }
  };

  // --- Question Components as Separate Functions ---

  const Question1 = () => {
    const options = ["Beginner", "Intermediate", "Advanced"];
    // Use the previous answer if available; otherwise default to the first option
    const previousAnswer = getAnswer(1) || "";
    const [selected, setSelected] = useState<string>(
      previousAnswer || options[0]
    );

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
          <Button
            variant="outline"
            onClick={() => {
              console.log("Back to Home");
            }}
          >
            ← Back
          </Button>
          <Button
            onClick={() => {
              storeAnswer(1, selected);
              setCurrentQuestion(2);
            }}
          >
            Continue →
          </Button>
        </div>
      </div>
    );
  };

  const Question2 = () => {
    const level = getAnswer(1);
    const [options, setOptions] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const previousAnswer = (getAnswer(2) as string[]) || [];
    const [selected, setSelected] = useState<string[]>(previousAnswer);

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
          const data = await res.json();
          setOptions(data.options || []);
        } catch (err) {
          console.error(err);
          setOptions([]);
        }
        setLoading(false);
      }
      fetchOptions();
    }, [subject, level]);

    const handleCheckboxChange = (option: string) => {
      if (selected.includes(option)) {
        setSelected(selected.filter((item) => item !== option));
      } else {
        setSelected([...selected, option]);
      }
    };

    if (loading) return <div>Loading options...</div>;

    return (
      <div>
        <h2 className="question-header text-xl font-semibold mb-2">
          Which area of {subject} interests you the most?
        </h2>
        <div className="space-y-2">
          {options.map((option, index) => (
            <label key={`${option}-${index}`} className="block">
              <input
                type="checkbox"
                value={option}
                checked={selected.includes(option)}
                onChange={() => handleCheckboxChange(option)}
                className="mr-2"
              />
              {option}
            </label>
          ))}
        </div>
        <div className="flex justify-between mt-4">
          <Button variant="outline" onClick={() => goBack(2)}>
            ← Back
          </Button>
          <Button
            onClick={() => {
              if (selected.length > 0) {
                storeAnswer(2, selected);
                setCurrentQuestion(3);
              } else {
                alert("Please select at least one option to continue");
              }
            }}
          >
            Continue →
          </Button>
        </div>
      </div>
    );
  };

  const Question3 = () => {
    const options = ["1-2 hours", "3-5 hours", "6-10 hours", "10+ hours"];
    const previousAnswer = getAnswer(3) || "";
    const [selected, setSelected] = useState<string>(
      previousAnswer || options[0]
    );

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
          <Button variant="outline" onClick={() => goBack(3)}>
            ← Back
          </Button>
          <Button
            onClick={() => {
              storeAnswer(3, selected);
              setCurrentQuestion(4);
            }}
          >
            Continue →
          </Button>
        </div>
      </div>
    );
  };

  const Question4 = () => {
    const level = getAnswer(1);
    const [options, setOptions] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const previousAnswer = getAnswer(4) || "";
    const [selected, setSelected] = useState<string>(previousAnswer || "");

    useEffect(() => {
      async function fetchOptions() {
        setLoading(true);
        try {
          const res = await fetch("/api/options", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              optionType: "outcomes",
              subject,
              level,
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
    }, [subject, level]);

    if (loading) return <div>Loading options...</div>;

    return (
      <div>
        <h2 className="question-header text-xl font-semibold mb-2">
          What's your desired outcome from learning {subject}?
        </h2>
        <div className="space-y-2">
          {options.map((option, index) => (
            <label key={`${option}-${index}`} className="block">
              <input
                type="radio"
                name="q4"
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
          <Button variant="outline" onClick={() => goBack(4)}>
            ← Back
          </Button>
          <Button
            onClick={() => {
              storeAnswer(4, selected);
              setCurrentQuestion(5);
            }}
          >
            Continue →
          </Button>
        </div>
      </div>
    );
  };

  const Question5 = () => {
    const level = getAnswer(1);
    const interests = getAnswer(2);
    const time = getAnswer(3);
    const goal = getAnswer(4);
    const [options, setOptions] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const previousAnswer = getAnswer(5) || "";
    const [selected, setSelected] = useState<string>(previousAnswer || "");

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
          <Button variant="outline" onClick={() => goBack(5)}>
            ← Back
          </Button>
          <Button
            onClick={() => {
              storeAnswer(5, selected);
              console.log("Questionnaire complete. Answers:", answers);
              alert(
                "Questionnaire complete! Generating your personalized learning path..."
              );
              // Navigate or call endpoint as needed.
            }}
          >
            Generate Learning Path →
          </Button>
        </div>
      </div>
    );
  };

  // --- Render the Current Question ---
  const renderQuestion = () => {
    switch (currentQuestion) {
      case 1:
        return <Question1 />;
      case 2:
        return <Question2 />;
      case 3:
        return <Question3 />;
      case 4:
        return <Question4 />;
      case 5:
        return <Question5 />;
      default:
        return <div>Questionnaire Completed!</div>;
    }
  };

  // --- Render a simple progress bar ---
  const progressPercent = ((currentQuestion - 1) / 5) * 100;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Learning Journey 
      </h1>
      <div className="mb-4">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>
      {renderQuestion()}
    </div>
  );
}
