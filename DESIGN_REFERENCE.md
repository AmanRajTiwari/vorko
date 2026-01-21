# 🎨 Visual Design Reference - Vorko Landing Page

## Color Palette

### Primary Colors

```
Accent Cyan:     #00d9ff (Bright, energetic)
Accent Purple:   #a78bfa (Premium, elegant)
Accent Blue:     #3b82f6 (Trust, stability)
```

### Background Colors

```
Dark Primary:    #0a0e27 (Main background)
Dark Light:      #1a1f3a (Cards, sections)
Dark Lighter:    #252d47 (Hover states)
```

### Text Colors

```
White/Light:     #ffffff (Primary text)
Gray Light:      #d1d5db (Secondary text)
Gray Medium:     #9ca3af (Tertiary text)
Gray Dark:       #6b7280 (Disabled text)
```

## Typography System

### Headings

- **H1** (Hero): 48px-112px, Bold, Gradient text
- **H2** (Section): 36px-56px, Bold, Gradient accent
- **H3** (Subsection): 20px-24px, Semibold, White
- **H4** (Cards): 16px-18px, Semibold, White

### Body Text

- **Large**: 18px-20px, Regular, Gray-300
- **Normal**: 14px-16px, Regular, Gray-400
- **Small**: 12px-14px, Regular, Gray-500

### Font Family

- System fonts (default): Fast, clean, professional
- Can be changed to: Inter, Poppins, or Playfair Display

## Component Sizes

### Buttons

```
Large (CTA):     px-10 py-4, 18px font
Medium (Navbar): px-6 py-2, 14px font
Small (Tags):    px-3 py-1, 12px font
```

### Cards

```
Hero Cards:      w-40-44, rounded-xl, glass-effect
Section Cards:   w-full/2/3, rounded-lg, glass-effect-sm
Small Cards:     max-w-sm, rounded-lg, glass-effect-sm
```

### Icons

```
Large:           w-10 h-10, text-3xl-5xl (emoji)
Medium:          w-6 h-6, text-2xl (emoji)
Small:           w-4 h-4, text-lg (emoji)
```

## Shadow & Glow System

### Glow Effects

```css
box-shadow: 0 0 20px rgba(0, 217, 255, 0.3); /* accent glow */
box-shadow: 0 0 30px rgba(167, 139, 250, 0.2); /* purple glow */
box-shadow: 0 0 20px rgba(59, 130, 246, 0.2); /* blue glow */
```

### Hover Shadows

```css
box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1); /* card lift */
```

### Glass Effect

```css
backdrop-filter: blur(12px);
background: rgba(255, 255, 255, 0.05);
border: 1px solid rgba(255, 255, 255, 0.1);
```

## Spacing Scale

```
xs: 4px   (0.25rem)
sm: 8px   (0.5rem)
md: 12px  (0.75rem)
lg: 16px  (1rem)
xl: 24px  (1.5rem)
2xl: 32px (2rem)
3xl: 48px (3rem)
4xl: 64px (4rem)
```

### Section Padding

- Mobile: px-4 py-12
- Tablet: px-6 py-16
- Desktop: px-8 py-20

## Border Radius

```
xs: 2px    (subtle, inputs)
sm: 4px    (small elements)
md: 8px    (buttons)
lg: 12px   (cards)
xl: 16px   (large cards)
full: 9999px (circles)
```

## Animation Timings

### Standard Durations

```
Fast:       0.2s   (hover effects)
Normal:     0.5s   (transitions)
Slow:       0.8s   (reveals)
Very Slow:  1.5s   (complex animations)
```

### Easing Functions

```
easeOut:    Smooth start, sharp end (reveals)
easeIn:     Sharp start, smooth end (exits)
easeInOut:  Smooth start and end (transitions)
Spring:     Bouncy, natural feel (floating cards)
```

## Responsive Breakpoints

```
Mobile:     < 640px  (100% width, single column)
Tablet:     640px    (2 columns, padding adjustments)
Desktop:    1024px   (3-4 columns, full features)
Large:      1280px   (5+ columns, premium spacing)
```

## Component Hierarchy

### Hero Section

