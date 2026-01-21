# 🎨 Vorko Student Dashboard - Visual Reference Guide

## Dashboard Layout Map

```
┌─────────────────────────────────────────────────────────────────┐
│                         TOP BAR (Sticky)                        │
│  [≡ Menu] [Project ↓] [Logo]        [🔍] [🔔] [👤 Profile ↓] │
├──────────┬───────────────────────────────────────────────────────┤
│          │                                                       │
│  SIDEBAR │              MAIN DASHBOARD CONTENT                  │
│          │                                                       │
│ ✓ Dash   │  Dashboard                                            │
│   Your project is on track for success                          │
│ Projects │                                                       │
│   Tasks  │  ┌─────────────────────────────┬──────────────────┐ │
│ Meetings │  │ PROJECT OVERVIEW (2/3)      │ QUICK ACTIONS    │ │
│ Reports  │  │                             │ (1/3)            │ │
│   Viva   │  │ AI Chatbot Platform         │ ┌──────────────┐ │ │
│Settings  │  │ Major Project               │ │ ⊕ Add Task   │ │ │
│          │  │ Mentor: Dr. Sharma          │ ├──────────────┤ │ │
│          │  │ 65% Progress ████▓░░░░░    │ │ 📅 Schedule  │ │ │
│          │  │ Days Left: 42               │ ├──────────────┤ │ │
│          │  │ Team: 👤👤👤👤 (4 members) │ │ 📊 Report    │ │ │
│          │  │                             │ ├──────────────┤ │ │
│          │  │ [View Details →]            │ │ ⚡ Viva Mode │ │ │
│          │  └─────────────────────────────┴──────────────────┘ │ │
│          │                                                       │ │
│          │  ┌──────────────────┬──────────────────┐            │ │
│          │  │ TASKS (1/2)      │ TEAM CONTRIB. (1/2)           │ │
│          │  │                  │                  │            │ │
│          │  │ ⚠️  To Do     (5) │ You         35%  │            │ │
│          │  │ 🕐 In Prog.   (3) │ Priya       28%  │            │ │
│          │  │ ✓  Done      (12) │ Raj         22%  │            │ │
│          │  │                  │ Emma        15%  │            │ │
│          │  │ Overall: 60% ███ │                  │            │ │
│          │  └──────────────────┴──────────────────┘            │ │
│          │                                                       │ │
│          │  ┌──────────────────┬─────────────────────┐         │ │
│          │  │ MEETINGS (1/3)   │ ACTIVITY (2/3)      │         │ │
│          │  │                  │                     │         │ │
│          │  │ 👨‍🏫 Mentor Session │ ✓ You completed:    │         │ │
│          │  │ Today, 3:00 PM   │ Design UI mockups  │         │ │
│          │  │ [Join Now] 🟢    │ 2 hours ago        │         │ │
│          │  │                  │                     │         │ │
│          │  │ 👥 Team Sync     │ 💬 Priya added:    │         │ │
│          │  │ Tomorrow, 10 AM  │ API Documentation  │         │ │
│          │  │                  │ 4 hours ago        │         │ │
│          │  │ 📹 Demo Review   │                     │         │ │
│          │  │ Mar 10, 2:00 PM  │ ⏱️  Raj started:    │         │ │
│          │  │                  │ Backend Impl.      │         │ │
│          │  │ [View Calendar] →│ 6 hours ago        │         │ │
│          │  │                  │                     │         │ │
│          │  │                  │ [View All Activity]│         │ │
│          │  └──────────────────┴─────────────────────┘         │ │
│          │                                                       │ │
└──────────┴───────────────────────────────────────────────────────┘
```

---

## Component Breakdown

### 📍 TOP BAR Components

```
LEFT SECTION          CENTER          RIGHT SECTION
├─ Menu Toggle (☰)   [PROJECT ↓]      ├─ Search 🔍
├─ (Mobile only)                       ├─ Notifications 🔔
│                                      ├─ Profile 👤
│                                      └─ Logout Option
```

**Project Switcher Dropdown:**

```
Project Switcher
├─ AI Chatbot Platform
│  Major Project
├─ [CS-301]
└─ Mobile App
   Minor Project
```

**Notifications Dropdown:**

```
Notifications Panel
├─ Team submitted tasks (2 min ago)
├─ Mentor feedback ready (15 min ago)
└─ Report generated (1 hour ago)
```

**Profile Dropdown:**

```
Profile Menu
├─ Aman Kumar
│  Team Lead
├─ [Profile]
├─ [Settings]
└─ [Sign Out] 🔴
```

---

### 🎯 SIDEBAR Components

**Desktop (Always Visible):**

```
┌─────────────┐
│  V  Vorko   │ ← Logo (w-10 h-10)
│ Student...  │ ← Tagline
├─────────────┤
│✓ Dashboard  │ ← Active (cyan highlight)
│ My Projects │
│ Tasks       │
│ Meetings    │
│ Reports     │
│ Viva Mode   │
├─────────────┤
│ Settings    │
└─────────────┘
```

