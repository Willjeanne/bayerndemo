import type { SectionOverride } from '@faststore/core'

const SECTION = 'ProductGallery' as const

const override: SectionOverride = {
  section: SECTION,
  components: {
    __experimentalProductCard: {
      props: {
        aspectRatio: 0.75,
        bordered: false,
      },
    },
  },
}

export { override }
