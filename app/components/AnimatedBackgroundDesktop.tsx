"use client";

import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function AnimatedBackgroundDesktop() {
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
      // Parallax scroll effect for the stars individually using CSS variables for 3D depth
      gsap.to(".mouse-parallax-stars", {
        "--scroll-y": 1000,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 2,
        },
      });

      // Subtle parallax scroll for the glow orbs
      gsap.to(".mouse-parallax-orbs", {
        y: "-20vh",
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

      // Mouse move parallax effect using CSS variables on the stars container for 3D depth-parallax
      const starsXTo = gsap.quickTo(".mouse-parallax-stars", "--mouse-x", { duration: 1.2, ease: "power2" });
      const starsYTo = gsap.quickTo(".mouse-parallax-stars", "--mouse-y", { duration: 1.2, ease: "power2" });
      const orbsXTo = gsap.quickTo(".mouse-parallax-orbs", "x", { duration: 1.5, ease: "power3" });
      const orbsYTo = gsap.quickTo(".mouse-parallax-orbs", "y", { duration: 1.5, ease: "power3" });

      const handleMouseMove = (e: MouseEvent) => {
        const x = (e.clientX / window.innerWidth - 0.5) * -60;
        const y = (e.clientY / window.innerHeight - 0.5) * -60;

        starsXTo(x);
        starsYTo(y);
        orbsXTo((e.clientX / window.innerWidth - 0.5) * -20);
        orbsYTo((e.clientY / window.innerHeight - 0.5) * -20);
      };

      // Twinkling stars (per-particle recursive animation with 3D parallax)
      const playStars = () => {
        gsap.killTweensOf(".star");
        gsap.killTweensOf(".star-wrapper");

        if (stars.length > 0) {
          gsap.utils.toArray(".star").forEach((star: any, i) => {
            const targetTop = stars[i].top;
            const targetLeft = stars[i].left;
            const wrapper = star.parentElement;

            const cycleStar = (starElement: any, isFirstTime = false) => {
              const tl = gsap.timeline({
                onComplete: () => {
                  // After it becomes opacity 0 and completes the idle delay,
                  // move that star into a random location on the screen.
                  const newTop = `${gsap.utils.random(0, 100)}%`;
                  const newLeft = `${gsap.utils.random(0, 100)}%`;
                  const newSize = gsap.utils.random(0.5, 2.5);

                  const starWrapper = starElement.parentElement;
                  if (starWrapper) {
                    gsap.set(starWrapper, {
                      top: newTop,
                      left: newLeft,
                    });
                  }

                  gsap.set(starElement, {
                    x: 0,
                    y: 0,
                    opacity: 0,
                    scale: gsap.utils.random(0.5, 1.2),
                    width: newSize,
                    height: newSize,
                  });

                  // Start the movement again in a new direction
                  cycleStar(starElement, false);
                }
              });

              // Choose a random direction (angle)
              const angle = gsap.utils.random(0, Math.PI * 2);
              // Random distance to travel
              const distance = gsap.utils.random(40, 120);
              const dx = Math.cos(angle) * distance;
              const dy = Math.sin(angle) * distance;

              if (isFirstTime) {
                // To keep all stars visible after the initial load intro,
                // they will stay visible (hold) and drift before fading out at highly staggered times.
                const duration = gsap.utils.random(10, 20);
                const delay = gsap.utils.random(0, 10);
                const fadeOutDuration = gsap.utils.random(1.5, 3);
                const holdDuration = duration - fadeOutDuration;

                // Move over the entire duration after the stagger delay
                tl.to(starElement, {
                  x: dx,
                  y: dy,
                  duration: duration,
                  ease: "none",
                }, delay);

                // Hold visible state, then fade out to 0 at the end of the movement
                tl.to(starElement, {
                  opacity: 0,
                  scale: 0.2,
                  duration: fadeOutDuration,
                  ease: "sine.inOut",
                }, delay + holdDuration);

                // Short idle delay: become opacity 0 for just a brief moment
                const idleDelay = gsap.utils.random(0.5, 2);
                tl.to(starElement, {
                  duration: idleDelay,
                });
              } else {
                // For subsequent cycles: fade in quickly, drift and twinkle gently, 
                // fade out at the very end, and reset after a very short idle delay.
                const duration = gsap.utils.random(12, 24);
                const peakOpacity = gsap.utils.random(0.3, 0.85);
                const fadeInDuration = gsap.utils.random(1.5, 3);
                const fadeOutDuration = gsap.utils.random(1.5, 3);
                const holdDuration = duration - fadeInDuration - fadeOutDuration;

                // Move over the entire active animation duration
                tl.to(starElement, {
                  x: dx,
                  y: dy,
                  duration: duration,
                  ease: "none",
                }, 0);

                // Fade in to peak opacity
                tl.to(starElement, {
                  opacity: peakOpacity,
                  scale: gsap.utils.random(0.8, 1.2),
                  duration: fadeInDuration,
                  ease: "sine.inOut",
                }, 0);

                // Twinkle gently during the hold phase
                tl.to(starElement, {
                  opacity: peakOpacity * 0.6,
                  duration: holdDuration * 0.5,
                  yoyo: true,
                  repeat: 1,
                  ease: "sine.inOut",
                }, fadeInDuration);

                // Fade out to opacity 0 at the end
                tl.to(starElement, {
                  opacity: 0,
                  scale: 0.2,
                  duration: fadeOutDuration,
                  ease: "sine.inOut",
                }, fadeInDuration + holdDuration);

                // Short idle delay before repositioning
                const idleDelay = gsap.utils.random(0.5, 2);
                tl.to(starElement, {
                  duration: idleDelay,
                });
              }
            };

            // Shoot wrapper from center to target position on load
            if (wrapper) {
              gsap.fromTo(
                wrapper,
                { top: "50%", left: "50%" },
                {
                  top: targetTop,
                  left: targetLeft,
                  duration: gsap.utils.random(1.5, 3.5),
                  ease: "power4.out",
                  delay: gsap.utils.random(0, 0.5),
                }
              );
            }

            // Shoot star scale & opacity on load
            gsap.fromTo(
              star,
              { opacity: 0, scale: 0, x: 0, y: 0 },
              {
                opacity: 1,
                scale: 1,
                duration: gsap.utils.random(1.5, 3.5),
                ease: "power4.out",
                delay: gsap.utils.random(0, 0.5),
                onComplete: () => {
                  cycleStar(star, true);
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
      <div className="parallax-bg absolute inset-y-[-100vh] inset-x-0 w-full">
        {/* Twinkling stars layer */}
        <div className="mouse-parallax-stars absolute inset-0">
          {stars.map((star) => {
            // Larger stars move more on mouse move, simulating physical depth.
            const depthFactor = star.size * 0.8;
            return (
              <div
                key={star.id}
                className="star-wrapper absolute"
                style={{
                  top: star.top,
                  left: star.left,
                  transform: `translate(calc(var(--mouse-x, 0) * ${depthFactor} * 1px), calc((var(--mouse-y, 0) + var(--scroll-y, 0)) * ${depthFactor} * 1px))`,
                  willChange: "transform",
                }}
              >
                <div
                  className="star rounded-full bg-volt opacity-10"
                  style={{
                    width: star.size,
                    height: star.size,
                  }}
                />
              </div>
            );
          })}
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
