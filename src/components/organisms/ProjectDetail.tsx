import { ArrowLeft, ArrowRight, ArrowUpRight, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { PortfolioProject } from '../../content/portfolio'
import { getPortfolioProjectImages } from '../../content/portfolio'
import { portfolioProjectShowcaseHashId } from '../../lib/showcasePortfolio'
import { cn } from '../../lib/cn'
import { buttonClassName, ButtonLink, Container, CopyLinkButton } from '@/components/atomic'
import { ImpactBadge } from '../molecules/ImpactBadge'
import {
  PortfolioImageModal,
  type PortfolioImageModalState,
} from '../molecules/PortfolioImageModal'
import { PortfolioCarousel } from '../molecules/PortfolioCarousel'
import { PortfolioTechStack } from '../molecules/PortfolioTechStack'

const projectDetailCtaClass =
  'w-full justify-center shadow-gold-glow sm:w-auto sm:px-7 sm:py-4 sm:text-[15px]'

function resolveProjectShareUrl(project: PortfolioProject) {
  if (typeof window === 'undefined') return `/project/${project.id}`
  return `${window.location.origin}/project/${project.id}`
}

function resolveShowcaseBackLink(project: PortfolioProject) {
  const showcaseHashId = portfolioProjectShowcaseHashId(project.id)
  if (showcaseHashId) return `/showcase#project-${showcaseHashId}`
  return '/showcase'
}

export function ProjectDetail({ project }: { project: PortfolioProject }) {
  const images = getPortfolioProjectImages(project)
  const [modalState, setModalState] = useState<PortfolioImageModalState | null>(null)
  const impactMetrics = project.impactMetrics ?? (project.impactMetric ? [project.impactMetric] : [])
  const shareUrl = resolveProjectShareUrl(project)
  const showcaseBackLink = resolveShowcaseBackLink(project)

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
                <Link to="/showcase" className="transition hover:text-sand focus-visible:focus-ring">
                  Showcase
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

          <ButtonLink
            to={showcaseBackLink}
            variant="ghost"
            size="sm"
            className="mb-8 -ml-1 inline-flex items-center gap-2 px-2 text-sand/70 hover:text-sand"
          >
            <ArrowLeft size={14} aria-hidden />
            Back to Showcase
          </ButtonLink>

          <div className="max-w-3xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-sand/45">
              {project.client}
            </p>
            <div className="mt-2 flex items-start gap-3">
              <h1
                id="project-detail-heading"
                className="font-display text-3xl font-semibold leading-[1.02] tracking-tight text-sand sm:text-4xl"
              >
                {project.title}
              </h1>
              <CopyLinkButton url={shareUrl} />
            </div>
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
