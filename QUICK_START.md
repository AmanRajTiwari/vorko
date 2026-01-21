# 🚀 Quick Start Guide - Vorko Landing Page

## Getting Started in 2 Minutes

### Step 1: Install Dependencies

```bash
npm install
```

This installs:

- React & React DOM
- Framer Motion (animations)
- Tailwind CSS (styling)
- Vite (dev server)

### Step 2: Start Dev Server

```bash
npm run dev
```

Your browser will automatically open the landing page at `http://localhost:5173`

### Step 3: Start Editing

The page will auto-refresh as you edit files in `src/`

## 📁 File Navigation

**Want to modify something?**

| Section         | File                                        |
| --------------- | ------------------------------------------- |
| Navigation      | `src/components/Navbar.jsx`                 |
| Hero Section    | `src/components/sections/Hero.jsx`          |
| Problem Section | `src/components/sections/Problem.jsx`       |
| Timeline        | `src/components/sections/HowItWorks.jsx`    |
| Team Features   | `src/components/sections/Collaboration.jsx` |
| Mentor Mode     | `src/components/sections/MentorViva.jsx`    |
| Testimonials    | `src/components/sections/Testimonials.jsx`  |
| Final CTA       | `src/components/sections/FinalCTA.jsx`      |
| Footer          | `src/components/Footer.jsx`                 |
| Global Styles   | `src/index.css`                             |
| Colors/Theme    | `tailwind.config.js`                        |

## 🎨 Customization Examples

### Change Primary Color

Edit `tailwind.config.js`:

```javascript
accent: '#YOUR_COLOR_HERE', // Cyan default: #00d9ff
```

### Modify Headline Text

Edit `src/components/sections/Hero.jsx`:

```jsx
<h1>Your New Headline Here</h1>
```

### Adjust Animation Speed

In any component, modify Framer Motion transition:

```jsx
transition={{ duration: 1.5 }} // Change duration
```

### Change Button Text/Action

Edit `src/components/Navbar.jsx` or specific section files

## 🔧 Useful Commands

```bash
# Development
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

## 💻 Structure Overview

```
vorko1.0/
├── package.json           # Dependencies
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # Theme & colors
├── index.html             # HTML entry
├── src/
│   ├── main.jsx           # React app start
│   ├── App.jsx            # Main layout
│   ├── index.css          # Global styles
│   └── components/        # React components
```

## ⚡ Key Features to Explore

1. **Hero Section** - Parallax mouse tracking on floating cards
2. **Animations** - Scroll-triggered reveals throughout the page
3. **Testimonials** - Auto-sliding carousel
4. **Responsive** - Resize browser to see mobile layout
5. **Glass Effects** - Glassmorphic cards with blur

## 🎯 What's Included

✅ 9 major sections
✅ 30+ animated components
✅ Fully responsive design
✅ Dark theme with gradients
✅ Parallax effects
✅ Scroll animations
✅ Mobile-optimized
✅ Performance tuned

## 🚢 Ready to Deploy?

### Build for Production

```bash
npm run build
```

Output goes to `/dist` folder

### Deploy to Netlify / Vercel

1. Push to GitHub
2. Connect to Netlify/Vercel
3. Auto-deploys on push!

Or manually upload `/dist` folder to any static hosting.

## 🤔 Troubleshooting

**Port already in use?**

```bash
npm run dev -- --port 3000
```

**Animations not smooth?**

- Check browser DevTools (Chrome DevTools > Performance tab)
- Ensure GPU acceleration is enabled
- Reduce particle counts if needed

**Build errors?**

```bash
rm -rf node_modules
npm install
npm run build
```

## 📞 Next Steps

1. Customize colors in `tailwind.config.js`
2. Update product info in each section
3. Add your actual CTA links
4. Replace placeholder text with real content
5. Deploy to production!

---

**Happy coding! 🎉 Let's make Vorko amazing!**
