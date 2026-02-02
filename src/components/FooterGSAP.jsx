import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/*
  FooterGSAP.jsx
  - GSAP + ScrollTrigger implementation of the premium Vorko footer
  - Usage: import FooterGSAP and mount in place of the existing <Footer />

  Animation notes (brief):
  1. Reveal: when footer enters viewport, the content fades in and slides up.
  2. Brand parallax: the giant background "Vorko" moves horizontally while the user scrolls through the footer region (scrubbed, subtle).
  3. Social icons: small scale + rotation on hover (handled by GSAP hover handlers for buttery control).

  Accessibility / UX:
  - The brand is pointer-events: none and positioned behind content, so it never affects layout or interactions.
  - All animations are subtle and do not change layout or trigger reflow.
*/

gsap.registerPlugin(ScrollTrigger);

export default function FooterGSAP() {
  const footerRef = useRef(null);
  const brandRef = useRef(null);

  useEffect(() => {
    const footerEl = footerRef.current;
    const brandEl = brandRef.current;
    if (!footerEl || !brandEl) return;

    // Reveal animation when footer enters viewport
    const revealTl = gsap.timeline({
      scrollTrigger: {
        trigger: footerEl,
        start: "top bottom",
        end: "top center",
        toggleActions: "play none none none",
        // amount of the footer that must enter to trigger may be adjusted
      },
    });

    revealTl.from(footerEl.querySelector(".footer-content"), {
      autoAlpha: 0,
      y: 24,
      duration: 0.7,
      ease: "power3.out",
      stagger: 0.06,
    });

    // Parallax for brand background: subtle horizontal move as user scrolls through the footer
    const brandParallax = gsap.to(brandEl, {
      x: 30, // move right by 30px across scroll region
      ease: "none",
      scrollTrigger: {
        trigger: footerEl,
        start: "top bottom", // when top of footer hits bottom of viewport
        end: "bottom top", // when bottom of footer hits top of viewport
        scrub: 0.6, // smooth scrub for premium feel
      },
    });

    // Social icon hover interactions (GSAP-powered micro-interactions)
    const socialEls = footerEl.querySelectorAll(".social-icon");
    const hoverAnims = [];

    socialEls.forEach((el) => {
      const enter = () =>
        gsap.to(el, {
          scale: 1.08,
          rotation: 6,
          duration: 0.22,
          ease: "power3.out",
        });
      const leave = () =>
        gsap.to(el, {
          scale: 1,
          rotation: 0,
          duration: 0.28,
          ease: "power3.out",
        });
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
      hoverAnims.push({ el, enter, leave });
    });

    // Cleanup on unmount
    return () => {
      revealTl.kill();
      brandParallax.kill();
      hoverAnims.forEach(({ el, enter, leave }) => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      });
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <footer
      ref={footerRef}
      className="relative z-20 w-full bg-gradient-to-b from-[#050814] to-[#0b1220] text-white overflow-hidden"
      aria-labelledby="vorko-footer"
    >
      {/* Background brand (absolutely positioned, behind content) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
        <div className="absolute inset-0 flex items-end justify-center">
          <h1
            ref={brandRef}
            className="footer-brand text-[12rem] md:text-[18rem] lg:text-[22rem] leading-none font-extrabold select-none"
            aria-hidden="true"
            style={{ color: "rgba(255,255,255,0.04)" }}
          >
            Vorko
          </h1>
        </div>
      </div>

      {/* Content (the element animated on reveal) */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 py-20 footer-content">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left: Logo + tagline */}
          <div className="md:col-span-3 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00d9ff] to-[#7c3aed] flex items-center justify-center text-black font-bold shadow-sm">
                V
              </div>
              <div>
                <div className="text-lg font-semibold">Vorko</div>
                <div className="text-sm text-slate-300">
                  Focus. Collaborate. Deliver.
                </div>
              </div>
            </div>
            <p className="text-sm text-slate-300 max-w-xs">
              Vorko helps student teams manage projects, tasks and deadlines
              with clarity and calm.
            </p>
          </div>

          {/* Center: three columns */}
          <div className="md:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <h4 className="text-white font-medium mb-3">About</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    className="footer-link text-slate-300 text-sm"
                    href="/about"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    className="footer-link text-slate-300 text-sm"
                    href="/support"
                  >
                    Support
                  </a>
                </li>
                <li>
                  <a
                    className="footer-link text-slate-300 text-sm"
                    href="/privacy"
                  >
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-3">Company</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    className="footer-link text-slate-300 text-sm"
                    href="/careers"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    className="footer-link text-slate-300 text-sm"
                    href="/pricing"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    className="footer-link text-slate-300 text-sm"
                    href="/feedback"
                  >
                    Feedback
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-3">Product</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    className="footer-link text-slate-300 text-sm"
                    href="/dashboard"
                  >
                    Dashboard
                  </a>
                </li>
                <li>
                  <a
                    className="footer-link text-slate-300 text-sm"
                    href="/projects"
                  >
                    Projects
                  </a>
                </li>
                <li>
                  <a
                    className="footer-link text-slate-300 text-sm"
                    href="/tasks"
                  >
                    Tasks
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Right: Contact info + social icons */}
          <div className="md:col-span-3">
            <h4 className="text-white font-medium mb-3">Contact</h4>
            <ul className="text-sm text-slate-300 space-y-3">
              <li>
                <a
                  className="footer-link text-slate-300"
                  href="mailto:hello@vorko.com"
                >
                  hello@vorko.com
                </a>
              </li>
              <li>
                <a
                  className="footer-link text-slate-300"
                  href="tel:+15555550123"
                >
                  +1 (555) 555-0123
                </a>
              </li>
              <li>
                <span className="text-slate-400">
                  Remote · Based in San Francisco, CA
                </span>
              </li>
            </ul>

            <div className="mt-6 flex gap-3">
              {[
                {
                  name: "Twitter",
                  svg: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7z",
                },
                {
                  name: "LinkedIn",
                  svg: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z",
                },
                {
                  name: "GitHub",
                  svg: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z",
                },
              ].map((s) => (
                <a
                  key={s.name}
                  href="#"
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-white/3 text-white shadow-sm social-icon"
                  aria-label={s.name}
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d={s.svg} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/6 text-center text-sm text-slate-400">
          © {currentYear} Vorko. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
