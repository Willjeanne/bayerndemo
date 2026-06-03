'use client'
import type { SectionOverride } from '@faststore/core'
import SizeGuide from '../sections/SizeGuide/SizeGuide'

// ShippingSimulation is not exported from @faststore/core — use generic props
function ShippingWithSizeGuide(props: Record<string, unknown>) {
  return (
    <>
      <div style={{ textAlign: 'center', padding: '0.75rem 0' }}>
        <SizeGuide />
      </div>
    </>
  )
}

const SECTION = 'ProductDetails' as const

const override: SectionOverride = {
  section: SECTION,
  components: {
    __experimentalShippingSimulation: {
      Component: ShippingWithSizeGuide,
    },
  },
}

export { override }
