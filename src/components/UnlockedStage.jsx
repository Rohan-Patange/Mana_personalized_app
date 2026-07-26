import React from "react";
import { motion } from "framer-motion";
import atmosphericRoad from "../assets/atmospheric-road.jpg"; 

export const UnlockedStage = ({ onReset }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="absolute inset-0 z-20 w-full h-full flex flex-col bg-[#141017] overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-rose-500/20 [&::-webkit-scrollbar-thumb]:rounded-full"
    >
      {/* Cinematic Edge-to-Edge Image Header */}
      <div className="relative w-full h-[65vh] sm:h-[75vh] shrink-0">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 4, ease: "easeOut" }}
          src={atmosphericRoad}
          alt="The Journey Begins"
          className="w-full h-full object-cover object-center filter brightness-105 contrast-105"
        />
        
        {/* Seamless Bottom Gradient - No more bulky boxes! */}
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#141017] via-[#141017]/80 to-transparent" />
        
        {/* Subtle Top Gradient for Tags */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#141017]/60 to-transparent" />

        {/* Floating Top Tags */}
        <div className="absolute top-6 left-0 right-0 flex justify-between px-5 sm:px-8 z-10 max-w-2xl mx-auto w-full">
           <span className="bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 text-[10px] text-white font-medium tracking-widest uppercase shadow-lg">
             📍 The Journey Begins
           </span>
           <span className="bg-rose-950/50 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-rose-500/20 text-[10px] text-rose-200 font-bold tracking-wider uppercase shadow-lg">
             🗓️ Oct 5 - 15, 2025
           </span>
        </div>

        {/* Bottom Anchored Title & Subtitle - Clean & Elegant */}
        <div className="absolute bottom-8 left-0 right-0 px-6 text-center z-10 flex flex-col items-center">
          
          <motion.span 
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-rose-400 text-[9px] tracking-[0.4em] uppercase font-bold mb-3 block"
          >
            The Spark
          </motion.span>

          <motion.h2
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="font-['Playfair_Display',serif] text-4xl sm:text-5xl font-bold text-white drop-shadow-lg mb-4"
          >
            Where It All Began
          </motion.h2>
          
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="inline-flex items-center gap-4 text-[11px] sm:text-xs text-rose-100/80 tracking-widest uppercase font-medium"
          >
            <span>Tamhini Ghat</span>
            
            {/* Elegant Sparkle Separator */}
            <span className="text-rose-500 text-[10px]">✦</span>
            
            <span>Lonavla</span>
          </motion.div>
          
        </div>
      </div>

      {/* Expanded Roadmap Timeline Section */}
      <div className="flex-1 px-6 pt-2 pb-32 flex flex-col relative z-10 max-w-xl mx-auto w-full">
        
        {/* Quote Block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-center relative w-full bg-gradient-to-b from-white/[0.05] to-white/[0.01] border border-rose-500/20 p-6 rounded-2xl backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.4)] mb-12"
        >
          <p className="text-rose-100/90 text-base sm:text-lg leading-relaxed font-medium italic font-['Playfair_Display',serif]">
            "Some roads don't just take you places; they change the direction of where you're heading entirely."
          </p>
        </motion.div>

        {/* The Timeline */}
        <div className="relative border-l border-rose-500/30 ml-3 sm:ml-6 space-y-12 pb-10">
          
          {/* Milestone 1: The Spark */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="relative pl-6 sm:pl-8 group"
          >
            <div className="absolute -left-[5px] top-1.5 w-[9px] h-[9px] rounded-full bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,1)] ring-4 ring-rose-500/20" />
            
            <div className="bg-white/[0.03] border border-white/5 hover:border-rose-500/30 transition-all p-5 rounded-2xl backdrop-blur-sm shadow-lg">
              <div className="flex flex-col gap-1 mb-2">
                <span className="text-[10px] uppercase text-rose-400 font-bold tracking-widest flex items-center gap-1.5">
                  <span>📍</span> Tamhini Ghat
                </span>
                <span className="text-xs text-white/50 font-medium">October 5, 2025</span>
              </div>
              <p className="text-zinc-200 text-sm sm:text-base leading-relaxed font-normal">
                Returning from Kokan, listening to songs, having fun, and sharing scary stories sitting right next to each other—until sudden nails dug into my arm which ignited the spark.
              </p>
            </div>
          </motion.div>

          {/* Milestone 2: The Confession */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="relative pl-6 sm:pl-8 group"
          >
            <div className="absolute -left-[5px] top-1.5 w-[9px] h-[9px] rounded-full bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,1)] ring-4 ring-rose-500/20" />
            
            <div className="bg-white/[0.03] border border-white/5 hover:border-rose-500/30 transition-all p-5 rounded-2xl backdrop-blur-sm shadow-lg">
              <div className="flex flex-col gap-1 mb-2">
                <span className="text-[10px] uppercase text-rose-400 font-bold tracking-widest flex items-center gap-1.5">
                  <span>📍</span> The Confession
                </span>
                <span className="text-xs text-white/50 font-medium">October 10, 2025</span>
              </div>
              <p className="text-zinc-200 text-sm sm:text-base leading-relaxed font-normal">
                Days of your subtle breadcrumbs and playful teasing in our chats went completely over my clueless head. Until you finally dropped your guard and confessed your feelings. That night was an absolute boom for my world.
              </p>
            </div>
          </motion.div>

          {/* Milestone 3: The First Kiss */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="relative pl-6 sm:pl-8 group"
          >
            <div className="absolute -left-[5px] top-1.5 w-[9px] h-[9px] rounded-full bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,1)] ring-4 ring-rose-500/20" />
            
            <div className="bg-white/[0.03] border border-white/5 hover:border-rose-500/30 transition-all p-5 rounded-2xl backdrop-blur-sm shadow-lg">
              <div className="flex flex-col gap-1 mb-2">
                <span className="text-[10px] uppercase text-rose-400 font-bold tracking-widest flex items-center gap-1.5">
                  <span>📍</span> Lonavla Date Night
                </span>
                <span className="text-xs text-white/50 font-medium">October 15, 2025</span>
              </div>
              <p className="text-zinc-200 text-sm sm:text-base leading-relaxed font-normal">
                A late-night long drive where I finally opened up to you. The tension built perfectly into a heated moment, leading to our first kiss. A quiet dinner date followed, officially sealing the start of us.
              </p>
            </div>
          </motion.div>

        </div>

        {/* Action Section */}
        <div className="w-full flex flex-col items-center gap-3 pt-6">
          <button
            onClick={onReset}
            className="w-full max-w-[380px] bg-white/10 hover:bg-white/15 text-rose-200 font-medium py-3 px-4 rounded-2xl text-xs tracking-wider uppercase transition-all cursor-pointer border border-rose-500/30 shadow-lg"
          >
            Lock the Vault 🔒
          </button>
        </div>
      </div>
    </motion.div>
  );
};