import styles from './InstagramFeed.module.scss'

interface InstagramImage {
  image: string
  imageAlt: string
  instagramUrl: string
}

interface InstagramFeedProps {
  title?: string
  subtitle?: string
  image1?: InstagramImage
  image2?: InstagramImage
  image3?: InstagramImage
  image4?: InstagramImage
  image5?: InstagramImage
  image6?: InstagramImage
}

const FALLBACKS: InstagramImage[] = [
  { image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=600&fit=crop', imageAlt: 'Look 1', instagramUrl: 'https://www.instagram.com' },
  { image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&h=600&fit=crop', imageAlt: 'Look 2', instagramUrl: 'https://www.instagram.com' },
  { image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=600&fit=crop', imageAlt: 'Look 3', instagramUrl: 'https://www.instagram.com' },
]

function InstagramIcon() {
  return (
    <svg
      className={styles.icon}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

export default function InstagramFeed({
  title = 'GET INSPIRED',
  subtitle = 'Follow us on Instagram',
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
}: InstagramFeedProps) {
  const slots = [image1, image2, image3, image4, image5, image6]
  // Filter on img.image directly — avoids falsy empty-string objects being treated as valid slots
  const filled = slots.filter((img): img is InstagramImage => !!img?.image)
  const images = filled.length > 0 ? filled : FALLBACKS

  return (
    <section className={styles.instagramFeed}>
      <header className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.subtitle}>{subtitle}</p>
      </header>

      <div className={styles.grid}>
        {images.map((img, i) => (
          <a
            key={i}
            href={img.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.item}
            aria-label={img.imageAlt}
          >
            <img
              src={img.image}
              alt={img.imageAlt}
              className={styles.image}
              loading="lazy"
            />
            <div className={styles.overlay}>
              <InstagramIcon />
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
