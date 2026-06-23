import { Link } from 'react-router-dom'
import { featuredItems } from '../../content/homeSections'
import { Gutter } from '../atoms/Gutter'
import { SectionHeading } from '../molecules/SectionHeading'

export function TopItems() {
  return (
    <section className="py-16 sm:py-20">
      <Gutter>
        <SectionHeading
          eyebrow="Top Items"
          title="Featured services"
          description="A structure inspired by melrobbins.com, adapted to sell web development and technical leadership."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {featuredItems.map((item) => (
            <Link
              key={item.title}
              to={item.to}
              className="group rounded-3xl border border-sand/10 bg-white/5 p-6 shadow-soft transition hover:border-gold-500/25 hover:bg-white/10 focus-visible:focus-ring"
            >
              <p className="font-display text-2xl font-semibold tracking-tight text-sand">
                {item.title}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-sand/70">{item.subtitle}</p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.26em] text-gold-200/80">
                Learn more
              </p>
            </Link>
          ))}
        </div>
      </Gutter>
    </section>
  )
}
