"use client";

/**
 * AnimatedBackgroundMobile
 * 
 * A super lightweight, GPU-optimized background for mobile devices.
 * Completely removes the heavy star calculations and particle nodes.
 * Instead, it uses a stunning fluid "Aurora" mesh gradient effect
 * driven entirely by CSS keyframes and hardware-accelerated transforms.
 */
export default function AnimatedBackgroundMobile() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-[#0B0C10]">
      {/* Aurora Glassmorphism Glow Orbs */}
      <div className="absolute inset-0 w-full h-full opacity-[0.35] blur-[80px]">
        {/* Orb 1: Volt Green (Top Left) */}
        <div
          className="absolute rounded-full"
          style={{
            left: "-10%",
            top: "5%",
            width: "280px",
            height: "280px",
            background: "radial-gradient(circle, rgba(170, 255, 0, 0.4) 0%, rgba(170, 255, 0, 0) 70%)",
            animation: "auroraMove1 22s infinite ease-in-out alternate",
            willChange: "transform",
          }}
        />

        {/* Orb 2: Deep Indigo / Violet (Right Middle) */}
        <div
          className="absolute rounded-full"
          style={{
            right: "-20%",
            top: "30%",
            width: "320px",
            height: "320px",
            background: "radial-gradient(circle, rgba(64, 64, 204, 0.35) 0%, rgba(64, 64, 204, 0) 70%)",
            animation: "auroraMove2 28s infinite ease-in-out alternate",
            willChange: "transform",
          }}
        />

        {/* Orb 3: Cyan / Neon Blue (Bottom Left) */}
        <div
          className="absolute rounded-full"
          style={{
            left: "-5%",
            bottom: "10%",
            width: "260px",
            height: "260px",
            background: "radial-gradient(circle, rgba(0, 240, 255, 0.35) 0%, rgba(0, 240, 255, 0) 70%)",
            animation: "auroraMove3 25s infinite ease-in-out alternate",
            willChange: "transform",
          }}
        />

        {/* Orb 4: Soft Rose / Magenta (Top Right) */}
        <div
          className="absolute rounded-full"
          style={{
            right: "10%",
            top: "-10%",
            width: "300px",
            height: "300px",
            background: "radial-gradient(circle, rgba(255, 0, 128, 0.2) 0%, rgba(255, 0, 128, 0) 70%)",
            animation: "auroraMove4 32s infinite ease-in-out alternate",
            willChange: "transform",
          }}
        />
      </div>

      {/* Technical Blueprint Dot Grid - very subtle and professional */}
      <div 
        className="absolute inset-0 opacity-[0.012]"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.2) 1.5px, transparent 0)`,
          backgroundSize: "28px 28px"
        }}
      />

      {/* CSS Keyframes for smooth, low-overhead mobile hardware acceleration */}
      <style>{`
        @keyframes auroraMove1 {
          0% { transform: translate(0px, 0px) scale(1); }
          50% { transform: translate(40px, 30px) scale(1.15); }
          100% { transform: translate(-20px, 50px) scale(0.9); }
        }
        @keyframes auroraMove2 {
          0% { transform: translate(0px, 0px) scale(1); }
          50% { transform: translate(-30px, -50px) scale(0.85); }
          100% { transform: translate(25px, -15px) scale(1.1); }
        }
        @keyframes auroraMove3 {
          0% { transform: translate(0px, 0px) scale(1); }
          50% { transform: translate(50px, -30px) scale(1.1); }
          100% { transform: translate(-25px, -10px) scale(0.9); }
        }
        @keyframes auroraMove4 {
          0% { transform: translate(0px, 0px) scale(1); }
          50% { transform: translate(-20px, 30px) scale(0.9); }
          100% { transform: translate(30px, -15px) scale(1.2); }
        }
      `}</style>
    </div>
  );
}
