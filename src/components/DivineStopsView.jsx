// src/components/DivineStopsView.jsx
import React from "react";
import { motion } from "framer-motion";

import templeHeroImg from "../assets/dholya-ganpati.jpg"; 

export const DivineStopsView = ({ onComplete }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      className="w-full h-full flex flex-col overflow-y-auto pb-28 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-rose-500/20"
    >
      
      {/* --- FULL-SCREEN IMMERSIVE HERO --- */}
      <div className="relative w-full h-[75vh] min-h-[500px] overflow-hidden mb-10 bg-[#0d0a0f]">
        <img 
          src={templeHeroImg} 
          alt="The Path of Grace - Wai Dholya Ganpati" 
          className="absolute inset-0 w-full h-full object-cover object-top filter brightness-75 contrast-125 saturate-75"
        />
        {/* Cinematic Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0a0f] via-black/40 to-black/60 pointer-events-none" />

        {/* Content Container inside Hero */}
        <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-12 max-w-6xl mx-auto w-full z-10">
          
          {/* Top Floating Badges */}
          <div className="flex items-center justify-between w-full">
            <span className="px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] text-zinc-300 tracking-widest uppercase font-medium shadow-lg">
              🛕 Chapter III
            </span>
            <span className="px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] text-zinc-300 tracking-widest uppercase font-medium shadow-lg">
              Sanctuary & Serenity
            </span>
          </div>

          {/* Bottom Title & Subtitle inside Hero */}
          <div className="text-center pb-6">
            <span className="text-rose-400 text-[10px] sm:text-xs tracking-[0.3em] uppercase font-bold block mb-3 drop-shadow-md">
              From Wandering Roads to Seeking Grace
            </span>
            <h1 className="font-['Playfair_Display',serif] text-4xl sm:text-6xl font-bold text-white tracking-wide drop-shadow-2xl">
              The Path of Grace
            </h1>
          </div>

        </div>
      </div>

      {/* --- BODY CONTENT CONTAINER --- */}
      <div className="max-w-4xl mx-auto w-full px-4 sm:px-8">

        {/* --- MAIN STORY & PERSPECTIVE SHIFT --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
          
          {/* The Mindset Shift */}
          <div className="md:col-span-7 bg-white/[0.03] border border-white/10 p-6 sm:p-8 rounded-3xl backdrop-blur-md shadow-xl flex flex-col justify-center">
            <span className="text-rose-400 text-[10px] tracking-[0.3em] uppercase font-bold block mb-2">
              The Gentle Shift
            </span>
            <h3 className="font-['Playfair_Display',serif] text-xl font-bold text-white mb-3 leading-snug">
              How Our Journeys Begin
            </h3>
            <p className="text-zinc-300 text-sm leading-relaxed font-light mb-4">
              Before you, I wasn't a particularly devotional person. But you gently introduced me to a completely new side of life. Now, whenever we think of going somewhere or planning a trip, our very first thought is always the same: let's visit a temple first. 
            </p>
            <p className="text-zinc-300 text-sm leading-relaxed font-light">
              You completely transformed how we travel, turning every road trip into something sacred, grounded, and wrapped in blessings.
            </p>
          </div>

          {/* The Healing Power of Sundarkand */}
          <div className="md:col-span-5 bg-gradient-to-br from-rose-950/40 via-zinc-900/80 to-black border border-rose-500/30 p-6 sm:p-8 rounded-3xl backdrop-blur-md shadow-xl flex flex-col justify-center">
            <span className="text-rose-400 text-[10px] tracking-[0.3em] uppercase font-bold block mb-2">
              Inner Calm & Healing
            </span>
            <h3 className="font-['Playfair_Display',serif] text-xl font-bold text-white mb-3 leading-snug">
              The Sundarkand Light
            </h3>
            <p className="text-zinc-300 text-sm leading-relaxed font-light italic">
              "Thank you for encouraging me to read the Sundarkand during my lowest times. It healed things inside me I didn't know how to fix alone. Because of you, I feel a deep inner calm, a positive atmosphere, and a renewed hope that carries me through everything."
            </p>
          </div>

        </div>

        {/* --- SACRED STOPS SECTION --- */}
        <div className="bg-white/[0.02] border border-white/10 p-6 sm:p-8 rounded-3xl backdrop-blur-md shadow-xl mb-12">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-['Playfair_Display',serif] text-xl font-bold text-white">
              Our Sacred Stops & Sanctuaries
            </h3>
            <span className="text-xs text-zinc-400 uppercase tracking-widest font-mono">
              Blessed Journeys
            </span>
          </div>
          <p className="text-zinc-300 text-sm leading-relaxed font-light mb-6">
            From our go-to peaceful moments by the river at <strong className="text-rose-300 font-medium">Wai Dholya Ganpati</strong> to the divine energy of <strong className="text-rose-300 font-medium">Tuljapur, Akkalkot, and Shegaon</strong>, every temple we've visited together has built a sanctuary of peace in our lives.
          </p>

          {/* Tag Cloud of Temples */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
            {[
              "Wai Dholya Ganpati", "Tuljapur Mandir", "Akkalkot Swami Samarth", "Shegaon Sant Gajanan Maharaj", 
              "Hanuman Mandir", "Shani Mandir", "Ganpati Mandir", "Riverbank Shrine"
            ].map((temple, idx) => {
              const isGoTo = temple === "Wai Dholya Ganpati";
              return (
                <span 
                  key={idx} 
                  className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                    isGoTo 
                      ? "bg-rose-500/20 border-rose-500/50 text-rose-200 font-medium shadow-[0_0_15px_rgba(244,63,94,0.3)]" 
                      : "bg-white/5 border-white/10 text-zinc-300 hover:bg-white/10"
                  }`}
                >
                  {isGoTo ? "✨ " : ""}{temple}
                </span>
              );
            })}
          </div>
        </div>

        {/* --- CONSISTENT BOTTOM BUTTON --- */}
        <div className="w-full flex flex-col items-center gap-3 pt-6 border-t border-rose-500/20 pb-10">
          <button
            onClick={() => onComplete(2)}
            className="w-full max-w-[380px] bg-rose-500/10 hover:bg-rose-500/20 text-rose-200 font-bold py-4 px-4 rounded-2xl text-xs tracking-wider uppercase transition-all cursor-pointer border border-rose-500/30 shadow-[0_0_20px_rgba(244,63,94,0.1)] hover:-translate-y-0.5"
          >
            Return to Journey & Unlock Next ✨
          </button>
        </div>

      </div>
    </motion.div>
  );
};