import { Mail } from 'lucide-react'
import { profile } from '../../content/profile'
import { cn } from '../../lib/cn'
import { ButtonLink } from '@/components/atomic'

const footerCtaButtonClass =
  'min-h-11 gap-2.5 rounded-full border-white/15 bg-ink2/95 px-5 py-3 text-sm font-semibold text-sand shadow-soft backdrop-blur-md transition hover:border-white/25 hover:bg-graphite/95 hover:shadow-[0_18px_60px_rgba(0,0,0,0.65)]'

export function FooterContactCta({ className }: { className?: string }) {
  const { footerCta } = profile

  return (
    <ButtonLink
      to={footerCta.to}
      aria-label={footerCta.ariaLabel}
      title={footerCta.subtext}
      className={cn(footerCtaButtonClass, className)}
    >
      <Mail size={18} className="shrink-0 text-gold-400" aria-hidden />
      {footerCta.label}
    </ButtonLink>
  )
}
