"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";

const formatTime = (s = 0) => {
  const sec = Math.floor(s % 60).toString().padStart(2, "0");
  const min = Math.floor(s / 60).toString();
  return `${min}:${sec}`;
};

const songs = [
  {
    title: "Dil Cheez Tujhe Dedi",
    gif: "/music1-CfXgOANl.gif",
    audio: "/music1-Bpgt1BZ5.mp3",
  },
  {
    title: "Kya Mujhe Pyaar Hai",
    gif: "/pic2.gif",
    audio: "/music2-mdcMq3L1.mp3",
  },
];

const SongCard = ({ onBack }) => {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [current, setCurrent] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const [index, setIndex] = useState(0);

  // Setup audio event listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoaded = () => setDuration(audio.duration || 0);
    const onTime = () => {
      if (!seeking) setCurrent(audio.currentTime);
    };
    const onEnded = () => {
      // Auto play next song when current ends
      setIndex((prev) => (prev + 1) % songs.length);
    };

    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("ended", onEnded);
    };
  }, [seeking]);

  // When index changes, load new source and attempt to play if playing is true.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Reset time/duration UI
    setCurrent(0);
    setDuration(0);

    // load the new source
    // If using <source> tags React won't call load automatically in all cases,
    // so call load() to be safe.
    try {
      audio.load();
    } catch (e) {
      /* ignore */
    }

    // If we were already playing, try to play the new track
    if (playing) {
      audio
        .play()
        .then(() => {
          setPlaying(true);
        })
        .catch((err) => {
          // Autoplay may be blocked; mark as paused
          console.warn("Autoplay prevented:", err);
          setPlaying(false);
        });
    }
  }, [index]);

  // Toggle play / pause — must be triggered by user gesture for autoplay rules
  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      try {
        await audio.play();
        setPlaying(true);
      } catch (err) {
        console.error("Play failed:", err);
        setPlaying(false);
      }
    }
  };

  // Seek function used by slider
  const onSeek = (value) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = value;
    setCurrent(value);
  };

  // Next song (loops)
  const nextSong = () => {
    setIndex((prev) => (prev + 1) % songs.length);
    // keep playing state as-is — useEffect will attempt to play new audio if `playing` is true
  };

  // Previous song (loops)
  const prevSong = () => {
    setIndex((prev) => (prev - 1 + songs.length) % songs.length);
    // useEffect will handle playback for the new index
  };

  const currentSong = songs[index];

  return (
    <div className="w-full min-h-screen flex flex-col justify-between items-center bg-[#FBF5F4] relative overflow-hidden p-3 sm:p-5">
      <div className="grow flex items-center justify-center w-full z-10">
        <div
          className="relative w-full max-w-[700px] bg-white/85 rounded-2xl shadow-2xl border border-[#e7d8d2] px-5 py-8 sm:px-8 sm:py-10 flex flex-col items-center text-center backdrop-blur-sm font-b"
        >
          <h1 className="text-[clamp(1.2rem,4vw,2.5rem)] text-[#d84b5a] font-bold mb-6">
            Songs Dedicated To You 💗
          </h1>

          {/* Image */}
          <div className="relative flex items-center justify-center mb-5">
            <div className="relative w-44 h-44 sm:w-60 sm:h-60 rounded-2xl overflow-hidden shadow-xl ring-1 ring-[#d84b5a]/30">
              {/* Use the dynamic GIF for the current song */}
              <img
                src={currentSong.gif}
                alt={currentSong.title}
                className="w-full h-full object-cover"
                draggable="false"
              />
            </div>
          </div>

          {/* Song Info */}
          <div className="bg-white/60 border border-[#e7d8d2] rounded-xl shadow-inner px-4 py-3 sm:px-5 sm:py-3 mb-5 w-full max-w-sm">
            <p className="text-[#d84b5a] uppercase text-xs sm:text-sm tracking-widest mb-1 font-a">
              {playing ? "Playing" : "Paused"}
            </p>
            <h2 className="text-base sm:text-lg font-semibold text-[#2c2c2c] mb-1">
              {currentSong.title}
            </h2>
          </div>

          {/* Slider */}
          <div className="w-full max-w-sm mb-5">
            <div
              className="flex justify-between text-[#2c2c2c] text-xs sm:text-sm mb-2"
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
              className="w-full h-2 rounded-full cursor-pointer appearance-none focus:outline-none"
              style={{
                background:
                  "linear-gradient(to right, rgb(216, 75, 90) 0%, rgb(216, 75, 90) " +
                  ((duration ? (current / duration) * 100 : 0).toFixed(2) || 0) +
                  "%, rgb(241, 229, 229) 0%, rgb(241, 229, 229) 100%)",
              }}
            />
          </div>

          {/* Player Controls */}
          <div className="flex items-center justify-center gap-4 sm:gap-5">
            <button
              className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white border-2 border-[#d84b5a] text-[#d84b5a] text-lg sm:text-xl shadow-md hover:bg-[#d84b5a] hover:text-white transition-all"
              onClick={prevSong}
            >
              ⏮
            </button>

            <button
              className="w-14 h-14 sm:w-18 sm:h-18 rounded-full bg-linear-to-br from-[#d84b5a] to-[#c03d4a] text-white text-2xl sm:text-3xl shadow-lg hover:shadow-xl border-2 border-[#a83545] transition-all flex items-center justify-center"
              onClick={togglePlay}
            >
              {playing ? "⏸" : "▶"}
            </button>

            <button
              className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white border-2 border-[#d84b5a] text-[#d84b5a] text-lg sm:text-xl shadow-md hover:bg-[#d84b5a] hover:text-white transition-all"
              onClick={nextSong}
            >
              ⏭
            </button>
          </div>

          {/* Hidden audio element — using dynamic source */}
          <audio ref={audioRef} preload="metadata">
            <source src={currentSong.audio} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        className="absolute bottom-4 left-4 text-gray-700 bg-[#9EC1E6] px-6 py-2.5 rounded-full text-sm sm:text-base shadow-md hover:bg-[#7fa8ce] transition-all z-20"
        style={{ fontFamily: "Montserrat, sans-serif" }}
        onClick={onBack}
      >
        ← Back
      </button>

      <button
        className="absolute bottom-4 right-4 text-gray-700 bg-[#F7D9E6] px-6 py-2.5 rounded-full text-sm sm:text-base shadow-md hover:bg-[#F7B5CF] transition-all z-20"
        style={{ fontFamily: "Montserrat, sans-serif" }}
      >
        Love You ❤️
      </button>

      {/* Range Thumb Styles */}
      <style>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #d84b5a;
          border: 2px solid white;
          cursor: pointer;
        }
        input[type="range"]::-moz-range-thumb {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #d84b5a;
          border: 2px solid white;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default SongCard;
