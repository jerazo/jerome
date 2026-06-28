import { lazy, Suspense, useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container } from '../atoms/Container'
import { showcaseItems } from '../../content/showcase'
import type { PortfolioProject } from '../../content/portfolio'
import { showcasePageSeo } from '../../content/seo'
import { formatPageTitle } from '../../content/profile'
import { useDebouncedValue } from '../../hooks/useDebouncedValue'
import { useShowcaseDeepLink, readShowcaseDeepLink, syncShowcaseDeepLink } from '../../hooks/useShowcaseDeepLink'
import {
  filterShowcaseItems,
  loadShowcaseFilter,
} from '../../lib/showcaseFilter'
import { showcaseItemToPortfolio } from '../../lib/showcasePortfolio'
import {
  PortfolioImageModal,
  type PortfolioImageModalState,
} from '../molecules/PortfolioImageModal'
import { ShowcaseAlbumFlow } from '../molecules/ShowcaseAlbumFlow'
import { ShowcaseFilter } from '../molecules/ShowcaseFilter'
import { ShowcaseLayout } from './ShowcaseLayout'

const LazyThreeJsHero = lazy(() =>
  import('./ThreeJsHero').then((module) => ({ default: module.ThreeJsHero })),
)

function findProjectIndex(projects: PortfolioProject[], slug: string | null | undefined) {
  if (!slug) return 0
  const index = projects.findIndex((project) => project.id === slug)
  return index >= 0 ? index : 0
}

function readInitialHeroIndex() {
  const initial = readShowcaseDeepLink()
  if (initial.slide != null && Number.isFinite(initial.slide)) {
    return Math.max(0, initial.slide)
  }
  return 0
}

function readInitialProjectIndex() {
  const initial = readShowcaseDeepLink()
  return findProjectIndex(showcaseItems.map(showcaseItemToPortfolio), initial.project)
}

export function ShowcasePage() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState(loadShowcaseFilter)
  const debouncedFilter = useDebouncedValue(filter, 180)
  const [heroIndex, setHeroIndex] = useState(readInitialHeroIndex)
  const [projectIndex, setProjectIndex] = useState(readInitialProjectIndex)
  const [modalState, setModalState] = useState<PortfolioImageModalState | null>(null)

  const filteredItems = useMemo(
    () => filterShowcaseItems(showcaseItems, debouncedFilter),
    [debouncedFilter],
  )

  const portfolioProjects = useMemo(
    () => filteredItems.map(showcaseItemToPortfolio),
    [filteredItems],
  )

  const safeProjectIndex =
    portfolioProjects.length > 0
      ? Math.min(projectIndex, portfolioProjects.length - 1)
      : 0

  const handlePopState = useCallback(
    (state: { slide?: number; project?: string | null }) => {
      if (state.slide != null && Number.isFinite(state.slide)) {
        setHeroIndex(Math.max(0, state.slide))
      }
      setProjectIndex(findProjectIndex(portfolioProjects, state.project))
    },
    [portfolioProjects],
  )

  useShowcaseDeepLink({
    onPopState: handlePopState,
  })

  useEffect(() => {
    document.title = formatPageTitle(showcasePageSeo.title)
  }, [])

  const handleHeroIndexChange = (index: number, userInitiated = false) => {
    setHeroIndex(index)
    if (userInitiated) {
      syncShowcaseDeepLink({
        slide: index,
        project: portfolioProjects[safeProjectIndex]?.id ?? null,
      })
    }
  }

  const handleProjectIndexChange = (index: number, userInitiated = false) => {
    setProjectIndex(index)
    if (userInitiated) {
      syncShowcaseDeepLink({
        slide: heroIndex,
        project: portfolioProjects[index]?.id ?? null,
      })
    }
  }

  const handleFilterChange = (value: string) => {
    setFilter(value)
    setProjectIndex(0)
  }

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
      impactMetrics: project.impactMetrics,
    })
  }

  const openProjectDetails = (project: PortfolioProject) => {
    navigate(`/work/${project.id}`)
  }

  return (
    <ShowcaseLayout>
      <Suspense
        fallback={
          <section
            className="flex min-h-[min(92vh,860px)] items-end px-4 pb-10 pt-28 sm:px-6"
            aria-label="Loading showcase hero"
          >
            <div className="mx-auto h-40 w-full max-w-screen-xl animate-pulse rounded-3xl bg-white/5" />
          </section>
        }
      >
        <LazyThreeJsHero
          activeIndex={heroIndex}
          onActiveIndexChange={handleHeroIndexChange}
        />
      </Suspense>

      <section className="py-16 sm:py-20" aria-labelledby="showcase-heading">
        <Container>
          <div className="max-w-2xl">
            <div className="mb-3 inline-flex items-center gap-2">
              <span className="h-2 w-2 bg-gold-500" aria-hidden="true" />
              <p className="font-mono text-xs font-medium uppercase tracking-[0.28em] text-sand/60">
                Live demos
              </p>
            </div>
            <h1
              id="showcase-heading"
              className="font-display text-3xl font-semibold leading-[1.02] tracking-tight text-sand sm:text-4xl"
            >
              {showcasePageSeo.title}
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-sand/70 sm:text-base">
              {showcasePageSeo.description}
            </p>
          </div>

          <ShowcaseFilter
            items={showcaseItems}
            value={filter}
            onChange={handleFilterChange}
            className="mt-8"
          />

          <div className="mt-10">
            {portfolioProjects.length === 0 ? (
              <p className="rounded-2xl border border-sand/10 bg-white/5 px-4 py-6 text-sm text-sand/70">
                No projects match this technology filter. Try another stack category or show all
                projects.
              </p>
            ) : (
              <ShowcaseAlbumFlow
                projects={portfolioProjects}
                activeIndex={safeProjectIndex}
                onActiveIndexChange={handleProjectIndexChange}
                onOpenImage={openImage}
                onViewDetails={openProjectDetails}
              />
            )}
          </div>
        </Container>
      </section>

      <PortfolioImageModal state={modalState} onClose={() => setModalState(null)} />
    </ShowcaseLayout>
  )
}
