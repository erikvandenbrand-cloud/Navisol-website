# Navisol Design System

## Design Principles

1. **Modern & Technical**: Clean lines, precision, engineering-first aesthetic
2. **Calm & Confident**: Generous white space, unhurried layouts, no flashy elements
3. **Trust-Building**: Premium quality, professional imagery, clear communication
4. **Project-Led**: Let the work speak for itself through compelling visuals
5. **Understated Premium**: Luxury without ostentation, substance over style

## Color Palette

### Primary Colors
```css
--ocean-deep: #0A2540      /* Deep navy blue - primary brand color */
--ocean-medium: #1E3A5F    /* Medium ocean blue - secondary elements */
--ocean-light: #2E5A8A     /* Light ocean blue - accents */
```

### Neutral Colors
```css
--steel-dark: #1A1F2E      /* Almost black - headings, key text */
--steel-medium: #4A5568    /* Dark gray - body text */
--steel-light: #718096     /* Medium gray - secondary text */
--silver: #A0AEC0          /* Light gray - borders, dividers */
--aluminum: #E2E8F0        /* Very light gray - backgrounds */
--white-smoke: #F7FAFC     /* Off-white - primary background */
--pure-white: #FFFFFF      /* Pure white - cards, overlays */
```

### Accent Colors
```css
--maritime-teal: #14B8A6   /* Teal - CTA buttons, links */
--success-green: #059669   /* Success states */
--warning-amber: #D97706   /* Warnings, highlights */
--error-red: #DC2626       /* Errors */
```

### Opacity Variations
```css
--overlay-dark: rgba(10, 37, 64, 0.85)   /* Dark overlay on images */
--overlay-light: rgba(247, 250, 252, 0.95) /* Light overlay */
--glass-effect: rgba(255, 255, 255, 0.1)  /* Glassmorphism */
```

## Typography

### Font Stack

**Primary**: Inter (clean, modern, professional)
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

**Display/Headings**: Outfit (distinctive but restrained)
```css
font-family: 'Outfit', 'Inter', sans-serif;
```

**Monospace** (technical specs): JetBrains Mono
```css
font-family: 'JetBrains Mono', 'Courier New', monospace;
```

### Type Scale

```css
--text-xs: 0.75rem;      /* 12px - tiny labels */
--text-sm: 0.875rem;     /* 14px - small text */
--text-base: 1rem;       /* 16px - body text */
--text-lg: 1.125rem;     /* 18px - large body */
--text-xl: 1.25rem;      /* 20px - subheadings */
--text-2xl: 1.5rem;      /* 24px - H3 */
--text-3xl: 1.875rem;    /* 30px - H2 */
--text-4xl: 2.25rem;     /* 36px - H1 */
--text-5xl: 3rem;        /* 48px - Hero headlines */
--text-6xl: 3.75rem;     /* 60px - Large hero */
--text-7xl: 4.5rem;      /* 72px - Extra large displays */
```

### Font Weights

```css
--font-light: 300;
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### Line Heights

```css
--leading-tight: 1.2;     /* Headings */
--leading-snug: 1.4;      /* Subheadings */
--leading-normal: 1.6;    /* Body text */
--leading-relaxed: 1.8;   /* Comfortable reading */
```

## Spacing System

Based on 4px grid:

```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-24: 6rem;     /* 96px */
--space-32: 8rem;     /* 128px */
--space-40: 10rem;    /* 160px */
```

### Section Spacing

- **Mobile**: 4rem (64px) vertical padding
- **Tablet**: 6rem (96px) vertical padding
- **Desktop**: 8rem (128px) vertical padding

## Layout

### Container Widths

```css
--container-sm: 640px;    /* Mobile */
--container-md: 768px;    /* Tablet */
--container-lg: 1024px;   /* Desktop */
--container-xl: 1280px;   /* Wide desktop */
--container-2xl: 1536px;  /* Extra wide */
```

### Content Max Width: 1400px
### Reading Width: 65ch (optimal reading line length)

### Grid System

```css
/* 12-column grid */
grid-template-columns: repeat(12, 1fr);
gap: 2rem;

/* Mobile: 4 columns */
/* Tablet: 8 columns */
/* Desktop: 12 columns */
```

## Components

### Buttons

**Primary CTA**:
```css
background: var(--maritime-teal);
color: white;
padding: 1rem 2rem;
border-radius: 0.375rem;
font-weight: 600;
transition: all 200ms ease;

hover:
  background: darken(maritime-teal, 10%);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(20, 184, 166, 0.3);
```

**Secondary Button**:
```css
background: transparent;
color: var(--ocean-deep);
border: 2px solid var(--ocean-deep);
padding: 1rem 2rem;
border-radius: 0.375rem;
font-weight: 600;

