import type { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '../../lib/cn'

export function NavHashLink({
  to,
  className,
  activeClassName,
  children,
  onClick,
  role,
}: {
  to: string
  className?: string | ((isActive: boolean) => string)
  activeClassName?: string
  children: ReactNode
  onClick?: () => void
  role?: string
}) {
  const location = useLocation()
  const hash = to.startsWith('/#') ? to.slice(1) : ''
  const isHashLink = hash.length > 0
  const isActive = isHashLink
    ? location.pathname === '/' && location.hash === hash
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
