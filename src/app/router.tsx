import { createBrowserRouter, Navigate } from 'react-router-dom'
import RootLayout from './RootLayout'
import { NotFoundPage } from '../pages/NotFoundPage'
import { HomePage } from '../pages/HomePage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'services', element: <Navigate to="/#services" replace /> },
      { path: 'work', element: <Navigate to="/#work" replace /> },
      { path: 'about', element: <Navigate to="/#about" replace /> },
      { path: 'contact', element: <Navigate to="/#contact" replace /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
