import { Link, useLocation } from 'react-router-dom'
import type { INavHashLinkProps } from '../atomic/types'
import { cn } from '../../lib/cn'

export function NavHashLink({
  to,
  className,
  activeClassName,
  children,
  onClick,
  role,
}: INavHashLinkProps) {
  const location = useLocation()
  const hash = to.startsWith('/#') ? to.slice(1) : to.includes('#') ? to.slice(to.indexOf('#')) : ''
  const path = to.includes('#') ? to.slice(0, to.indexOf('#')) || '/' : to
  const isHashLink = hash.length > 0
  const isActive = isHashLink
    ? location.pathname === path && location.hash === hash
    : location.pathname === to
  const resolvedClassName =
    typeof className === 'function' ? className(isActive) : cn(className, isActive && activeClassName)

  return (
    <Link
      to={to}
      onClick={onClick}
      className={resolvedClassName}
      aria-current={isActive ? 'page' : undefined}
      role={role}
    >
      {children}
    </Link>
  )
}
