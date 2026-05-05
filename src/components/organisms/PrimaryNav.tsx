import { NavLink } from 'react-router-dom'
import { cn } from '../../lib/cn'
import { primaryNav } from '../../content/nav'
import { NavDropdown } from '../molecules/NavDropdown'

export function PrimaryNav({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav className="hidden items-center justify-end gap-1 lg:flex">
      {primaryNav.map((item) => {
        if (item.type === 'dropdown') {
          return (
            <NavDropdown
              key={item.label}
              label={item.label}
              items={[...item.items]}
              onNavigate={onNavigate}
            />
          )
        }

        return (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn(
                'inline-flex items-center rounded-full px-2 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-sand/70 transition hover:bg-white/5 hover:text-sand focus-visible:focus-ring xl:px-3 xl:text-[11px] xl:tracking-[0.26em]',
                isActive && 'bg-white/5 text-sand',
              )
            }
          >
            {item.label}
          </NavLink>
        )
      })}
    </nav>
  )
}