**Mobile (Slide-in):**

```
Sidebar slides in from LEFT
├─ Overlay fade (click to close)
├─ Sidebar animates from -300px to 0px
└─ Click item to navigate & auto-close
```

---

### 🎴 CARD Components

#### 1. PROJECT OVERVIEW CARD

```
┌────────────────────────────────────┐
│ AI Chatbot Platform    [Major]     │ ← Header + Badge
├────────────────────────────────────┤
│ 👨‍🏫 Mentor: Dr. Sharma              │
│ 📅 Deadline: 42 days left          │
├────────────────────────────────────┤
│ Project Progress: 65%              │
│ ████████░░░░░░░░░░░░░  65%        │ ← Animated bar
├────────────────────────────────────┤
│ [👤👤👤👤] 4 team members          │ ← Overlapping avatars
│ [View Details →]                   │ ← CTA Button
└────────────────────────────────────┘
```

#### 2. TASK SUMMARY CARD

```
┌────────────────────────────────┐
│ Task Summary                    │
├────────────────────────────────┤
│ ⚠️  To Do:          5 items    │
│     [░░░░░░░░░░░░░░░░░░] 16%  │
│                                │
│ 🕐 In Progress:     3 items    │
│     [██░░░░░░░░░░░░░░░░] 10%  │
│                                │
│ ✓  Done:           12 items    │
│     [██████████░░░░░░░░] 40%   │
├────────────────────────────────┤
│ Overall Completion:    60%     │
│ [███████░░░░░░░░░░░] 60%       │
└────────────────────────────────┘
```

#### 3. TEAM CONTRIBUTION CARD

```
┌────────────────────────────────┐
│ Team Contribution      📈       │
├────────────────────────────────┤
│ [AK] You             35%        │
│      [████████░░░░░░░░░░░] 35% │
│                                │
│ [PS] Priya Singh     28%        │
│      [██████░░░░░░░░░░░░░] 28% │
│                                │
│ [RP] Raj Patel       22%        │
│      [█████░░░░░░░░░░░░░░] 22% │
│                                │
│ [ED] Emma Davis      15%        │
│      [███░░░░░░░░░░░░░░░░] 15% │
├────────────────────────────────┤
│ Total Team Effort:  100%        │
└────────────────────────────────┘
```

#### 4. UPCOMING MEETINGS CARD

```
┌────────────────────────────────┐
│ Upcoming Meetings      📅       │
├────────────────────────────────┤
│ 👨‍🏫 Mentor Session  [Mentor]    │
│ Today, 3:00 PM                │
│ [🎥 Join Now]  ← Primary action│
│                                │
│ 👥 Team Sync         [Team]    │
│ Tomorrow, 10:00 AM            │
│                                │
│ 📹 Demo Review     [Review]    │
│ Mar 10, 2:00 PM               │
├────────────────────────────────┤
│ [📅 View Calendar →]           │
└────────────────────────────────┘
```

#### 5. RECENT ACTIVITY CARD

```
┌────────────────────────────────┐
│ Recent Activity                 │
├────────────────────────────────┤
│ [AK] ✓ You completed task       │
│ Design UI mockups • 2 hours ago│
│                                │
│ [PS] 💬 Priya added comment    │
│ API Documentation • 4 hrs ago  │
│                                │
│ [RP] ⏱️  Raj started work      │
│ Backend Implementation • 6 hrs │
│                                │
│ [DS] 💬 Mentor left feedback   │
│ Project Progress • 1 day ago   │
│                                │
│ [ED] ⚠️  Emma identified issue │
│ Testing Phase • 1 day ago      │
├────────────────────────────────┤
│ [View All Activity →]          │
└────────────────────────────────┘
```

#### 6. QUICK ACTIONS CARD

```
┌────────────────────────────────┐
│ Quick Actions                   │
├────────────────────────────────┤
│ [⊕] Add Task                   │
│     Create new task            │ → Hover shows arrow
│                                │
│ [📅] Schedule Meeting          │
│     Plan meeting               │ → Hover shows arrow
│                                │
│ [📊] Generate Report           │
│     Create report              │ → Hover shows arrow
│                                │
│ [⚡] Viva Mode                 │
│     Prepare viva               │ → Hover shows arrow
└────────────────────────────────┘
```

---

## Color Scheme

### Primary Colors

```
Accent (Cyan):    #00d9ff    Used for: Primary actions, highlights
Purple:           #a78bfa    Used for: Secondary actions, accents
Blue:             #3b82f6    Used for: Info, team contributions
Dark:             #0a0e27    Used for: Background, cards
```

### Text Colors

```
White:            #ffffff    Primary text, headers
Gray-400:         #9ca3af    Secondary text
Gray-500:         #6b7280    Tertiary text, timestamps
```

