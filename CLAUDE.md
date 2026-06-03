# CLAUDE.md

> Ce fichier est lu automatiquement par Claude Code (terminal et desktop) et par Cursor.
> Il fournit le contexte permanent du projet.

## Qui je suis et ce que je fais

Je suis **Solution Engineer chez VTEX** (william.jeanne@vtex.com).
Je comprends le code mais je ne suis pas développeur — je vais te demander d'exécuter, et de m'expliquer ce que tu fais en termes simples avant chaque modification importante.

## Contexte de ce projet

Ce repo est le **FastStore SE Starter Kit** — un template réutilisable pour monter un POC ou une démo e-commerce VTEX en moins d'une journée.

Workflow cible : clone → configurer `NEXT_PUBLIC_STORE_ID` → adapter les tokens du thème → `yarn cms-sync` → déployer via WebOps.

Il est utilisé exclusivement par les Solution Engineers VTEX pour des démos internes. Pas de end-customers, pas de risque transactionnel.

## Stack technique

- **Storefront** : VTEX FastStore (Next.js 13.5 + React 18 + TypeScript 5.3)
- **CLI** : `@faststore/cli` 3.99.2
- **Theming** : SCSS + design tokens FastStore (variables `--fs-*`), thème `se-starter`
- **Customisation** : Overrides API FastStore (`src/components/overrides/`, `src/components/sections/`)
- **CMS** : Headless CMS VTEX (sync via `yarn cms-sync`)
- **Hébergement** : FastStore WebOps (déploiement auto sur push `main`)
- **Config store** : `discovery.config.js` — storeId via `NEXT_PUBLIC_STORE_ID` (env var)

## Pour démarrer sur un nouveau compte démo

1. Créer `.env.local` avec `NEXT_PUBLIC_STORE_ID=ton-account-name`
2. Mettre à jour `session.currency` / `session.locale` dans `discovery.config.js` si besoin
3. Adapter les tokens dans `src/themes/se-starter.scss`
4. `yarn cms-sync` (VTEX CLI connecté au compte)
5. `yarn dev` → tester sur localhost:3000
6. Push sur `main` → WebOps déploie

> Voir `SETUP.md` pour le guide complet étape par étape.

## Pattern checkout adopté

Le tunnel checkout passe par `YOUR_STORE_ID.myvtex.com` (pas par `secure.vtexfaststore.com`).
Dans `discovery.config.js` : `secureSubdomain` et `checkoutUrl` sont toujours sur `.myvtex.com`.

**Compromis assumé** : l'URL change pendant le tunnel (`.vtex.app` → `.myvtex.com`). VTEX peut demander un re-login admin → OK pour la démo.

Pattern emprunté au compte de référence `demomarkets`. Ne pas remettre `secure.vtexfaststore.com` sans avoir enregistré le compte dans l'infra FastStore secure côté VTEX.

## Composants custom

| Composant | Chemin | Description | CMS-pilotable |
|-----------|--------|-------------|---------------|
| `HeroBanner` | `src/components/sections/HeroBanner/` | Image 85vh pleine largeur, titre/sous-titre/CTA overlay, 9 positions, overlay réglable, image mobile optionnelle | ✅ |
| `LookbookGrid` | `src/components/sections/LookbookGrid/` | 3 cellules éditoriales côte à côte, image + titre + CTA. Couvre aussi le besoin ShopByCategory (mettre des URLs catégorie dans `linkUrl`) | ✅ |
| `FullWidthShelf` | `src/components/sections/FullWidthShelf/` | Carousel produits pleine largeur, hover image-swap, flèches nav, données via Catalog Portal API | ✅ |
| `InstagramFeed` | `src/components/sections/InstagramFeed/` | Grille "GET INSPIRED" — 3-6 images carrées, icône Instagram overlay au hover | ✅ |
| `SizeGuide` | `src/components/sections/SizeGuide/` | Bouton "Size Guide" → modal avec tableau de tailles. Injecté sur la PDP via override ProductDetails | ✅ |
| `CountdownBanner` | `src/components/sections/CountdownBanner/` | Bannière flash sale pleine largeur avec timer live (JJ HH:MM:SS), disparaît à expiration | ✅ |

