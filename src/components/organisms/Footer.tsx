import { formatBuildLabel } from '../../lib/buildInfo'
import { footerNavColumns } from '../../content/nav'
import { Container } from '../atoms/Container'
import { NavHashLink } from '../atoms/NavHashLink'
import { MaskedContactValue } from '../molecules/MaskedContactValue'
import { profile } from '../../content/profile'

const footerLinkClass =
  'text-sm font-medium text-sand/70 transition hover:text-sand focus-visible:focus-ring'

export function Footer() {
  return (
    <footer className="border-t border-sand/10 bg-ink/60">
      <Container className="flex flex-col gap-10 pb-10 pt-[1in] lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <p className="font-display text-xl font-semibold tracking-tight text-sand">
            {profile.name}
          </p>
          <p className="mt-1 text-sm text-sand/70">{profile.headline}</p>
          <p className="mt-3 text-sm text-sand/70">
            <MaskedContactValue field="email" className="hover:text-sand" revealedClassName="hover:text-sand" />
            <span className="mx-2 text-sand/30">•</span>
            <MaskedContactValue field="phone" className="hover:text-sand" revealedClassName="hover:text-sand" />
          </p>
        </div>

        <nav
          className="grid shrink-0 grid-cols-2 gap-x-10 gap-y-8 sm:grid-cols-3 lg:ml-auto lg:justify-items-start"
          aria-label="Footer"
        >
          {footerNavColumns.map((column) => (
            <div key={column.label}>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-sand/45">
                {column.label}
              </p>
              <ul className="mt-3 space-y-2">
                {column.items.map((item) => (
                  <li key={item.to}>
                    {item.external ? (
                      <a
                        href={item.to}
                        target="_blank"
                        rel="noreferrer"
                        className={footerLinkClass}
                      >
                        {item.label}
                      </a>
                    ) : (
                      <NavHashLink to={item.to} className={footerLinkClass}>
                        {item.label}
                      </NavHashLink>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </Container>

      <div className="border-t border-sand/10 py-5">
        <Container className="flex flex-wrap items-center justify-between gap-3 text-xs text-sand/55">
          <p>
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
          <p>
            {formatBuildLabel()} · Built with React • TypeScript • Tailwind
          </p>
        </Container>
      </div>
    </footer>
  )
}
