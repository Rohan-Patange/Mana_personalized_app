import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// =========================================================================
// 💌 EASY CONFIGURATION: EDIT YOUR LETTER TEXT HERE!
// =========================================================================
const LETTER_CONFIG = {
  // Top Right Tag & Sub-badge
  headerTag: "Sent With Hugs 🧸", // 👈 Cozy teddy bear tag
  dateStamp: "Delivered with love • 2026",

  // Recipient
  recipientName: "Mana",

  // Letter Paragraphs
  paragraph1:
    "I built this little corner of the world just for you to remind you of how deeply special you are to me.",
  paragraph2:
    "Every shared smile, every gentle laugh, and every quiet moment with you is something I treasure.",
  questionPrompt:
    "Are you ready to accept this note and unlock our secret key?",
  signOff: "— Forever Yours 💕",

  // Polaroid Photo
  showPolaroid: true,
  photoUrl:
    "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=600&auto=format&fit=crop",
  photoCaption: "Our favorite moment ✨",

  // Audio Player
  songTitle: "A song for your day",
  songSubtext: "WITH LOVE",
  audioSrc: "./mana-voice.mp3",
  loopDurationSeconds: 20,

  // Passcode
  secretPasscode: "1204",
};

// =========================================================================
// ✨ BACKGROUND FLOATING PARTICLES COMPONENT
// =========================================================================
const FloatingParticles = () => {
  const particles = Array.from({ length: 16 });
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          initial={{
            opacity: 0,
            y: "100vh",
            x: `${Math.random() * 100}vw`,
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            opacity: [0, 0.6, 0],
            y: "-10vh",
          }}
          transition={{
            duration: Math.random() * 7 + 7,
            repeat: Infinity,
            delay: Math.random() * 6,
            ease: "linear",
          }}
          className="absolute text-pink-300/30 text-sm select-none"
        >
          {["✨", "💖", "🌸", "💕", "✨"][i % 5]}
        </motion.div>
      ))}
    </div>
  );
};

