"use client";

import React from 'react';
import { useSearchParams } from 'next/navigation';

const ResultsPage = () => {
  const searchParams = useSearchParams();
  const score = searchParams.get('score');

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Your Score</h1>
        <p className="text-2xl">{score ? `${score}/10` : 'Loading...'}</p>
      </div>
    </div>
  );
};

export default ResultsPage;