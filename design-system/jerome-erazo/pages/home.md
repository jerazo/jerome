# Home Page Overrides

> **PROJECT:** Jerome Erazo
> **Generated:** 2026-05-02 13:21:24
> **Page Type:** Landing / Marketing

> ⚠️ **IMPORTANT:** Rules in this file **override** the Master file (`design-system/MASTER.md`).
> Only deviations from the Master are documented here. For all other rules, refer to the Master.

---

## Page-Specific Rules

### Layout Overrides

- **Max Width:** 1200px (standard)
- **Layout:** Full-width sections, centered content
- **Sections:** 1. Hero (Name/Role), 2. Project Grid (Scannable cards), 3. About/Philosophy, 4. Contact
- **Hero height:** ~80vh (consistent viewport height to avoid layout shifts)
- **Hero structure:** Bold headline (role + experience + metric), recruiter-focused subtitle + industry tagline, impact badge, achievement sub-headline, primary CTA inline on desktop (right of headline block)

### Spacing Overrides

- **Portfolio grid:** `gap-5` (40px) between cards; card padding `p-5` (40px) on content blocks
- **Portfolio carousel (mobile):** `mt-6` above controls with `pt-6` divider
- **Project detail page:** `py-16 sm:py-20` section padding; impact summary and narrative blocks use `rounded-3xl` cards with `p-6 sm:p-8`; CTA row `mt-10` with hero-matched gold primary button (`shadow-gold-glow`); gallery `mt-12` with lazy-loaded screenshots

### Typography Overrides

- **Hero subtitle:** `font-weight: 500` (semi-bold), `line-height: 1.2`, neutral text (`sand2` on dark hero surfaces)
- **Hero tagline:** `line-height: 1.2`, muted neutral (`sand/60`) directly beneath subtitle
- **Hero spacing:** Subtitle sits directly under headline with `mt-4 sm:mt-5`; tagline `mt-2`; impact badge follows with `mt-4 sm:mt-5`

### Color Overrides

- **Strategy:** Neutral background (let work shine). Text: Black/White. Accent: Minimal.

### Component Overrides

- Avoid: No feedback during loading
- Avoid: Override system gestures
- Avoid: Cramped or excessive line height

---

## Page-Specific Components

- No unique components for this page

---

## Recommendations

- Effects: Deep void + dark matter surfaces, Bitcoin orange/gold gradients for CTAs, pill buttons with glowing shadows, glassmorphic BlurView nav, monospace data rows, gradient text balances + masked orange-gold, pulsing status indicators and vertical ledger timelines, ultra-thin borders, high-precision typography
- Feedback: Show spinner/skeleton for operations > 300ms
- Touch: Avoid horizontal swipe on main content
- Typography: Use 1.5-1.75 for body text
- CTA Placement: Project Card Hover + Footer Contact
- **Footer CTA:** Full-width gold primary button (`Get in Touch`) centered in a contrasting ink band; subtext above reiterates value prop; fixed to viewport bottom on desktop (`lg+`) with reserved page padding to prevent layout shift; in-flow band on mobile with 44px min touch target
