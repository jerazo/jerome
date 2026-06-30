import { Check, Link2 } from 'lucide-react'
import { useCallback, useState } from 'react'
import type { ICopyLinkButtonProps } from '../atomic/types'
import { cn } from '../../lib/cn'

export function CopyLinkButton({
  url,
  className,
  label = 'Copy link to this project',
}: ICopyLinkButtonProps) {
  const [copied, setCopied] = useState(false)

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = url
      textarea.setAttribute('readonly', '')
      textarea.style.position = 'absolute'
      textarea.style.left = '-9999px'
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    }
  }, [url])

  return (
    <button
      type="button"
      onClick={() => void copy()}
      className={cn(
        'inline-flex h-9 w-9 flex-none items-center justify-center rounded-full border border-sand/10 bg-ink2/70 text-sand/55 transition hover:border-gold-500/30 hover:text-gold-200 focus-visible:focus-ring',
        copied && 'border-gold-500/40 text-gold-200',
        className,
      )}
      aria-label={copied ? 'Link copied to clipboard' : label}
      title={copied ? 'Copied!' : label}
    >
      {copied ? <Check size={16} aria-hidden /> : <Link2 size={16} aria-hidden />}
    </button>
  )
}