hover:
  background: var(--ocean-deep);
  color: white;
```

**Ghost Button**:
```css
background: transparent;
color: var(--steel-medium);
padding: 0.75rem 1.5rem;

hover:
  color: var(--maritime-teal);
```

### Cards

**Project Card**:
```css
background: white;
border-radius: 0.5rem;
overflow: hidden;
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

hover:
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  transform: translateY(-4px);
  transition: all 300ms ease;
```

**Service Card**:
```css
background: var(--white-smoke);
border: 1px solid var(--silver);
border-radius: 0.75rem;
padding: 3rem 2rem;

hover:
  border-color: var(--maritime-teal);
  background: white;
```

### Navigation

**Desktop Nav**:
```css
height: 80px;
background: rgba(255, 255, 255, 0.95);
backdrop-filter: blur(12px);
border-bottom: 1px solid var(--silver);
position: sticky;
top: 0;
z-index: 50;
```

**Mobile Nav**:
```css
height: 64px;
hamburger icon: 24x24px
```

## Imagery Style

### Photography Guidelines

1. **Quality**: High-resolution, professional photography only
2. **Lighting**: Natural light preferred, well-lit, no harsh shadows
3. **Composition**: Clean, uncluttered, focus on craftsmanship
4. **Color Grading**: Slightly desaturated, cool tones, professional
5. **Subjects**:
   - Vessels on water (hero shots)
   - Construction detail shots (welding, materials)
   - Workshop and facilities
   - Engineering diagrams and 3D renders

### Image Ratios

- **Hero**: 21:9 or 16:9 (ultra-wide cinematic)
- **Project Cards**: 4:3 (classic, stable)
- **Detail Shots**: 3:2 (photography standard)
- **Gallery**: Mixed ratios for visual interest

### Image Treatment

```css
/* Overlay on hero images */
.image-overlay {
  background: linear-gradient(
    to bottom,
    rgba(10, 37, 64, 0.4),
    rgba(10, 37, 64, 0.7)
  );
}

/* Subtle zoom on hover */
.image-hover {
  transition: transform 600ms ease;

  &:hover {
    transform: scale(1.05);
  }
}
```

## Animations & Transitions

### Timing Functions

```css
--ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
--ease-in-out: cubic-bezier(0.4, 0, 0.6, 1);
```

### Duration

```css
--duration-fast: 150ms;
--duration-normal: 300ms;
--duration-slow: 500ms;
```

### Common Animations

**Fade In Up**:
```css
opacity: 0;
transform: translateY(20px);

animate:
  opacity: 1;
  transform: translateY(0);
  transition: all 500ms ease;
```

**Reveal on Scroll**:
Use Intersection Observer to trigger fade-in-up when element enters viewport

## Responsive Breakpoints

```css
--screen-sm: 640px;   /* Mobile landscape */
--screen-md: 768px;   /* Tablet */
--screen-lg: 1024px;  /* Desktop */
--screen-xl: 1280px;  /* Wide desktop */
--screen-2xl: 1536px; /* Extra wide */
```

### Mobile-First Approach

```css
/* Base: Mobile (320px+) */
/* sm: Mobile landscape (640px+) */
/* md: Tablet (768px+) */
/* lg: Desktop (1024px+) */
/* xl: Wide desktop (1280px+) */
```

## Accessibility

### Color Contrast

- All text must meet WCAG AA standards (4.5:1 for normal text, 3:1 for large)
- Interactive elements must have 3:1 contrast
- Focus states must be clearly visible

### Focus States

```css
.focusable:focus-visible {
  outline: 3px solid var(--maritime-teal);
  outline-offset: 2px;
  border-radius: 0.25rem;
}
```

### Keyboard Navigation

- All interactive elements must be keyboard accessible
- Logical tab order
- Skip to main content link

## Icons

**Library**: Lucide React (clean, consistent, open-source)

**Sizes**:
- Small: 16px
- Medium: 24px
- Large: 32px
- Extra Large: 48px

**Style**: Outline/stroke style, 2px stroke width

## Loading States

**Skeleton Screens**: Use for content loading
**Spinners**: Use for action feedback
**Progress Bars**: Use for multi-step processes

```css
.skeleton {
  background: linear-gradient(
    90deg,
    var(--aluminum) 25%,
    var(--white-smoke) 50%,
    var(--aluminum) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 2s infinite;
}
```

## Mood & Reference

**Visual Inspiration**:
- Hakvoort Shipyard (clean, technical)
- Feadship (premium, understated)
- KM Yachtbuilders (project-focused)
- Apple product pages (minimalist, white space)
- Porsche Design Studio (precision, engineering)

**Avoid**:
- Flashy animations
- Bright, saturated colors
- Busy, cluttered layouts
- Stock photography clichés
- Marketing buzzword overload
