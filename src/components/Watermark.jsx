import React, { useState, useRef, useEffect, useCallback } from "react";

export default function Watermark({ text = "VORKO" }) {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
      // Cleanup animation frame on unmount
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const updateMousePosition = useCallback(
    (e) => {
      if (!containerRef.current || prefersReducedMotion) return;

      const containerRect = containerRef.current.getBoundingClientRect();

      // Calculate mouse position relative to the container for accurate overlay positioning
      const relativeX = e.clientX - containerRect.left;
      const relativeY = e.clientY - containerRect.top;

      // Update ref directly to avoid React state updates during animation
      mousePosRef.current = { x: relativeX, y: relativeY };

      // Update CSS custom properties for direct DOM manipulation
      if (containerRef.current) {
        containerRef.current.style.setProperty("--mouse-x", `${relativeX}px`);
        containerRef.current.style.setProperty("--mouse-y", `${relativeY}px`);
      }
    },
    [prefersReducedMotion],
  );

  const handleMouseMove = useCallback(
    (e) => {
      // Cancel previous animation frame
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      // Schedule update for next frame
      animationFrameRef.current = requestAnimationFrame(() => {
        updateMousePosition(e);
      });
    },
    [updateMousePosition],
  );

  const handleMouseEnter = () => {
    if (prefersReducedMotion) return;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (prefersReducedMotion) return;
    setIsHovered(false);
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Watermark container - positioned above background gradient but below card */}
      <div
        ref={containerRef}
        className="absolute inset-0 flex items-center justify-center"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ pointerEvents: "auto" }} // Allow hover detection
      >
        {/* Base stroke text */}
        <h1
          ref={textRef}
          aria-hidden="true"
          className="leading-none font-black select-none relative flex"
          style={{
            // Initial state: stroke-only text
            WebkitTextStroke: "1px rgba(156, 163, 175, 0.25)",
            WebkitTextFillColor: "transparent",
            color: "transparent",
            // Ensure text doesn't interfere with form
            userSelect: "none",
            // Slight blur for premium look
            filter: "blur(0.1px)",
          }}
        >
          {text.split("").map((letter, index) => (
            <span
              key={index}
              className="text-[clamp(6rem,20vw,25rem)] relative"
            >
              {letter}
            </span>
          ))}
        </h1>

        {/* Soft letter colors overlay - only visible on hover */}
        {isHovered && !prefersReducedMotion && (
          <h1
            aria-hidden="true"
            className="leading-none font-black select-none absolute inset-0 flex items-center justify-center"
            style={{
              // Ensure text doesn't interfere with form
              userSelect: "none",
              // Slight blur for premium look
              filter: "blur(0.1px)",
              // Clip path using CSS custom properties for smoother animation
              clipPath: `circle(100px at var(--mouse-x, 0px) var(--mouse-y, 0px))`,
              WebkitClipPath: `circle(100px at var(--mouse-x, 0px) var(--mouse-y, 0px))`,
              // Smooth transition - faster for less lag
              transition:
                "clip-path 0.05s ease-out, -webkit-clip-path 0.05s ease-out",
            }}
          >
            {text.split("").map((letter, index) => {
              // Soft colors for each letter
              const letterColors = [
                "rgba(255, 107, 53, 0.15)", // Soft orange
                "rgba(247, 147, 30, 0.12)", // Soft golden
                "rgba(255, 64, 129, 0.18)", // Soft pink
                "rgba(156, 39, 176, 0.14)", // Soft purple
                "rgba(103, 58, 183, 0.16)", // Soft deep purple
              ];
              const strokeColors = [
                "rgba(255, 107, 53, 0.3)", // Orange stroke
                "rgba(247, 147, 30, 0.25)", // Golden stroke
                "rgba(255, 64, 129, 0.35)", // Pink stroke
                "rgba(156, 39, 176, 0.28)", // Purple stroke
                "rgba(103, 58, 183, 0.32)", // Deep purple stroke
              ];

              return (
                <span
                  key={index}
                  className="text-[clamp(6rem,20vw,25rem)] relative"
                  style={{
                    WebkitTextStroke: `1px ${strokeColors[index % strokeColors.length]}`,
                    WebkitTextFillColor:
                      letterColors[index % letterColors.length],
                    color: letterColors[index % letterColors.length],
                  }}
                >
                  {letter}
                </span>
              );
            })}
          </h1>
        )}

        {/* Gradient reveal overlay */}
        {isHovered && !prefersReducedMotion && (
          <h1
            aria-hidden="true"
            className="leading-none font-black select-none absolute inset-0 flex items-center justify-center"
            style={{
              // Gradient fill
              background:
                "linear-gradient(90deg, #ff6b35 0%, #f7931e 25%, #ff4081 50%, #9c27b0 75%, #673ab7 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              // Clip path using CSS custom properties for smoother animation
              clipPath: `circle(150px at var(--mouse-x, 0px) var(--mouse-y, 0px))`,
              WebkitClipPath: `circle(150px at var(--mouse-x, 0px) var(--mouse-y, 0px))`,
              // Smooth transition
              transition:
                "clip-path 0.1s ease-out, -webkit-clip-path 0.1s ease-out",
              // Subtle noise overlay
              backgroundImage:
                "linear-gradient(90deg, #ff6b35 0%, #f7931e 25%, #ff4081 50%, #9c27b0 75%, #673ab7 100%), url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E\")",
              backgroundBlendMode: "overlay",
            }}
          >
            {text.split("").map((letter, index) => (
              <span
                key={index}
                className="text-[clamp(6rem,20vw,25rem)] relative"
              >
                {letter}
              </span>
            ))}
          </h1>
        )}
      </div>
    </div>
  );
}
