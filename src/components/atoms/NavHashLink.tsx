import type { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '../../lib/cn'

export function useNavHashActive(to: string) {
  const location = useLocation()
  const hash = to.startsWith('/#') ? to.slice(1) : ''
  return location.pathname === '/' && hash.length > 0 && location.hash === hash
}

export function NavHashLink({
  to,
  className,
  activeClassName,
  children,
  onClick,
}: {
  to: string
  className?: string | ((isActive: boolean) => string)
  activeClassName?: string
  children: ReactNode
  onClick?: () => void
}) {
  const isActive = useNavHashActive(to)
  const resolvedClassName =
    typeof className === 'function' ? className(isActive) : cn(className, isActive && activeClassName)

  return (
    <Link to={to} onClick={onClick} className={resolvedClassName} aria-current={isActive ? 'page' : undefined}>
      {children}
    </Link>
  )
}
