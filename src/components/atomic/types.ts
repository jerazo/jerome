import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  HTMLAttributes,
  ReactNode,
} from 'react'
import type { LinkProps } from 'react-router-dom'
import type { ButtonSize, ButtonVariant } from '../atoms/buttonStyles'

/**
 * Base props shared by all atomic components.
 * Extends native HTML attributes with an explicit `role` field for accessibility overrides.
 */
export interface AtomProps<T extends HTMLElement = HTMLElement> extends HTMLAttributes<T> {
  /** Accessible role when the default semantic element is insufficient. */
  role?: string
}

/**
 * Props for image atoms that require a source URL.
 */
export interface IImageProps {
  /** Image asset path or URL. */
  src: string
  className?: string
  /** Image loading strategy; defaults to `lazy`. */
  loading?: 'lazy' | 'eager'
}

/**
 * Accessible image props extending {@link IImageProps} with required alt text.
 */
export interface IImageAltProps extends IImageProps {
  /** Descriptive alt text for screen readers. */
  alt: string
}

/**
 * Props for clickable atom controls such as buttons and icon actions.
 */
export interface IClickableProps extends AtomProps<HTMLButtonElement> {
  /** Accessible label for icon-only or ambiguous controls. */
  label?: string
}

/**
 * Props for impact metric badge atoms displaying a label/value pair.
 */
export interface IImpactMetricProps extends AtomProps<HTMLSpanElement> {
  /** Metric label (e.g. "Conversion lift"). */
  label: string
  /** Display value (e.g. "+42%"). */
  value: string
}

/** Props for {@link CopyLinkButton}. */
export interface ICopyLinkButtonProps extends IClickableProps {
  /** URL copied to the clipboard when the control is activated. */
  url: string
}

/** Props for {@link NavHashLink}. */
export interface INavHashLinkProps extends Omit<AtomProps<HTMLAnchorElement>, 'className'> {
  /** Router destination, including optional hash segments. */
  to: string
  className?: string | ((isActive: boolean) => string)
  /** Class applied when the link matches the current route or hash. */
  activeClassName?: string
  children: ReactNode
}

/** Props for {@link Button}. */
export interface IButtonAtomProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
}

/** Props for {@link ButtonLink}. */
export interface IButtonLinkProps extends LinkProps {
  variant?: ButtonVariant
  size?: ButtonSize
}

/** Props for {@link ButtonAnchor}. */
export interface IButtonAnchorProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant
  size?: ButtonSize
}

/** Props for {@link LogoMark}. */
export type ILogoMarkProps = Pick<AtomProps<HTMLSpanElement>, 'className'>

/** Props for {@link TruncatedText}. */
export interface ITruncatedTextProps extends AtomProps<HTMLSpanElement> {
  /** Full text content; truncated visually when overflow occurs. */
  text: string
}

/** Props for {@link Container}. */
export type IContainerProps = AtomProps<HTMLDivElement>

/** Props for {@link Gutter}. */
export type IGutterProps = AtomProps<HTMLDivElement>

/** Props for {@link Tag}. */
export type ITagProps = AtomProps<HTMLSpanElement>

/** Props for {@link SkipToContent}. */
export type ISkipToContentProps = AtomProps<HTMLAnchorElement>
