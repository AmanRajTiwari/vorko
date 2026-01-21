# 🎨 Customization Guide - Vorko Landing Page

Complete guide to customize every aspect of the landing page!

## 🎨 Colors & Theme

### Change Primary Gradient Colors

Edit `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      // Change these main colors
      accent: '#00d9ff',           // Cyan
      'accent-purple': '#a78bfa',  // Purple
      'accent-blue': '#3b82f6',    // Blue
    },
  },
}
```

### Dark Theme Background

```javascript
dark: '#0a0e27',        // Main bg
'dark-light': '#1a1f3a', // Lighter bg
```

### Glow Effects

The glow shadows can be customized:

```javascript
boxShadow: {
  glow: '0 0 20px rgba(0, 217, 255, 0.3)',
  'glow-purple': '0 0 30px rgba(167, 139, 250, 0.2)',
}
```

## 📝 Text & Content

### Navbar Links

Edit `src/components/Navbar.jsx`:

```javascript
const navItems = ["Features", "How it Works", "Mentors", "Reports", "Pricing"];
// Change to your sections
```

### Hero Headline

Edit `src/components/sections/Hero.jsx`:

```jsx
<h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-4">
  <span className="block glow-text mb-2">Your First Line</span>
  <span className="block gradient-text">Your Second Line</span>
</h1>
```

### Hero Subheading

```jsx
<motion.p className="text-center text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
  Your custom subheading text here
</motion.p>
```

### Button Texts

Change CTA buttons throughout:

```jsx
<motion.button className="...">Your Button Text</motion.button>
```

## 🖼️ Images & Icons

### Add Hero Image/Video

In `Hero.jsx`, add before the floating cards:

```jsx
<motion.img
  src="your-image.png"
  alt="Hero"
  className="w-full max-w-4xl mx-auto"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.5 }}
/>
```

### Change Icons (Using Lucide React)

Install: `npm install lucide-react`

Use in components:

```jsx
import { Users, Code, Zap } from "lucide-react";

<Users className="w-6 h-6" />;
```

Or use emoji (current approach):

```jsx
<span className="text-3xl">🚀</span> // Change emoji
```

## 🎬 Animations & Transitions

### Change Animation Duration

Find `transition` in any component:

```javascript
transition={{ duration: 1.5 }} // Increase = slower
```

### Adjust Stagger Timing

In `containerVariants`:

```javascript
transition: {
  staggerChildren: 0.2,  // Gap between animations
  delayChildren: 0.1,    // Start delay
}
```

### Modify Spring Physics

```javascript
transition={{
  type: 'spring',
  stiffness: 100,  // Lower = bouncier
  damping: 15,     // Higher = less bouncy
}}
```

### Change Parallax Sensitivity

In `Hero.jsx` mouse move handler:

```javascript
const x = (clientX - left - width / 2) / 30; // Higher = less sensitive
```

## 📱 Responsive Breakpoints

Tailwind breakpoints are built-in:

```jsx
<div className="text-base sm:text-lg md:text-xl lg:text-2xl">
  Responsive text
</div>
```

Breakpoints:

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

## 📊 Section Content

### Problem Section

Edit `src/components/sections/Problem.jsx`:

```javascript
const problems = [
  {
    title: "Your Problem Title",
    description: "Your problem description here",
  },
  // Add more...
];

const solutions = [
  "Your solution here",
  // Add more...
];
```

### How It Works Steps

Edit `src/components/sections/HowItWorks.jsx`:

```javascript
const steps = [
  {
    number: "1",
    title: "Step Title",
    description: "Step description",
    icon: "🎯", // Change emoji
  },
  // Add more steps...
];
```

### Team Roles

Edit `src/components/sections/Collaboration.jsx`:

```javascript
const roles = [
  {
    role: "Team Lead",
    responsibilities: ["Task 1", "Task 2", "Task 3"],
    color: "from-accent to-cyan-400",
  },
  // Modify roles...
];
```

