import { Navigate, useParams } from 'react-router-dom'

export function LegacyWorkRedirect() {
  const { projectId } = useParams<{ projectId: string }>()
  return <Navigate to={projectId ? `/project/${projectId}` : '/'} replace />
}
