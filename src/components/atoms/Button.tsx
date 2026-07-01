import type { IButtonAtomProps } from '../atomic/types'
import { buttonClassName } from './buttonStyles'

export function Button({
  className,
  variant = 'primary',
  size = 'md',
  ...props
}: IButtonAtomProps) {
  return (
    <button
      className={buttonClassName({ variant, size, className })}
      {...props}
    />
  )
}
