import { create } from 'zustand'

const STORAGE_KEY = 'jerome-contact-details-revealed'
const LEGACY_STORAGE_KEY = 'jerome-revealed-contacts'

function loadContactDetailsRevealed(): boolean {
  if (typeof window === 'undefined') {
    return false
  }

  try {
    if (window.sessionStorage.getItem(STORAGE_KEY) === 'true') {
      return true
    }

    const legacy = window.sessionStorage.getItem(LEGACY_STORAGE_KEY)
    if (!legacy) return false

    const parsed = JSON.parse(legacy) as { email?: boolean; phone?: boolean }
    return Boolean(parsed.email || parsed.phone)
  } catch {
    return false
  }
}

function persistContactDetailsRevealed() {
  if (typeof window === 'undefined') return
  window.sessionStorage.setItem(STORAGE_KEY, 'true')
  window.sessionStorage.removeItem(LEGACY_STORAGE_KEY)
}

/** Why the contact-access modal was opened — drives its copy. */
export type ContactAccessIntent = 'details' | 'cv'

type UiState = {
  mobileNavOpen: boolean
  setMobileNavOpen: (open: boolean) => void
  homeHeroIndex: number
  setHomeHeroIndex: (index: number | ((current: number) => number)) => void
  contactDetailsRevealed: boolean
  contactAccessModalOpen: boolean
  contactAccessIntent: ContactAccessIntent
  openContactAccess: (intent?: ContactAccessIntent) => void
  setContactAccessModalOpen: (open: boolean) => void
  revealContactDetails: () => void
}

export const useUiStore = create<UiState>((set) => ({
  mobileNavOpen: false,
  setMobileNavOpen: (open) => set({ mobileNavOpen: open }),
  homeHeroIndex: 0,
  setHomeHeroIndex: (index) =>
    set((state) => ({
      homeHeroIndex: typeof index === 'function' ? index(state.homeHeroIndex) : index,
    })),
  contactDetailsRevealed: loadContactDetailsRevealed(),
  contactAccessModalOpen: false,
  contactAccessIntent: 'details',
  openContactAccess: (intent = 'details') =>
    set({ contactAccessIntent: intent, contactAccessModalOpen: true }),
  setContactAccessModalOpen: (open) => set({ contactAccessModalOpen: open }),
  revealContactDetails: () => {
    persistContactDetailsRevealed()
    set({ contactDetailsRevealed: true, contactAccessModalOpen: false })
  },
}))
