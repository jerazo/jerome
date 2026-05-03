import { Search } from 'lucide-react'
import { capabilityTopics } from '../../content/homeSections'
import { Gutter } from '../atoms/Gutter'
import { SectionHeading } from '../molecules/SectionHeading'
import { Tag } from '../atoms/Tag'

export function FeaturedLibrary() {
  return (
    <section className="py-16 sm:py-20">
      <Gutter>
        <div className="grid items-start gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Library"
              title="Search the entire capability set."
              description="Find the strength you need—architecture, performance, delivery discipline, or a full build."
            />
          </div>
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-sand/10 bg-white/5 p-6 shadow-soft">
              <div className="flex items-center gap-3 rounded-2xl border border-sand/10 bg-ink2/70 px-4 py-3">
                <Search size={18} className="text-sand/50" />
                <p className="text-sm text-sand/60">
                  Unlock the full power of my experience. Pick a topic.
                </p>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {capabilityTopics.map((t) => (
                  <Tag key={t} className="cursor-default">
                    {t}
                  </Tag>
                ))}
              </div>
              <p className="mt-4 text-sm text-sand/60">
                For a real engagement, I’ll map these into a plan, milestones, and delivery checkpoints.
              </p>
            </div>
          </div>
        </div>
      </Gutter>
    </section>
  )
}
