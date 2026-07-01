import { createBrowserRouter, Navigate } from 'react-router-dom'
import RootLayout from './RootLayout'
import { HomePage } from '../pages/HomePage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { PrivacyPage } from '../pages/PrivacyPage'
import { RouteErrorPage } from '../pages/RouteErrorPage'
import { ShowcasePageRoute } from '../pages/ShowcasePage'
import { ProjectDetailPageRoute } from '../pages/ProjectDetailPage'
import { LegacyProjectRedirect, LegacyWorkRedirect } from '../pages/LegacyWorkRedirect'
import { TermsPage } from '../pages/TermsPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <RouteErrorPage />,
    children: [
      { index: true, element: <HomePage />, errorElement: <RouteErrorPage /> },
      { path: 'services', element: <Navigate to="/#services" replace /> },
      { path: 'portfolio/:slug', element: <ProjectDetailPageRoute />, errorElement: <RouteErrorPage /> },
      { path: 'project/:slug', element: <LegacyProjectRedirect />, errorElement: <RouteErrorPage /> },
      {
        path: 'work/:projectId',
        element: <LegacyWorkRedirect />,
        errorElement: <RouteErrorPage />,
      },
      { path: 'work', element: <Navigate to="/#work" replace /> },
      { path: 'about', element: <Navigate to="/#about" replace /> },
      { path: 'contact', element: <Navigate to="/#contact" replace /> },
      { path: 'showcase', element: <ShowcasePageRoute />, errorElement: <RouteErrorPage /> },
      { path: 'privacy', element: <PrivacyPage /> },
      { path: 'terms', element: <TermsPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
