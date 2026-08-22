"use client";

import React from "react";
import Image from "next/image";
import HeartStamp from "./stamp";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Letter = ({ onNext, onBack }) => {
  return (
   <div className="w-full h-full overflow-y-auto flex flex-col items-center justify-center bg-[radial-gradient(circle_at_top_left,#fff8f8,#fbe9e9)] pt-16 pb-20 sm:pt-20 sm:pb-24 relative">
  
  {/* Top Left Back Button */}
  <div className="absolute top-4 sm:top-8 left-4 sm:left-8 z-50">
    <button
      onClick={onBack}
      className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-[0_4px_12px_rgba(255,182,193,0.4)] flex items-center justify-center text-[#ff4d6d] hover:bg-[#fff0f4] transition-all"
    >
      <ChevronLeft size={24} strokeWidth={2.5} />
    </button>
  </div>



  {/* CONTENT WRAPPER */}
  <div className="flex-1 w-full flex flex-col items-center justify-center p-4 sm:p-6 relative z-10">
    
    {/* Letter Card */}
    <div className="relative bg-white rounded-3xl shadow-xl max-w-2xl w-full text-center px-6 py-8">
      
      {/* Tiny title */}
      <p className="tracking-[0.35em] text-xs sm:text-sm md:text-base font-semibold text-[#333644] mb-2 uppercase font-a">
        A LETTER
      </p>

      {/* Main heading */}
      <h2 className="font-extrabold leading-none font-b text-[#f7b5cf] mb-7 
                     text-[clamp(1.5rem,5vw,2rem)]">
        FOR YOU ✦
      </h2>

      {/* Sub heading */}
      <h3 className="font-extrabold italic text-[#f7b5cf] mb-4 font-b 
                     text-[clamp(1rem,4vw,1.3rem)]">
        My Dearest Chashmish,
      </h3>

      {/* Body text */}
      <p className="leading-relaxed text-[#3b3b46] font-a max-w-xl mx-auto mb-4
                    text-[clamp(0.9rem,2.8vw,1.05rem)]">
        I genuinely care about you. You&apos;ve become a really important part of my life, and I&apos;m grateful for every little moment we share. I just hope I can keep making you smile and give you more reasons to stay happy 💗
      </p>

      {/* Closing line */}
      <p className="font-bold italic text-[#1c1b21] font-b
                    text-[clamp(1.1rem,3vw,1.5rem)]">
        With all my love — to Madam Ji 💌
      </p>

      {/* Cute cat */}
      <div className="absolute -top-10 -right-6 rotate-10">
        <Image
          src="/letter.png"
          alt="Cute cat with flowers"
          width={120}
          height={120}
        />
      </div>

      {/* Stamp */}
      <div className="absolute -bottom-7 -left-8 rotate-[-10deg]">
        <HeartStamp />
      </div>
    </div>
  </div>

  {/* Bottom Center Next Button */}
  <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-50">
    <button
      onClick={onNext}
      className="bg-white px-6 py-3 sm:px-8 sm:py-3.5 rounded-full shadow-[0_8px_24px_rgba(255,182,193,0.5)] flex items-center justify-center gap-2 text-[#ff4d6d] hover:bg-[#fff0f4] hover:-translate-y-1 transition-all font-bold tracking-wide uppercase text-xs sm:text-sm font-b"
    >
      <span>Next</span>
      <ChevronRight size={20} strokeWidth={3} />
    </button>
  </div>
</div>

  );
};

export default Letter;
