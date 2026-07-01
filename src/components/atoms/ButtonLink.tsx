import { Link } from 'react-router-dom'
import type { IButtonLinkProps } from '../atomic/types'
import { buttonClassName } from './buttonStyles'

export function ButtonLink({
  className,
  variant = 'primary',
  size = 'md',
  ...props
}: IButtonLinkProps) {
  return <Link className={buttonClassName({ variant, size, className })} {...props} />
}
