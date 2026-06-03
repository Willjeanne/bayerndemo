import styles from './HeroBanner.module.scss'

type TextPosition =
  | 'top-left'    | 'top-center'    | 'top-right'
  | 'center-left' | 'center-center' | 'center-right'
  | 'bottom-left' | 'bottom-center' | 'bottom-right'

interface HeroBannerProps {
  image?: string
  imageAlt?: string
  imageMobile?: string
  title?: string
  subtitle?: string
  linkUrl?: string
  linkLabel?: string
  textPosition?: TextPosition
  textColor?: 'white' | 'black'
  overlayOpacity?: number
}

export default function HeroBanner({
  image = '',
  imageAlt = '',
  imageMobile,
  title,
  subtitle,
  linkUrl,
  linkLabel,
  textPosition = 'bottom-left',
  textColor = 'white',
  overlayOpacity = 30,
}: HeroBannerProps) {
  const opacity = Math.min(100, Math.max(0, overlayOpacity)) / 100

  const inner = (
    <div
      className={styles.hero}
      data-text-color={textColor}
      data-position={textPosition}
    >
      {image && (
        <>
          <img
            src={image}
            alt={imageAlt}
            className={`${styles.image} ${imageMobile ? styles.imageDesktop : ''}`}
            loading="eager"
          />
          {imageMobile && (
            <img
              src={imageMobile}
              alt={imageAlt}
              className={`${styles.image} ${styles.imageMobile}`}
              loading="eager"
            />
          )}
        </>
      )}

      <div
        className={styles.overlay}
        style={{ '--hero-overlay-opacity': opacity } as React.CSSProperties}
      />

      <div className={styles.content}>
        {title && <h1 className={styles.title}>{title}</h1>}
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        {linkUrl && linkLabel && (
          <span className={styles.cta}>{linkLabel}</span>
        )}
      </div>
    </div>
  )

  if (linkUrl) {
    return (
      <section>
        <a href={linkUrl} className={styles.link} aria-label={title ?? linkLabel}>
          {inner}
        </a>
      </section>
    )
  }

  return <section>{inner}</section>
}
