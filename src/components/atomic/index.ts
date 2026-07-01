/**
 * Preferred import point for atomic (atom) components and shared prop contracts.
 * Use `@/components/atomic` instead of deep relative paths into `src/components/atoms`.
 *
 * Atoms should keep importing prop types from `../atomic/types` directly so this
 * barrel does not introduce circular dependencies.
 */

export { Button } from '../atoms/Button'
export { ButtonAnchor } from '../atoms/ButtonAnchor'
export { ButtonLink } from '../atoms/ButtonLink'
export { Container } from '../atoms/Container'
export { CopyLinkButton } from '../atoms/CopyLinkButton'
export { Gutter } from '../atoms/Gutter'
export { LogoMark } from '../atoms/LogoMark'
export { NavHashLink } from '../atoms/NavHashLink'
export { PortfolioImage } from '../atoms/PortfolioImage'
export { SkipToContent } from '../atoms/SkipToContent'
export { Tag } from '../atoms/Tag'
export { TruncatedText } from '../atoms/TruncatedText'

export { buttonClassName } from '../atoms/buttonStyles'
export type { ButtonSize, ButtonVariant } from '../atoms/buttonStyles'

export type {
  AtomProps,
  IButtonAnchorProps,
  IButtonAtomProps,
  IButtonLinkProps,
  IClickableProps,
  IContainerProps,
  ICopyLinkButtonProps,
  IGutterProps,
  IImageAltProps,
  IImageProps,
  IImpactMetricProps,
  ILogoMarkProps,
  INavHashLinkProps,
  ISkipToContentProps,
  ITagProps,
  ITruncatedTextProps,
} from './types'
