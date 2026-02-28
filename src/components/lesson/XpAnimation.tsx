"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Trophy } from "lucide-react";

interface XpAnimationProps {
  xp: number;
  show: boolean;
  onComplete?: () => void;
}

export default function XpAnimation({ xp, show, onComplete }: XpAnimationProps) {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; delay: number }[]>([]);

  useEffect(() => {
    if (show) {
      const newParticles = Array.from({ length: 12 }, (_, i) => ({
        id: i,
        x: Math.cos((i / 12) * Math.PI * 2) * 120,
        y: Math.sin((i / 12) * Math.PI * 2) * 120,
        delay: i * 0.05,
      }));
      setParticles(newParticles);

      const timer = setTimeout(() => {
        onComplete?.();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Particle effects */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute w-3 h-3"
                initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
                animate={{
                  x: particle.x,
                  y: particle.y,
                  opacity: 0,
                  scale: 1,
                }}
                transition={{
                  duration: 1.2,
                  delay: particle.delay + 0.3,
                  ease: "easeOut",
                }}
              >
                <Star className="w-3 h-3 text-gold-400 fill-gold-400" />
              </motion.div>
            ))}
          </div>

          {/* Main content */}
          <motion.div
            className="relative flex flex-col items-center gap-6"
            initial={{ scale: 0, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0, y: -50 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
              delay: 0.1,
            }}
          >
            {/* Trophy icon */}
            <motion.div
              className="w-24 h-24 bg-gradient-to-br from-gold-300 to-gold-500 rounded-full flex items-center justify-center shadow-xl"
              initial={{ rotate: -180, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 12,
                delay: 0.2,
              }}
            >
              <Trophy className="w-12 h-12 text-white" />
            </motion.div>

            {/* XP text */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <motion.p
                className="text-5xl font-bold text-gold-400"
                initial={{ scale: 0.5 }}
                animate={{ scale: [0.5, 1.2, 1] }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                +{xp} XP
              </motion.p>
            </motion.div>

            {/* Stars decoration */}
            <motion.div
              className="flex gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    delay: 0.9 + i * 0.15,
                    type: "spring",
                    stiffness: 300,
                    damping: 15,
                  }}
                >
                  <Star className="w-8 h-8 text-gold-400 fill-gold-400" />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
