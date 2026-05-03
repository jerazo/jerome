import { create } from 'zustand'

type UiState = {
  mobileNavOpen: boolean
  setMobileNavOpen: (open: boolean) => void
  homeHeroIndex: number
  setHomeHeroIndex: (index: number) => void
}

export const useUiStore = create<UiState>((set) => ({
  mobileNavOpen: false,
  setMobileNavOpen: (open) => set({ mobileNavOpen: open }),
  homeHeroIndex: 0,
  setHomeHeroIndex: (index) => set({ homeHeroIndex: index }),
}))
