// page.js
"use client";
import gsap from "gsap";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import TicTac from "./(components)/TicTac";
import Letter from "./(components)/Letter";
import Card from "./(components)/Card";
import SongCard from "./(components)/SongCard";
import { useNextStore } from "./utils/zustand";

const Page = () => {
  const containerRef = useRef(null);

  const next = useNextStore((state) => state.next);
  const setNext = useNextStore((state) => state.setNext);

  const handleNext = () => {
    gsap.to(containerRef.current, {
      x: "-100%",
      opacity: 0,
      duration: 1,
      ease: "power2.inOut",
      force3D: true,
      onComplete: () => {
        setNext(next + 1);
        gsap.fromTo(
          containerRef.current,
          { x: "100%", opacity: 0 },
          { x: "0%", opacity: 1, duration: 1, ease: "power2.inOut" },
        );
      },
    });
  };

  // 🔹 consistent BACK animation (reverse slide)
  const handleBack = () => {
    gsap.to(containerRef.current, {
      x: "100%",
      opacity: 0,
      duration: 1,
      ease: "power2.inOut",
      force3D: true,
      onComplete: () => {
        setNext(next - 1); // go back one step
        gsap.fromTo(
          containerRef.current,
          { x: "-100%", opacity: 0 },
          { x: "0%", opacity: 1, duration: 1, ease: "power2.inOut" },
        );
      },
    });
  };

  // optional: first intro animation when app loads
  useEffect(() => {
    if (next === 0) {
      gsap.from(".anim-text", {
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
        style={{
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
      >
        {next === 0 && (
          <div className="flex w-full h-full justify-center items-center ">
            <div className="flex flex-col items-center space-y-6 md:space-y-3 px-8 text-center grow">
              <div>
                {/* Small heading */}
                <h1 className="anim-text text-[clamp(0.9rem,2vw,1.15rem)] font-semibold text-zinc-700 uppercase font-a tracking-[0.25rem] pl-1">
                  for my
                </h1>

                {/* Name */}
                <h1 className="anim-text text-[clamp(1.2rem,5vw,2.5rem)] text-[#f7b5cf] font-b uppercase font-extrabold tracking-[0.5rem] pl-2 relative inline-block">
                  kuchupuchu
                  <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 tracking-normal text-[clamp(1rem,3vw,2rem)]">
                    ✨
                  </span>
                </h1>
              </div>

              {/* "I made something... just" */}
              <h1 className="anim-text text-[clamp(2.5rem,8vw,4.5rem)] text-[#f7b5cf] font-b italic font-bold leading-none px-2 relative">
                I made{" "}
                <span className="relative inline-block">
                  something…
                  <span
                    className="absolute top-[55%] left-[60%] -translate-x-1/2 
                             -rotate-6 text-[clamp(0.75rem,2.5vw,1.1rem)]
                             text-black bg-[#f7d9e6] px-3 py-0.5
                             font-normal font-a rounded-md not-italic tracking-normal shadow-sm"
                  >
                    just
                  </span>
                </span>
              </h1>

              {/* FOR YOU */}
              <h1 className="anim-text text-[clamp(2rem,6vw,4rem)] text-zinc-900 uppercase font-black font-a leading-tight mt-2">
                FOR YOU
              </h1>

              {/* Description*/}
              <p className="anim-text text-[clamp(12px,1.6vw,15px)] leading-relaxed text-zinc-700 font-a max-w-[320px]">
                I made this specially just for you, Take a deep breath and check{" "}
                <span className="font-semibold text-[#f7b5cf]">
                  what I made for you 💗
                </span>
                .
              </p>

              <h1 className="anim-text text-[#f7b5cf] text-[clamp(18px,2vw,22px)]">
                ✦
              </h1>

              {/* GIF */}
              <Image
                src="/INTRO.gif"
                height={150}
                width={150}
                alt="intro"
                className="anim-text"
              />
              <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-50">
                {/* Button */}
                <button
                  onClick={handleNext}
                  className="bg-white px-6 py-3 sm:px-8 sm:py-3.5 rounded-full shadow-[0_8px_24px_rgba(255,182,193,0.5)] flex items-center justify-center gap-2 text-[#ff4d6d] hover:bg-[#fff0f4] hover:-translate-y-1 transition-all font-bold tracking-wide uppercase text-xs sm:text-sm font-b"
                >
                  Next →
                </button>
              </div>
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
