"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

import Restart from "../../../public/Restart.png";
import RestartHover from "../../../public/RestartHover.png";
import LinkWithIcon from '@/components/LinkWithIcon';

const ResultsPage = () => {
  const searchParams = useSearchParams();
  const score = Number(searchParams.get('score'));

  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 800);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  let resultText = '';
  let bgImage = '';

  if (score >= 8 && score <= 10) {
    resultText = `🎉 Bravo! 🎉 <br/> You have Scored ${score}!`;
    bgImage = isMobile ? '/bg-result-1-mobile.png' : '/bg-result-1.png';
  } else if (score >= 5 && score <= 7) {
    resultText = `Well done!👏 <br/> You have Scored ${score}!`;
    bgImage = isMobile ? '/bg-result-2-mobile.png' : '/bg-result-2.png';
  } else if (score >= 1 && score <= 4) {
    resultText = `Oops! 😬<br/> You have Scored ${score}...`;
    bgImage = isMobile ? '/bg-result-3-mobile.png' : '/bg-result-3.png';
  } else {
    resultText = 'Invalid score';
    bgImage = isMobile ? '/bg-result-3-mobile.png' : '/bg-result-3.png';
  }

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={bgImage}
          alt="Background"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className={`relative z-10 flex flex-col justify-center items-center gap-5 text-center
      rounded-2xl border-4 border-black bg-[#5DFF5D] p-20 font-semibold uppercase text-[] transition-all duration-300 
      hover:translate-x-[-8px] hover:translate-y-[-8px] 
      hover:rounded-md hover:shadow-[50px_50px_0px_black] 
      active:translate-x-[0px] 
      active:translate-y-[0px] 
      active:rounded-2xl 
      active:shadow-none"
      `}>
        <p className="text-4xl leading-relaxed font-unbounded font-bold tracking-wide" dangerouslySetInnerHTML={{ __html: resultText }}></p>
        <LinkWithIcon
          href="/"
          text="play again"
          icon={Restart}
          hoverIcon={RestartHover}
          width={25}
        />
      </div>
    </main>
  );
};

export default ResultsPage;
