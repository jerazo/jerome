import { createBrowserRouter, Navigate } from 'react-router-dom'
import RootLayout from './RootLayout'
import { HomePage } from '../pages/HomePage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { RouteErrorPage } from '../pages/RouteErrorPage'
import { ShowcasePageRoute } from '../pages/ShowcasePage'
import { ProjectDetailPageRoute } from '../pages/ProjectDetailPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <RouteErrorPage />,
    children: [
      { index: true, element: <HomePage />, errorElement: <RouteErrorPage /> },
      { path: 'services', element: <Navigate to="/#services" replace /> },
      { path: 'work/:projectId', element: <ProjectDetailPageRoute />, errorElement: <RouteErrorPage /> },
      { path: 'work', element: <Navigate to="/#work" replace /> },
      { path: 'about', element: <Navigate to="/#about" replace /> },
      { path: 'contact', element: <Navigate to="/#contact" replace /> },
      { path: 'showcase', element: <ShowcasePageRoute />, errorElement: <RouteErrorPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
