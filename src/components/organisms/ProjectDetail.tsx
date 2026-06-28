import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { useState } from 'react'
import type { PortfolioProject } from '../../content/portfolio'
import { getPortfolioProjectImages } from '../../content/portfolio'
import { cn } from '../../lib/cn'
import { ButtonLink } from '../atoms/ButtonLink'
import { buttonClassName } from '../atoms/buttonStyles'
import { Container } from '../atoms/Container'
import { ImpactBadge } from '../molecules/ImpactBadge'
import {
  PortfolioImageModal,
  type PortfolioImageModalState,
} from '../molecules/PortfolioImageModal'
import { PortfolioCarousel } from '../molecules/PortfolioCarousel'
import { PortfolioTechStack } from '../molecules/PortfolioTechStack'

const projectDetailCtaClass =
  'w-full justify-center shadow-gold-glow sm:w-auto sm:px-7 sm:py-4 sm:text-[15px]'

export function ProjectDetail({ project }: { project: PortfolioProject }) {
  const images = getPortfolioProjectImages(project)
  const [modalState, setModalState] = useState<PortfolioImageModalState | null>(null)
  const impactMetrics = project.impactMetrics ?? (project.impactMetric ? [project.impactMetric] : [])

  const openImage = (index: number) => {
    if (images.length === 0) return
    setModalState({
      images,
      index,
      projectTitle: project.title,
      impactMetrics,
    })
  }

  return (
    <>
      <section className="py-16 sm:py-20" aria-labelledby="project-detail-heading">
        <Container>
          <ButtonLink
            to="/#portfolio"
            variant="ghost"
            size="sm"
            className="mb-8 -ml-1 inline-flex items-center gap-2 px-2 text-sand/70 hover:text-sand"
          >
            <ArrowLeft size={14} aria-hidden />
            Back to portfolio
          </ButtonLink>

          <div className="max-w-3xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-sand/45">
              {project.client}
            </p>
            <h1
              id="project-detail-heading"
              className="mt-2 font-display text-3xl font-semibold leading-[1.02] tracking-tight text-sand sm:text-4xl"
            >
              {project.title}
            </h1>
            <p className="mt-2 font-mono text-xs text-sand/45">{project.period}</p>
          </div>

          {impactMetrics.length > 0 ? (
            <div className="mt-10 rounded-3xl border border-sand/10 bg-white/[0.03] p-6 sm:p-8">
              <h2 className="text-[10px] font-semibold uppercase tracking-[0.28em] text-sand/50">
                Impact summary
              </h2>
              <ImpactBadge metrics={impactMetrics} variant="summary" className="mt-4" />
            </div>
          ) : null}

          {project.impactNarrative ? (
            <div className="mt-10 max-w-3xl space-y-4 rounded-3xl border border-sand/10 bg-white/[0.02] p-6 sm:p-8">
              <h2 className="text-[10px] font-semibold uppercase tracking-[0.28em] text-sand/50">
                The story
              </h2>
              <div className="space-y-4 font-serif text-base leading-relaxed text-sand/85 sm:text-[1.05rem]">
                <p>
                  <span className="font-semibold not-italic text-gold-200">Problem.</span>{' '}
                  {project.impactNarrative.problem}
                </p>
                <p>
                  <span className="font-semibold not-italic text-gold-200">Solution.</span>{' '}
                  {project.impactNarrative.solution}
                </p>
                <p>
                  <span className="font-semibold not-italic text-gold-200">Result.</span>{' '}
                  {project.impactNarrative.result}
                </p>
              </div>
            </div>
          ) : null}

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <ButtonLink
              to="/#contact"
              aria-label="Let's build together — go to the contact form"
              className={projectDetailCtaClass}
            >
              Let&apos;s Build Together <ArrowRight size={16} aria-hidden />
            </ButtonLink>
            {project.url ? (
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className={buttonClassName({
                  variant: 'secondary',
                  size: 'md',
                  className: cn(projectDetailCtaClass, 'shadow-soft'),
                })}
              >
                View live project
                <ArrowUpRight size={16} aria-hidden />
              </a>
            ) : null}
          </div>

          <div className="mt-10 max-w-3xl">
            <p className="text-sm leading-relaxed text-sand/70 sm:text-base">{project.summary}</p>
            <PortfolioTechStack tags={project.tags} />
          </div>

          {images.length > 0 ? (
            <div className="mt-12 overflow-hidden rounded-3xl border border-sand/10 bg-ink2/40 shadow-soft">
              <PortfolioCarousel
                images={images}
                className="aspect-[16/10] w-full border-b-0"
                onImageClick={openImage}
              />
            </div>
          ) : (
            <div
              className={cn(
                'mt-12 aspect-[16/10] w-full rounded-3xl border border-sand/10 bg-gradient-to-br',
                project.accent,
              )}
              aria-hidden
            />
          )}
        </Container>
      </section>

      <PortfolioImageModal state={modalState} onClose={() => setModalState(null)} />
    </>
  )
}
