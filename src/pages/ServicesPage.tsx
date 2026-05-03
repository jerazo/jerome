import { useEffect } from 'react'
import { ServicesGrid } from '../components/organisms/ServicesGrid'

export function ServicesPage() {
  useEffect(() => {
    document.title = 'Services | Jerome Erazo'
  }, [])

  return (
    <ServicesGrid
      eyebrow="Services"
      title="Web development that ships"
      description="From new builds to improvements on existing products—focused on speed, reliability, and maintainable code."
    />
  )
}

