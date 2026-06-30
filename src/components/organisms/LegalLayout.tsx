import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Container } from '../atoms/Container'
import { cn } from '../../lib/cn'

export const legalLinkClass =
  'font-medium text-gold-300 underline decoration-gold-300/40 underline-offset-2 transition hover:text-gold-200 focus-visible:focus-ring'

export const legalListClass = 'list-disc space-y-2 pl-5 marker:text-sand/40'

type TocItem = { id: string; label: string }

export function LegalLayout({
  eyebrow = 'Legal',
  title,
  lastUpdated,
  intro,
  toc,
  children,
}: {
  eyebrow?: string
  title: string
  lastUpdated: string
  intro: ReactNode
  toc?: TocItem[]
  children: ReactNode
}) {
  return (
    <section className="py-16 sm:py-20">
      <Container className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-sand/55">{eyebrow}</p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-sand sm:text-5xl">
          {title}
        </h1>
        <p className="mt-3 text-xs uppercase tracking-[0.2em] text-sand/45">
          Last updated: {lastUpdated}
        </p>

        <div className="mt-6 space-y-4 text-sm leading-relaxed text-sand/75 sm:text-base">
          {intro}
        </div>

        {toc && toc.length > 0 ? (
          <nav
            aria-label="On this page"
            className="mt-8 rounded-2xl border border-sand/10 bg-ink/40 p-5"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-sand/45">
              On this page
            </p>
            <ol className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
              {toc.map((item, index) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className={legalLinkClass}>
                    {index + 1}. {item.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        <div className="mt-12 space-y-10">{children}</div>
      </Container>
    </section>
  )
}

export function LegalSection({
  id,
  title,
  children,
}: {
  id: string
  title: string
  children: ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-24 space-y-4">
      <h2 className="font-display text-xl font-semibold tracking-tight text-sand sm:text-2xl">
        {title}
      </h2>
      <div className="space-y-4 text-sm leading-relaxed text-sand/75 sm:text-base">{children}</div>
    </section>
  )
}

export function LegalList({ items, className }: { items: ReactNode[]; className?: string }) {
  return (
    <ul className={cn(legalListClass, className)}>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  )
}

export function LegalInternalLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link to={to} className={legalLinkClass}>
      {children}
    </Link>
  )
}

export function LegalExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className={legalLinkClass}>
      {children}
    </a>
  )
}

export function LegalMailLink({ email }: { email: string }) {
  return (
    <a href={`mailto:${email}`} className={legalLinkClass}>
      {email}
    </a>
  )
}
