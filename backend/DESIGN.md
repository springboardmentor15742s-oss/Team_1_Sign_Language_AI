---
name: Lumina Sign System
colors:
  surface: '#15121b'
  surface-dim: '#15121b'
  surface-bright: '#3b3742'
  surface-container-lowest: '#0f0d15'
  surface-container-low: '#1d1a23'
  surface-container: '#211e27'
  surface-container-high: '#2c2832'
  surface-container-highest: '#37333d'
  on-surface: '#e7e0ed'
  on-surface-variant: '#cbc3d7'
  inverse-surface: '#e7e0ed'
  inverse-on-surface: '#322f39'
  outline: '#958ea0'
  outline-variant: '#494454'
  surface-tint: '#d0bcff'
  primary: '#d0bcff'
  on-primary: '#3c0091'
  primary-container: '#a078ff'
  on-primary-container: '#340080'
  inverse-primary: '#6d3bd7'
  secondary: '#4cd7f6'
  on-secondary: '#003640'
  secondary-container: '#03b5d3'
  on-secondary-container: '#00424e'
  tertiary: '#ffb869'
  on-tertiary: '#482900'
  tertiary-container: '#ca801e'
  on-tertiary-container: '#3f2300'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e9ddff'
  primary-fixed-dim: '#d0bcff'
  on-primary-fixed: '#23005c'
  on-primary-fixed-variant: '#5516be'
  secondary-fixed: '#acedff'
  secondary-fixed-dim: '#4cd7f6'
  on-secondary-fixed: '#001f26'
  on-secondary-fixed-variant: '#004e5c'
  tertiary-fixed: '#ffdcbb'
  tertiary-fixed-dim: '#ffb869'
  on-tertiary-fixed: '#2c1700'
  on-tertiary-fixed-variant: '#673d00'
  background: '#15121b'
  on-background: '#e7e0ed'
  surface-variant: '#37333d'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
  mono-stats:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 24px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
---

## Brand & Style

The design system is engineered for a high-performance educational environment where precision and clarity are paramount. The brand personality is **Visionary, Technical, and Empowering**. It speaks to users who are serious about mastering a visual language through the lens of cutting-edge AI.

The visual style is a refined blend of **Modern Corporate** and **Glassmorphism**. It utilizes a deep dark-mode foundation to reduce eye strain during long practice sessions and to make the vibrance of the Electric Violet and Cyan accents pop. The interface feels like a high-tech HUD (Heads-Up Display), providing real-time feedback that feels intelligent and responsive rather than static. High-contrast elements and generous hit targets ensure that the platform remains accessible to a diverse range of learners.

## Colors

This design system utilizes a high-contrast, deep-sea palette to create a focused learning atmosphere.

- **Primary (Electric Violet):** Used for main calls to action, active progress states, and key navigational highlights.
- **Secondary (Cyan):** Reserved for AI-driven features, such as motion-tracking overlays and automated feedback loops.
- **Surface & Background:** The foundation uses Deep Charcoal (#0F172A) for the base background, while Navy (#1E293B) is used for cards and containers to create a subtle hierarchy of depth.
- **Feedback Palette:** Emerald (#10B981) denotes 90%+ accuracy, while Amber (#F59E0B) is used specifically for "Improvement Needed" hints, ensuring color-blind friendly distinction through both hue and brightness.

## Typography

The typography system is built on **Inter**, chosen for its exceptional legibility at small sizes and its neutral, technical aesthetic. 

- **Hierarchies:** We use a tight scale to maintain density in data-heavy dashboards.
- **Labels:** Uppercase styling is reserved for small utility labels and HUD elements to provide a "technical" feel without sacrificing readability.
- **Readability:** Line heights are slightly increased for body text to assist in instructional reading while multitasking with hand gestures.

## Layout & Spacing

The layout follows a **Fluid Grid** model with a 12-column structure for desktop and a 4-column structure for mobile. 

- **The "Safety Zone":** In camera-view layouts, a 48px interior margin is maintained to prevent UI elements from overlapping the user's signing space.
- **Dashboard Density:** Use the 16px (md) spacing unit for card internal padding to keep information compact.
- **Breakpoints:** 
  - Mobile: < 768px (Single column stacked)
  - Tablet: 768px - 1280px (2-column layouts for video vs. stats)
  - Desktop: > 1280px (3-column layout: Nav / Main Camera / Stats Panel)

## Elevation & Depth

Depth in the design system is achieved through **Tonal Layering** and **Glassmorphism** rather than traditional heavy shadows.

- **Level 0 (Background):** Deep Charcoal (#0F172A).
- **Level 1 (Cards):** Navy (#1E293B) with a subtle 1px stroke (Opacity 10% white) to define edges.
- **Level 2 (HUD Overlays):** Semi-transparent Navy with a 20px backdrop blur. This is used for camera controls and real-time feedback chips that sit over the video feed.
- **AI Glow:** Secondary Cyan elements utilize a soft "diffused glow" (Box shadow: 0 0 15px rgba(6, 182, 212, 0.3)) to signify active AI processing or "correct" tracking points.

## Shapes

The design system uses a **Rounded** (0.5rem) shape language to balance the technical "hard" dark mode with a friendly, educational feel.

- **Standard Elements:** Buttons and Input fields use the 0.5rem (8px) radius.
- **Containers:** Large dashboard cards and camera viewfinders use 1rem (16px) for a softer, more modern silhouette.
- **Status Pills:** Use full-pill (rounded-full) geometry for accuracy badges and role indicators.

## Components

### Buttons
- **Primary:** Electric Violet background, white text. On hover, apply a slight upward shift and an outer glow.
- **Ghost (HUD):** Transparent background with a blurred backdrop and white border. Used for camera-view actions (e.g., Flip Camera, Toggle Grid).

### Camera View & HUD
- **The Viewfinder:** A container with a subtle Cyan inner-border glow when the AI detects a hand. 
- **Skeleton Tracking:** Use thin (2px) Cyan lines with circular nodes to represent the hand-mesh overlay.

### Progress Cards
- **Charts:** Use a custom theme for Chart.js where grid lines are #1E293B (matching surface) and datasets use Primary and Secondary gradients.
- **Radial Progress:** A thick circular stroke indicating "Mastery %" with a centered label-md for the numeric value.

### Input Fields
- Dark background (#0F172A), 1px Navy border. On focus, the border transitions to Electric Violet with a 2px outer glow.

### Lists & Data Rows
- High-contrast text on navy backgrounds. Each row should have a subtle hover state that lightens the background by 5% to indicate interactivity.