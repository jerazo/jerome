import { useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { ProjectDetail } from '../components/organisms/ProjectDetail'
import { getPortfolioProject } from '../content/portfolio'
import { formatPageTitle } from '../content/profile'

export function ProjectDetailPageRoute() {
  const { slug } = useParams<{ slug: string }>()
  const project = slug ? getPortfolioProject(slug) : undefined

  useEffect(() => {
    if (project) {
      document.title = formatPageTitle(project.title)
    }
  }, [project])

  if (!slug || !project) {
    return <Navigate to="/" replace />
  }

  return <ProjectDetail project={project} />
}
