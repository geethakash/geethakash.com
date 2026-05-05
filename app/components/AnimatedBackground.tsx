"use client";

import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function AnimatedBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [stars, setStars] = useState<{ id: number; top: string; left: string; size: number }[]>([]);

  // Generate random stars on mount to avoid hydration mismatch
  useEffect(() => {
    setStars(
      Array.from({ length: 500 }).map((_, i) => ({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: Math.random() * 2 + 0.5,
      }))
    );
  }, []);

  useGSAP(
    () => {
      // Parallax scroll effect for the entire background
      gsap.to(".parallax-bg", {
        y: "-100vh",
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 0,
        },
      });

      // Glow orbs floating
      gsap.to(".bg-orb", {
        y: "random(-30, 30)",
        x: "random(-20, 20)",
        duration: "random(8, 14)",
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 15,
      });

      // Twinkling stars (per-particle recursive animation)
      if (stars.length > 0) {
        gsap.utils.toArray(".star").forEach((star: any) => {
          // 1. Twinkle effect (opacity & scale)
          const animateTwinkle = () => {
            gsap.to(star, {
              opacity: gsap.utils.random(0.05, 0.8),
              scale: gsap.utils.random(0.5, 1.2),
              duration: gsap.utils.random(2, 5),
              delay: gsap.utils.random(0, 2),
              ease: "sine.inOut",
              onComplete: animateTwinkle,
            });
          };

          // 2. Slow drifting effect (movement)
          const animateDrift = () => {
            gsap.to(star, {
              x: gsap.utils.random(-25, 25),
              y: gsap.utils.random(-25, 25),
              duration: gsap.utils.random(10, 25),
              ease: "sine.inOut",
              onComplete: animateDrift,
            });
          };

          // Initialize with a random delay so they don't all start at exactly time 0
          setTimeout(() => {
            animateTwinkle();
            animateDrift();
          }, gsap.utils.random(0, 3000));
        });
      }
    },
    { scope: containerRef, dependencies: [stars] }
  );

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden pointer-events-none z-0"
    >
      <div className="parallax-bg absolute -inset-y-[100vh] inset-x-0 w-full">
        {/* Twinkling stars layer */}
        <div className="absolute inset-0">
          {stars.map((star) => (
            <div
              key={star.id}
              className="star absolute rounded-full bg-volt opacity-10"
              style={{
                top: star.top,
                left: star.left,
                width: star.size,
                height: star.size,
              }}
            />
          ))}
        </div>

        {/* Very subtle volt glow top-left */}
        <div
          className="bg-orb absolute rounded-full blur-[120px] opacity-[0.06]"
          style={{ left: "5%", top: "10%", width: 600, height: 600, background: "#aaff00" }}
        />
        {/* Subtle blue-purple bottom right */}
        <div
          className="bg-orb absolute rounded-full blur-[120px] opacity-[0.04]"
          style={{ right: "5%", bottom: "15%", width: 500, height: 500, background: "#4040cc" }}
        />
        {/* Faint center glow */}
        <div
          className="bg-orb absolute rounded-full blur-[160px] opacity-[0.03]"
          style={{ left: "40%", top: "40%", width: 700, height: 700, background: "#aaff00" }}
        />
      </div>
    </div>
  );
}
