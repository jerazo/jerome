import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

export function ServiceCard({
  title,
  description,
  bullets,
  icon,
}: {
  title: string
  description: string
  bullets: string[]
  icon: ReactNode
}) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-sand/10 bg-white/5 p-6 shadow-soft transition hover:border-gold-500/30 hover:bg-white/10">
      <div className="absolute -right-12 -top-16 h-44 w-44 rounded-full bg-gold-500/10 blur-2xl transition group-hover:bg-gold-500/15" />
      <div className="flex items-start gap-4">
        <div className={cn('rounded-2xl border border-sand/10 bg-ink2 p-3 text-gold-300')}>
          {icon}
        </div>
        <div>
          <h3 className="font-display text-2xl font-semibold tracking-tight text-sand">
            {title}
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-sand/70">{description}</p>
        </div>
      </div>
      <ul className="mt-5 space-y-2 text-sm text-sand/75">
        {bullets.map((b) => (
          <li key={b} className="flex gap-2">
            <span className="mt-[9px] h-1 w-1 flex-none rounded-full bg-gold-400/80" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

