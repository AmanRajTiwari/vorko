# 🚀 Deployment Guide - Vorko Landing Page

Deploy your Vorko landing page to production in minutes!

## Option 1: Netlify (Recommended - Easiest)

### Via GitHub (Recommended)

1. **Push to GitHub**

   ```bash
   git init
   git add .
   git commit -m "Initial commit - Vorko landing page"
   git push origin main
   ```

2. **Connect to Netlify**

   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub repo
   - Netlify auto-detects Vite settings
   - Click Deploy

3. **Auto-deploy on changes**
   - Every GitHub push automatically redeploys your site!
   - Your site gets a free `.netlify.app` domain

### Manual Upload

1. Build locally:

   ```bash
   npm run build
   ```

2. Go to [netlify.com/drop](https://netlify.com/drop)

3. Drag & drop the `dist` folder

4. Your site is live! 🎉

## Option 2: Vercel (Fast & Easy)

1. **Install Vercel CLI**

   ```bash
   npm i -g vercel
   ```

2. **Deploy**

   ```bash
   vercel
   ```

3. **Follow prompts** - Link GitHub account and repo

4. **Auto-deploys** on every commit

## Option 3: GitHub Pages (Free)

1. **Update `vite.config.js`**

   ```javascript
   export default {
     base: "/vorko-landing/", // Your repo name
     // ... rest of config
   };
   ```

2. **Build & Deploy**

   ```bash
   npm run build
   npm run deploy
   ```

3. **Enable in GitHub**

   - Go to repo Settings
   - Pages → Deploy from `main` branch
   - Select `/docs` folder (or `dist`)

4. **Your site is at**
   - `https://yourusername.github.io/vorko-landing/`

## Option 4: Traditional Hosting (cPanel, etc.)

1. **Build the project**

   ```bash
   npm run build
   ```

2. **Upload `/dist` folder**

   - Use FTP/SFTP to upload to public_html
   - Or use cPanel File Manager

3. **No server config needed** - it's static HTML/CSS/JS!

## Option 5: Docker (Advanced)

### Dockerfile

```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Build & Run

```bash
docker build -t vorko-landing .
docker run -p 80:80 vorko-landing
```

## Performance Tips for Production

### 1. Enable Compression

Most hosts do this automatically, but verify:

- Gzip enabled for `.js`, `.css`, `.html`

### 2. Enable Caching

Set cache headers in your hosting:

```
Cache-Control: max-age=31536000
```

### 3. Use CDN

- Netlify & Vercel include CDN
- Cloudflare also works great

### 4. Monitor Performance

- Use Google PageSpeed Insights
- Check Lighthouse scores
- Monitor with GTmetrix

### 5. Enable HTTPS

- All modern hosts include free SSL/TLS
- Redirect HTTP → HTTPS

## Environment Variables (if needed later)

Create `.env.local`:

```
VITE_API_URL=https://api.example.com
VITE_APP_NAME=Vorko
```

Access in code:

```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

## Domain Setup

1. **Buy a domain**

   - Namecheap, GoDaddy, Google Domains, etc.

2. **Point domain to hosting**

   - Update DNS records to your host
   - Usually takes 24-48 hours to propagate

3. **Netlify/Vercel custom domain**
   - Go to Site Settings
   - Add custom domain
   - Auto-generates SSL certificate

## Production Checklist

- ✅ Build works: `npm run build`
- ✅ No console errors
- ✅ All links work
- ✅ Mobile responsive tested
- ✅ Images optimized
- ✅ Meta tags updated (SEO)
- ✅ Analytics added (if needed)
- ✅ Forms validated (if any)
- ✅ 404 page configured
- ✅ SSL/HTTPS enabled
- ✅ Caching configured
- ✅ Performance tested

## SEO Optimization

Update `index.html`:

```html
<meta
  name="description"
  content="Vorko - Collaboration platform for college projects"
/>
<meta name="keywords" content="collaboration, projects, students, mentors" />
<meta name="og:title" content="Vorko - From Idea to Viva" />
<meta
  name="og:description"
  content="Collaborate, track, and succeed with Vorko"
/>
```

## Analytics Setup (Google Analytics)

Add to `src/App.jsx`:

```javascript
import { useEffect } from "react";

useEffect(() => {
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", "GA_MEASUREMENT_ID");
}, []);
```

## Rollback / Revert

**Netlify:**

- Go to Deploys
- Click on previous deploy
- Click "Restore this deploy"

**Vercel:**

- Go to Deployments
- Click on previous deployment
- Click "Rollback to this Deployment"

## Monitoring & Maintenance

- Check uptime regularly
- Monitor error logs
- Keep dependencies updated: `npm update`
- Regular backups (usually automatic with modern hosts)

## Common Issues & Fixes

| Issue              | Solution                            |
| ------------------ | ----------------------------------- |
| 404 Not Found      | Ensure `/dist` folder is deployed   |
| Styles not loading | Check base path in `vite.config.js` |
| Animations lag     | Check browser console for errors    |
| Too slow           | Optimize images, enable compression |
| SSL errors         | Update DNS records or wait 24h      |

## Support

- **Netlify**: [docs.netlify.com](https://docs.netlify.com)
- **Vercel**: [vercel.com/docs](https://vercel.com/docs)
- **Vite**: [vitejs.dev](https://vitejs.dev)

---

**You're ready to launch Vorko to the world! 🚀**
