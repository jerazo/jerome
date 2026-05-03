export function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl border border-sand/10 bg-white/5 px-5 py-4">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sand/60">
        {label}
      </p>
      <p className="mt-1 font-display text-2xl font-semibold tracking-tight text-sand">
        {value}
      </p>
    </div>
  )
}

