'use client'
import { useState } from 'react'
import styles from './SizeGuide.module.scss'

interface SizeRow {
  size: string
  chest: string
  waist: string
  hips: string
}

interface SizeGuideProps {
  buttonLabel?: string
  title?: string
  note?: string
  rows?: SizeRow[]
}

/*
 * Mock data — replace rows via the CMS (Headless CMS > PDP template > SizeGuide section).
 * Each row maps to one size: size label + chest/waist/hips ranges in cm.
 * To update measurements: edit the "rows" field in the CMS content editor,
 * or replace DEFAULT_ROWS here with data fetched from a PIM/external source.
 */
const DEFAULT_ROWS: SizeRow[] = [
  { size: 'XS',  chest: '80–84', waist: '60–64', hips: '86–90'   },
  { size: 'S',   chest: '84–88', waist: '64–68', hips: '90–94'   },
  { size: 'M',   chest: '88–92', waist: '68–72', hips: '94–98'   },
  { size: 'L',   chest: '92–96', waist: '72–76', hips: '98–102'  },
  { size: 'XL',  chest: '96–100', waist: '76–80', hips: '102–106' },
  { size: 'XXL', chest: '100–104', waist: '80–84', hips: '106–110' },
]

export default function SizeGuide({
  buttonLabel = 'Size Guide',
  title = 'Find Your Size',
  note = 'All measurements are in centimetres (cm). If you are between sizes, we recommend sizing up.',
  rows = DEFAULT_ROWS,
}: SizeGuideProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        className={styles.trigger}
        onClick={() => setOpen(true)}
        type="button"
      >
        {buttonLabel}
      </button>

      {open && (
        <div
          className={styles.overlay}
          onClick={() => setOpen(false)}
          role="presentation"
        >
          <div
            className={styles.modal}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={title}
          >
            <div className={styles.header}>
              <h3 className={styles.title}>{title}</h3>
              <button
                className={styles.close}
                onClick={() => setOpen(false)}
                type="button"
                aria-label="Close size guide"
              >
                ×
              </button>
            </div>

            <div className={styles.body}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Size</th>
                    <th>Chest (cm)</th>
                    <th>Waist (cm)</th>
                    <th>Hips (cm)</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.size}>
                      <td>{row.size}</td>
                      <td>{row.chest}</td>
                      <td>{row.waist}</td>
                      <td>{row.hips}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className={styles.note}>{note}</p>
          </div>
        </div>
      )}
    </>
  )
}

SizeGuide.displayName = 'SizeGuide'
