"use client";

import React from 'react';
import TriviaComponent from '@/components/TriviaComponent';

const QuizPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Quiz</h1>
      <TriviaComponent />
    </div>
  );
};

export default QuizPage;
