import { Link } from 'react-router-dom'
import { formatBuildLabel } from '../../lib/buildInfo'
import { Container } from '../atoms/Container'
import { profile } from '../../content/profile'

export function Footer() {
  return (
    <footer className="border-t border-sand/10 bg-ink/60">
      <Container className="grid gap-6 py-10 sm:grid-cols-2 sm:items-center">
        <div>
          <p className="font-display text-xl font-semibold tracking-tight text-sand">
            {profile.name}
          </p>
          <p className="mt-1 text-sm text-sand/70">{profile.headline}</p>
          <p className="mt-3 text-sm text-sand/70">
            <a className="hover:text-sand" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            <span className="mx-2 text-sand/30">•</span>
            <a className="hover:text-sand" href={`tel:${profile.phone.replace(/\\s+/g, '')}`}>
              {profile.phone}
            </a>
          </p>
        </div>
        <div className="flex flex-wrap gap-3 sm:justify-end">
          <Link className="text-sm font-semibold text-sand/70 hover:text-sand" to="/#services">
            Services
          </Link>
          <Link className="text-sm font-semibold text-sand/70 hover:text-sand" to="/#about">
            About
          </Link>
          <Link className="text-sm font-semibold text-sand/70 hover:text-sand" to="/#portfolio">
            Portfolio
          </Link>
          <Link className="text-sm font-semibold text-sand/70 hover:text-sand" to="/#work">
            Experience
          </Link>
          <a
            className="text-sm font-semibold text-sand/70 hover:text-sand"
            href={profile.links.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </Container>
      <div className="border-t border-sand/10 py-5">
        <Container className="flex flex-wrap items-center justify-between gap-3 text-xs text-sand/55">
          <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
          <p>
            {formatBuildLabel()} · Built with React • TypeScript • Tailwind
          </p>
        </Container>
      </div>
    </footer>
  )
}