```
Hero
├── Headline (gradient text)
├── Subheading (gray text)
├── CTA Buttons
│   ├── Primary (gradient bg)
│   └── Secondary (glass bg)
├── Floating Cards
│   ├── Tasks Card
│   ├── Meetings Card
│   └── Mentor Reviews Card
├── Central Glow Circle
└── Stats Grid
```

### Section Layout Pattern

```
Section
├── Container (max-w-7xl)
├── Header
│   ├── Title (gradient text)
│   └── Subtitle (gray text)
├── Content Grid
│   └── Cards with animations
└── Footer Elements
```

## Glass Effect Variants

### Full Strength (Navbar, Modals)

```css
backdrop-blur-md;
background: rgba(255, 255, 255, 0.1);
border: 1px solid rgba(255, 255, 255, 0.2);
```

### Medium (Cards)

```css
backdrop-blur-md;
background: rgba(255, 255, 255, 0.05);
border: 1px solid rgba(255, 255, 255, 0.1);
```

### Light (Subtle)

```css
backdrop-blur-sm;
background: rgba(255, 255, 255, 0.03);
border: 1px solid rgba(255, 255, 255, 0.08);
```

## Gradient Combinations

### Cyan to Purple

```css
background: linear-gradient(135deg, #00d9ff 0%, #a78bfa 100%);
```

### Purple to Blue

```css
background: linear-gradient(135deg, #a78bfa 0%, #3b82f6 100%);
```

### Blue to Cyan

```css
background: linear-gradient(135deg, #3b82f6 0%, #00d9ff 100%);
```

### Full Rainbow (Hero)

```css
background: linear-gradient(135deg, #00d9ff 0%, #a78bfa 50%, #3b82f6 100%);
```

## Animation States

### Button States

```
Default:    Gray text, no shadow
Hover:      Gradient text, scale 1.05, glow shadow
Active:     Scale 0.95
Disabled:   Gray text, opacity 0.5
```

### Card States

```
Default:    Slightly transparent, subtle glow
Hover:      More opaque, brighter glow, lift effect
Focus:      Bright glow, border highlight
```

### Section States

```
Before Scroll:  opacity 0, translate out
On Scroll:      Fade in, slide in
Final:          opacity 1, no transform
```

## Design Tokens Summary

| Token                   | Value                  | Usage                       |
| ----------------------- | ---------------------- | --------------------------- |
| `--color-accent`        | #00d9ff                | Primary buttons, highlights |
| `--color-accent-purple` | #a78bfa                | Secondary accents           |
| `--color-accent-blue`   | #3b82f6                | Trust elements              |
| `--bg-dark`             | #0a0e27                | Main background             |
| `--bg-glass`            | rgba(255,255,255,0.05) | Card backgrounds            |
| `--border-radius-card`  | 16px                   | Standard card radius        |
| `--shadow-glow`         | 0 0 20px rgba(...)     | Glow effects                |

## Accessibility Considerations

### Color Contrast

- White text on dark bg: ✅ 21:1 ratio (AAA)
- Accent text on dark bg: ✅ 7:1 ratio (AA)
- Gray text on dark bg: ⚠️ 4:1 ratio (AA, acceptable)

### Touch Targets

- Minimum size: 44x44px
- Spacing: 8px minimum between interactive elements
- Mobile buttons: All touch-friendly

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Creating Consistent Visuals

### Do's ✅

- Use gradient text for emphasis
- Apply consistent glow to interactive elements
- Keep padding/spacing proportional
- Use glass effects consistently
- Maintain animation timing

### Don'ts ❌

- Don't mix multiple blur amounts
- Don't use conflicting gradients
- Don't add drop shadows with glow
- Don't make animations too fast
- Don't overuse color - stick to 3 main colors

## Dark Mode Notes

This design is **dark-mode only** by design:

- Easier on the eyes
- Premium aesthetic
- Better for late-night viewing
- Reduces blue light
- Better for battery life

## Print/Export Considerations

When exporting designs:

- Avoid using blur/glow in PDF export
- Simplify gradients to solid colors
- Increase text contrast for print
- Use muted versions of glows

---

**Use this reference to maintain visual consistency across all customizations!**
