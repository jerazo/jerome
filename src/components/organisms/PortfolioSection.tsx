import { useCallback, useEffect, useMemo, useState, type KeyboardEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { portfolioProjects } from '../../content/portfolio'
import type { PortfolioProject } from '../../content/portfolio'
import { Gutter } from '@/components/atomic'
import {
  PortfolioImageModal,
  type PortfolioImageModalState,
} from '../molecules/PortfolioImageModal'
import { PortfolioProjectCard } from '../molecules/PortfolioProjectCard'
import { SectionHeading } from '../molecules/SectionHeading'
import { ShowcaseCarouselControls } from '../molecules/ShowcaseCarouselControls'

function useMobilePortfolioCarousel() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 639px)')

    const update = () => setIsMobile(mql.matches)
    update()
    mql.addEventListener('change', update)
    return () => mql.removeEventListener('change', update)
  }, [])

  return isMobile
}

export function PortfolioSection() {
  const navigate = useNavigate()
  const isMobileCarousel = useMobilePortfolioCarousel()
  const [activeIndex, setActiveIndex] = useState(0)
  const [modalState, setModalState] = useState<PortfolioImageModalState | null>(null)

  const carouselItems = useMemo(
    () =>
      portfolioProjects.map((project) => ({
        id: project.id,
        label: project.title,
      })),
    [],
  )

  const safeIndex =
    portfolioProjects.length > 0 ? activeIndex % portfolioProjects.length : 0
  const activeProject = portfolioProjects[safeIndex]

  const openImage = (project: PortfolioProject, index: number) => {
    const images =
      project.images ??
      (project.imageSrc
        ? [{ src: project.imageSrc, alt: project.imageAlt ?? project.title }]
        : [])

    if (images.length === 0) return

    setModalState({
      images,
      index,
      projectTitle: project.title,
    })
  }

  const openProjectDetails = (project: PortfolioProject) => {
    navigate(`/portfolio/${project.id}`)
  }

  const goPrev = useCallback(() => {
    if (portfolioProjects.length <= 1) return
    setActiveIndex((index) => (index - 1 + portfolioProjects.length) % portfolioProjects.length)
  }, [])

  const goNext = useCallback(() => {
    if (portfolioProjects.length <= 1) return
    setActiveIndex((index) => (index + 1) % portfolioProjects.length)
  }, [])

  const onCarouselKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!isMobileCarousel) return
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      goPrev()
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      goNext()
    }
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

            {isMobileCarousel ? (
              <div className="mt-10">
                <div
                  role="region"
                  aria-label="Portfolio project carousel"
                  aria-roledescription="carousel"
                  tabIndex={0}
                  onKeyDown={onCarouselKeyDown}
                  className="focus-visible:focus-ring rounded-3xl"
                >
                  {activeProject ? (
                    <PortfolioProjectCard
                      key={activeProject.id}
                      project={activeProject}
                      onOpenImage={openImage}
                      onViewDetails={openProjectDetails}
                    />
                  ) : null}
                </div>

                {portfolioProjects.length > 1 ? (
                  <div className="mt-6 flex flex-col gap-4 border-t border-sand/10 pt-6">
                    <p className="font-mono text-xs text-sand/50">
                      Project {safeIndex + 1} of {portfolioProjects.length}
                    </p>
                    <ShowcaseCarouselControls
                      items={carouselItems}
                      activeIndex={safeIndex}
                      onPrev={goPrev}
                      onNext={goNext}
                      onSelect={setActiveIndex}
                      ariaLabel="Portfolio carousel controls"
                    />
                  </div>
                ) : null}
              </div>
            ) : (
              <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {portfolioProjects.map((project) => (
                  <PortfolioProjectCard
                    key={project.id}
                    project={project}
                    onOpenImage={openImage}
                    onViewDetails={openProjectDetails}
                    className={project.span === 'full' ? 'sm:col-span-2 lg:col-span-3' : undefined}
                  />
                ))}
              </div>
            )}
          </div>
        </Gutter>
      </section>

      <PortfolioImageModal state={modalState} onClose={() => setModalState(null)} />
    </>
  )
}
