'use client'
import { useState, useEffect } from 'react'
import styles from './CountdownBanner.module.scss'

interface CountdownBannerProps {
  message?: string
  endDate?: string
  ctaLabel?: string
  ctaUrl?: string
  ctaPosition?: 'left' | 'center' | 'right'
  backgroundColor?: string
  textColor?: string
  fontFamily?: 'body' | 'display' | 'mono'
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function getTimeLeft(endDate: string): TimeLeft | null {
  const end = new Date(endDate).getTime()
  if (isNaN(end)) return null       // invalid or empty date — hide the banner
  const diff = end - Date.now()
  if (diff <= 0) return null        // expired — hide the banner
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

function pad(n: number) {
  return String(n).padStart(2, '0')
}

export default function CountdownBanner({
  message = 'Flash Sale — Limited time offer',
  endDate = '',
  ctaLabel = 'Shop Now',
  ctaUrl = '/',
  ctaPosition = 'right',
  backgroundColor = '#1a1a1a',
  textColor = '#ffffff',
  fontFamily = 'body',
}: CountdownBannerProps) {
  const fontMap = {
    body: 'var(--fs-text-face-body)',
    display: 'var(--fs-text-face-display)',
    mono: 'monospace',
  }
  // null on first render (SSR) to avoid hydration mismatch
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null)
  const [expired, setExpired] = useState(false)

  useEffect(() => {
    if (!endDate) return

    const tick = () => {
      const t = getTimeLeft(endDate)
      if (!t) {
        setExpired(true)
      } else {
        setTimeLeft(t)
      }
    }

    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [endDate])

  if (expired) return null

  const cta = ctaUrl ? (
    <a
      href={ctaUrl}
      className={styles.cta}
      style={{ color: textColor, borderColor: textColor }}
    >
      {ctaLabel}
    </a>
  ) : null

  const timer = timeLeft ? (
    <span className={styles.timer}>
      {timeLeft.days > 0 && (
        <span className={styles.days}>
          {pad(timeLeft.days)}&nbsp;{timeLeft.days === 1 ? 'day' : 'days'}
        </span>
      )}
      <span className={styles.clock}>
        {pad(timeLeft.hours)}:{pad(timeLeft.minutes)}:{pad(timeLeft.seconds)}
      </span>
    </span>
  ) : null

  const content = (
    <>
      <span className={styles.message}>{message}</span>
      {timer}
    </>
  )

  return (
    <div
      className={`${styles.banner} ${styles[`cta-${ctaPosition}`]}`}
      style={{ backgroundColor, color: textColor, fontFamily: fontMap[fontFamily] }}
    >
      {ctaPosition === 'left' && cta}
      {content}
      {ctaPosition !== 'left' && cta}
    </div>
  )
}

CountdownBanner.displayName = 'CountdownBanner'
