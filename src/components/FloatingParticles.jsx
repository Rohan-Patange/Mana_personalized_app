import React from "react";
import { motion } from "framer-motion";

export const FloatingParticles = () => {
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