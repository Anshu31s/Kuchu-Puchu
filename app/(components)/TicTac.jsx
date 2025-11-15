import React, { useEffect } from 'react'
import { useNextStore } from "../utils/zustand";
import gsap from 'gsap';

const TicTac = ({ onNext, onBack }) => {
  const [clickedCells, setClickedCells] = React.useState(false);
  const heart = React.useRef(null);
  const overlay = React.useRef(null);

  const next = useNextStore((state) => state.next);
  const setNext = useNextStore((state) => state.setNext);
  const incrementNext = useNextStore((state) => state.incrementNext);
  const decrementNext = useNextStore((state) => state.decrementNext);


  useEffect(() => {
    gsap.from(heart.current, {
      scale: 0,

      duration: 0.5,
      ease: 'back.out(1.7)'
    })
    if (overlay.current) {
      gsap.from(overlay.current, {
        opacity: 0,
        scale: 0.85,
        duration: 0.8,
        ease: "power2.out"
      });
    }
  }, [clickedCells])

  const handleNextPage = () => {
    setTimeout(() => {
      onNext();
    }, 1200);
  }
  return (
    <div className="select-none w-full h-screen flex flex-col items-center justify-between bg-[#f6efec]">

      {/* Heading */}
      <h2 className="text-[clamp(1.2rem,3.5vw,1.8rem)] text-[#d84b5a] font-semibold mt-10 font-a">
        Fill the heart to continue
      </h2>

      {/* TTT Box */}
      <div className="relative bg-[#f7efe9] p-8 sm:p-12 rounded-3xl shadow-md border border-[#eed9d4] flex items-center justify-center">

        {clickedCells && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              ref={overlay}
              className="text-[#d84b5a] font-semibold font-a rounded-full font-b
                     text-[clamp(1.2rem,3vw,1.8rem)]"
            >
              ❤️ You won my heart ❤️
            </div>
          </div>
        )}

        {/* GRID */}
        <div
          className={`grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8 transition duration-300 ${clickedCells ? "blur-sm" : ""
            }`}
        >

          {/* Cell size responsive */}
          <div className="h-[70px] w-[70px] sm:h-[90px] sm:w-[90px] lg:h-[110px] lg:w-[110px] 
                      flex items-center justify-center border-2 border-[#d84b5a] rounded-xl 
                      text-[clamp(2rem,5vw,3rem)]">
            ❤️
          </div>

          <div className="h-[70px] w-[70px] sm:h-[90px] sm:w-[90px] lg:h-[110px] lg:w-[110px] 
                      flex items-center justify-center text-[#d84b5a] font-extrabold 
                      border-2 border-[#d84b5a] rounded-xl text-[clamp(2rem,5vw,3rem)]">
            ✖
          </div>

          <div className="h-[70px] w-[70px] sm:h-[90px] sm:w-[90px] lg:h-[110px] lg:w-[110px] 
                      flex items-center justify-center text-[#d84b5a] font-extrabold 
                      border-2 border-[#d84b5a] rounded-xl text-[clamp(2rem,5vw,3rem)]">
            ✖
          </div>

          <div className="h-[70px] w-[70px] sm:h-[90px] sm:w-[90px] lg:h-[110px] lg:w-[110px] 
                      flex items-center justify-center text-[#d84b5a] font-extrabold 
                      border-2 border-[#d84b5a] rounded-xl text-[clamp(2rem,5vw,3rem)]">
            ✖
          </div>

          {/* Clickable center cell */}
          <div
            onClick={() => {
              setClickedCells(true);
              handleNextPage();
            }}
            className="h-[70px] w-[70px] sm:h-[90px] sm:w-[90px] lg:h-[110px] lg:w-[110px] 
                   flex items-center justify-center cursor-pointer border-2 border-[#d84b5a] 
                   rounded-xl text-[clamp(2rem,5vw,3rem)]"
          >
            {clickedCells ? <span ref={heart}>❤️</span> : ""}
          </div>

          <div className="h-[70px] w-[70px] sm:h-[90px] sm:w-[90px] lg:h-[110px] lg:w-[110px] 
                      flex items-center justify-center text-[#d84b5a] font-extrabold 
                      border-2 border-[#d84b5a] rounded-xl text-[clamp(2rem,5vw,3rem)]">
            ✖
          </div>

          <div className="h-[70px] w-[70px] sm:h-[90px] sm:w-[90px] lg:h-[110px] lg:w-[110px] 
                      flex items-center justify-center text-[#d84b5a] font-extrabold 
                      border-2 border-[#d84b5a] rounded-xl text-[clamp(2rem,5vw,3rem)]">
            ✖
          </div>

          <div className="h-[70px] w-[70px] sm:h-[90px] sm:w-[90px] lg:h-[110px] lg:w-[110px] 
                      flex items-center justify-center text-[#d84b5a] font-extrabold 
                      border-2 border-[#d84b5a] rounded-xl text-[clamp(2rem,5vw,3rem)]">
            ✖
          </div>

          <div className="h-[70px] w-[70px] sm:h-[90px] sm:w-[90px] lg:h-[110px] lg:w-[110px] 
                      flex items-center justify-center border-2 border-[#d84b5a] rounded-xl 
                      text-[clamp(2rem,5vw,3rem)]">
            ❤️
          </div>

        </div>
      </div>

      {/* Buttons Bottom */}
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
}

export default TicTac
