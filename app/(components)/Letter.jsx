"use client";

import React from "react";
import Image from "next/image";
import HeartStamp from "./stamp";

const Letter = ({ onNext, onBack }) => {
  return (
   <div className="w-full h-screen flex flex-col items-center justify-between bg-[radial-gradient(circle_at_top_left,#fff8f8,#fbe9e9)]">
  
  {/* CONTENT WRAPPER */}
  <div className="flex-1 w-full flex flex-col items-center justify-center p-4 sm:p-6 relative">
    
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
        My Dearest Pinak,
      </h3>

      {/* Body text */}
      <p className="leading-relaxed text-[#3b3b46] font-a max-w-xl mx-auto mb-4
                    text-[clamp(0.9rem,2.8vw,1.05rem)]">
        I&apos;m sorry for the moments I hurt you.  
        You mean everything to me — and I just want your smile back. 💗
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

  {/* Buttons */}
  <div className="w-full max-w-2xl flex justify-between items-center px-6 pb-6">
    <button
      onClick={onBack}
      className="text-gray-700 bg-[#9EC1E6] px-6 py-2.5 rounded-full text-sm sm:text-base shadow-sm hover:bg-[#7fa8ce] transition-all"
    >
      ← Back
    </button>

    <button
      onClick={onNext}
      className="text-gray-700 bg-[#F7D9E6] px-6 py-2.5 rounded-full text-sm sm:text-base shadow-sm hover:bg-[#F7B5CF] transition-all"
    >
      Next →
    </button>
  </div>
</div>

  );
};

export default Letter;
