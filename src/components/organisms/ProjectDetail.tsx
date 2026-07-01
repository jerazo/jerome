import { ArrowUpRight, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { PortfolioProject } from '../../content/portfolio'
import { getPortfolioProjectImages } from '../../content/portfolio'
import { cn } from '../../lib/cn'
import { buttonClassName, Container } from '@/components/atomic'
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
    })
  }

  return (
    <>
      <section className="pt-8 pb-16 sm:pt-10 sm:pb-20" aria-labelledby="project-detail-heading">
        <Container>
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-sand/60">
              <li>
                <Link to="/" className="transition hover:text-sand focus-visible:focus-ring">
                  Home
                </Link>
              </li>
              <li aria-hidden>
                <ChevronRight size={14} className="text-sand/35" />
              </li>
              <li>
                <Link to="/#portfolio" className="transition hover:text-sand focus-visible:focus-ring">
                  Portfolio
                </Link>
              </li>
              <li aria-hidden>
                <ChevronRight size={14} className="text-sand/35" />
              </li>
              <li aria-current="page" className="font-medium text-sand">
                {project.title}
              </li>
            </ol>
          </nav>

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

          <div className="mt-8 max-w-3xl">
            <PortfolioTechStack tags={project.tags} className="mt-0 border-t-0 pt-0" />
          </div>

          <div className="mt-8 max-w-3xl">
            <p className="text-sm leading-relaxed text-sand/70 sm:text-base">{project.summary}</p>
          </div>

          {project.impactNarrative ? (
            <div className="mt-10 max-w-3xl">
              <h2 className="text-[10px] font-semibold uppercase tracking-[0.28em] text-sand/50">
                The story
              </h2>
              <dl className="mt-6 space-y-6">
                {[
                  { label: 'Problem', value: project.impactNarrative.problem },
                  { label: 'Solution', value: project.impactNarrative.solution },
                  { label: 'Result', value: project.impactNarrative.result },
                ].map((item) => (
                  <div key={item.label} className="border-l-2 border-gold-500/40 pl-4">
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gold-200">
                      {item.label}
                    </dt>
                    <dd className="mt-2 text-sm leading-relaxed text-sand/75 sm:text-base">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ) : null}

          {impactMetrics.length > 0 ? (
            <div className="mt-10 max-w-3xl">
              <h2 className="text-[10px] font-semibold uppercase tracking-[0.28em] text-sand/50">
                Impact summary
              </h2>
              <ImpactBadge metrics={impactMetrics} variant="summary" className="mt-4" />
            </div>
          ) : null}

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

          {project.url ? (
            <div className="mt-12">
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
            </div>
          ) : null}
        </Container>
      </section>

      <PortfolioImageModal state={modalState} onClose={() => setModalState(null)} />
    </>
  )
}
