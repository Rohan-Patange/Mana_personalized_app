import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function App() {
  // STAGES: 'ENVELOPE' -> 'LETTER' -> 'PASSWORD_SCREEN' -> 'UNLOCKED'
  const [stage, setStage] = useState("ENVELOPE");
  
  // PASSWORD & FUN ACTIVITY STATE
  const [password, setPassword] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [isError, setIsError] = useState(false);
  
  // Custom secret password (Change this to whatever you want!)
  const SECRET_PASSWORD = "1204"; 

  const audioRef = useRef(null);

  const handleOpenLetter = () => {
    setStage("LETTER");
    if (audioRef.current) {
      audioRef.current.play().catch((err) => console.log("Audio notice:", err));
    }
  };

  const handleVerifyPassword = (e) => {
    e.preventDefault();
    if (password.trim() === SECRET_PASSWORD) {
      setIsError(false);
      setStage("UNLOCKED");
    } else {
      setIsError(true);
      setTimeout(() => setIsError(false), 800);
    }
  };

  return (
    <main className="h-dvh w-screen bg-[#0c0a09] text-slate-100 flex flex-col items-center justify-center p-4 overflow-hidden relative font-sans select-none">
      <audio ref={audioRef} src="./bubu-voice.mp3" preload="auto" />

      {/* AURORA GLOW BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-60">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-rose-500/25 rounded-full blur-[130px] animate-pulse" />
        <div className="absolute top-1/3 -right-32 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[130px] animate-pulse delay-1000" />
        <div className="absolute -bottom-32 left-1/3 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[130px] animate-pulse delay-2000" />
      </div>

      {/* FLOATING SPARKLES & HEARTS */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {["💖", "✨", "🌸", "✨", "💖", "☁️"].map((emoji, idx) => (
          <motion.div
            key={idx}
            initial={{ y: "110vh", x: `${(idx + 1) * 15}vw`, opacity: 0.2 }}
            animate={{ y: "-10vh", opacity: [0.2, 0.7, 0.2] }}
            transition={{
              duration: 9 + idx * 2,
              repeat: Infinity,
              ease: "linear",
              delay: idx * 1.5,
            }}
            className="absolute text-2xl sm:text-3xl select-none"
          >
            {emoji}
          </motion.div>
        ))}
      </div>

      {/* ================= STAGE 1: FLOATING HEART-SEALED ENVELOPE ================= */}
      {stage === "ENVELOPE" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="relative z-10 flex flex-col items-center justify-center text-center max-w-sm"
        >
          {/* Top Glass Badge */}
          <div className="mb-8 bg-zinc-900/60 backdrop-blur-xl px-6 py-3 rounded-2xl border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
            <span className="inline-block bg-pink-500/20 border border-pink-500/30 text-pink-300 font-semibold text-xs px-3 py-1 rounded-full mb-1">
              Special Delivery 📦
            </span>
            <p className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-rose-300 to-white text-base sm:text-lg">
              "A secret letter arrived for you..."
            </p>
          </div>

          {/* Interactive Floating Envelope */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            whileHover={{ scale: 1.08, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleOpenLetter}
            className="cursor-pointer relative group flex items-center justify-center my-4"
          >
            {/* Pulsing Back Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-pink-500 rounded-3xl blur-2xl opacity-40 group-hover:opacity-70 transition-opacity" />

            {/* Custom 3D Heart-Sealed Envelope SVG */}
            <div className="relative w-48 h-36 sm:w-56 sm:h-40 bg-zinc-900/80 backdrop-blur-xl rounded-2xl border border-rose-500/30 p-4 shadow-[0_25px_50px_rgba(0,0,0,0.7)] flex items-center justify-center">
              <svg viewBox="0 0 120 80" className="w-full h-full overflow-visible">
                {/* Envelope Body */}
                <rect x="5" y="10" width="110" height="65" rx="8" fill="#fdf2f8" stroke="#f472b6" strokeWidth="2.5" />
                {/* Flap fold lines */}
                <path d="M 5 10 L 60 48 L 115 10" fill="#fbcfe8" stroke="#f472b6" strokeWidth="2.5" strokeLinejoin="round" />
                <path d="M 5 75 L 42 44" fill="none" stroke="#f472b6" strokeWidth="1.5" />
                <path d="M 115 75 L 78 44" fill="none" stroke="#f472b6" strokeWidth="1.5" />

                {/* Red Wax Heart Seal */}
                <g transform="translate(60, 46)">
                  <circle cx="0" cy="0" r="14" fill="#e11d48" stroke="#fda4af" strokeWidth="1.5" />
                  <path
                    d="M 0 7 C -7 2, -11 -2, -6 -8 C -2 -11, 0 -8, 0 -6 C 0 -8, 2 -11, 6 -8 C 11 -2, 7 2, 0 7 Z"
                    fill="#ffffff"
                  />
                </g>
              </svg>
            </div>
          </motion.div>

          <p className="mt-6 text-zinc-400 text-xs sm:text-sm animate-pulse">
            Tap the heart seal to open 💌
          </p>
        </motion.div>
      )}

      {/* ================= STAGE 2: OLD SCHOOL POP-UP LETTER ================= */}
      <AnimatePresence>
        {stage === "LETTER" && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 30 }}
              transition={{ type: "spring", stiffness: 260, damping: 25 }}
              className="bg-[#fefce8] text-amber-950 rounded-2xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(244,63,94,0.3)] text-left w-full max-w-sm sm:max-w-md border-4 border-[#fef08a] relative overflow-hidden font-serif"
            >
              {/* Paper texture feel & subtle watermark ribbon */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-rose-200/40 rounded-bl-full pointer-events-none" />
              <div className="text-right text-xs text-amber-800/60 italic mb-2">
                Special Delivery • Confidential 💌
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-rose-900 mb-4 font-serif border-b border-amber-900/20 pb-2">
                Dearest Bubu,
              </h2>

              {/* Custom Message */}
              <div className="text-amber-950 text-sm sm:text-base leading-relaxed space-y-3 font-normal my-4">
                <p>
                  I created this special place just for you to let you know how truly incredible you are.
                </p>
                <p>
                  No matter where life takes us, every small memory with you is something I hold close to my heart.
                </p>
                <p className="font-semibold text-rose-900 pt-2">
                  Will you accept this note and proceed to unlock the final secret?
                </p>
              </div>

              <div className="text-right mt-6 italic text-sm text-amber-900 font-semibold">
                — Yours Always ❤️
              </div>

              {/* ACCEPTANCE SIGN BUTTON */}
              <button
                onClick={() => setStage("PASSWORD_SCREEN")}
                className="mt-6 w-full bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 active:scale-95 text-white font-sans font-bold py-3.5 px-6 rounded-xl shadow-lg hover:shadow-rose-500/40 text-sm sm:text-base transition-all cursor-pointer border border-rose-400/40 flex items-center justify-center gap-2"
              >
                <span>Sign & Accept Letter</span>
                <span>✒️</span>
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ================= STAGE 3: PASSWORD & FUN ACTIVITY ================= */}
      {stage === "PASSWORD_SCREEN" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="relative z-10 w-full max-w-sm sm:max-w-md p-6 bg-zinc-900/80 backdrop-blur-2xl rounded-3xl border border-white/15 shadow-[0_25px_50px_rgba(0,0,0,0.8)] text-center"
        >
          <div className="w-12 h-12 bg-rose-500/20 border border-rose-500/30 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl">
            🔒
          </div>

          <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-200 via-rose-300 to-white bg-clip-text text-transparent">
            Security Checkpoint
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1 mb-6">
            Enter the secret passcode to reveal the final surprise!
          </p>

          {/* FUN ACTIVITY / HINT BOX */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-6 text-left relative">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-pink-300 bg-pink-500/20 px-2.5 py-0.5 rounded-full border border-pink-500/30">
                Fun Activity Challenge 🧩
              </span>
              <button
                onClick={() => setShowHint(!showHint)}
                className="text-xs text-rose-300 hover:text-white underline cursor-pointer"
              >
                {showHint ? "Hide Clue 🙈" : "Need a Clue? 💡"}
              </button>
            </div>

            <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">
              "Solve this puzzle: What is the 4-digit secret key? (Default: <span className="text-pink-300 font-mono font-bold">1204</span>)"
            </p>

            <AnimatePresence>
              {showHint && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 pt-2 border-t border-white/10 text-xs text-rose-200 italic"
                >
                  💡 <strong>Hint:</strong> Think of our special anniversary date or secret passcode! (Or try entering <strong>1204</strong>)
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* PASSWORD INPUT FORM */}
          <form onSubmit={handleVerifyPassword} className="space-y-4">
            <motion.div animate={isError ? { x: [-10, 10, -10, 10, 0] } : {}}>
              <input
                type="password"
                maxLength={10}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter passcode..."
                className={`w-full bg-zinc-950/80 border ${
                  isError ? "border-red-500 text-red-400" : "border-white/20 text-white focus:border-rose-400"
                } rounded-2xl px-4 py-3.5 text-center text-lg font-mono tracking-widest outline-none transition-all placeholder:text-zinc-600`}
              />
            </motion.div>

            {isError && (
              <p className="text-xs text-red-400 font-medium">
                Oops! Incorrect passcode. Try again! ❌
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 active:scale-95 text-white font-bold py-3.5 px-6 rounded-full shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:shadow-[0_0_30px_rgba(236,72,153,0.6)] text-sm sm:text-base transition-all cursor-pointer border border-pink-400/30"
            >
              Unlock Secret 🔓
            </button>
          </form>
        </motion.div>
      )}

      {/* ================= STAGE 4: UNLOCKED SUCCESS SCREEN ================= */}
      {stage === "UNLOCKED" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 w-full max-w-sm sm:max-w-md p-6 sm:p-8 bg-zinc-900/80 backdrop-blur-2xl rounded-3xl border border-rose-500/30 shadow-[0_25px_60px_rgba(244,63,94,0.4)] text-center"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-rose-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-rose-500/50 animate-bounce">
            <span className="text-4xl">🎉</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-pink-200 via-rose-300 to-white bg-clip-text text-transparent">
            Access Granted! 💖
          </h2>

          <p className="text-zinc-300 text-sm sm:text-base mt-3 leading-relaxed bg-white/5 p-4 rounded-2xl border border-white/10">
            You unlocked the secret! This letter and all the love inside it is officially sealed in our hearts forever.
          </p>

          <button
            onClick={() => {
              setStage("ENVELOPE");
              setPassword("");
            }}
            className="mt-6 w-full bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-6 rounded-full text-xs sm:text-sm transition-all border border-white/10 cursor-pointer"
          >
            Replay Experience 🔄
          </button>
        </motion.div>
      )}
    </main>
  );
}