import { Outlet, useLocation } from 'react-router-dom'
import { ContactAccessModal } from '../components/molecules/ContactAccessModal'
import { Footer } from '../components/organisms/Footer'
import { Header } from '../components/organisms/Header'
import { useSectionHashScroll } from '../hooks/useSectionHashScroll'
import { ScrollToTop } from './ScrollToTop'

export default function RootLayout() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  useSectionHashScroll()

  return (
    <div className="min-h-svh">
      <div className="fixed inset-0 -z-20 bg-black" />
      <div className="fixed inset-0 -z-10 gridlines opacity-50" />

      {isHome ? null : <Header />}
      <ScrollToTop />

      <main className={isHome ? undefined : 'pt-16 sm:pt-20'}>
        <Outlet />
      </main>

      <Footer />
      <ContactAccessModal />
    </div>
  )
}
