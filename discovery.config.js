
// ⚙️  FC BAYERN MÜNCHEN — FastStore Demo
// Store ID: bayerndemo (VTEX account)
// Currency: EUR / Locale: de-DE / Country: DEU

const STORE_ID = process.env.NEXT_PUBLIC_STORE_ID || 'bayerndemo'

module.exports = {
  seo: {
    title: 'FC Bayern München',
    description: 'Official FC Bayern München online store',
    titleTemplate: '%s | FC Bayern München',
    author: 'FC Bayern München',
  },

  // Theming — tokens to adapt in src/themes/se-starter.scss
  theme: 'se-starter',

  // Ecommerce Platform
  platform: 'vtex',

  // Platform specific configs for API
  api: {
    storeId: STORE_ID,
    workspace: 'master',
    environment: 'vtexcommercestable',
    hideUnavailableItems: true,
    incrementAddress: false,
  },

  // Default session — adapt currency/locale/country per demo
  session: {
    currency: {
      code: 'EUR',
      symbol: '€',
    },
    locale: 'de-DE',
    channel: '{"salesChannel":1,"regionId":""}',
    country: 'DEU',
    deliveryMode: null,
    addressType: null,
    postalCode: null,
    geoCoordinates: null,
    person: null,
  },

  cart: {
    id: '',
    items: [],
    messages: [],
    shouldSplitItem: true,
  },

  // URLs — all derived from STORE_ID, no changes needed here
  storeUrl: process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : `https://${STORE_ID}.vtex.app`,

  secureSubdomain: `https://${STORE_ID}.myvtex.com`,

  checkoutUrl: `https://${STORE_ID}.myvtex.com/checkout`,

  loginUrl: process.env.NODE_ENV === 'development'
    ? `https://${STORE_ID}.myvtex.com/api/io/login`
    : `https://${STORE_ID}.vtex.app/api/io/login`,

  accountUrl: process.env.NODE_ENV === 'development'
    ? `https://${STORE_ID}.myvtex.com/api/io/account`
    : `https://${STORE_ID}.vtex.app/api/io/account`,

  // Update these with real slugs from your catalog
  previewRedirects: {
    home: '/',
    plp: '/YOUR_CATEGORY_SLUG',   // ← e.g. /clothes, /shoes
    search: '/s?q=product',
    pdp: '/YOUR_PRODUCT_SLUG/p',  // ← e.g. /blue-t-shirt-123/p
  },

  // Lighthouse CI
  lighthouse: {
    server: process.env.BASE_SITE_URL || 'http://localhost:3000',
    pages: {
      home: '/',
      pdp: '/YOUR_PRODUCT_SLUG/p',
      collection: '/YOUR_CATEGORY_SLUG',
    },
  },

  // E2E CI
  cypress: {
    pages: {
      home: '/',
      pdp: '/YOUR_PRODUCT_SLUG/p',
      collection: '/YOUR_CATEGORY_SLUG',
      search: '/s?q=product',
    },
    browser: 'electron',
  },

  analytics: {
    gtmContainerId: '', // ← add your GTM container ID if needed
  },

  experimental: {
    nodeVersion: 18,
    cypressVersion: 12,
  },

  vtexHeadlessCms: {
    webhookUrls: [
      `https://${STORE_ID}.myvtex.com/cms-releases/webhook-releases`,
    ],
  },

  // Dev proxy — rewrites API calls to VTEX backend (avoids CORS on localhost)
  rewrites: async () => [
    {
      source: '/_v/api/intelligent-search/:path*',
      destination: `https://${STORE_ID}.vtexcommercestable.com.br/_v/api/intelligent-search/:path*`,
    },
    {
      source: '/api/catalog_system/:path*',
      destination: `https://${STORE_ID}.vtexcommercestable.com.br/api/catalog_system/:path*`,
    },
  ],
}
