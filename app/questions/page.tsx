"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Question1 from "@/components/Questionnaire/Question1";
import Question2 from "@/components/Questionnaire/Question2";
import Question3 from "@/components/Questionnaire/Question3";
import Question4 from "@/components/Questionnaire/Question4";
import Question5 from "@/components/Questionnaire/Question5";
import Summary from "@/components/Questionnaire/Summary";

import InterestForm from "@/components/Questionnaire/InterestForm"; // Our landing form component

type Answers = {
  [key: number]: any;
};

export default function Questionnaire() {
  const [subject, setSubject] = useState<string>("");
  const [currentQuestion, setCurrentQuestion] = useState<number>(1);
  const [answers, setAnswers] = useState<Answers>({});

  // If the subject is not set, show your interest form here, or handle it however you like:
  if (!subject) {
    return <InterestForm onSubmit={(interest) => setSubject(interest)} />;
  }

  const storeAnswer = (questionId: number, answer: any) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const getAnswer = (questionId: number) => answers[questionId];

  const renderQuestion = () => {
    switch (currentQuestion) {
      case 1:
        return (
          <Question1
            defaultValue={getAnswer(1)}
            onContinue={(value) => {
              storeAnswer(1, value);
              setCurrentQuestion(2);
            }}
          />
        );
      case 2:
        return (
          <Question2
            subject={subject || "Python"}
            level={getAnswer(1)}
            defaultValue={getAnswer(2)}
            onBack={() => setCurrentQuestion(1)}
            onContinue={(value) => {
              storeAnswer(2, value);
              setCurrentQuestion(3);
            }}
          />
        );
      case 3:
        return (
          <Question3
            defaultValue={getAnswer(3)}
            onBack={() => setCurrentQuestion(2)}
            onContinue={(value) => {
              storeAnswer(3, value);
              setCurrentQuestion(4);
            }}
          />
        );
      case 4:
        return (
          <Question4
            subject={subject || "Python"}
            level={getAnswer(1)}
            defaultValue={getAnswer(4)}
            onBack={() => setCurrentQuestion(3)}
            onContinue={(value) => {
              storeAnswer(4, value);
              setCurrentQuestion(5);
            }}
          />
        );
      case 5:
        return (
          <Question5
            subject={subject || "Python"}
            level={getAnswer(1)}
            interests={getAnswer(2)}
            time={getAnswer(3)}
            goal={getAnswer(4)}
            defaultValue={getAnswer(5)}
            onBack={() => setCurrentQuestion(4)}
            onContinue={(value) => {
              storeAnswer(5, value);
              // Move to summary
              setCurrentQuestion(6);
            }}
          />
        );
      case 6:
        // Display the summary
        return (
          <Summary
            subject={subject || "Python"}
            answers={answers}
            onRestart={() => {
              // If you want a restart button, reset everything
              setSubject("");
              setAnswers({});
              setCurrentQuestion(1);
            }}
          />
        );
      default:
        return <div>Questionnaire Completed!</div>;
    }
  };

  // Example progress bar
  const progressPercent =
    currentQuestion <= 5
      ? ((currentQuestion - 1) / 5) * 100
      : 100; // Full if summary

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Personalized Learning Path Questionnaire
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


// "use client";

// import React, { useState } from "react";
// import { Button } from "@/components/ui/button";
// import Question1 from "@/components/Questionnaire/Question1";
// import Question2 from "@/components/Questionnaire/Question2";
// import Question3 from "@/components/Questionnaire/Question3";
// import Question4 from "@/components/Questionnaire/Question4";
// import Question5 from "@/components/Questionnaire/Question5";

// import InterestForm from "@/components/Questionnaire/InterestForm"; // Our landing form component

// // Define a type for the answers
// type Answers = {
//   [key: number]: any;
// };

// export default function Questionnaire() {
//   // Subject is now stored in state instead of being hardcoded
//   const [subject, setSubject] = useState<string>("");
//   const [currentQuestion, setCurrentQuestion] = useState<number>(1);
//   const [answers, setAnswers] = useState<Answers>({});

//   // If the subject is not set, show the landing form
//   if (!subject) {
//     return <InterestForm onSubmit={(interest) => setSubject(interest)} />;
//   }
  

//   const storeAnswer = (questionId: number, answer: any) => {
//     setAnswers((prev) => ({ ...prev, [questionId]: answer }));
//   };

//   const getAnswer = (questionId: number) => answers[questionId];

//   const renderQuestion = () => {
//     switch (currentQuestion) {
//       case 1:
//         return (
//           <Question1
//             defaultValue={getAnswer(1)}
//             onContinue={(value) => {
//               storeAnswer(1, value);
//               setCurrentQuestion(2);
//             }}
//           />
//         );
//       case 2:
//         return (
//           <Question2
//             subject={subject}
//             level={getAnswer(1)}
//             defaultValue={getAnswer(2)}
//             onBack={() => setCurrentQuestion(1)}
//             onContinue={(value) => {
//               storeAnswer(2, value);
//               setCurrentQuestion(3);
//             }}
//           />
//         );
//       case 3:
//         return (
//           <Question3
//             defaultValue={getAnswer(3)}
//             onBack={() => setCurrentQuestion(2)}
//             onContinue={(value) => {
//               storeAnswer(3, value);
//               setCurrentQuestion(4);
//             }}
//           />
//         );
//       case 4:
//         return (
//           <Question4
//             subject={subject}
//             level={getAnswer(1)}
//             defaultValue={getAnswer(4)}
//             onBack={() => setCurrentQuestion(3)}
//             onContinue={(value) => {
//               storeAnswer(4, value);
//               setCurrentQuestion(5);
//             }}
//           />
//         );
//       case 5:
//         return (
//           <Question5
//             subject={subject}
//             level={getAnswer(1)}
//             interests={getAnswer(2)}
//             time={getAnswer(3)}
//             goal={getAnswer(4)}
//             defaultValue={getAnswer(5)}
//             onBack={() => setCurrentQuestion(4)}
//             onContinue={(value) => {
//               storeAnswer(5, value);
//               console.log("Questionnaire complete. Answers:", answers);
//               alert("Questionnaire complete! Generating your personalized learning path...");
//               // Navigate or call endpoint as needed.
//             }}
//           />
//         );
//       default:
//         return <div>Questionnaire Completed!</div>;
//     }
//   };

//   const progressPercent = ((currentQuestion - 1) / 5) * 100;

//   return (
//     <div className="max-w-2xl mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">
//         Personalized Learning Path Questionnaire
//       </h1>
//       <div className="mb-4">
//         <div className="w-full bg-gray-200 rounded-full h-2.5">
//           <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progressPercent}%` }}></div>
//         </div>
//       </div>
//       {renderQuestion()}
//     </div>
//   );
// }