### Testimonials

Edit `src/components/sections/Testimonials.jsx`:

```javascript
const testimonials = [
  {
    name: "Person Name",
    role: "Role - University",
    text: "Their testimonial text here",
    avatar: "👩‍💼", // Change emoji
  },
  // Add more testimonials...
];
```

## 🔗 Links & CTA Actions

### Update Button Links

In any component:

```jsx
<motion.a href="https://your-url.com" className="...">
  Button Text
</motion.a>
```

### Email Links

```jsx
<motion.a href="mailto:contact@example.com">Contact Us</motion.a>
```

### Scroll Anchor Links

Update navbar:

```jsx
<a href="#features">Features</a>
```

Add ID to section:

```jsx
<section id="features">{/* Section content */}</section>
```

## 🎓 Advanced Customization

### Add New Section

1. Create new file: `src/components/sections/NewSection.jsx`

```jsx
import React from "react";
import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";

export default function NewSection() {
  const { ref, isInView } = useInView();

  return (
    <section ref={ref} className="relative w-full py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          className="text-4xl font-bold"
        >
          Your Section Title
        </motion.h2>
        {/* Your content */}
      </div>
    </section>
  );
}
```

2. Import in `src/App.jsx`:

```jsx
import NewSection from "./components/sections/NewSection";

function App() {
  return (
    <div>
      <Navbar />
      <Hero />
      <NewSection /> {/* Add here */}
      <Footer />
    </div>
  );
}
```

### Add Background Elements

In `App.jsx`, modify the background gradient blobs:

```jsx
<div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-accent/10 to-accent-purple/10 rounded-full blur-3xl opacity-30"></div>
```

Change:

- Position: `-top-40`, `-right-40`
- Size: `w-80`, `h-80`
- Colors: `from-accent/10 to-accent-purple/10`
- Blur: `blur-3xl`
- Opacity: `opacity-30`

### Add Custom Fonts

In `index.html` head:

```html
<link
  href="https://fonts.googleapis.com/css2?family=Your+Font&display=swap"
  rel="stylesheet"
/>
```

In `tailwind.config.js`:

```javascript
theme: {
  fontFamily: {
    sans: ['Your Font', 'sans-serif'],
  },
}
```

### Add Analytics

In `src/App.jsx`:

```jsx
useEffect(() => {
  // Google Analytics
  window.gtag?.("config", "GA_ID");
}, []);
```

## 🎯 Performance Optimizations

### Lazy Load Images

```jsx
<img src="image.png" loading="lazy" alt="Description" />
```

### Code Splitting

Import sections conditionally:

```jsx
const HowItWorks = lazy(() => import('./sections/HowItWorks'))

<Suspense fallback={<div>Loading...</div>}>
  <HowItWorks />
</Suspense>
```

### Reduce Motion

For accessibility, add in component:

```jsx
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

const duration = prefersReducedMotion ? 0 : 0.6;
```

## 🧪 Testing Changes

After any customization:

```bash
npm run dev
```

Then:

1. Check all pages in browser
2. Test mobile responsiveness (DevTools)
3. Check animations are smooth
4. Verify all links work
5. Test forms (if any)

## 📦 Exporting to Different Formats

### Export as Figma Design

1. Use [Figma Handoff](https://figma.com) to create design files
2. Export components for design team

### Create Storybook Components

```bash
npm install --save-dev storybook
npx storybook init
```

## 🚀 Next Steps

1. **Customize colors** - Update Tailwind theme
2. **Edit text** - Personalize all content
3. **Add images** - Replace emojis with real images
4. **Update links** - Set up actual CTA actions
5. **Deploy** - See DEPLOYMENT.md
6. **Monitor** - Set up analytics
7. **Iterate** - Gather feedback and improve

---

**Happy customizing! Make Vorko uniquely yours! 🎨**
