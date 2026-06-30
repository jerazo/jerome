import { Outlet, useLocation } from 'react-router-dom'
import { SkipToContent } from '@/components/atomic'
import { ContactAccessModal } from '../components/molecules/ContactAccessModal'
import { Footer } from '../components/organisms/Footer'
import { Header } from '../components/organisms/Header'
import { useAnalyticsPageView } from '../hooks/useAnalyticsPageView'
import { useSectionHashScroll } from '../hooks/useSectionHashScroll'
import { useUiStore } from '../store/uiStore'
import { ScrollToTop } from './ScrollToTop'

export default function RootLayout() {
  const location = useLocation()
  const isHome = location.pathname === '/'
  const isShowcase = location.pathname === '/showcase'
  const mobileNavOpen = useUiStore((state) => state.mobileNavOpen)
  const lockBackgroundFocus = !isHome && mobileNavOpen
  const hideDefaultHeader = isHome || isShowcase

  useSectionHashScroll()
  useAnalyticsPageView()

  return (
    <div className="min-h-svh">
      <SkipToContent />
      <div className="fixed inset-0 -z-20 bg-black" />
      <div className="fixed inset-0 -z-10 gridlines opacity-50" />

      {hideDefaultHeader ? null : <Header />}
      <ScrollToTop />

      <main
        id="main-content"
        tabIndex={-1}
        inert={lockBackgroundFocus ? true : undefined}
        className={hideDefaultHeader ? undefined : 'pt-16 sm:pt-20'}
      >
        <Outlet />
      </main>

      <Footer inert={lockBackgroundFocus ? true : undefined} />
      <ContactAccessModal />
    </div>
  )
}
