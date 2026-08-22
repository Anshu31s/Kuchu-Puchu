"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, Play, Pause, SkipBack, SkipForward, AudioLines } from "lucide-react";

const formatTime = (s = 0) => {
  const sec = Math.floor(s % 60).toString().padStart(2, "0");
  const min = Math.floor(s / 60).toString();
  return `${min}:${sec}`;
};

const gifs = ["/music1-CfXgOANl.gif", "/pic2.gif"];

const SongCard = ({ onBack }) => {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [current, setCurrent] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const [gifIndex, setGifIndex] = useState(0);

  // Setup video event listeners
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onLoaded = () => setDuration(video.duration || 0);
    const onTime = () => {
      if (!seeking) setCurrent(video.currentTime);
    };
    const onEnded = () => {
      setPlaying(false);
    };

    video.addEventListener("loadedmetadata", onLoaded);
    video.addEventListener("timeupdate", onTime);
    video.addEventListener("ended", onEnded);

    return () => {
      video.removeEventListener("loadedmetadata", onLoaded);
      video.removeEventListener("timeupdate", onTime);
      video.removeEventListener("ended", onEnded);
    };
  }, [seeking]);

  // Toggle play / pause
  const togglePlay = async () => {
    const video = videoRef.current;
    if (!video) return;

    if (playing) {
      video.pause();
      setPlaying(false);
    } else {
      try {
        await video.play();
        setPlaying(true);
      } catch (err) {
        console.error("Play failed:", err);
        setPlaying(false);
      }
    }
  };

  // Seek function used by slider
  const onSeek = (value) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = value;
    setCurrent(value);
  };

  // Next/Prev just cycle the GIF shown when paused
  const nextGif = () => {
    setGifIndex((prev) => (prev + 1) % gifs.length);
  };

  const prevGif = () => {
    setGifIndex((prev) => (prev - 1 + gifs.length) % gifs.length);
  };

  const currentGif = gifs[gifIndex];

  return (
    <div className="w-full h-full flex flex-col items-center justify-start bg-gradient-to-br from-[#fdf2f5] to-[#fce4eb] relative overflow-hidden p-4 sm:p-8 font-a">
      
      {/* Top Header */}
      <div className="w-full max-w-[400px] flex items-center justify-between mt-2 sm:mt-6 mb-4 sm:mb-8 shrink-0 z-20">
        <button 
          onClick={onBack}
          className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-[0_4px_12px_rgba(255,182,193,0.4)] flex items-center justify-center text-[#ff4d6d] hover:bg-[#fff0f4] transition-all"
        >
          <ChevronLeft size={24} strokeWidth={2.5} />
        </button>
        <div className="flex flex-col items-center text-center">
          <h1 className="text-[clamp(1.1rem,4vw,1.4rem)] font-bold text-[#2c2c2c] leading-tight font-b">
            Songs Dedicated <span className="text-[#ff4d6d]">To You</span> 💗
          </h1>
          <p className="text-[10px] sm:text-xs text-[#8d8d8d] mt-1 tracking-wider uppercase font-medium">
            Made with love, just for you ♡
          </p>
        </div>
        <div className="w-10 sm:w-12"></div> {/* Spacer for centering */}
      </div>

      {/* Main Card */}
      <div className="relative w-full max-w-[360px] sm:max-w-[400px] bg-white/95 rounded-[32px] sm:rounded-[40px] shadow-[0_12px_40px_rgba(255,182,193,0.3)] p-5 sm:p-8 flex flex-col items-center shrink z-10">
        
        {/* Album Art */}
        <div className="relative w-[200px] h-[200px] sm:w-[260px] sm:h-[260px] rounded-3xl overflow-hidden shadow-[0_16px_32px_rgba(255,182,193,0.4)] mb-6 shrink-0 border-[4px] border-white/50 bg-[#f8e1e7]">
          
          {/* Video (Shows when Playing) */}
          <video 
            ref={videoRef}
            src="/5894.mp4"
            loop
            playsInline
            preload="metadata"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${playing ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          />

          {/* GIF (Shows when Paused) */}
          <img
            src={currentGif}
            alt="preview"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${!playing ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            draggable="false"
          />
        </div>

        {/* Status Pill */}
        <div className="bg-[#fff0f4] text-[#ff4d6d] px-4 py-1.5 rounded-full flex items-center gap-2 mb-4 shrink-0 shadow-sm border border-[#ff4d6d]/10">
          <AudioLines size={14} strokeWidth={2.5} className={playing ? "animate-pulse" : ""} />
          <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase">
            {playing ? "Playing" : "Paused"}
          </span>
        </div>

        {/* Song Info */}
        <div className="text-center w-full mb-5 shrink-0">
          <p className="text-[15px] sm:text-[17px] text-[#2c2c2c] font-b font-bold tracking-wide">
            Dedicated with all my heart ♡
          </p>
        </div>

        {/* Slider */}
        <div className="w-full mb-5 shrink-0">
          <div
            className="flex justify-between text-[#8d8d8d] text-[10px] sm:text-xs font-semibold mb-2"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            <span>{formatTime(current)}</span>
            <span>{formatTime(duration || 0)}</span>
          </div>

          <input
            type="range"
            min="0"
            max={duration || 0}
            step="0.01"
            value={current}
            onChange={(e) => {
              setSeeking(true);
              onSeek(Number(e.target.value));
            }}
            onMouseUp={() => setSeeking(false)}
            onTouchEnd={() => setSeeking(false)}
            className="w-full h-1.5 rounded-full cursor-pointer appearance-none focus:outline-none bg-[#f4f4f4]"
            style={{
              background:
                "linear-gradient(to right, rgb(255, 77, 109) 0%, rgb(255, 77, 109) " +
                ((duration ? (current / duration) * 100 : 0).toFixed(2) || 0) +
                "%, rgb(244, 244, 244) 0%, rgb(244, 244, 244) 100%)",
            }}
          />
        </div>

        {/* Player Controls */}
        <div className="flex items-center justify-center gap-6 sm:gap-8 w-full shrink-0">
          {/* Prev Button */}
          <button
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white text-[#ff4d6d] shadow-[0_4px_16px_rgba(255,182,193,0.3)] hover:shadow-[0_6px_20px_rgba(255,182,193,0.5)] transition-all flex items-center justify-center active:scale-95"
            onClick={prevGif}
          >
            <SkipBack size={20} fill="currentColor" />
          </button>

          {/* Play/Pause Button */}
          <button
            className={`w-[64px] h-[64px] sm:w-[72px] sm:h-[72px] rounded-full bg-[#ff4d6d] text-white shadow-[0_12px_32px_rgba(255,77,109,0.4)] hover:shadow-[0_16px_40px_rgba(255,77,109,0.5)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center ${!playing ? 'pl-1' : ''}`}
            onClick={togglePlay}
          >
            {playing ? (
              <Pause size={28} fill="currentColor" />
            ) : (
              <Play size={32} fill="currentColor" />
            )}
          </button>

          {/* Next Button */}
          <button
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white text-[#ff4d6d] shadow-[0_4px_16px_rgba(255,182,193,0.3)] hover:shadow-[0_6px_20px_rgba(255,182,193,0.5)] transition-all flex items-center justify-center active:scale-95"
            onClick={nextGif}
          >
            <SkipForward size={20} fill="currentColor" />
          </button>
        </div>
      </div>

      {/* Decorative background hearts (subtle) */}
      <div className="absolute top-[10%] left-[5%] text-[#ff4d6d]/20 opacity-50 blur-[1px] rotate-[-20deg]">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      </div>
      <div className="absolute top-[30%] right-[10%] text-[#ff4d6d]/10 opacity-40 blur-[2px] rotate-[15deg]">
        <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      </div>

      {/* Range Thumb Styles */}
      <style>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #ff4d6d;
          box-shadow: 0 0 10px rgba(255, 77, 109, 0.4);
          cursor: pointer;
        }
        input[type="range"]::-moz-range-thumb {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #ff4d6d;
          box-shadow: 0 0 10px rgba(255, 77, 109, 0.4);
          border: none;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default SongCard;
