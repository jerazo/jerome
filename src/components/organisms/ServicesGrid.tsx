import { Code2, Gauge, Layers3, Shapes } from 'lucide-react'
import { services } from '../../content/services'
import { Gutter } from '../atoms/Gutter'
import { SectionHeading } from '../molecules/SectionHeading'
import { ServiceCard } from '../molecules/ServiceCard'

const icons = [
  <Code2 key="i1" size={20} />,
  <Shapes key="i2" size={20} />,
  <Layers3 key="i3" size={20} />,
  <Gauge key="i4" size={20} />,
]

export function ServicesGrid({
  eyebrow = 'Services',
  title = 'What I can build for you',
  description = 'Modern web delivery with strong engineering discipline—designed for speed, reliability, and maintainability.',
}: {
  eyebrow?: string
  title?: string
  description?: string
}) {
  return (
    <section id="services" className="py-16 sm:py-20">
      <Gutter>
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {services.map((s, idx) => (
            <ServiceCard
              key={s.title}
              title={s.title}
              description={s.description}
              bullets={s.bullets}
              icon={icons[idx % icons.length]}
            />
          ))}
        </div>
      </Gutter>
    </section>
  )
}
