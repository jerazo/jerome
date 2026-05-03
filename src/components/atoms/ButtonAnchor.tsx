import type { AnchorHTMLAttributes } from 'react'
import { buttonClassName, type ButtonSize, type ButtonVariant } from './buttonStyles'

export type ButtonAnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
}

export function ButtonAnchor({
  className,
  variant = 'primary',
  size = 'md',
  ...props
}: ButtonAnchorProps) {
  return <a className={buttonClassName({ variant, size, className })} {...props} />
}
