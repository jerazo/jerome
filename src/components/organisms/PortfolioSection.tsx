import { ArrowUpRight } from 'lucide-react'
import { useState } from 'react'
import { portfolioProjects } from '../../content/portfolio'
import type { PortfolioImage } from '../../content/portfolio'
import { cn } from '../../lib/cn'
import { Gutter } from '../atoms/Gutter'
import {
  PortfolioImageModal,
  type PortfolioImageModalState,
} from '../molecules/PortfolioImageModal'
import { PortfolioCarousel } from '../molecules/PortfolioCarousel'
import { PortfolioTechStack } from '../molecules/PortfolioTechStack'
import { SectionHeading } from '../molecules/SectionHeading'

function PortfolioMedia({
  project,
  onOpenImage,
}: {
  project: (typeof portfolioProjects)[number]
  onOpenImage: (images: PortfolioImage[], index: number, projectTitle: string) => void
}) {
  if (project.images && project.images.length > 0) {
    return (
      <PortfolioCarousel
        images={project.images}
        onImageClick={(index) => onOpenImage(project.images!, index, project.title)}
      />
    )
  }

  if (project.imageSrc) {
    const image: PortfolioImage = {
      src: project.imageSrc,
      alt: project.imageAlt ?? project.title,
    }

    return (
      <button
        type="button"
        onClick={() => onOpenImage([image], 0, project.title)}
        className="relative block h-40 w-full cursor-zoom-in overflow-hidden border-b border-sand/10 bg-ink2/50 text-left focus-visible:focus-ring"
        aria-label={`View larger ${project.title} screenshot`}
      >
        <img
          src={project.imageSrc}
          alt={project.imageAlt ?? project.title}
          className="h-full w-full object-cover object-top transition duration-300 group-hover:scale-[1.02]"
          loading="lazy"
        />
      </button>
    )
  }

  return (
    <div
      className={`h-28 bg-gradient-to-br ${project.accent} border-b border-sand/10`}
      aria-hidden
    />
  )
}

export function PortfolioSection() {
  const [modalState, setModalState] = useState<PortfolioImageModalState | null>(null)

  const openImage = (images: PortfolioImage[], index: number, projectTitle: string) => {
    setModalState({ images, index, projectTitle })
  }

  return (
    <>
      <section
        id="portfolio"
        className="section-surface section-bg-portfolio section-slant-rev py-16 sm:py-20"
      >
        <Gutter>
          <div className="mx-auto w-full max-w-screen-lg">
            <SectionHeading
              eyebrow="Portfolio"
              title="Selected work across products and teams"
              description="A sample of platforms, client engagements, and leadership work from the last two decades."
            />

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {portfolioProjects.map((project) => (
                <article
                  key={project.id}
                  className={cn(
                    'group flex min-h-full flex-col overflow-hidden rounded-3xl border border-sand/10 bg-white/5 shadow-soft transition hover:border-gold-500/25 hover:bg-white/[0.07]',
                    project.span === 'full' && 'sm:col-span-2 lg:col-span-3',
                  )}
                >
                  <PortfolioMedia project={project} onOpenImage={openImage} />
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-sand/45">
                          {project.client}
                        </p>
                        <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-sand">
                          {project.title}
                        </h3>
                      </div>
                      {project.url ? (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex h-9 w-9 flex-none items-center justify-center rounded-full border border-sand/10 bg-ink2/70 text-sand/55 transition hover:border-gold-500/30 hover:text-gold-200 focus-visible:focus-ring"
                          aria-label={`Open ${project.title} in a new tab`}
                        >
                          <ArrowUpRight size={16} aria-hidden />
                        </a>
                      ) : null}
                    </div>

                    <p className="mt-1 font-mono text-xs text-sand/45">{project.period}</p>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-sand/70">
                      {project.summary}
                    </p>

                    <PortfolioTechStack tags={project.tags} />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Gutter>
      </section>

      <PortfolioImageModal state={modalState} onClose={() => setModalState(null)} />
    </>
  )
}
