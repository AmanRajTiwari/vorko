import React from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function Footer() {
  // Parallax: map page scroll progress to a small horizontal offset for brand text
  const { scrollYProgress } = useScroll();
  const rawX = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  // Smooth the motion for premium, subtle feel
  const brandX = useSpring(rawX, { stiffness: 80, damping: 18 });

  const currentYear = new Date().getFullYear();

  // Static link lists per requirements
  const columns = [
    {
      title: "About",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Support", href: "/support" },
        { label: "Privacy Policy", href: "/privacy" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "Careers", href: "/careers" },
        { label: "Pricing", href: "/pricing" },
        { label: "Feedback", href: "/feedback" },
      ],
    },
    {
      title: "Product",
      links: [
        { label: "Dashboard", href: "/dashboard" },
        { label: "Projects", href: "/projects" },
        { label: "Tasks", href: "/tasks" },
      ],
    },
  ];

  return (
    <footer
      className="relative w-full bg-gradient-to-b from-[#050814] to-[#0b1220] text-white overflow-hidden"
      aria-labelledby="vorko-footer"
    >
      {/* Background watermark - fixed height to prevent overflow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
        <div className="absolute inset-0 flex items-end justify-center">
          <motion.h1
            aria-hidden="true"
            // scroll-driven horizontal motion + slow pulsing scale
            style={{ x: brandX, color: "rgba(255,255,255,0.04)" }}
            animate={{ scale: [1, 1.008, 1] }}
            transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
            className="footer-brand text-[clamp(6rem,18vw,22rem)] leading-none font-extrabold select-none pointer-events-none"
          >
            Vorko
          </motion.h1>
        </div>
      </div>

      {/* Foreground content - relative z-10 so background never covers it */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 py-20"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 items-start">
          {/* Left */}
          <div className="md:col-span-1 lg:col-span-1 flex flex-col gap-4">
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

            {/* Social icons with hover glow */}
            <div className="mt-4 flex gap-3">
              {[
                {
                  name: "Instagram",
                  svg: "M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zM12 7.75A4.25 4.25 0 1012 16.25 4.25 4.25 0 0012 7.75zM17.5 6.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0z",
                },
                {
                  name: "LinkedIn",
                  svg: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z",
                },
                {
                  name: "GitHub",
                  svg: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z",
                },
                {
                  name: "Twitter",
                  svg: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7z",
                },
              ].map((s) => (
                <motion.a
                  key={s.name}
                  href="#"
                  aria-label={s.name}
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-white/3 text-white shadow-sm social-icon"
                  whileHover={{
                    scale: 1.08,
                    rotate: 6,
                    boxShadow: "0 12px 30px rgba(7,89,133,0.18)",
                  }}
                  transition={{ type: "spring", stiffness: 320, damping: 20 }}
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d={s.svg} />
                  </svg>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Center columns */}
          <div className="md:col-span-1 lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {columns.map((col) => (
              <div key={col.title}>
                <h4 className="text-white tracking-wide font-semibold mb-3">
                  {col.title}
                </h4>
                <ul className="space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="footer-link text-slate-300 text-sm inline-block transform transition duration-200 ease-out hover:translate-x-1 hover:text-white"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Right contact */}
          <div className="md:col-span-1 lg:col-span-1">
            <h4 className="text-white tracking-wide font-semibold mb-3">
              Contact
            </h4>
            <ul className="text-sm text-slate-300 space-y-3">
              <li>
                <a
                  href="mailto:hello@vorko.com"
                  className="footer-link text-slate-300 inline-block transform transition duration-200 ease-out hover:translate-x-1 hover:text-white"
                >
                  hello@vorko.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+15555550123"
                  className="footer-link text-slate-300 inline-block transform transition duration-200 ease-out hover:translate-x-1 hover:text-white"
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
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/6 text-center text-sm text-slate-400">
          © {currentYear} Vorko. All rights reserved.
        </div>
      </motion.div>
    </footer>
  );
}
