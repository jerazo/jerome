import { useEffect, useId, useRef } from 'react'
import { useFocusTrap } from './useFocusTrap'

const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled])'

export function useMobileNav(open: boolean, setOpen: (open: boolean) => void) {
  const menuId = useId()
  const triggerRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useFocusTrap(panelRef, open)

  useEffect(() => {
    if (!open) return

    const panel = panelRef.current
    const firstFocusable = panel?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR)
    firstFocusable?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setOpen(false)
      triggerRef.current?.focus()
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, setOpen])

  const close = () => {
    setOpen(false)
    triggerRef.current?.focus()
  }

  const toggle = () => {
    if (open) {
      close()
      return
    }
    setOpen(true)
  }

  return { menuId, triggerRef, panelRef, toggle, close }
}
