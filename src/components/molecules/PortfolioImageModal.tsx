import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import type { PortfolioImage } from '../../content/portfolio'
import { cn } from '../../lib/cn'

export type PortfolioImageModalState = {
  projectTitle: string
  images: PortfolioImage[]
  index: number
}

export function PortfolioImageModal({
  state,
  onClose,
}: {
  state: PortfolioImageModalState | null
  onClose: () => void
}) {
  if (!state) return null

  return (
    <PortfolioImageModalContent
      key={`${state.projectTitle}:${state.index}:${state.images.map((image) => image.src).join('|')}`}
      state={state}
      onClose={onClose}
    />
  )
}

function PortfolioImageModalContent({
  state,
  onClose,
}: {
  state: PortfolioImageModalState
  onClose: () => void
}) {
  const [index, setIndex] = useState(state.index)

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (state.images.length <= 1) return
      if (event.key === 'ArrowLeft') {
        setIndex((i) => (i - 1 + state.images.length) % state.images.length)
      }
      if (event.key === 'ArrowRight') {
        setIndex((i) => (i + 1) % state.images.length)
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [onClose, state.images.length])

  const total = state.images.length
  const current = state.images[index]
  if (!current) return null

  const goPrev = () => setIndex((i) => (i - 1 + total) % total)
  const goNext = () => setIndex((i) => (i + 1) % total)

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={current.label ?? state.projectTitle}
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/85 backdrop-blur-sm"
        aria-label="Close preview"
        onClick={onClose}
      />

      <div className="relative z-10 flex w-full max-w-6xl flex-col gap-3">
        <div className="flex items-center justify-between gap-4 px-1">
          <div className="min-w-0">
            <p className="truncate font-display text-lg font-semibold text-sand sm:text-xl">
              {current.label ?? state.projectTitle}
            </p>
            {total > 1 ? (
              <p className="mt-0.5 font-mono text-xs text-sand/55">
                {index + 1} of {total}
              </p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-full border border-sand/15 bg-ink2/90 text-sand transition hover:border-gold-500/30 hover:text-gold-200 focus-visible:focus-ring"
            aria-label="Close preview"
          >
            <X size={18} />
          </button>
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-sand/10 bg-ink2 shadow-soft">
          <img
            src={current.src}
            alt={current.alt}
            className="max-h-[78vh] w-full object-contain"
          />

          {total > 1 ? (
            <>
              <button
                type="button"
                onClick={goPrev}
                className="absolute left-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-sand/15 bg-ink2/90 text-sand/80 transition hover:border-gold-500/30 hover:text-sand focus-visible:focus-ring"
                aria-label="Previous screenshot"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={goNext}
                className="absolute right-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-sand/15 bg-ink2/90 text-sand/80 transition hover:border-gold-500/30 hover:text-sand focus-visible:focus-ring"
                aria-label="Next screenshot"
              >
                <ChevronRight size={18} />
              </button>
            </>
          ) : null}
        </div>

        {total > 1 ? (
          <div className="flex justify-center gap-1.5 px-1">
            {state.images.map((image, i) => (
              <button
                key={image.src}
                type="button"
                onClick={() => setIndex(i)}
                className={cn(
                  'h-1.5 rounded-full transition-all focus-visible:focus-ring',
                  i === index ? 'w-4 bg-gold-300' : 'w-1.5 bg-sand/35 hover:bg-sand/55',
                )}
                aria-label={`Show ${image.label ?? `screenshot ${i + 1}`}`}
                aria-current={i === index ? 'true' : undefined}
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>,
    document.body,
  )
}
