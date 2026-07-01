import type { IImageAltProps } from '../atomic/types'
import { cn } from '../../lib/cn'
import { portfolioWebpSrc } from '../../lib/portfolioImage'

export function PortfolioImage({
  src,
  alt,
  className,
  loading = 'lazy',
}: IImageAltProps) {
  const webpSrc = portfolioWebpSrc(src)
  const imgClassName = cn('h-full w-full object-cover object-top', className)

  if (!webpSrc) {
    return (
      <img src={src} alt={alt} className={imgClassName} loading={loading} decoding="async" />
    )
  }

  return (
    <picture className="block h-full w-full">
      <source srcSet={webpSrc} type="image/webp" />
      <img src={src} alt={alt} className={imgClassName} loading={loading} decoding="async" />
    </picture>
  )
}