### Status Colors

```
Green:            #4ade80    Done, success
Orange:           #fb923c    In Progress, warning
Red:              #f87171    Error, alert
```

---

## Hover & Interaction States

### Cards

```
Normal State:
┌─────────────┐
│ Card        │
│ border-white/10
│ opacity-1
└─────────────┘

Hover State:
┌─────────────┐  ← Lifts up (y: -5px)
│ Card        │  ← Border brightens
│ border-accent/30
│ scale: 1.02
│ shadow: increased
└─────────────┘
```

### Buttons

```
Normal State:          Hover State:
px-8 py-4             px-8 py-4
scale: 1.0            scale: 1.05 to 1.08
shadow: base          shadow: lg

Tap State:
scale: 0.95
opacity: 0.9
```

### Icons

```
Normal State:    Hover State:
rotate: 0        rotate: 10deg
scale: 1.0       scale: 1.1
opacity: 1       opacity: 1 (brighten)
```

---

## Animation Timings

### Page Load Sequence

```
Time    Event
0.0s → Dashboard container fades in (opacity 0 → 1)
0.2s → Header text slides in (opacity + y)
0.3s → Project card enters (cascade starts)
0.4s → Task & Team cards enter
0.5s → Meeting & Activity cards enter
0.6s → All cards visible, page interactive
```

### Card Entrance

```
duration: 0.5s (500ms)
ease: easeOut
initial: { opacity: 0, y: 20 }
animate: { opacity: 1, y: 0 }
```

### Progress Bar Animation

```
duration: 1.5s (1500ms)
ease: easeOut
initial: { width: 0% }
animate: { width: 65% }  (or target %)
```

### Staggered Lists

```
Container stagger: 0.1s between items
List items enter sequentially:
- Item 1: delay 0.1s
- Item 2: delay 0.2s
- Item 3: delay 0.3s
etc.
```

---

## Responsive Breakpoints

### Mobile (<768px)

```
Layout: Single column
Sidebar: Hidden, menu toggle visible
Cards: Full width, stacked
Typography: text-sm, text-base
Padding: px-4, py-4
Gap: gap-4
```

### Tablet (768px - 1024px)

```
Layout: 2 columns where possible
Sidebar: Compact, visible
Cards: 2-up grid, 1-up stacked
Typography: text-sm, text-base
Padding: px-6, py-6
Gap: gap-6
```

### Desktop (>1024px)

```
Layout: 3 columns optimized
Sidebar: Full width (260px), always visible
Cards: Optimized multi-column
Typography: text-base, text-lg
Padding: px-8, py-8
Gap: gap-6 to gap-8
```

---

## Interaction Flow

### Sidebar Navigation

```
Desktop:
1. Click menu item
2. Item highlights (accent color)
3. Navigate to section
4. Sidebar stays open

Mobile:
1. Click menu toggle
2. Sidebar slides in from left
3. Click menu item
4. Navigate to section
5. Sidebar slides out automatically
```

### Dropdown Menus

```
1. Hover/Click menu trigger
2. Dropdown fades in (opacity 0 → 1)
3. Click item or click outside
4. Dropdown fades out (opacity 1 → 0)
```

### Card Interactions

```
1. Hover over card
2. Card lifts up (y: -5px)
3. Border brightens
4. Shadow increases
5. Content remains readable
6. Mouse out: card returns to normal state
```

---

## Typography Scale

```
Page Title:      text-3xl sm:text-4xl font-bold
Card Header:     text-lg font-bold
Section Label:   text-sm font-semibold
Body Text:       text-sm text-gray-400
Helper Text:     text-xs text-gray-500
```

---

## Spacing & Layout Grid

### Card Spacing

```
Inside Card:     p-6           (24px padding)
Between Cards:   gap-6         (24px gap)
Section Margin:  mb-6          (24px margin bottom)
```

### Grid Patterns

```
Desktop Layout:
┌─────────────────┬──────────────────┐
│   2/3 width     │    1/3 width    │
│   lg:col-span-2 │   lg:col-span-1 │
└─────────────────┴──────────────────┘

Mobile Layout:
┌────────────────┐
│   Full width   │
│   col-span-1   │
├────────────────┤
│   Full width   │
│   col-span-1   │
└────────────────┘
```

---

## Summary: Visual Hierarchy

```
🔝 Most Important
├─ Project Overview (Largest card, top position)
├─ Task Summary (High priority, second row)
├─ Team Contribution (High priority, second row)
├─ Quick Actions (Action items, right sidebar)
├─ Meetings (Important timeline, third row)
└─ Activity Feed (Reference info, bottom)
🔚 Least Important
```

---

This visual guide helps you understand exactly how the dashboard is structured and styled. Every element is intentionally designed for clarity, usability, and professional polish! 🎨✨
