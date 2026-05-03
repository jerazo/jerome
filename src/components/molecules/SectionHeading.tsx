import { cn } from '../../lib/cn'

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow: string
  title: string
  description?: string
  className?: string
}) {
  return (
    <div className={cn('max-w-2xl', className)}>
      <div className="mb-3 inline-flex items-center gap-2">
        <span className="h-2 w-2 bg-gold-500" />
        <p className="font-mono text-xs font-medium uppercase tracking-[0.28em] text-sand/60">
          {eyebrow}
        </p>
      </div>
      <h2 className="font-display text-3xl font-semibold leading-[1.02] tracking-tight text-sand sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 text-sm leading-relaxed text-sand/70 sm:text-base">
          {description}
        </p>
      ) : null}
    </div>
  )
}
