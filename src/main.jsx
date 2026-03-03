import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Lenis from "lenis";
import gsap from "gsap";

/* ─── Lenis Smooth Scroll  ──────────────────────────────────────────────────
   Lenis is the scroll library used by Vercel, Linear, and virtually every
   Awwwards-winning site. It intercepts native scroll and applies a beautiful
   lerp (linear interpolation) ease for that silky, momentum-feel scroll.
   GSAP's ticker drives it so it stays perfectly synced with all animations.
─────────────────────────────────────────────────────────────────────────────*/
const lenis = new Lenis({
  duration: 1.8,            // longer glide = more floaty, premium feel
  easing: (t) => 1 - Math.pow(1 - t, 4), // quartic ease-out — long satisfying tail
  orientation: "vertical",
  gestureOrientation: "vertical",
  smoothWheel: true,
  wheelMultiplier: 0.75,    // softer per-tick travel
  touchMultiplier: 2.0,     // responsive on touch/trackpad
  infinite: false,
});

// Sync Lenis with GSAP ticker for perfect 60fps
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0); // prevent GSAP from skipping frames

// Expose lenis globally so any component can call lenis.scrollTo(...)
window.__lenis = lenis;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

