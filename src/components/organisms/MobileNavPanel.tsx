import { navGroups, navTopLink } from '../../content/nav'
import { cn } from '../../lib/cn'
import { ButtonLink } from '../atoms/ButtonLink'
import { NavHashLink } from '../atoms/NavHashLink'

export function MobileNavPanel({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="rounded-2xl border border-sand/10 bg-ink2/95 p-3 shadow-soft backdrop-blur">
      <NavHashLink
        to={navTopLink.to}
        onClick={onNavigate}
        className={(isActive) =>
          cn(
            'block rounded-xl border border-gold-500/20 bg-gold-500/10 px-4 py-3 text-sm font-semibold text-sand transition hover:bg-gold-500/15 focus-visible:focus-ring',
            isActive && 'border-gold-500/35 bg-gold-500/15',
          )
        }
      >
        {navTopLink.label}
      </NavHashLink>

      {navGroups.map((group, groupIndex) => (
        <div key={group.label} className={cn('mt-4', groupIndex > 0 && 'border-t border-sand/10 pt-4')}>
          <p className="px-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-sand/45">
            {group.label}
          </p>
          <div className="mt-2 grid grid-cols-2 gap-1">
            {group.items.map((item) => (
              <NavHashLink
                key={item.to}
                to={item.to}
                onClick={onNavigate}
                className={(isActive) =>
                  cn(
                    'rounded-xl px-3 py-2.5 text-sm font-medium text-sand/80 transition hover:bg-white/5 hover:text-sand focus-visible:focus-ring',
                    isActive && 'bg-white/5 text-sand',
                  )
                }
              >
                {item.label}
              </NavHashLink>
            ))}
          </div>
        </div>
      ))}

      <ButtonLink to="/#contact" className="mt-4 w-full justify-center" onClick={onNavigate}>
        Book a Call
      </ButtonLink>
    </div>
  )
}
