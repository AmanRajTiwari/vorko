# RequestAnimationFrame Throttling Pattern Guide

## Understanding the Fix

### The Problem: Too Many Event Fires

```javascript
// ❌ BAD - Fires on every scroll pixel (60+ per second)
window.addEventListener("scroll", () => {
  setIsScrolled(window.scrollY > 50); // Re-renders on every pixel!
});
```

### The Solution: Batch Updates

```javascript
// ✅ GOOD - Batches to animation frames (~60 per second, but synced)
const ticking = useRef(false);

const handleScroll = () => {
  if (!ticking.current) {
    // Only schedule if not already scheduled
    window.requestAnimationFrame(() => {
      setIsScrolled(window.scrollY > 50); // Update once per frame
      ticking.current = false; // Allow next update to schedule
    });
    ticking.current = true; // Mark as scheduled
  }
};

window.addEventListener("scroll", handleScroll, { passive: true });
```

---

## Pattern Breakdown

### Step 1: Setup Ticking Flag

```javascript
const ticking = useRef(false);
```

- Tracks if an update is already scheduled
- Persists across renders (useRef, not useState)

### Step 2: Check If Scheduled

```javascript
if (!ticking.current) {
  // If not already scheduled
  // Schedule update...
}
```

### Step 3: Schedule With RequestAnimationFrame

```javascript
window.requestAnimationFrame(() => {
  // This runs on the next animation frame
  // Maximum 60 times per second (every 16.6ms)
  setIsScrolled(window.scrollY > 50);
  ticking.current = false; // Allow next update
});
```

### Step 4: Mark As Scheduled

```javascript
ticking.current = true; // Prevent multiple schedules
```

---

## Why This Works

### Timeline: Without Throttling

```
Scroll pixel 1 → Update state (render)
Scroll pixel 2 → Update state (render)
Scroll pixel 3 → Update state (render)
Scroll pixel 4 → Update state (render)
...
60+ Updates per second = Stuttering/Lag
```

### Timeline: With RequestAnimationFrame

```
Scroll pixel 1 → Check ticking (false) → Schedule update → Set ticking true
Scroll pixel 2 → Check ticking (true) → Skip (already scheduled)
Scroll pixel 3 → Check ticking (true) → Skip
...
Frame 1: Execute scheduled update (16.6ms) → Set ticking false
Scroll pixel 20 → Check ticking (false) → Schedule next update → Set ticking true
...
Maximum 1 update per 16.6ms = Smooth 60 FPS
```

---

## Applied Pattern: Navbar Scroll

### Before (Laggy)

```javascript
useEffect(() => {
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 50); // On every pixel!
  };
  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);
```

### After (Smooth) ✅

```javascript
const ticking = useRef(false);

useEffect(() => {
  const handleScroll = () => {
    if (!ticking.current) {
      window.requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 50);
        ticking.current = false;
      });
      ticking.current = true;
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  return () => window.removeEventListener("scroll", handleScroll);
}, []);
```

**Key Additions:**

1. `useRef(false)` - Ticking flag
2. `requestAnimationFrame()` - Batch updates
3. `{ passive: true }` - Allow browser optimization

---

## Applied Pattern: Hero Mouse Movement

### Before (Slow Calculations)

```javascript
const handleMouseMove = (e) => {
  // Heavy calculations on EVERY pixel movement
  const { clientX, clientY } = e;
  const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
  const x = (clientX - left - width / 2) / 30;
  const y = (clientY - top - height / 2) / 30;
  setMousePosition({ x, y }); // 100+ times per second!
};
```

### After (Throttled) ✅

```javascript
const ticking = useRef(false);

const handleMouseMove = (e) => {
  if (isMobile) return; // Skip on mobile

  if (!ticking.current) {
    window.requestAnimationFrame(() => {
      const { clientX, clientY } = e;
      const { left, top, width, height } =
        e.currentTarget.getBoundingClientRect();
      const x = (clientX - left - width / 2) / 30;
      const y = (clientY - top - height / 2) / 30;
      setMousePosition({ x, y });
      ticking.current = false;
    });
    ticking.current = true;
  }
};
```

**Benefits:**

