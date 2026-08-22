"use client";

import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  opacity: number;
  life: number;
  maxLife: number;
  thickness: number;
  isVolt: boolean;
}

export default function AnimatedBackgroundDesktop() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shootingCanvasRef = useRef<HTMLCanvasElement>(null);
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

  // Shooting stars canvas animation
  useEffect(() => {
    const canvas = shootingCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const activeShootingStars: ShootingStar[] = [];
    let lastSpawnTime = Date.now();
    let nextSpawnDelay = 3000 + Math.random() * 4000; // 3 to 7 seconds

    let animId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const now = Date.now();
      if (now - lastSpawnTime > nextSpawnDelay) {
        lastSpawnTime = now;
        nextSpawnDelay = 3500 + Math.random() * 4500;

        // Spawn 1 or 2 shooting stars
        const count = Math.random() > 0.8 ? 2 : 1;
        for (let k = 0; k < count; k++) {
          const isVolt = Math.random() > 0.45;
          const angle = (Math.PI / 180) * (32 + Math.random() * 16); // ~35° - 48° diagonal
          const speed = 12 + Math.random() * 10;
          const length = 100 + Math.random() * 140;
          const maxLife = 50 + Math.random() * 30;

          activeShootingStars.push({
            x: Math.random() * (width * 0.85) - width * 0.1,
            y: Math.random() * (height * 0.45) - height * 0.1,
            length,
            speed,
            angle,
            opacity: 0,
            life: 0,
            maxLife,
            thickness: isVolt ? 1.5 : 1.2,
            isVolt,
          });
        }
      }

      // Update and draw shooting stars
      for (let i = activeShootingStars.length - 1; i >= 0; i--) {
        const star = activeShootingStars[i];
        star.life++;

        // Fade in then out
        const progress = star.life / star.maxLife;
        if (progress < 0.25) {
          star.opacity = progress / 0.25;
        } else {
          star.opacity = 1 - (progress - 0.25) / 0.75;
        }

        star.x += Math.cos(star.angle) * star.speed;
        star.y += Math.sin(star.angle) * star.speed;

        if (star.life >= star.maxLife || star.x > width + star.length || star.y > height + star.length) {
          activeShootingStars.splice(i, 1);
          continue;
        }

        const headX = star.x;
        const headY = star.y;
        const tailX = star.x - Math.cos(star.angle) * star.length;
        const tailY = star.y - Math.sin(star.angle) * star.length;

        const grad = ctx.createLinearGradient(tailX, tailY, headX, headY);
        const rgb = star.isVolt ? "170, 255, 0" : "245, 245, 247";

        grad.addColorStop(0, `rgba(${rgb}, 0)`);
        grad.addColorStop(0.7, `rgba(${rgb}, ${star.opacity * 0.4})`);
        grad.addColorStop(1, `rgba(${rgb}, ${star.opacity * 0.95})`);

        ctx.strokeStyle = grad;
        ctx.lineWidth = star.thickness;
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(headX, headY);
        ctx.stroke();

        // Glowing head point
        ctx.fillStyle = star.isVolt ? "rgba(170, 255, 0, " + star.opacity + ")" : "rgba(255, 255, 255, " + star.opacity + ")";
        ctx.beginPath();
        ctx.arc(headX, headY, star.thickness * 0.9, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  useGSAP(
    () => {
      // Enhanced parallax scroll effect with deeper depth multiplier
      gsap.to(".mouse-parallax-stars", {
        "--scroll-y": 1600,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2,
        },
      });

      // Subtle parallax scroll for the glow orbs & celestial dust
      gsap.to(".mouse-parallax-orbs", {
        y: "-30vh",
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
        },
      });

      // Glow orbs & celestial dust floating
      gsap.to(".bg-orb", {
        y: "random(-60, 60)",
        x: "random(-40, 40)",
        duration: "random(10, 18)",
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 12,
      });

      // Mouse move parallax effect with expanded depth range and smooth gravity
      const starsXTo = gsap.quickTo(".mouse-parallax-stars", "--mouse-x", { duration: 1.2, ease: "power2" });
      const starsYTo = gsap.quickTo(".mouse-parallax-stars", "--mouse-y", { duration: 1.2, ease: "power2" });
      const orbsXTo = gsap.quickTo(".mouse-parallax-orbs", "x", { duration: 1.6, ease: "power3" });
      const orbsYTo = gsap.quickTo(".mouse-parallax-orbs", "y", { duration: 1.6, ease: "power3" });

      const handleMouseMove = (e: MouseEvent) => {
        const x = (e.clientX / window.innerWidth - 0.5) * -80;
        const y = (e.clientY / window.innerHeight - 0.5) * -80;

        starsXTo(x);
        starsYTo(y);
        orbsXTo((e.clientX / window.innerWidth - 0.5) * -25);
        orbsYTo((e.clientY / window.innerHeight - 0.5) * -25);
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

                  cycleStar(starElement, false);
                },
              });

              const angle = gsap.utils.random(0, Math.PI * 2);
              const distance = gsap.utils.random(40, 140);
              const dx = Math.cos(angle) * distance;
              const dy = Math.sin(angle) * distance;

              if (isFirstTime) {
                const duration = gsap.utils.random(10, 20);
                const delay = gsap.utils.random(0, 10);
                const fadeOutDuration = gsap.utils.random(1.5, 3);
                const holdDuration = duration - fadeOutDuration;

                tl.to(
                  starElement,
                  {
                    x: dx,
                    y: dy,
                    duration: duration,
                    ease: "none",
                  },
                  delay
                );

                tl.to(
                  starElement,
                  {
                    opacity: 0,
                    scale: 0.2,
                    duration: fadeOutDuration,
                    ease: "sine.inOut",
                  },
                  delay + holdDuration
                );

                const idleDelay = gsap.utils.random(0.5, 2);
                tl.to(starElement, {
                  duration: idleDelay,
                });
              } else {
                const duration = gsap.utils.random(12, 24);
                const peakOpacity = gsap.utils.random(0.3, 0.9);
                const fadeInDuration = gsap.utils.random(1.5, 3);
                const fadeOutDuration = gsap.utils.random(1.5, 3);
                const holdDuration = duration - fadeInDuration - fadeOutDuration;

                tl.to(
                  starElement,
                  {
                    x: dx,
                    y: dy,
                    duration: duration,
                    ease: "none",
                  },
                  0
                );

                tl.to(
                  starElement,
                  {
                    opacity: peakOpacity,
                    scale: gsap.utils.random(0.8, 1.2),
                    duration: fadeInDuration,
                    ease: "sine.inOut",
                  },
                  0
                );

                tl.to(
                  starElement,
                  {
                    opacity: peakOpacity * 0.6,
                    duration: holdDuration * 0.5,
                    yoyo: true,
                    repeat: 1,
                    ease: "sine.inOut",
                  },
                  fadeInDuration
                );

                tl.to(
                  starElement,
                  {
                    opacity: 0,
                    scale: 0.2,
                    duration: fadeOutDuration,
                    ease: "sine.inOut",
                  },
                  fadeInDuration + holdDuration
                );

                const idleDelay = gsap.utils.random(0.5, 2);
                tl.to(starElement, {
                  duration: idleDelay,
                });
              }
            };

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
      {/* High-speed shooting star streaks canvas */}
      <canvas
        ref={shootingCanvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      />

      <div className="parallax-bg absolute inset-y-[-100vh] inset-x-0 w-full">
        {/* Twinkling stars layer */}
        <div className="mouse-parallax-stars absolute inset-0">
          {stars.map((star) => {
            const depthFactor = star.size * 0.9;
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

        {/* Orbs & Celestial Dust Layer */}
        <div className="mouse-parallax-orbs absolute inset-0">
          {/* Subtle volt glow top-left */}
          <div
            className="bg-orb absolute rounded-full blur-[130px] opacity-[0.07]"
            style={{ left: "5%", top: "10%", width: 650, height: 650, background: "#aaff00" }}
          />
          {/* Subtle blue-purple bottom right */}
          <div
            className="bg-orb absolute rounded-full blur-[130px] opacity-[0.045]"
            style={{ right: "5%", bottom: "15%", width: 550, height: 550, background: "#4040cc" }}
          />
          {/* Faint center volt celestial dust */}
          <div
            className="bg-orb absolute rounded-full blur-[160px] opacity-[0.04]"
            style={{ left: "38%", top: "42%", width: 750, height: 750, background: "#aaff00" }}
          />
          {/* Subtle deep nebula patch top-right */}
          <div
            className="bg-orb absolute rounded-full blur-[140px] opacity-[0.035]"
            style={{ right: "20%", top: "25%", width: 500, height: 500, background: "#aaff00" }}
          />
        </div>
      </div>
    </div>
  );
}