**FullWidthShelf — détails techniques** :
- Prop CMS : `categoryId` (integer) — trouver l'ID dans Admin > Catalog > Categories (URL de la page)
- Utilise Catalog Portal API (`/api/catalog_system/pub/products/search`) — fonctionne sur tous les comptes sans IS indexée
- Le proxy Next.js (`rewrites` dans `discovery.config.js`) est indispensable en local pour le CORS — redémarrer `yarn dev` si 404
- Retourne `null` silencieusement si aucun produit → vérifier l'onglet Network si le composant n'apparaît pas

## Overrides

| Override | Fichier | Ce qu'il fait |
|----------|---------|---------------|
| `ProductDetails` | `src/components/overrides/ProductDetails.tsx` | Injecte `<SizeGuide />` au-dessus du simulateur de livraison (via `__experimentalShippingSimulation`) |
| `ProductShelf` | `src/components/overrides/ProductShelf.tsx` | `aspectRatio: 0.75`, `bordered: false` sur les ProductCards |
| `CrossSellingShelf` | `src/components/overrides/CrossSellingShelf.tsx` | Idem ProductShelf |

## Décisions d'architecture

| Date | Décision | Raison |
|------|----------|--------|
| 2026-05-08 | Pattern checkout via `.myvtex.com` | Seul pattern fonctionnel bout-en-bout sur comptes demo |
| 2026-05-08 | FullWidthShelf via Catalog Portal API | IS pas toujours indexée sur un compte neuf → Catalog Portal API disponible immédiatement |
| 2026-05-12 | FullWidthShelf prop `categoryId` (int) au lieu de `categorySlug` | Les IDs slug étaient hardcodés pour soliverdemo — `categoryId` est universel pour tous les catalogues |
| 2026-05-12 | LookbookGrid couvre le besoin ShopByCategory | Évite la duplication — LookbookGrid accepte déjà des URLs de catégories dans `linkUrl` |

## Known workaround — CartSidebar z-index

Dans `src/themes/se-starter.scss` (hors `@layer theme`) :
```scss
.section-cart-sidebar { position: relative; z-index: 500; }
[data-fs-slide-over] { top: 0 !important; }
```
Raison : le SlideOver (`position: fixed`) se cachait derrière la navbar sticky sur les PDPs. Sans ce fix, le mini-cart n'est pas visible.

## Règles de code

### Toujours
- Sections custom dans `src/components/sections/`
- Enregistrement dans `src/components/index.tsx`
- Schéma CMS dans `cms/faststore/sections.json`
- **CSS Modules** (`*.module.scss`) — jamais de couleurs/typo/spacing hardcodés
- Tokens `--fs-*` pour toutes les valeurs visuelles
- Code en **anglais** (le repo est partagé avec des collègues non-francophones)

### Jamais
- Ne pas modifier `node_modules/` ni `@faststore/core` directement
- Ne pas hardcoder de couleurs ou URLs de compte VTEX — toujours via `STORE_ID` ou tokens
- Ne pas override `__experimentalProductCard` ou `SearchInput` sans avertir (impact analytics IS)
- Ne pas créer de composants en dehors de `src/components/`
- Ne pas push directement sur `main` — toujours branche + PR + squash merge

## Workflow attendu pour chaque tâche

1. **Comprendre** : lire les fichiers concernés, expliquer en 2-3 phrases
2. **Vérifier la doc** : utiliser le MCP `vtex-developer` si doute sur un pattern ou une API
3. **Plan en 5 lignes** avant tout chantier long → attendre OK avant de coder
4. **Implémenter** : modifications minimales nécessaires
5. **Tester en local** : dire quoi vérifier sur `http://localhost:3000`
6. **Expliquer** : résumer ce qui a changé et pourquoi
7. **Mettre à jour CLAUDE.md** après chaque chantier significatif

## Commandes utiles

- `yarn dev` — Dev server (hot reload sur localhost:3000)
- `yarn build` — Build de prod
- `yarn cms-sync` — Sync des sections CMS Headless
- `yarn generate` — Régénérer les types après modification de fragment GraphQL

## Outils IA disponibles

- **VTEX Developer MCP** (`@vtex/developer-mcp`) — recherche live dans la doc et les API VTEX
- **VTEX Skills** (tracks `faststore`, `headless`, `architecture`) — patterns et contraintes plateforme

## Style de communication

- Réponds en **français**
- Code en **anglais**
- Pas de jargon dev sans explication courte
- Si hésitation entre 2 approches, exposer les options et proposer une recommandation
- Si une commande peut casser quelque chose (push, deploy), demander confirmation avant