1. Calculations only run once per frame
2. Mobile check skips unnecessary work
3. Heavy math doesn't block other events

---

## CSS GPU Acceleration

### Enable Hardware Rendering

```css
.animated-element {
  /* Force GPU acceleration */
  transform: translateZ(0);

  /* Tell browser this will change */
  will-change: transform;

  /* Prevent flickering */
  backface-visibility: hidden;
}
```

### Why It Matters

- GPU renders transforms much faster than CPU
- `will-change` hints browser to prepare GPU layer
- `backface-visibility` prevents flipping artifacts

### Applied In

- Animation containers
- Button elements
- Floating cards

---

## Passive Event Listeners

### What It Does

```javascript
window.addEventListener("scroll", handleScroll, { passive: true });
//                                               ^^^^^^^^^^^^^^^^
// Tells browser: "This handler won't call preventDefault()"
```

### Why It Matters

- Browser can optimize scroll without waiting for handler
- 10-20% faster scrolling performance
- No side effects if handler doesn't need preventDefault()

### When To Use

- Scroll events (almost never need preventDefault)
- Touch events (usually don't need preventDefault)
- Wheel events (unless you need to prevent scrolling)

### When NOT To Use

- Click handlers (might need preventDefault)
- Key handlers (might need preventDefault)
- Events where you cancel behavior

---

## Animation Duration Optimization

### Reduced Delays

```javascript
// Before
const headlineContainerVariants = {
  visible: {
    transition: {
      staggerChildren: 0.2, // 200ms stagger
      delayChildren: 0.4, // 400ms delay
    },
  },
};

// After
const headlineContainerVariants = {
  visible: {
    transition: {
      staggerChildren: 0.12, // 120ms stagger ✅
      delayChildren: 0.3, // 300ms delay ✅
    },
  },
};
```

### Benefits

- Faster initial paint
- Less time blocking render
- Animations feel snappier
- Mobile devices appreciate shorter durations

---

## Performance Comparison

### Metrics

| Aspect                  | Before      | After                | Improvement  |
| ----------------------- | ----------- | -------------------- | ------------ |
| Event Handler Frequency | 60+ per sec | 60 per sec (batched) | Consistent   |
| Time Between Updates    | <16.6ms     | ~16.6ms              | Synchronized |
| Render Blocking         | Yes         | No                   | ✅ Fixed     |
| Animation Delay         | 400-1200ms  | 300-900ms            | 25% faster   |
| GPU Acceleration        | No          | Yes                  | ✅ Enabled   |
| Mobile Performance      | Poor        | Good                 | Better       |

---

## Debugging Tips

### Check If Throttling Works

**Chrome DevTools:**

1. Open DevTools (F12)
2. Go to **Console**
3. Paste this to count events:

```javascript
let count = 0;
window.addEventListener("scroll", () => console.log(++count), {
  passive: true,
});
// Scroll and watch count increase - should be < 60 per second
```

**Without Throttling**: Counts 60+ rapidly  
**With Throttling**: Counts in sync with scroll (smooth increments)

### Performance Profiling

1. Open DevTools → **Performance** tab
2. Click **Record**
3. Scroll page for 3-5 seconds
4. Stop recording
5. Check **FPS graph** - should be solid green

---

## Common Issues

### Issue: Still Feeling Laggy

**Cause**: Other components might have similar issues  
**Solution**: Apply same pattern to other event handlers

### Issue: Animation Delays Too Short

**Cause**: 0.3s might feel abrupt  
**Solution**: Increase to 0.4-0.5s if preferred

### Issue: Mobile Still Slow

**Cause**: Mobile has slower CPU  
**Solution**: Add more aggressive throttling or disable animations on mobile

---

## Takeaways

✅ **RequestAnimationFrame** - Sync updates to browser refresh rate  
✅ **Ticking Flag** - Prevent scheduling multiple updates  
✅ **Passive Listeners** - Optimize event handling  
✅ **GPU Acceleration** - Use will-change and transform  
✅ **Shorter Animations** - Reduce blocking render time

---

## Further Reading

- [MDN: requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)
- [MDN: Passive Event Listeners](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
- [Web.dev: Performance](https://web.dev/performance/)
- [Framer Motion: Performance](https://www.framer.com/motion/)
