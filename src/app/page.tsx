"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

import LinkWithIcon from "@/components/LinkWithIcon";

import Arrow from "../../public/arrow.png";
import ArrowHover from "../../public/arrow-hover.png";
import bgHomeDesktop from "../../public/bg-home.png";
import bgHomeMobile from "../../public/bg-home-mobile.png";

export default function Home() {
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

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="absolute inset-0 w-full h-full ">
        <Image
          src={isMobile ? bgHomeMobile : bgHomeDesktop}
          alt="Background"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className={isMobile ? "flex flex-col -mt-20" : ""}>
          <h1 className={isMobile ? "text-7xl font-unbounded font-light leading-snug" : "text-9xl font-unbounded font-light"}>
            <span className="font-semibold">D</span>aily <span className="font-semibold">T</span>rivia
          </h1>
          <div className={`flex justify-center  ${isMobile ? "" : "py-8"}`}>
            <LinkWithIcon href="/quiz/" text="Start Quiz" icon={Arrow} hoverIcon={ArrowHover} width={40} />
          </div>
        </div>
      </div>
    </main>
  );
}
