import { Navigate, useParams } from 'react-router-dom'

export function LegacyWorkRedirect() {
  const { projectId } = useParams<{ projectId: string }>()
  return <Navigate to={projectId ? `/portfolio/${projectId}` : '/'} replace />
}

export function LegacyProjectRedirect() {
  const { slug } = useParams<{ slug: string }>()
  return <Navigate to={slug ? `/portfolio/${slug}` : '/'} replace />
}
