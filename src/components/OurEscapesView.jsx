// src/components/OurEscapesView.jsx
import React from "react";
import { motion } from "framer-motion";

// Import all three images for the collage banner!
import escapeImg1 from "../assets/our_escapes_1.jpg"; // Coastal drive (Will be left)
import escapeImg2 from "../assets/our_escapes_2.jpg"; // In-car selfie (Will be centered)
import escapeImg3 from "../assets/our_escapes_3.jpg"; // Misty mountains (Will be right)

export const OurEscapesView = ({ onComplete }) => {
  const destinations = [
    "Wagholi", "Warje", "Kothrud", "Pune City", "Diveagar", "Dapoli", 
    "Ganpatipule", "Lonavla", "Mahabaleshwar", "Wai", "Kasarsai", 
    "Nasrapur", "Tamhini", "Mulshi", "Mumbai", "Tuljapur", "Akkalkot", 
    "Goa", "Shegaon", "Lavasa"
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      className="w-full h-full flex flex-col overflow-y-auto pb-28 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-rose-500/20"
    >
      
      {/* --- FULL-SCREEN IMMERSIVE HERO (3-Image Collage) --- */}
      <div className="relative w-full h-[75vh] min-h-[500px] overflow-hidden mb-10 bg-black flex items-center justify-center">
        
        {/* The 3-Image Split Collage Background (Left: Coastal, Center: In-Car Selfie, Right: Misty Mountains) */}
        <div className="absolute inset-0 flex w-full h-full">
          {/* Left: Coastal Drive */}
          <div className="w-1/3 h-full relative">
            <img src={escapeImg1} alt="Coastal drive" className="w-full h-full object-cover object-center filter brightness-75" />
          </div>
          {/* Middle: In-Car Selfie (Centerpiece) */}
          <div className="w-1/3 h-full relative border-x border-white/15 shadow-[0_0_30px_rgba(0,0,0,0.8)] z-1">
            <img src={escapeImg2} alt="Car selfie" className="w-full h-full object-cover object-center filter brightness-90 contrast-110" />
          </div>
          {/* Right: Misty Mountains */}
          <div className="w-1/3 h-full relative">
            <img src={escapeImg3} alt="Misty drive" className="w-full h-full object-cover object-[center_70%] filter brightness-75" />
          </div>
        </div>

        {/* Cinematic Gradient Overlays to blend the photos and make text readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0a0f] via-[#0d0a0f]/60 to-[#0d0a0f]/30 pointer-events-none z-2" />

        {/* Content Container inside Hero */}
        <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-12 max-w-6xl mx-auto w-full z-10">
          
          {/* Top Floating Badges */}
          <div className="flex items-center justify-between w-full">
            <span className="px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] text-zinc-300 tracking-widest uppercase font-medium shadow-lg">
              ✈️ Chapter IV
            </span>
            <span className="px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] text-zinc-300 tracking-widest uppercase font-medium shadow-lg">
              Endless Horizons
            </span>
          </div>

          {/* Bottom Title & Subtitle inside Hero */}
          <div className="text-center pb-6">
            <span className="text-rose-400 text-[10px] sm:text-xs tracking-[0.3em] uppercase font-bold block mb-3 drop-shadow-md">
              Miles, Music & Midnight Kisses
            </span>
            <h1 className="font-['Playfair_Display',serif] text-4xl sm:text-6xl font-bold text-white tracking-wide drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
              Our Escapes
            </h1>
          </div>

        </div>
      </div>

      {/* --- BODY CONTENT CONTAINER --- */}
      <div className="max-w-4xl mx-auto w-full px-4 sm:px-8">

        {/* --- MAIN STORY CARDS --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
          
          {/* The Passenger Princess */}
          <div className="md:col-span-7 bg-white/[0.03] border border-white/10 p-6 sm:p-8 rounded-3xl backdrop-blur-md shadow-xl flex flex-col justify-center">
            <span className="text-rose-400 text-[10px] tracking-[0.3em] uppercase font-bold block mb-2">
              The Co-Pilot
            </span>
            <h3 className="font-['Playfair_Display',serif] text-xl font-bold text-white mb-3 leading-snug">
              My Passenger Princess
            </h3>
            <p className="text-zinc-300 text-sm leading-relaxed font-light mb-4">
              I love chasing time and pushing high speeds, but the real magic is right next to me in the passenger seat. From you happily eating snacks, feeding me while I steer, and making those mandatory pee breaks, to the moments you just drift off to sleep—every drive with you is an adventure I never want to end.
            </p>
            <p className="text-zinc-300 text-sm leading-relaxed font-light">
              But my absolute favorite thing in the world? When you rest your head on my shoulder while I'm driving. I just go completely flat. It melts me, and in those moments, I just want to keep roaming and roaming forever.
            </p>
          </div>

          {/* Midnight Drives & Jamming */}
          <div className="md:col-span-5 bg-gradient-to-br from-rose-950/40 via-zinc-900/80 to-black border border-rose-500/30 p-6 sm:p-8 rounded-3xl backdrop-blur-md shadow-xl flex flex-col justify-center">
            <span className="text-rose-400 text-[10px] tracking-[0.3em] uppercase font-bold block mb-2">
              After Dark
            </span>
            <h3 className="font-['Playfair_Display',serif] text-xl font-bold text-white mb-3 leading-snug">
              Midnight Jam Sessions
            </h3>
            <p className="text-zinc-300 text-sm leading-relaxed font-light italic">
              "Those casual night drives hit entirely differently. The pitch dark outside, blasting our favorite tracks, and just jamming together at the top of our lungs... uff. And then the quiet moments—stealing kisses in the car under the night sky. Those are the moments that give me emotions and feelings worth a lifetime."
            </p>
          </div>

        </div>

        {/* --- LOCATIONS LOG --- */}
        <div className="bg-white/[0.02] border border-white/10 p-6 sm:p-8 rounded-3xl backdrop-blur-md shadow-xl mb-12">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-['Playfair_Display',serif] text-xl font-bold text-white">
              The Map of Our Wheels
            </h3>
            <span className="text-xs text-zinc-400 uppercase tracking-widest font-mono">
              Countless Kilometers
            </span>
          </div>
          <p className="text-zinc-300 text-sm leading-relaxed font-light mb-6">
            Whether it was a quick spin around the city or an endless highway stretching out to the coast, these are the places our wheels—and our hearts—have traveled together.
          </p>

          {/* Tag Cloud of Destinations */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
            {destinations.map((place, idx) => (
              <span 
                key={idx} 
                className="text-xs px-3 py-1.5 rounded-full border bg-white/5 border-white/10 text-zinc-300 hover:bg-white/10 hover:border-rose-500/30 hover:text-rose-200 transition-all cursor-default"
              >
                📍 {place}
              </span>
            ))}
          </div>
        </div>

        {/* --- CONSISTENT BOTTOM BUTTON --- */}
        <div className="w-full flex flex-col items-center gap-3 pt-6 border-t border-rose-500/20 pb-10">
          <button
            onClick={() => onComplete(3)} 
            className="w-full max-w-[380px] bg-rose-500/10 hover:bg-rose-500/20 text-rose-200 font-bold py-4 px-4 rounded-2xl text-xs tracking-wider uppercase transition-all cursor-pointer border border-rose-500/30 shadow-[0_0_20px_rgba(244,63,94,0.1)] hover:-translate-y-0.5"
          >
            Return to Journey & Unlock Next ✨
          </button>
        </div>

      </div>
    </motion.div>
  );
};