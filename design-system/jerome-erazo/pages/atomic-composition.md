# Atomic Composition Guide

> **PROJECT:** Jerome Erazo  
> **Purpose:** Show how atoms combine into molecules and organisms so implementation matches the design system without guessing from source files alone.

Import atoms from the barrel (`@/components/atomic`). Compose molecules and organisms from atoms plus other molecules. See [`README.md`](../../../README.md#atomic-component-typings) for shared prop contracts and ESLint rules.

---

## Pattern 1 — Portfolio project card

**Level:** Molecule (`PortfolioProjectCard`)  
**Atoms used:** `PortfolioImage`, `buttonClassName` (button styles), `CopyLinkButton`  
**Molecule used:** `ImpactMetricHighlight` (from `ImpactBadge`)

A scannable portfolio card stacks media, an optional impact badge overlay, metadata, and a CTA. The production component lives in `src/components/molecules/PortfolioProjectCard.tsx`; the snippet below shows the core atom composition.

### Imports

```tsx
import type { PortfolioProject } from '@/content/portfolio'
import { buttonClassName, CopyLinkButton, PortfolioImage } from '@/components/atomic'
import { ImpactMetricHighlight } from '@/components/molecules/ImpactBadge'
```

### Props and wiring

| Piece | Prop / role | Notes |
| --- | --- | --- |
| `PortfolioImage` | `src`, `alt`, `loading` | Renders WebP `<picture>` when available; lazy-loads off-screen cards |
| `ImpactMetricHighlight` | `metric: { label, value }` | Overlays top-right on media; uses `project.impactMetric` or first `impactMetrics` entry |
| `buttonClassName` | `variant`, `size`, `className` | Styles native `<button>` / `<a>` CTAs (`secondary` + `sm` for “View project details”) |
| `CopyLinkButton` | `url` | Deep link to `/project/:id` or `/showcase#project-:id` |

### Example composition

```tsx
function PortfolioProjectCardPreview({
  project,
  onViewDetails,
}: {
  project: PortfolioProject
  onViewDetails: (project: PortfolioProject) => void
}) {
  const highlightMetric = project.impactMetric ?? project.impactMetrics?.[0]

  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-sand/10 bg-white/5">
      <div className="relative">
        {project.imageSrc ? (
          <PortfolioImage
            src={project.imageSrc}
            alt={project.imageAlt ?? project.title}
            className="aspect-[16/10] w-full"
            loading="lazy"
          />
        ) : null}
        {highlightMetric ? (
          <ImpactMetricHighlight
            metric={highlightMetric}
            className="absolute right-3 top-3 z-10"
          />
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-xl font-semibold text-sand">{project.title}</h3>
          <CopyLinkButton url={`/project/${project.id}`} />
        </div>
        <p className="mt-3 flex-1 text-sm text-sand/70">{project.summary}</p>
        <button
          type="button"
          onClick={() => onViewDetails(project)}
          className={buttonClassName({
            variant: 'secondary',
            size: 'sm',
            className: 'mt-4 w-full justify-center',
          })}
        >
          View project details
        </button>
      </div>
    </article>
  )
}
```

For in-app navigation CTAs, prefer `ButtonLink` from `@/components/atomic` with the same `variant` / `size` props.

### Visual reference

![Portfolio project card — atoms composed into PortfolioProjectCard](../assets/composition-portfolio-card.png)

*Placeholder: screenshot of a portfolio card with impact badge overlay and CTA. Live reference: home portfolio grid and `/showcase`.*

---

## Pattern 2 — Hero carousel

**Level:** Organism (`ThreeJsHero` hero block)  
**Molecules used:** `HeroSlideCopy`, `HeroCarouselControls`

The hero rotates through `heroSlides` content. Copy handles typography, inline impact badge, and optional CTA; controls handle prev/next and dot tabs. `ThreeJsHero` passes `showCta={false}` on the main slide and keeps navigation in `HeroCarouselControls`. Slide copy uses **Tech Lead** role framing (not Principal Engineer)—see content overrides in [`home.md`](home.md).

### Imports

```tsx
import { useState } from 'react'
import { heroSlides, type HeroSlide } from '@/content/homeSections'
import { HeroSlideCopy } from '@/components/molecules/HeroSlideCopy'
import { HeroCarouselControls } from '@/components/molecules/HeroCarouselControls'
```

### Props and wiring

| Piece | Prop / role | Notes |
| --- | --- | --- |
| `HeroSlideCopy` | `slide`, `animate`, `glowActive`, `showCta`, `compact` | `slide` drives eyebrow, title lines, subtitle, tagline, impact badge, achievement, CTA |
| `HeroSlideCopy` variants | `compact`, `showCta={false}` | Compact for mobile strips; hide CTA when controls own navigation |
| `HeroCarouselControls` | `slides`, `activeIndex`, `onPrev`, `onNext`, `onSelect` | 44px touch targets; `role="tablist"` on dot group |

### Example composition

```tsx
function HeroCarouselPreview() {
  const [activeIndex, setActiveIndex] = useState(0)
  const slide: HeroSlide = heroSlides[activeIndex]

  const goPrev = () =>
    setActiveIndex((index) => (index - 1 + heroSlides.length) % heroSlides.length)
  const goNext = () => setActiveIndex((index) => (index + 1) % heroSlides.length)

  return (
    <section aria-label="Hero">
      {/* Primary slide — full copy with CTA on desktop */}
      <HeroSlideCopy slide={slide} animate glowActive />

      {/* Alternate: compact copy without CTA (matches ThreeJsHero) */}
      <HeroSlideCopy
        key={activeIndex}
        slide={slide}
        animate
        glowActive
        showCta={false}
      />

      <div className="mt-4 border-t border-sand/10 pt-4">
        <HeroCarouselControls
          slides={heroSlides}
          activeIndex={activeIndex}
          onPrev={goPrev}
          onNext={goNext}
          onSelect={setActiveIndex}
        />
      </div>
    </section>
  )
}
```

`HeroSlideCopy` embeds `ButtonLink` when `showCta` is true (`slide.ctaTo`, `slide.ctaLabel`).

### Visual reference

![Hero carousel — HeroSlideCopy and HeroCarouselControls](../assets/composition-hero-carousel.png)

*Placeholder: screenshot of hero headline, impact badge, and carousel controls. Live reference: home hero (`ThreeJsHero`).*

---

## Pattern 3 — Contact section

**Level:** Organism (`ContactSection` + footer CTA band)  
**Molecules used:** `ContactForm`, `FooterContactCta`, `SectionHeading`  
**Atoms used:** `Button` (inside `ContactForm`), `ButtonLink` (inside `FooterContactCta`), `Gutter`

The contact block pairs a lazy-loaded form with direct-contact aside content. A persistent footer CTA (`FooterContactCta`) wraps the `ButtonLink` atom for fixed “Get in Touch” access on large viewports.

### Imports

```tsx
import { lazy, Suspense } from 'react'
import { Gutter } from '@/components/atomic'
import { ContactForm } from '@/components/molecules/ContactForm'
import { FooterContactCta } from '@/components/molecules/FooterContactCta'
import { SectionHeading } from '@/components/molecules/SectionHeading'
import { contactSection } from '@/content/contact'
```

### Props and wiring

| Piece | Prop / role | Notes |
| --- | --- | --- |
| `SectionHeading` | `eyebrow`, `title`, `description` | From `contactSection` content module |
| `ContactForm` | `id="contact-form"` | Uses `Button` atom for submit; validates via `contactSchema` |
| `FooterContactCta` | optional `className` | Reads `profile.footerCta` for label, `to`, and `ariaLabel` |
| `Gutter` | `children` | Page-width padding wrapper for the `#contact` section |

### Example composition

```tsx
const ContactFormLazy = lazy(() =>
  import('@/components/molecules/ContactForm').then((m) => ({ default: m.ContactForm })),
)

function ContactSectionPreview() {
  return (
    <>
      <section id="contact" className="section-surface py-16 sm:py-20">
        <Gutter>
          <div className="mx-auto max-w-screen-lg">
            <SectionHeading
              eyebrow={contactSection.eyebrow}
              title={contactSection.title}
              description={contactSection.description}
            />

            <div className="mt-8 grid gap-8 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <Suspense fallback={<div className="min-h-[28rem] animate-pulse" aria-hidden />}>
                  <ContactFormLazy id="contact-form" />
                </Suspense>
              </div>
              <aside className="lg:col-span-5" aria-label="Direct contact details">
                {/* Direct email / phone / LinkedIn — see ContactSection.tsx */}
              </aside>
            </div>
          </div>
        </Gutter>
      </section>

      {/* Fixed footer CTA — ButtonLink atom via FooterContactCta molecule */}
      <div className="fixed bottom-5 right-5 z-40">
        <FooterContactCta />
      </div>
    </>
  )
}
```

### Visual reference

![Contact section — ContactForm and FooterContactCta](../assets/composition-contact-section.png)

*Placeholder: screenshot of contact form beside direct details and floating footer CTA. Live reference: `#contact` section and site footer.*

---

## Related docs

- Master tokens and global rules: [`../MASTER.md`](../MASTER.md)
- Home page overrides: [`home.md`](home.md)
- Atom typings and barrel imports: [`../../../README.md`](../../../README.md#atomic-component-typings)
- ESLint atomic structure: [`../../../docs/eslint-atomic.md`](../../../docs/eslint-atomic.md)
