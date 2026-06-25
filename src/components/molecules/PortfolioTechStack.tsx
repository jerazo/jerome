export function PortfolioTechStack({ tags }: { tags: string[] }) {
  if (tags.length === 0) return null

  return (
    <div className="mt-4 border-t border-sand/10 pt-3">
      <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-sand/40">Stack</p>
      <p className="mt-2 text-[11px] leading-[1.65] text-sand/60">{tags.join(', ')}</p>
    </div>
  )
}
