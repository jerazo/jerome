import type { IButtonAnchorProps } from '../atomic/types'
import { buttonClassName } from './buttonStyles'

export function ButtonAnchor({
  className,
  variant = 'primary',
  size = 'md',
  ...props
}: IButtonAnchorProps) {
  return <a className={buttonClassName({ variant, size, className })} {...props} />
}
