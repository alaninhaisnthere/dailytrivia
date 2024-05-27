"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation'
import TriviaComponent from '@/components/TriviaComponent';

import bgQuizMobile from "../../../public/bg-quiz-mobile.png"
import bgQuizDesktop from "../../../public/bg-quiz.png"

const QuizPage = () => {
  const router = useRouter();

  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 800);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleQuizComplete = (score: number) => {
    router.push(`/results?score=${score}`);
  };

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={isMobile ? bgQuizMobile : bgQuizDesktop}
          alt="Background"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="relative z-10 container mx-auto px-4 text-center">
        <TriviaComponent onQuizComplete={handleQuizComplete} />
      </div>
    </main>
  );
};

export default QuizPage;