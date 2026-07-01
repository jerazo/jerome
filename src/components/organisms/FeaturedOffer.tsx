import {
  Gauge,
  Layers3,
  Rocket,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react'
import { featuredOffer } from '../../content/homeSections'
import { Gutter } from '@/components/atomic'
import { SectionHeading } from '../molecules/SectionHeading'

const pillarIcons = [Rocket, Layers3, ShieldCheck, Users, Gauge, Sparkles] as const

export function FeaturedOffer() {
  return (
    <section
      id="featured"
      className="section-surface section-bg-featured section-slant-rev section-stitch-top py-16 sm:py-20"
    >
      <Gutter>
        <div className="mx-auto w-full max-w-screen-lg">
          <SectionHeading
            className="max-w-3xl"
            eyebrow={featuredOffer.eyebrow}
            title={featuredOffer.title}
            description={featuredOffer.intro}
          />

          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-sand/70 sm:text-base">
            {featuredOffer.lead}
          </p>

          <ul className="mt-12 grid gap-x-12 gap-y-7 sm:grid-cols-2">
            {featuredOffer.pillars.map((pillar, index) => {
              const Icon = pillarIcons[index] ?? Rocket

              return (
                <li key={pillar.title} className="flex gap-4">
                  <span className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-ink2/80 text-gold-300/90 ring-1 ring-white/5">
                    <Icon size={18} aria-hidden />
                  </span>
                  <div className="min-w-0 pt-0.5">
                    <h3 className="font-display text-base font-semibold tracking-tight text-sand">
                      {pillar.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-sand/60">
                      {pillar.description}
                    </p>
                  </div>
                </li>
              )
            })}
          </ul>

          <p className="mt-12 max-w-3xl border-t border-sand/10 pt-8 text-sm leading-relaxed text-sand/65 sm:text-base">
            {featuredOffer.closing}
          </p>
        </div>
      </Gutter>
    </section>
  )
}
