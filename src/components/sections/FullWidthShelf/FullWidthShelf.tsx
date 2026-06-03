'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import styles from './FullWidthShelf.module.scss'

// ─── VTEX Category Tree API types ────────────────────────────────────────────

interface CategoryNode {
  id: number
  name: string
  url: string
  hasChildren: boolean
  children: CategoryNode[]
}

// ─── VTEX Catalog Portal API types ───────────────────────────────────────────

interface VtexProduct {
  productId: string
  productName: string
  linkText: string
  items: Array<{
    name: string
    images: Array<{ imageUrl: string }>
    sellers: Array<{ commertialOffer: { Price: number } }>
  }>
}

// ─── Internal types ───────────────────────────────────────────────────────────

interface ShelfProduct {
  id: string
  name: string
  variant: string
  price: number
  link: string
  image1: string
  image2: string | null
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface FullWidthShelfProps {
  title?: string
  categorySlug: string  // Exact category name from VTEX Admin (e.g. "Clothes", "Accessories")
  count?: number
  locale?: string       // e.g. 'fr-FR', 'en-US' — defaults to 'fr-FR'
  currency?: string     // e.g. 'EUR', 'USD' — defaults to 'EUR'
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Recursively search the category tree for a node matching `slug`.
 * Matches against both the URL slug and the category name (case-insensitive).
 * Returns the VTEX fq path string (e.g. "2/5/") or null if not found.
 */
function findInTree(
  nodes: CategoryNode[],
  slug: string,
  parentPath = ''
): string | null {
  for (const node of nodes) {
    const currentPath = `${parentPath}${node.id}/`
    const urlSlug = node.url.split('/').pop()?.toLowerCase() ?? ''
    const nameSlug = node.name.toLowerCase()
    if (urlSlug === slug || nameSlug === slug) return currentPath
    if (node.children?.length) {
      const found = findInTree(node.children, slug, currentPath)
      if (found !== null) return found
    }
  }
  return null
}

/**
 * Fetch the category tree and resolve a human-readable slug into a VTEX fq path.
 * Fetches 3 levels deep — enough for most catalogue structures.
 */
async function resolveCategoryPath(slug: string): Promise<string | null> {
  try {
    const res = await fetch('/api/catalog_system/pub/category/tree/3')
    if (!res.ok) return null
    const tree: CategoryNode[] = await res.json()
    return findInTree(tree, slug.toLowerCase())
  } catch {
    return null
  }
}

function parseProducts(raw: VtexProduct[]): ShelfProduct[] {
  return raw.map((p) => {
    const item = p.items[0]
    return {
      id: p.productId,
      name: p.productName.toUpperCase(),
      variant: item?.name ?? '',
      price: item?.sellers?.[0]?.commertialOffer?.Price ?? 0,
      link: `/${p.linkText}/p`,
      image1: item?.images?.[0]?.imageUrl ?? '',
      image2: item?.images?.[1]?.imageUrl ?? null,
    }
  })
}

function formatPrice(price: number, locale: string, currency: string): string {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(price)
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function FullWidthShelf({
  title,
  categorySlug,
  count = 8,
  locale = 'fr-FR',
  currency = 'EUR',
}: FullWidthShelfProps) {
  const [products, setProducts] = useState<ShelfProduct[]>([])
  const [index, setIndex] = useState(0)
  const [visibleCount, setVisibleCount] = useState(4)
  const trackRef = useRef<HTMLDivElement>(null)

  // Recalculate how many cards are actually visible based on DOM layout.
  // This mirrors the CSS breakpoints without duplicating them in JS.
  const updateVisibleCount = useCallback(() => {
    if (!trackRef.current || products.length === 0) return
    const trackWidth = trackRef.current.offsetWidth
    const cardWidth = trackRef.current.scrollWidth / products.length
    if (cardWidth > 0) setVisibleCount(Math.round(trackWidth / cardWidth))
  }, [products.length])

  useEffect(() => {
    updateVisibleCount()
    const observer = new ResizeObserver(updateVisibleCount)
    if (trackRef.current) observer.observe(trackRef.current)
    return () => observer.disconnect()
  }, [updateVisibleCount])

  useEffect(() => {
    if (!categorySlug) return

    async function load() {
      const path = await resolveCategoryPath(categorySlug)
      if (!path) return
      const encoded = encodeURIComponent(`C:/${path}`)
      const url = `/api/catalog_system/pub/products/search?fq=${encoded}&_from=0&_to=${count - 1}&O=OrderByTopSaleDESC`
      try {
        const res = await fetch(url)
        const data: VtexProduct[] = await res.json()
        if (Array.isArray(data)) setProducts(parseProducts(data))
      } catch {
        // Silently hide the shelf if the fetch fails
      }
    }

    load()
  }, [categorySlug, count])

  const maxIndex = Math.max(0, products.length - visibleCount)

  const scrollToIndex = (nextIndex: number) => {
    if (!trackRef.current || products.length === 0) return
    const cardWidth = trackRef.current.scrollWidth / products.length
    trackRef.current.scrollTo({ left: nextIndex * cardWidth, behavior: 'smooth' })
    setIndex(nextIndex)
  }

  if (products.length === 0) return null

  return (
    <section className={styles.shelf}>
      {title && (
        <header className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
        </header>
      )}

      <div className={styles.wrapper}>
        <button
          className={`${styles.arrow} ${styles.arrowLeft}`}
          onClick={() => scrollToIndex(Math.max(0, index - 1))}
          aria-label="Previous"
          disabled={index === 0}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div className={styles.track} ref={trackRef}>
          {products.map((p) => (
            <a key={p.id} href={p.link} className={styles.card} aria-label={p.name}>
              <div className={styles.imageWrapper}>
                <img src={p.image1} alt={p.name} className={styles.imageMain} loading="lazy" />
                {p.image2 && (
                  <img src={p.image2} alt={`${p.name} — view 2`} className={styles.imageHover} loading="lazy" />
                )}
              </div>
              <div className={styles.info}>
                <p className={styles.name}>{p.name}</p>
                <p className={styles.variant}>{p.variant}</p>
                <p className={styles.price}>{formatPrice(p.price, locale, currency)}</p>
              </div>
            </a>
          ))}
        </div>

        <button
          className={`${styles.arrow} ${styles.arrowRight}`}
          onClick={() => scrollToIndex(Math.min(maxIndex, index + 1))}
          aria-label="Next"
          disabled={index >= maxIndex}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </section>
  )
}
