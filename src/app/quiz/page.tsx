"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'
import TriviaComponent from '@/components/TriviaComponent';

const QuizPage = () => {
  const router = useRouter();

  const handleQuizComplete = (score: number) => {
    router.push(`/results?score=${score}`);
  };

  return (
    <div>
      <TriviaComponent onQuizComplete={handleQuizComplete} />
    </div>
  );
};

export default QuizPage;