import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { FloatingParticles } from "./components/FloatingParticles";
import { EnvelopeStage } from "./components/EnvelopeStage";
import { LetterStage } from "./components/LetterStage";
import { PasscodeStage } from "./components/PasscodeStage";
import { UnlockedStage } from "./components/UnlockedStage";

export default function App() {
  // STAGES: 'ENVELOPE' -> 'LETTER' -> 'PASSWORD' -> 'UNLOCKED'
  const [stage, setStage] = useState("ENVELOPE");

  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Dancing+Script:wght@500;600;700&family=Playfair+Display:ital,wght@0,600;0,700;1,400;1,600&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  return (
    <main className="h-dvh w-screen bg-[#0d0b0e] text-slate-100 flex flex-col items-center justify-center p-3 sm:p-4 overflow-hidden relative font-['Plus_Jakarta_Sans',sans-serif] select-none">
      <FloatingParticles />

      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-900/30 rounded-full blur-[150px] animate-pulse" />
      </div>

      <AnimatePresence mode="wait">
        {stage === "ENVELOPE" && (
          <EnvelopeStage key="envelope" onOpen={() => setStage("LETTER")} />
        )}

        {stage === "LETTER" && (
          <LetterStage key="letter" onNext={() => setStage("PASSWORD")} />
        )}

        {stage === "PASSWORD" && (
          <PasscodeStage key="passcode" onSuccess={() => setStage("UNLOCKED")} />
        )}

        {stage === "UNLOCKED" && (
          <UnlockedStage key="unlocked" onReset={() => setStage("ENVELOPE")} />
        )}
      </AnimatePresence>
    </main>
  );
}