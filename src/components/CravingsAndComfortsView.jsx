// src/components/CravingsAndComfortsView.jsx
import React from "react";
import { motion } from "framer-motion";

import foodHeroImg from "../assets/balcony-sunset-view.png"; 

export const CravingsAndComfortsView = ({ onComplete }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      className="w-full h-full flex flex-col overflow-y-auto pb-28 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-rose-500/20"
    >
      
      {/* --- FULL-SCREEN IMMERSIVE HERO (Matching 'Where It All Began') --- */}
      <div className="relative w-full h-[75vh] min-h-[500px] overflow-hidden mb-10">
        <img 
          src={foodHeroImg} 
          alt="Cravings and Comforts" 
          className="absolute inset-0 w-full h-full object-cover filter brightness-90 contrast-105"
        />
        {/* Cinematic Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0a0f] via-black/40 to-black/60" />

        {/* Content Container inside Hero */}
        <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-12 max-w-6xl mx-auto w-full">
          
          {/* Top Floating Badges */}
          <div className="flex items-center justify-between w-full">
            <span className="px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] text-zinc-300 tracking-widest uppercase font-medium shadow-lg">
              🍜 Chapter II
            </span>
            <span className="px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] text-zinc-300 tracking-widest uppercase font-medium shadow-lg">
              The Food & Date Trail
            </span>
          </div>

          {/* Bottom Title & Subtitle inside Hero */}
          <div className="text-center pb-6">
            <span className="text-rose-400 text-[10px] sm:text-xs tracking-[0.3em] uppercase font-bold block mb-3 drop-shadow-md">
              Highway Feasts to Home-Cooked Magic
            </span>
            <h1 className="font-['Playfair_Display',serif] text-4xl sm:text-6xl font-bold text-white tracking-wide drop-shadow-2xl">
              Cravings & Comforts
            </h1>
          </div>

        </div>
      </div>

      {/* --- BODY CONTENT CONTAINER --- */}
      <div className="max-w-4xl mx-auto w-full px-4 sm:px-8">

        {/* --- MAIN STORY & DYNAMICS --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
          
          {/* The Contrast Story */}
          <div className="md:col-span-7 bg-white/[0.03] border border-white/10 p-6 sm:p-8 rounded-3xl backdrop-blur-md shadow-xl flex flex-col justify-center">
            <span className="text-rose-400 text-[10px] tracking-[0.3em] uppercase font-bold block mb-2">
              The Push & Pull
            </span>
            <h3 className="font-['Playfair_Display',serif] text-xl font-bold text-white mb-3 leading-snug">
              Going Out vs. Staying In
            </h3>
            <p className="text-zinc-300 text-sm leading-relaxed font-light mb-4">
              I’m always the one who wants to drag you out—to find a new spot, grab a coffee, or just steal an extra hour together on a proper date. Meanwhile, you love to cook and eat at home, finding your absolute comfort right in our own space.
            </p>
            <p className="text-zinc-300 text-sm leading-relaxed font-light">
              Even with that, across these last 10 months, our map became dotted with dozens of places—from office tea-break stalls where we step away just to grab a quick cup together, to highway snack stops and quiet midnight dinners.
            </p>
          </div>

          {/* The Ultimate Craving / Home Comfort */}
          <div className="md:col-span-5 bg-gradient-to-br from-rose-950/40 via-zinc-900/80 to-black border border-rose-500/30 p-6 sm:p-8 rounded-3xl backdrop-blur-md shadow-xl flex flex-col justify-center">
            <span className="text-rose-400 text-[10px] tracking-[0.3em] uppercase font-bold block mb-2">
              My Absolute Favorite
            </span>
            <h3 className="font-['Playfair_Display',serif] text-xl font-bold text-white mb-3 leading-snug">
              The Taste of Home
            </h3>
            <p className="text-zinc-300 text-sm leading-relaxed font-light italic">
              "Out of all the restaurants and cafes we’ve visited, nothing compares to the food you make. When I get busy, you wait for me—or sit right beside me, feeding me with your bare hands. That care, that love, is the only thing I crave all the time."
            </p>
          </div>

        </div>

        {/* --- THE MEMORABLE STOPS SECTION --- */}
        <div className="bg-white/[0.02] border border-white/10 p-6 sm:p-8 rounded-3xl backdrop-blur-md shadow-xl mb-12">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-['Playfair_Display',serif] text-xl font-bold text-white">
              Our 10-Month Food Trail
            </h3>
            <span className="text-xs text-zinc-400 uppercase tracking-widest font-mono">
              50+ Places & Counting
            </span>
          </div>
          <p className="text-zinc-300 text-sm leading-relaxed font-light mb-6">
            Looking back at how we spent these past 10 months, it’s amazing how many spots we've checked off. From our very first celebration at <strong className="text-rose-300 font-medium">Sunny Da Dhaba</strong> right after our Lonavla kiss, to all those random street stalls, cozy cafes, and highway dhabas in between—every single bite tells a story of us.
          </p>

          {/* Tag Cloud */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
            {[
              "Sunny Da Dhaba", "Tony Da Dhaba", "Kinara Village", "Mumbai Highway Food Court",
              "Shivraj Dhaba", "Maggi Point Lonavla", "The Coffee Coastal", "Aaram Regency", "Ouza", 
              "D Palace", "Anna", "Kurry Leaf", "Hippie at Heart", "Chaitanya Parathas", "Katakirr", 
              "Davangiri Dosa", "Atithi Veg", "Kwality", "Deshpande Veg", "Trinetra Mall", "Falhaar", 
              "Tipsy Turtle", "Vrundavan Veg", "Oasis", "Cafe Peter", "Cafe De Ja Vu", "Cafe Enphoria", 
              "Udupi", "Ratna", "McDonalds", "Taujis", "Jayesh", "Root 9", "Green Field", "Vaishali", 
              "Socio", "Happy Da Punjab", "Singh Saab", "Mapro Garden", "Mulshi Lake View", "Burger Factory", 
              "Pizzeria The Fortunes", "Mr & Mrs Food House", "Purple martini", "Thalassa", "Hotel Shreyas", 
              "Dimsum Co", "South Indian Cafe Wardha", "K Anna Maggi point", "Nawab Asia"
            ].map((spot, idx) => {
              const isSunny = spot === "Sunny Da Dhaba";
              return (
                <span 
                  key={idx} 
                  className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                    isSunny 
                      ? "bg-rose-500/20 border-rose-500/50 text-rose-200 font-medium shadow-[0_0_15px_rgba(244,63,94,0.3)]" 
                      : "bg-white/5 border-white/10 text-zinc-300 hover:bg-white/10"
                  }`}
                >
                  {isSunny ? "✨ " : ""}{spot}
                </span>
              );
            })}
          </div>
        </div>

        {/* --- CONSISTENT BOTTOM BUTTON --- */}
        <div className="w-full flex flex-col items-center gap-3 pt-6 border-t border-rose-500/20 pb-10">
          <button
            onClick={() => onComplete(1)}
            className="w-full max-w-[380px] bg-rose-500/10 hover:bg-rose-500/20 text-rose-200 font-bold py-4 px-4 rounded-2xl text-xs tracking-wider uppercase transition-all cursor-pointer border border-rose-500/30 shadow-[0_0_20px_rgba(244,63,94,0.1)] hover:-translate-y-0.5"
          >
            Return to Journey & Unlock Next ✨
          </button>
        </div>

      </div>
    </motion.div>
  );
};