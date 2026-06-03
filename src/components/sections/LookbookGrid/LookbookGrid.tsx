import styles from './LookbookGrid.module.scss'

interface LookbookCell {
  image: string
  imageAlt: string
  title: string
  subtitle?: string
  linkUrl: string
  linkLabel: string
}

type TextPosition =
  | 'top-left'    | 'top-center'    | 'top-right'
  | 'center-left' | 'center-center' | 'center-right'
  | 'bottom-left' | 'bottom-center' | 'bottom-right'

interface LookbookGridProps {
  textPosition?: TextPosition
  textColor?: 'white' | 'black'
  cell1?: LookbookCell
  cell2?: LookbookCell
  cell3?: LookbookCell
}

const FALLBACK: LookbookCell[] = [
  { image: '', imageAlt: 'Cellule 1', title: 'Cellule 1', linkUrl: '/', linkLabel: 'Découvrir' },
  { image: '', imageAlt: 'Cellule 2', title: 'Cellule 2', linkUrl: '/', linkLabel: 'Découvrir' },
  { image: '', imageAlt: 'Cellule 3', title: 'Cellule 3', linkUrl: '/', linkLabel: 'Découvrir' },
]

export default function LookbookGrid({
  textPosition = 'center-center',
  textColor = 'white',
  cell1,
  cell2,
  cell3,
}: LookbookGridProps) {
  const cells = [
    cell1 ?? FALLBACK[0],
    cell2 ?? FALLBACK[1],
    cell3 ?? FALLBACK[2],
  ]

  return (
    <section className={styles.lookbookGrid} data-text-color={textColor}>
      {cells.map((cell, i) => (
        <a
          key={i}
          href={cell.linkUrl}
          className={styles.cell}
          data-position={textPosition}
          aria-label={cell.title}
        >
          <div className={styles.imageWrapper}>
            {cell.image && (
              <img
                src={cell.image}
                alt={cell.imageAlt}
                className={styles.image}
                loading="lazy"
              />
            )}
          </div>
          <div className={styles.overlay}>
            <div className={styles.content}>
              <h2 className={styles.title}>{cell.title}</h2>
              {cell.subtitle && (
                <p className={styles.subtitle}>{cell.subtitle}</p>
              )}
              <span className={styles.cta} aria-hidden="true">
                {cell.linkLabel}
              </span>
            </div>
          </div>
        </a>
      ))}
    </section>
  )
}
