import { createBrowserRouter, Navigate } from 'react-router-dom'
import RootLayout from './RootLayout'
import { NotFoundPage } from '../pages/NotFoundPage'
import { HomePage } from '../pages/HomePage'
import { ServicesPage } from '../pages/ServicesPage'
import { WorkPage } from '../pages/WorkPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'services', element: <ServicesPage /> },
      { path: 'work', element: <WorkPage /> },
      { path: 'about', element: <Navigate to="/#about" replace /> },
      { path: 'contact', element: <Navigate to="/#contact" replace /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
