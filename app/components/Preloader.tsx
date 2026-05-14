"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Lock scrolling while loading
    document.body.style.overflow = "hidden";

    let currentProgress = 0;
    // Animate progress to 90% while waiting for page load
    const progressInterval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 8) + 2;
      if (currentProgress >= 90) {
        currentProgress = 90;
        clearInterval(progressInterval);
      }
      setProgress(currentProgress);
    }, 40);

    const finishLoading = () => {
      clearInterval(progressInterval);
      setProgress(100);
      // Wait a moment at 100% before fading out
      setTimeout(() => {
        setIsLoading(false);
        document.body.style.overflow = "";
      }, 400);
    };

    const handleLoad = () => {
      // Add a minimum delay to let the animation play out nicely
      setTimeout(finishLoading, 400);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      // Fallback timer just in case
      const fallbackTimer = setTimeout(() => {
        finishLoading();
      }, 4000);

      return () => {
        window.removeEventListener("load", handleLoad);
        clearTimeout(fallbackTimer);
        clearInterval(progressInterval);
      };
    }
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0a0f]"
        >
          {/* Progress Counter */}
          <div className="font-mono text-[clamp(4rem,10vw,7rem)] text-volt font-medium tracking-tighter flex items-end leading-none">
            {progress}<span className="text-surgical-white text-2xl md:text-4xl mb-2 md:mb-4 ml-1">%</span>
          </div>

          {/* Progress Bar */}
          <div className="w-48 md:w-64 h-[2px] bg-white/10 mt-6 relative overflow-hidden rounded-full">
            <motion.div
              className="absolute top-0 left-0 h-full bg-volt shadow-[0_0_10px_rgba(170,255,0,0.5)]"
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear", duration: 0.1 }}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 text-foreground/50 font-mono text-xs tracking-[0.3em] uppercase"
          >
            Initializing
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
