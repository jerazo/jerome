import { Download, Lock } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { trackEvent } from '../../lib/analytics'
import { useUiStore } from '../../store/uiStore'
import { Button, ButtonAnchor, Gutter } from '@/components/atomic'
import { SectionHeading } from '../molecules/SectionHeading'

const CV_HREF = '/jerome-erazo-cv.pdf'
const CV_FILENAME = 'Jerome-Lopez-Erazo-CV.pdf'

const cvButtonClass =
  'rounded-2xl border-gold-400/70 bg-gradient-to-b from-gold-400 to-gold-600 px-7 py-4 text-[12px] uppercase tracking-[0.28em] text-white shadow-gold-glow hover:from-gold-300 hover:to-gold-500'

function downloadCv() {
  trackEvent('Resume Downloaded')
  const link = document.createElement('a')
  link.href = CV_HREF
  link.download = CV_FILENAME
  link.rel = 'noopener'
  document.body.appendChild(link)
  link.click()
  link.remove()
}

export function FeaturedResume() {
  const contactDetailsRevealed = useUiStore((state) => state.contactDetailsRevealed)
  const openContactAccess = useUiStore((state) => state.openContactAccess)
  const awaitingRevealRef = useRef(false)

  // After the visitor verifies via the contact-access modal, start the download
  // automatically. Reset if they close the modal without verifying.
  useEffect(() => {
    return useUiStore.subscribe((state) => {
      if (!awaitingRevealRef.current) return
      if (state.contactDetailsRevealed) {
        awaitingRevealRef.current = false
        downloadCv()
      } else if (!state.contactAccessModalOpen) {
        awaitingRevealRef.current = false
      }
    })
  }, [])

  return (
    <section
      id="resume"
      className="section-surface section-bg-resume section-stitch-balanced section-stitch-safe-bottom py-56 sm:py-72"
    >
      <Gutter>
        <div className="mx-auto w-full max-w-screen-lg">
          <SectionHeading
            eyebrow="Resume"
            title="Download my CV"
            description="A PDF download with the full timeline, skills, and highlights."
          />

          <div className="mt-8 flex flex-col items-start justify-between gap-6 border-t border-sand/10 pt-8 sm:flex-row sm:items-center sm:pb-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sand/55">
                PDF resume
              </p>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-sand/70 sm:text-base">
                {contactDetailsRevealed
                  ? 'Prefer a quick download? Grab the CV as a PDF, with no embedded preview.'
                  : 'Share your company and work email to verify you, then the CV download starts automatically — no embedded preview.'}
              </p>
            </div>

            {contactDetailsRevealed ? (
              <ButtonAnchor
                href={CV_HREF}
                download={CV_FILENAME}
                className={cvButtonClass}
                onClick={() => trackEvent('Resume Downloaded')}
              >
                Download CV <Download size={16} />
              </ButtonAnchor>
            ) : (
              <Button
                type="button"
                aria-haspopup="dialog"
                className={cvButtonClass}
                onClick={() => {
                  awaitingRevealRef.current = true
                  openContactAccess('cv')
                }}
              >
                Unlock CV download <Lock size={16} />
              </Button>
            )}
          </div>
        </div>
      </Gutter>
    </section>
  )
}
