# FastStore SE Starter — Setup Guide

Bootstrap a new demo in ~30 minutes.

---

## Prerequisites

- A VTEX account with a product catalog (even a small one)
- Access to the VTEX Admin (`yourstore.myvtex.com/admin`)
- Node 18+, Yarn 1.x
- VTEX CLI: `npm install -g vtex` then `vtex login yourstore`
- GitHub access to this repo

---

## Step 1 — Clone and install

```bash
git clone https://github.com/Willjeanne/faststore-se-starter.git my-demo
cd my-demo
yarn
```

---

## Step 2 — Configure your store ID

Create a `.env.local` file at the root:

```bash
# Replace with your VTEX account name
NEXT_PUBLIC_STORE_ID=your-store-id
```

> Your store ID is the account name visible in the VTEX Admin URL: `your-store-id.myvtex.com`

---

## Step 3 — Update `discovery.config.js`

Open `discovery.config.js` and update the lines marked with `← adapt`:

| Field | What to change |
|-------|---------------|
| `session.currency` | Change to your currency (e.g. `USD`, `GBP`, `BRL`) |
| `session.locale` | Change to your locale (e.g. `en-US`, `pt-BR`) |
| `session.country` | Change to your country ISO code (e.g. `USA`, `GBR`) |
| `previewRedirects.plp` | A real category slug from your catalog (e.g. `/clothes`) |
| `previewRedirects.pdp` | A real product slug from your catalog (e.g. `/blue-shirt-123/p`) |

---

## Step 4 — Adapt the theme (optional)

Open `src/themes/se-starter.scss`. The top of the file lists the tokens to change:

- **Colors** — `--fs-color-main-*` (neutrals) and `--fs-color-accent-*` (brand accent)
- **Typography** — `--fs-text-face-body` and `--fs-text-face-display`
- **Borders** — `--fs-border-radius` (e.g. `0px` for sharp, `4px` for rounded)

> Tip: start by changing just the primary color (`--fs-color-primary-bkg`) and the two font families to match the brand.

---

## Step 5 — Test locally

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000). The store should load with your catalog data.

> If you see CORS errors in the browser console, make sure `NEXT_PUBLIC_STORE_ID` matches your actual account name and restart `yarn dev`.

---

## Step 6 — Push the CMS sections

```bash
yarn cms-sync
```

This registers all 6 custom sections in your VTEX Headless CMS admin.

> Requires VTEX CLI to be logged in: `vtex login your-store-id`

---

## Step 7 — Configure sections in Headless CMS

In VTEX Admin → **CMS → Pages**:

1. Open the Home page (or any page)
2. Click **+ Add section**
3. You'll find: `HeroBanner`, `LookbookGrid`, `FullWidthShelf`, `InstagramFeed`, `SizeGuide`, `CountdownBanner`
4. Configure each section with your content
5. Click **Publish**

---

## Step 8 — Deploy via WebOps

Connect your repo to VTEX WebOps (one-time setup per account). After that:

```bash
git push origin main
```

WebOps deploys automatically. The live URL will be `your-store-id.vtex.app`.

---

## Custom sections — quick reference

| Section | What it does | Key prop |
|---------|-------------|----------|
| `HeroBanner` | Full-width hero image (85vh) with title/CTA overlay | `image`, `textPosition` (9 positions) |
| `LookbookGrid` | 3 editorial tiles side by side — image + title + CTA | `cell1/2/3.image`, `cell1/2/3.linkUrl` |
| `FullWidthShelf` | Product carousel with hover image-swap | `categoryId` (VTEX Category ID) |
| `InstagramFeed` | Editorial grid of 3–6 images with Instagram links | `image1–6.image`, `image1–6.instagramUrl` |
| `SizeGuide` | "Size Guide" button on PDP → modal with size chart | `rows[]` (leave empty for default XS–XXL data) |
| `CountdownBanner` | Flash sale banner with live countdown timer | `endDate` (ISO 8601), `message` |

### Finding your VTEX Category ID (for FullWidthShelf)

1. Go to VTEX Admin → **Catalog → Categories**
2. Click on a category
3. Look at the browser URL: `.../admin/Site/TipoCategoria.aspx?categoryId=**2**`
4. That number is your `categoryId`

---

## Notes

- `SizeGuide` is injected on the PDP automatically via `src/components/overrides/ProductDetails.tsx` — no CMS config needed for it to appear on the PDP. The standalone CMS section is for pages where you want to show it outside the PDP.
- `FullWidthShelf` uses the **Catalog Portal API** (`/api/catalog_system/pub/products/search`), not the Intelligent Search API. This works on all accounts regardless of IS indexing status.
- The checkout flow goes through `your-store-id.myvtex.com` (not the FastStore domain). This is intentional — it's the only pattern that works end-to-end on demo accounts without additional infra setup.
