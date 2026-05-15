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
      Array.from({ length: 1000 }).map((_, i) => ({
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
        y: "random(-50, 50)",
        x: "random(-30, 30)",
        duration: "random(8, 14)",
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 15,
      });

      // Mouse move parallax effect
      const starsXTo = gsap.quickTo(".mouse-parallax-stars", "x", { duration: 1, ease: "power3" });
      const starsYTo = gsap.quickTo(".mouse-parallax-stars", "y", { duration: 1, ease: "power3" });
      const orbsXTo = gsap.quickTo(".mouse-parallax-orbs", "x", { duration: 1.5, ease: "power3" });
      const orbsYTo = gsap.quickTo(".mouse-parallax-orbs", "y", { duration: 1.5, ease: "power3" });

      const handleMouseMove = (e: MouseEvent) => {
        const x = (e.clientX / window.innerWidth - 0.5);
        const y = (e.clientY / window.innerHeight - 0.5);
        
        starsXTo(x * -50);
        starsYTo(y * -50);
        orbsXTo(x * -20);
        orbsYTo(y * -20);
      };

      // Twinkling stars (per-particle recursive animation)
      const playStars = () => {
        gsap.killTweensOf(".star");

        if (stars.length > 0) {
          gsap.utils.toArray(".star").forEach((star: any, i) => {
            const targetTop = stars[i].top;
            const targetLeft = stars[i].left;

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
                duration: gsap.utils.random(2, 10),
                ease: "sine.inOut",
                onComplete: animateDrift,
              });
            };

            // Shoot from center on load
            gsap.fromTo(
              star,
              { top: "50%", left: "50%", opacity: 0, scale: 0, x: 0, y: 0 },
              {
                top: targetTop,
                left: targetLeft,
                opacity: 1,
                scale: 1,
                duration: gsap.utils.random(1.5, 3.5),
                ease: "power4.out",
                delay: gsap.utils.random(0, 0.5),
                onComplete: () => {
                  animateTwinkle();
                  animateDrift();
                },
              }
            );
          });
        }
      };

      if (typeof window !== "undefined") {
        window.addEventListener("mousemove", handleMouseMove);
        if ((window as any).__PRELOADER_DONE__) {
          playStars();
        } else {
          window.addEventListener("preloader-finished", playStars);
        }
        window.addEventListener("replay-animations", playStars);
      }

      return () => {
        if (typeof window !== "undefined") {
          window.removeEventListener("mousemove", handleMouseMove);
          window.removeEventListener("preloader-finished", playStars);
          window.removeEventListener("replay-animations", playStars);
        }
      };
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
        <div className="mouse-parallax-stars absolute inset-0">
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

        {/* Orbs layer */}
        <div className="mouse-parallax-orbs absolute inset-0">
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
    </div>
  );
}