export default function App() {
  // STAGES: 'ENVELOPE' -> 'LETTER' -> 'PASSWORD_SCREEN' -> 'UNLOCKED'
  const [stage, setStage] = useState("ENVELOPE");
  const [isOpening, setIsOpening] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isPhotoExpanded, setIsPhotoExpanded] = useState(false);

  // AUDIO PLAYER STATE
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null);

  // HEART BURST PARTICLES
  const [burstParticles, setBurstParticles] = useState([]);

  // PASSWORD STATE
  const [password, setPassword] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Dancing+Script:wght@500;600;700&family=Playfair+Display:ital,wght@0,600;0,700;1,400;1,600&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  const handleMouseMove = (e) => {
    if (isOpening) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -14, y: x * 14 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const handleOpenEnvelope = () => {
    if (isOpening) return;
    setIsOpening(true);

    const newParticles = Array.from({ length: 10 }).map((_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 160,
      y: (Math.random() - 0.5) * 160,
      emoji: ["💖", "✨", "💕", "🌸"][Math.floor(Math.random() * 4)],
    }));
    setBurstParticles(newParticles);

    setTimeout(() => {
      setStage("LETTER");
      setIsOpening(false);
    }, 1000);
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log("Audio play error:", err));
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const time = audioRef.current.currentTime;
      setCurrentTime(time);

      if (time >= LETTER_CONFIG.loopDurationSeconds) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleVerifyPassword = (e) => {
    e.preventDefault();
    if (password.trim() === LETTER_CONFIG.secretPasscode) {
      setIsError(false);
      setStage("UNLOCKED");
    } else {
      setIsError(true);
      setTimeout(() => setIsError(false), 800);
    }
  };

  return (
    <main className="h-dvh w-screen bg-[#0d0b0e] text-slate-100 flex flex-col items-center justify-center p-3 sm:p-4 overflow-hidden relative font-['Plus_Jakarta_Sans',sans-serif] select-none">
      <audio
        ref={audioRef}
        src={LETTER_CONFIG.audioSrc}
        preload="metadata"
        onTimeUpdate={handleTimeUpdate}
      />

      <FloatingParticles />

      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-900/30 rounded-full blur-[150px] animate-pulse" />
      </div>

      {/* STAGE 1: LANDING ENVELOPE */}
      {stage === "ENVELOPE" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative z-10 flex flex-col items-center justify-center text-center max-w-sm w-full"
        >
          <div className="w-full bg-[#161217]/90 border border-white/10 rounded-2xl p-4 sm:p-5 shadow-[0_10px_30px_rgba(0,0,0,0.8)] mb-6 flex flex-col items-center">
            <div className="px-3.5 py-1 bg-rose-500/20 border border-rose-500/30 rounded-full mb-2 flex items-center gap-1.5">
              <span className="text-[11px] font-medium tracking-wide text-rose-200">
                Special Delivery 📦
              </span>
            </div>

            <div className="font-['Dancing_Script',cursive] text-2xl sm:text-3xl text-rose-300 font-bold my-1 tracking-wide">
              To: Dearest {LETTER_CONFIG.recipientName}, 💌
            </div>

            <h2 className="text-base sm:text-lg font-medium text-rose-100 tracking-tight mt-0.5">
              "A secret letter arrived for you..."
            </h2>
          </div>

          <motion.div
            style={{ perspective: 1000 }}
            animate={{ rotateX: tilt.x, rotateY: tilt.y }}
            transition={{ type: "spring", stiffness: 280, damping: 20 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={handleOpenEnvelope}
            className="cursor-pointer relative w-full bg-[#18131a] border border-rose-500/30 rounded-2xl p-6 sm:p-8 shadow-[0_0_40px_rgba(225,29,72,0.15)] flex items-center justify-center my-2 group overflow-hidden"
          >
            <div className="absolute top-3 right-3 border border-dashed border-rose-300/30 rounded px-2 py-0.5 transform rotate-6 opacity-70 pointer-events-none">
              <span className="text-[8px] font-mono tracking-widest text-rose-200 uppercase">
                AIR MAIL • CONFIDENTIAL
              </span>
            </div>

            <div className="w-64 h-40 relative flex items-center justify-center">
              <svg viewBox="0 0 180 120" className="w-full h-full overflow-visible">
                <rect x="10" y="20" width="160" height="90" rx="10" fill="#e8b4c8" />

                <motion.g
                  animate={isOpening ? { y: -38 } : { y: 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut", delay: 0.2 }}
                >
                  <rect
                    x="20"
                    y="25"
                    width="140"
                    height="75"
                    rx="6"
                    fill="#fffdf6"
                    stroke="#ebd2c0"
                    strokeWidth="1.5"
                  />
                  <line x1="32" y1="40" x2="148" y2="40" stroke="#f0d5e1" strokeWidth="2" strokeDasharray="4 2" />
                  <line x1="32" y1="52" x2="128" y2="52" stroke="#f0d5e1" strokeWidth="2" strokeDasharray="4 2" />
                  <line x1="32" y1="64" x2="140" y2="64" stroke="#f0d5e1" strokeWidth="2" strokeDasharray="4 2" />
                </motion.g>

                <path
                  d="M 10 20 L 90 70 L 170 20 L 170 100 C 170 105 165 110 160 110 L 20 110 C 15 110 10 105 10 100 Z"
                  fill="#fbebf2"
                  stroke="#e8a8c2"
                  strokeWidth="2.5"
                />

                <motion.g
                  style={{ transformOrigin: "90px 20px", transformBox: "fill-box" }}
                  animate={isOpening ? { scaleY: -1, y: -2 } : { scaleY: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  <path
                    d="M 10 20 L 90 70 L 170 20 Z"
                    fill="#f7dbe7"
                    stroke="#e8a8c2"
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                  />
                </motion.g>

                <motion.g
                  animate={isOpening ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.circle
                    cx="90"
                    cy="70"
                    r="18"
                    fill="#be4b68"
                    animate={{ scale: [1, 1.35, 1], opacity: [0.2, 0.6, 0.2] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    style={{ transformOrigin: "90px 70px" }}
                  />
                  <circle cx="90" cy="70" r="14" fill="#be4b68" stroke="#ffffff" strokeWidth="2.5" className="shadow-md" />
                  <path
                    d="M 90 75 C 84 70.5, 81 67, 85 63 C 88.5 60.5, 90 63, 90 64.5 C 90 63, 91.5 60.5, 95 63 C 99 67, 96 70.5, 90 75 Z"
                    fill="#ffffff"
                  />
                </motion.g>
              </svg>

              {burstParticles.map((p) => (
                <motion.span
                  key={p.id}
                  initial={{ opacity: 1, x: 0, y: 0, scale: 0.5 }}
                  animate={{ opacity: 0, x: p.x, y: p.y, scale: 1.4 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="absolute text-xl pointer-events-none"
                >
                  {p.emoji}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <p className="mt-5 text-zinc-400 text-xs sm:text-sm tracking-wide font-normal">
            Tap the glowing wax seal to open 💌
          </p>
        </motion.div>
      )}

      {/* STAGE 2: AESTHETIC LETTER CARD */}
      <AnimatePresence>
        {stage === "LETTER" && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 15 }}
              transition={{ type: "spring", stiffness: 240, damping: 25 }}
              className="relative w-full max-w-[380px] sm:max-w-[400px] max-h-[92dvh] bg-[#fffdf6] text-[#3d2b2e] border border-[#f5e2cc] rounded-[24px] sm:rounded-[28px] p-5 sm:p-6 shadow-[0_25px_60px_rgba(0,0,0,0.7)] my-auto flex flex-col justify-between overflow-x-hidden overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              <div className="absolute top-2 left-5 w-14 h-4 bg-rose-200/50 backdrop-blur-xs border-y border-dashed border-rose-300/40 -rotate-6 pointer-events-none shadow-xs" />
              <div className="absolute top-0 right-0 w-28 h-28 bg-[#fbeae2] rounded-bl-full pointer-events-none opacity-80" />

              <div>
                {/* 1. TOP RIGHT BADGE */}
                <div className="w-full text-right mb-1 relative z-10">
                  <span className="font-['Dancing_Script',cursive] text-xs sm:text-sm text-[#c0737a] italic tracking-wide block">
                    {LETTER_CONFIG.headerTag}
                  </span>
                  <span className="text-[9px] font-medium text-[#b58b8d] tracking-wider block -mt-1">
                    {LETTER_CONFIG.dateStamp}
                  </span>
                </div>

                {/* 2. MAIN TITLE */}
                <h1 className="font-['Playfair_Display',serif] text-2xl sm:text-3xl font-bold text-[#671228] tracking-tight mb-1.5 relative z-10">
                  Dearest {LETTER_CONFIG.recipientName},
                </h1>

                <div className="w-full h-[1px] bg-[#eed2c2] mb-3" />

                {/* 3. LETTER BODY */}
                <div className="space-y-2.5 text-[#4a3538] text-xs sm:text-sm leading-relaxed font-normal relative z-10 text-left">
                  <p>{LETTER_CONFIG.paragraph1}</p>

                  {LETTER_CONFIG.showPolaroid && (
                    <div
                      onClick={() => setIsPhotoExpanded(true)}
                      className="my-2 p-1.5 bg-white rounded-xl shadow-md border border-[#ebdcd0] transform -rotate-1 hover:rotate-0 hover:scale-[1.02] transition-all duration-300 max-w-[280px] mx-auto cursor-pointer group relative"
                    >
                      <div className="w-full h-28 sm:h-32 rounded-lg overflow-hidden bg-[#f3e9e1] relative">
                        <img
                          src={LETTER_CONFIG.photoUrl}
                          alt="Memory"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="text-white text-[10px] font-medium bg-black/60 px-2.5 py-1 rounded-full backdrop-blur-xs shadow-sm">
                            🔍 Tap to Expand
                          </span>
                        </div>
                      </div>
                      <div className="pt-1 text-center font-['Dancing_Script',cursive] text-xs text-[#7a4b52] font-semibold">
                        {LETTER_CONFIG.photoCaption}
                      </div>
                    </div>
                  )}

                  <p>{LETTER_CONFIG.paragraph2}</p>

                  <p className="font-semibold text-[#671228] pt-0.5">
                    {LETTER_CONFIG.questionPrompt}
                  </p>
                </div>

                {/* 4. AUDIO PLAYER */}
                <div className="w-full bg-[#f9f3ea] border border-[#ebd8c8] rounded-xl p-2.5 my-3 flex items-center justify-between shadow-inner relative z-10">
                  <div className="w-9 h-9 bg-white rounded-lg border border-[#e0d4c8] flex items-center justify-center text-base shrink-0 shadow-sm">
                    🌸
                  </div>

                  <div className="flex-1 px-2.5 text-left overflow-hidden">
                    <div className="font-['Playfair_Display',serif] font-bold text-xs text-[#2d2626] truncate">
                      {LETTER_CONFIG.songTitle}
                    </div>
                    <div className="text-[8px] font-semibold tracking-wider text-[#a38a83] uppercase">
                      {LETTER_CONFIG.songSubtext}
                    </div>

                    <div className="mt-1 flex items-center gap-2">
                      <div className="flex-1 bg-[#e2d6c8] h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-[#d91b5c] h-full transition-all duration-300"
                          style={{
                            width: `${(currentTime / LETTER_CONFIG.loopDurationSeconds) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="text-[8px] font-mono text-[#8c7d7b]">
                        {formatTime(currentTime)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={togglePlay}
                    className="w-8 h-8 rounded-full bg-[#d91b5c] hover:bg-[#b8124a] active:scale-90 text-white flex items-center justify-center transition-all shadow-md shrink-0 cursor-pointer"
                  >
                    {isPlaying ? (
                      <span className="text-[9px] font-bold">❚❚</span>
                    ) : (
                      <span className="text-[9px] font-bold pl-0.5">▶</span>
                    )}
                  </button>
                </div>

                {/* 5. SIGN-OFF */}
                <div className="w-full text-right my-2 relative z-10">
                  <span className="font-['Playfair_Display',serif] italic font-bold text-base sm:text-lg text-[#7a1832]">
                    {LETTER_CONFIG.signOff}
                  </span>
                </div>
              </div>

              {/* 6. BUTTON */}
              <button
                onClick={() => setStage("PASSWORD_SCREEN")}
                className="w-full bg-gradient-to-r from-[#e3125d] to-[#d81b5c] hover:from-[#c90c50] hover:to-[#be1250] active:scale-95 text-white font-bold py-3 px-5 rounded-xl shadow-[0_6px_18px_rgba(227,18,93,0.35)] text-xs sm:text-sm tracking-wide transition-all cursor-pointer flex items-center justify-center gap-2 border border-white/20 relative z-10 shrink-0 mt-1"
              >
                <span>Sign & Accept Letter</span>
                <span className="text-base">✒️</span>
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FULLSCREEN PHOTO LIGHTBOX */}
      <AnimatePresence>
        {isPhotoExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsPhotoExpanded(false)}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4 cursor-pointer select-none"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-[#fffdf6] p-3 sm:p-4 rounded-2xl shadow-2xl max-w-sm sm:max-w-md w-full border border-rose-200 flex flex-col items-center"
            >
              <button
                onClick={() => setIsPhotoExpanded(false)}
                className="absolute -top-3 -right-3 w-8 h-8 bg-rose-600 hover:bg-rose-700 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-lg transition-transform active:scale-90 cursor-pointer border-2 border-white z-10"
              >
                ✕
              </button>

              <div className="w-full h-64 sm:h-80 rounded-xl overflow-hidden bg-[#f3e9e1]">
                <img
                  src={LETTER_CONFIG.photoUrl}
                  alt="Expanded Memory"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="mt-3 text-center font-['Dancing_Script',cursive] text-lg text-[#7a4b52] font-bold">
                {LETTER_CONFIG.photoCaption}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* STAGE 3: PASSWORD CHECKPOINT */}
      {stage === "PASSWORD_SCREEN" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="relative z-20 w-full max-w-sm p-6 bg-[#161217]/90 backdrop-blur-xl rounded-3xl border border-white/10 shadow-[0_25px_50px_rgba(0,0,0,0.8)] text-center my-auto"
        >
          <div className="w-12 h-12 bg-rose-500/20 border border-rose-500/30 rounded-2xl flex items-center justify-center mx-auto mb-3 text-xl">
            🔒
          </div>

          <h2 className="text-xl font-bold bg-gradient-to-r from-pink-200 via-rose-300 to-white bg-clip-text text-transparent">
            Passcode Checkpoint
          </h2>
          <p className="text-zinc-400 text-xs mt-1 mb-5">
            Enter the secret passcode to unlock our memories!
          </p>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 mb-5 text-left relative">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-semibold text-rose-300 bg-rose-500/20 px-2 py-0.5 rounded-full border border-rose-500/30 uppercase tracking-wider">
                Fun Riddle 🧩
              </span>
              <button
                onClick={() => setShowHint(!showHint)}
                className="text-[11px] text-rose-300 hover:text-white underline cursor-pointer"
              >
                {showHint ? "Hide Clue 🙈" : "Need a Clue? 💡"}
              </button>
            </div>

            <p className="text-zinc-300 text-xs leading-relaxed">
              "What is the 4-digit secret key?"
            </p>

            <AnimatePresence>
              {showHint && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-2 pt-2 border-t border-white/10 text-[11px] text-rose-200 italic"
                >
                  💡 <strong>Hint:</strong> Try entering <strong>1204</strong>!
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <form onSubmit={handleVerifyPassword} className="space-y-3">
            <motion.div animate={isError ? { x: [-8, 8, -8, 8, 0] } : {}}>
              <input
                type="password"
                maxLength={10}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••"
                className={`w-full bg-black/60 border ${
                  isError
                    ? "border-red-500 text-red-400"
                    : "border-white/20 text-white focus:border-rose-400"
                } rounded-xl px-4 py-3 text-center text-lg font-mono tracking-widest outline-none transition-all placeholder:text-zinc-600 shadow-inner`}
              />
            </motion.div>

            {isError && (
              <p className="text-xs text-red-400 font-medium">
                Incorrect passcode. Try again! ❌
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 active:scale-95 text-white font-semibold py-3 px-6 rounded-full shadow-[0_0_20px_rgba(236,72,153,0.3)] text-xs uppercase tracking-wider transition-all cursor-pointer border border-pink-400/30"
            >
              Unlock Memories 🔓
            </button>
          </form>
        </motion.div>
      )}

      {/* STAGE 4: UNLOCKED CELEBRATION */}
      {stage === "UNLOCKED" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-20 w-full max-w-sm p-6 sm:p-8 bg-[#161217]/90 backdrop-blur-xl rounded-3xl border border-rose-500/30 shadow-[0_25px_60px_rgba(244,63,94,0.35)] text-center my-auto"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-rose-500/40 animate-bounce">
            <span className="text-3xl">🎉</span>
          </div>

          <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-200 via-rose-300 to-white bg-clip-text text-transparent">
            Access Granted! 💖
          </h2>

          <p className="text-zinc-300 text-xs sm:text-sm mt-3 leading-relaxed bg-white/5 p-4 rounded-2xl border border-white/10">
            You unlocked the final secret! Wishing you endless happiness, warmth, and beautiful memories ahead.
          </p>

          <button
            onClick={() => {
              setStage("ENVELOPE");
              setPassword("");
            }}
            className="mt-5 w-full bg-white/10 hover:bg-white/20 text-white font-medium py-2.5 px-5 rounded-full text-xs transition-all border border-white/10 cursor-pointer"
          >
            Replay Experience 🔄
          </button>
        </motion.div>
      )}
    </main>
  );
}