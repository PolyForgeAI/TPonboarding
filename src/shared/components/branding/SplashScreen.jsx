import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Using actual Timeless Pools gallery images
const GALLERY_IMAGES = [
  "https://timelesspools.us/wp-content/uploads/2025/03/1920-AB-10-1024x683.jpg",
  "https://timelesspools.us/wp-content/uploads/2024/08/E-14-1024x683.jpg",
  "https://timelesspools.us/wp-content/uploads/2025/03/G-44-1024x683.jpg",
  "https://timelesspools.us/wp-content/uploads/2024/05/W-9-1024x682.jpg",
  "https://timelesspools.us/wp-content/uploads/2025/03/Modern-Infinity-Edge-Pool-1024x683.jpg",
  "https://timelesspools.us/wp-content/uploads/2024/06/H-27-1024x683.jpg",
];

export default function SplashScreen({ onComplete }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % GALLERY_IMAGES.length);
    }, 2000);

    const splashTimeout = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500);
    }, 8000);

    return () => {
      clearInterval(imageInterval);
      clearTimeout(splashTimeout);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-slate-900 flex items-center justify-center"
        >
          {/* Background Image Slideshow */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 0.5, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 1 }}
              className="absolute inset-0"
            >
              <img
                src={GALLERY_IMAGES[currentImageIndex]}
                alt="Timeless Pools Gallery"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/50 to-slate-900/70" />
            </motion.div>
          </AnimatePresence>

          {/* Logo and Text */}
          <div className="relative z-10 text-center">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, type: "spring" }}
              className="mb-8"
            >
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-cyan-400 to-blue-600 rounded-3xl flex items-center justify-center shadow-2xl">
                <span className="text-white text-6xl font-bold">T</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-7xl font-bold text-white mb-4 tracking-tight"
            >
              Timeless Pools
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-2xl text-cyan-300 mb-8 font-light"
            >
              Genesis Project Dossier
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="flex flex-col items-center gap-4 text-white/80"
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-cyan-400" />
                <span className="text-sm font-medium">GENESIS® Certified Master</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-400" />
                <span className="text-sm font-medium">World's Greatest Pools Award Winner</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-cyan-400" />
                <span className="text-sm font-medium">Elite Pebble Tec Builder</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
              className="mt-12"
            >
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "0s" }} />
                <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: "0.2s" }} />
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "0.4s" }} />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}