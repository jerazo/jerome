import { navGroups, navTopLink } from '../../content/nav'
import { cn } from '../../lib/cn'
import { ButtonLink } from '../atoms/ButtonLink'
import { NavHashLink } from '../atoms/NavHashLink'

type MobileNavPanelProps = {
  id: string
  onNavigate?: () => void
}

const navLinkClass = (isActive: boolean) =>
  cn(
    'flex min-h-11 items-center rounded-xl px-3 py-2.5 text-sm font-medium text-sand/85 transition hover:bg-white/5 hover:text-sand focus-visible:focus-ring',
    isActive && 'bg-white/5 text-sand',
  )

export function MobileNavPanel({ id, onNavigate }: MobileNavPanelProps) {
  return (
    <nav
      id={id}
      aria-label="Mobile"
      className="rounded-2xl border border-sand/10 bg-ink2/95 p-3 shadow-soft backdrop-blur"
    >
      <ul role="list" className="space-y-1">
        <li>
          <NavHashLink
            to={navTopLink.to}
            onClick={onNavigate}
            className={(isActive) =>
              cn(
                'flex min-h-11 items-center rounded-xl border border-gold-500/20 bg-gold-500/10 px-4 py-3 text-sm font-semibold text-sand transition hover:bg-gold-500/15 focus-visible:focus-ring',
                isActive && 'border-gold-500/35 bg-gold-500/15',
              )
            }
          >
            {navTopLink.label}
          </NavHashLink>
        </li>
      </ul>

      {navGroups.map((group, groupIndex) => (
        <div key={group.label} className={cn('mt-4', groupIndex > 0 && 'border-t border-sand/10 pt-4')}>
          <p
            id={`${id}-${group.label.replace(/\s+/g, '-').toLowerCase()}-label`}
            className="px-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-sand/60"
          >
            {group.label}
          </p>
          <ul
            role="list"
            aria-labelledby={`${id}-${group.label.replace(/\s+/g, '-').toLowerCase()}-label`}
            className="mt-2 grid grid-cols-2 gap-1"
          >
            {group.items.map((item) => (
              <li key={item.to}>
                <NavHashLink to={item.to} onClick={onNavigate} className={navLinkClass}>
                  {item.label}
                </NavHashLink>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <ButtonLink to="/#contact" className="mt-4 w-full justify-center" onClick={onNavigate}>
        Book a Call
      </ButtonLink>
    </nav>
  )
}
