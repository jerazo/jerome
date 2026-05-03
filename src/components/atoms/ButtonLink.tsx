import type { LinkProps } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { buttonClassName, type ButtonSize, type ButtonVariant } from './buttonStyles'

export type ButtonLinkProps = LinkProps & {
  variant?: ButtonVariant
  size?: ButtonSize
}

export function ButtonLink({
  className,
  variant = 'primary',
  size = 'md',
  ...props
}: ButtonLinkProps) {
  return <Link className={buttonClassName({ variant, size, className })} {...props} />
}
