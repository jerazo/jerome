import { Tag } from '../atoms/Tag'
import { cn } from '../../lib/cn'
import type { SkillHighlightTier, SkillItem } from '../../content/techStack'

const tierClassName: Record<SkillHighlightTier, string> = {
  primary:
    'border-gold-300/80 bg-gradient-to-b from-gold-400/30 to-gold-600/15 font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]',
  featured: 'border-gold-500/50 bg-gold-500/12 font-medium text-gold-100',
  default: 'border-sand/20 bg-black/20 font-normal text-sand/45',
}

export function SkillTag({
  name,
  experience,
  tier = 'default',
  className,
}: SkillItem & { tier?: SkillHighlightTier; className?: string }) {
  return (
    <Tag
      title={experience ? `${name}: ${experience}` : name}
      className={cn('px-3 py-1 text-xs', tierClassName[tier], className)}
    >
      {name}
    </Tag>
  )
}
