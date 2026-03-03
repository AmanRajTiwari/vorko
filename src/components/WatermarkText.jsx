import React, { useEffect, useRef } from "react";
import styles from "./WatermarkText.module.css";

export default function WatermarkText({ text = "VORKO", className = "" }) {
  const containerRef = useRef(null);
  const lettersRef = useRef([]);
  const requestRef = useRef(null);

  // Targets and smoothed current positions for interpolating mouse movements
  const mouse = useRef({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    isHovering: false,
    hoverOpacity: 0
  });

  // Cached positions to prevent layout thrashing
  const letterRects = useRef([]);

  useEffect(() => {
    // Disable complex animation calculation on mobile or matching reduced motion.
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches || window.innerWidth <= 768) return;

    const updateRects = () => {
      // Recompute the geometric center of each letter relative to the container
      if (!containerRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      
      letterRects.current = lettersRef.current.map((el) => {
        if (!el) return null;
        const rect = el.getBoundingClientRect();
        return {
          x: rect.left - containerRect.left + rect.width / 2,
          y: rect.top - containerRect.top + rect.height / 2
        };
      });
    };

    updateRects();
    window.addEventListener("resize", updateRects);
    window.addEventListener("scroll", updateRects);

    const animate = () => {
      const m = mouse.current;

      // Smooth interpolation for mouse position
      // Increased from 0.15 to 0.35 to make it track faster but still retain a subtle smooth tail
      m.x += (m.targetX - m.x) * 0.35;
      m.y += (m.targetY - m.y) * 0.35;

      // Smooth interpolation for overall hover container opacity
      const targetOpacity = m.isHovering ? 1 : 0;
      m.hoverOpacity += (targetOpacity - m.hoverOpacity) * 0.15;

      // Only calculate if hover effect is somewhat visible
      if (m.hoverOpacity > 0.001 || m.isHovering) {
        lettersRef.current.forEach((el, index) => {
          if (!el || !letterRects.current[index]) return;

          const rect = letterRects.current[index];
          
          // Distance from the smooth mouse position to letter center
          const dx = m.x - rect.x;
          const dy = m.y - rect.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Calculate raw intensity based on distance 
          // (Max radius: increased to 500px for a much wider, softer glowing reveal)
          const maxDist = 500;
          let intensity = Math.max(0, 1 - dist / maxDist);
          
          // Apply a softer quadratic easing instead of cubic to make the gradient 
          // spread more generously across the letters
          intensity = Math.pow(intensity, 2);

          // Multiply by the global hover fade-in/fade-out
          const finalIntensity = intensity * m.hoverOpacity;

          // Apply directly via CSS custom property to avoid React renders
          el.style.setProperty("--intensity", finalIntensity.toFixed(3));
        });
      } else if (m.hoverOpacity <= 0.001 && !m.isHovering) {
        // Guarantee reset when mouse leaves and animation finishes fading out
        lettersRef.current.forEach((el) => {
          if (el) el.style.setProperty("--intensity", "0");
        });
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", updateRects);
      window.removeEventListener("scroll", updateRects);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouse.current.targetX = e.clientX - rect.left;
    mouse.current.targetY = e.clientY - rect.top;
  };

  const handleMouseEnter = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouse.current.isHovering = true;
    mouse.current.targetX = e.clientX - rect.left;
    mouse.current.targetY = e.clientY - rect.top;
    
    // Jump the coordinates immediately to the mouse entry point 
    // to prevent the gradient flying from 0,0 (top left)
    if (mouse.current.hoverOpacity < 0.1) {
      mouse.current.x = e.clientX - rect.left;
      mouse.current.y = e.clientY - rect.top;
    }
  };

  const handleMouseLeave = () => {
    mouse.current.isHovering = false;
  };

  return (
    <div className={`${styles.container} ${className}`}>
      {/* 
        This wrapper captures the mouse movement for the whole underlying area 
        and computes it independently of individual elements scaling
      */}
      <div
        ref={containerRef}
        className={styles.interactiveArea}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className={styles.textWrapper} aria-hidden="true">
          {text.split("").map((char, i) => (
            <span
              key={i}
              ref={(el) => (lettersRef.current[i] = el)}
              className={styles.letterWrapper}
            >
              {/* Stroke-only outline base layer */}
              <span className={styles.outline}>{char}</span>
              
              {/* Gradient filled text driven by CSS variable intensity */}
              <span className={styles.filled}>{char}</span>
              
              {/* Deep blur glow effect slightly beneath the text */}
              <span className={styles.glow}>{char}</span>
            </span>
          ))}
        </div>
      </div>
      
      {/* Hidden text for screen readers */}
      <span className="sr-only">{text}</span>
    </div>
  );
}
