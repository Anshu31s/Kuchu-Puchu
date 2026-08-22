// page.js
'use client'
import gsap from 'gsap';
import Image from 'next/image'
import React, { useEffect, useRef } from 'react'
import TicTac from './(components)/TicTac';
import Letter from './(components)/Letter';
import Card from './(components)/Card';
import SongCard from './(components)/SongCard';
import { useNextStore } from "./utils/zustand";
import { ChevronRight } from "lucide-react";

const Page = () => {
  const containerRef = useRef(null);  

  const next = useNextStore((state) => state.next);
  const setNext = useNextStore((state) => state.setNext);

  
  const handleNext = () => {
    gsap.to(containerRef.current, {
      x: '-100%',
      opacity: 0,
      duration: 1,
      ease: 'power2.inOut',
      force3D: true,
      onComplete: () => {
        setNext(next + 1);              
        gsap.fromTo(
          containerRef.current,
          { x: '100%', opacity: 0 },     
          { x: '0%', opacity: 1, duration: 1, ease: 'power2.inOut' }
        );
      },
    });
  };

  // 🔹 consistent BACK animation (reverse slide)
  const handleBack = () => {
    gsap.to(containerRef.current, {
      x: '100%',
      opacity: 0,
      duration: 1,
      ease: 'power2.inOut',
        force3D: true,
      onComplete: () => {
        setNext(next - 1); // go back one step
        gsap.fromTo(
          containerRef.current,
          { x: '-100%', opacity: 0 },
          { x: '0%', opacity: 1, duration: 1, ease: 'power2.inOut' }
        );
      },
    });
  };

  // optional: first intro animation when app loads
  useEffect(() => {
    if (next === 0) {
      gsap.from('.anim-text', {
        stagger: 0.2,
        y: 30,
        x: 30,
        opacity: 0,
      });
    }
  }, [next]);

  return (
    <div className="fixed inset-0 w-full h-dvh bg-[#FAF5F4] overflow-hidden overscroll-none">
    <div
      ref={containerRef}
      className="absolute inset-0 h-full w-full flex items-center justify-center bg-[#FAF5F4] will-change-transform"
      style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
    >
      {next === 0 && (
        <div className="w-full h-full overflow-hidden flex flex-col items-center justify-between py-6 sm:py-8 px-4 relative select-none">
          {/* Top spacer */}
          <div className="shrink-0 h-1"></div>

          {/* Main content centered */}
          <div className="flex flex-col items-center justify-center space-y-2 sm:space-y-3 px-4 text-center max-w-sm shrink-0">
            <div>
              {/* Small heading */}
              <h1 className="anim-text text-[clamp(0.75rem,2vw,0.95rem)] font-semibold text-zinc-700 uppercase font-a tracking-[0.25rem] pl-1">
                for my
              </h1>

              {/* Name */}
              <h1 className="anim-text text-[clamp(1.1rem,4vw,1.8rem)] text-[#f7b5cf] font-b uppercase font-extrabold tracking-[0.35rem] pl-2 relative inline-block">
                kuchupuchu
                <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 tracking-normal text-[clamp(0.9rem,2.5vw,1.4rem)]">✨</span>
              </h1>
            </div>

            {/* "I made something... just" */}
            <h1 className="anim-text text-[clamp(1.6rem,5vw,2.5rem)] text-[#f7b5cf] font-b italic font-bold leading-tight px-2 relative">
              I made{" "}
              <span className="relative inline-block">
                something…
                <span className="absolute top-[55%] left-[60%] -translate-x-1/2 
                             -rotate-6 text-[clamp(0.6rem,1.8vw,0.85rem)]
                             text-black bg-[#f7d9e6] px-2 py-0.5
                             font-normal font-a rounded-md not-italic tracking-normal shadow-sm">
                  just
                </span>
              </span>
            </h1>

            {/* FOR YOU */}
            <h1 className="anim-text text-[clamp(1.4rem,4.5vw,2.2rem)] text-zinc-900 uppercase font-black font-a leading-tight">
              FOR YOU
            </h1>

            {/* Description*/}
            <p className="anim-text text-[clamp(11px,1.3vw,13px)] leading-relaxed text-zinc-700 font-a max-w-[260px]">
              I made this specially just for you, Take a deep breath and check{" "}
              <span className="font-semibold text-[#f7b5cf]">what I made for you 💗</span>.
            </p>

            <h1 className="anim-text text-[#f7b5cf] text-[clamp(12px,1.6vw,16px)]">
              ✦
            </h1>

            {/* GIF */}
            <Image
              src="/INTRO.gif"
              height={80}
              width={80}
              alt="intro"
              className="anim-text w-[75px] sm:w-[90px] h-auto object-contain"
            />
          </div>

          {/* Bottom Next Button */}
          <div className="shrink-0 z-50 mb-2">
            <button
              onClick={handleNext}
              className="cursor-pointer bg-white px-6 py-2.5 sm:px-8 sm:py-3 rounded-full shadow-[0_8px_24px_rgba(255,182,193,0.5)] flex items-center justify-center gap-2 text-[#ff4d6d] hover:bg-[#fff0f4] hover:-translate-y-1 active:scale-95 transition-all font-bold tracking-wide uppercase text-xs sm:text-sm font-b"
            >
              <span>Next</span>
              <ChevronRight size={18} strokeWidth={3} />
            </button>
          </div>
        </div>
      )}

      {next === 1 && <TicTac onNext={handleNext} onBack={handleBack} />}
      {next === 2 && <Letter onNext={handleNext} onBack={handleBack} />}
      {next === 3 && <Card onNext={handleNext} onBack={handleBack} />}
      {next === 4 && <SongCard onBack={handleBack} />}
    </div>
  </div>


  );
};

export default Page;