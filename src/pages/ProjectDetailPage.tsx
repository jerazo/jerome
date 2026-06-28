import { useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { ProjectDetail } from '../components/organisms/ProjectDetail'
import { getPortfolioProject } from '../content/portfolio'
import { formatPageTitle } from '../content/profile'

export function ProjectDetailPageRoute() {
  const { projectId } = useParams<{ projectId: string }>()
  const project = projectId ? getPortfolioProject(projectId) : undefined

  useEffect(() => {
    if (project) {
      document.title = formatPageTitle(project.title)
    }
  }, [project])

  if (!projectId || !project) {
    return <Navigate to="/" replace />
  }

  return <ProjectDetail project={project} />
}
