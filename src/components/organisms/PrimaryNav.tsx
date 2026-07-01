import { cn } from '../../lib/cn'
import { desktopMoreLinks, desktopNavLinks, navTopLink } from '../../content/nav'
import { NavHashLink } from '@/components/atomic'
import { NavDropdown } from '../molecules/NavDropdown'

const linkClass = (isActive: boolean) =>
  cn(
    'inline-flex min-h-11 items-center rounded-full border border-transparent px-2.5 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-sand/75 transition hover:border-gold-500/20 hover:bg-white/5 hover:text-sand focus-visible:focus-ring xl:px-3 xl:tracking-[0.24em]',
    isActive && 'border-gold-500/35 bg-white/5 text-sand',
  )

export function PrimaryNav({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav className="hidden items-center justify-end gap-0.5 lg:flex" aria-label="Primary">
      <NavHashLink to={navTopLink.to} onClick={onNavigate} className={linkClass}>
        {navTopLink.label}
      </NavHashLink>
      {desktopNavLinks.map((item) => (
        <NavHashLink key={item.to} to={item.to} onClick={onNavigate} className={linkClass}>
          {item.label}
        </NavHashLink>
      ))}
      <NavDropdown label="More" items={[...desktopMoreLinks]} onNavigate={onNavigate} />
    </nav>
  )
}
