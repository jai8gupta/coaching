"use client"

import { useState } from "react";
import QuestionCard from "./QuestionCard";
import { useSession } from 'next-auth/react';
import { useRouter } from "next/navigation";
import { Terminal } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "../ui/alert";
import { Button } from "../ui/button";

const ClientBattleQuestions = ({
    battleId,
    data,
    notEligibility
  }: {
    battleId: string;
    data: any[];
    notEligibility: boolean;
  }) => {
    const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>(
      {}
    );    
    const router = useRouter();
    const handleSelect = (questionId: number, optionIndex: number) => {
      setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
    };
    const { data: session } = useSession();

    if (notEligibility) {
      return (
        <Alert variant="default" className="flex flex-col space-y-4">
        <Terminal className="h-4 w-4" />
        <AlertTitle>You are All Set!</AlertTitle>
<AlertDescription>Great job! You have already participated in this competition.</AlertDescription>

    
        <Button
          className="bg-white text-black w-full"
          onClick={() => router.push("/codebattles")}
          variant="ghost"
        >
          OK
        </Button>
      </Alert>
      )
    }
    
    const handleSubmit = async () => {
      const entries = Object.entries(selectedAnswers).map(([questionId, optionIndex]) => ({
        battle_id: Number(battleId),
        question_id: Number(questionId),
        answer: String(optionIndex), // Match DB format
        user_email: session?.user?.email, // replace with actual user email from session
      }));

      const res = await fetch(`${process.env.NEXT_PUBLIC_CODEBATTLES_SVC}/api/answers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entries),
      });
      const data = await res.json();
      if (data?.success) {
        router.push("/thank-you")
      }
    };
  
    return (
      <div className="text-white px-4 py-8 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Battle #{battleId} – Questions
        </h1>
        <div className="mt-16 text-center text-muted-foreground text-xs max-w-xl mx-auto">
        <p className="leading-relaxed">
          ⚡ All rewards are sent directly via email.  
          No payment or fees are required to claim your prize.  
          Stay alert — we will never ask you for money or personal banking details.
        </p>
      </div>
  
        {data?.map((q: any, index: number) => (
          <QuestionCard
            key={q.id}
            index={index}
            question={q}
            selected={selectedAnswers[q.id]}
            onSelect={(optionIndex) => handleSelect(q.id, optionIndex)}
          />
        ))}
  
        <div className="text-center mt-8">
          <button
            onClick={handleSubmit}
            className="bg-[#00FFFF] text-black font-semibold px-6 py-2 rounded-full hover:brightness-110"
          >
            Submit Answers
          </button>
        </div>
      </div>
    );
  };

export default ClientBattleQuestions