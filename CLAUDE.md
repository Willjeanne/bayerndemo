# CLAUDE.md — FC Bayern München FastStore Demo

> Fichier de contexte permanent — mis à jour après chaque chantier significatif.
> Utilisé par Claude Code pour retrouver le contexte sans avoir besoin de re-expliquer.

---

## Identité du projet

| Clé | Valeur |
|-----|--------|
| **Projet** | Demo storefront FC Bayern München sur VTEX FastStore |
| **Compte VTEX** | `bayerndemo` |
| **GitHub** | https://github.com/Willjeanne/bayerndemo |
| **Owner** | William Jeanne — Solution Engineer VTEX (william.jeanne@vtex.com) |
| **Objectif** | Demo commerciale pour FC Bayern Munich — showcase des capacités VTEX Headless |
| **Public** | Équipe Bayern Munich + prospects internes VTEX |

---

## Stack technique

- **Storefront** : VTEX FastStore (Next.js 13.5 + React 18 + TypeScript 5.3)
- **CLI** : `@faststore/cli` 3.99.6
- **Thème** : `se-starter` (`src/themes/se-starter.scss`) — tokens `--fs-*`
- **CMS** : VTEX Headless CMS (sync via `yarn cms-sync`)
- **Déploiement** : FastStore WebOps (auto sur push `main`)
- **Config** : `discovery.config.js` + `.env.local` (`NEXT_PUBLIC_STORE_ID=bayerndemo`)
- **Locale** : `de-DE` / EUR / DEU

---

## Design System FC Bayern

| Token | Valeur | Description |
|-------|--------|-------------|
| `--fs-color-main-0` | `#FFFFFF` | Blanc pur |
| `--fs-color-main-1` | `#F4F5F6` | Surface claire |
| `--fs-color-main-2` | `#D2D5DA` | Bordures |
| `--fs-color-main-3` | `#5B616E` | Texte secondaire |
| `--fs-color-main-4` | `#0E1116` | Texte principal (quasi-noir) |
| `--fs-color-accent-0` | `#DC052D` | **Bayern Red** — CTA, navbar, badges sale |
| `--fs-color-accent-1` | `#0066B2` | Bayern Blue |
| `--fs-color-accent-2` | `#10213B` | Deep Navy |
| `--fs-color-accent-3` | `#C8A04A` | Meister Gold |
| `--fs-text-face-body` | Hanken Grotesk | Corps de texte |
| `--fs-text-face-display` | Archivo | Titres — bold/900 |
| `--fs-border-radius` | `0px` | Sharp — identité sportive |

**Navbar** : fond rouge `#DC052D`, texte blanc. Promo bar : Deep Navy `#10213B`.

---

## Structure des fichiers clés

```
bayerndemo/
├── discovery.config.js          # Config store (storeId, locale, rewrites)
├── .env.local                   # NEXT_PUBLIC_STORE_ID=bayerndemo (gitignored)
├── src/
│   ├── themes/
│   │   └── se-starter.scss      # ← DESIGN SYSTEM BAYERN (tokens, navbar, overrides)
│   ├── fonts/
│   │   └── WebFonts.tsx         # Google Fonts : Hanken Grotesk + Archivo
│   ├── components/
│   │   ├── index.tsx            # Enregistrement de toutes les sections custom
│   │   ├── sections/            # Sections CMS custom
│   │   │   ├── HeroBanner/
│   │   │   ├── LookbookGrid/
│   │   │   ├── FullWidthShelf/
│   │   │   ├── InstagramFeed/
│   │   │   ├── SizeGuide/
│   │   │   └── CountdownBanner/
│   │   └── overrides/           # FastStore core component overrides
│   │       ├── ProductDetails.tsx
│   │       ├── ProductGallery.tsx
│   │       ├── ProductShelf.tsx
│   │       └── CrossSellingShelf.tsx
└── cms/
    └── faststore/
        └── sections.json        # Schémas CMS pour toutes les sections custom
```

---

## Composants custom disponibles

| Composant | Description | Configurable CMS |
|-----------|-------------|-----------------|
| `HeroBanner` | Hero full-width, image desktop/mobile, titre/sous-titre/CTA, 9 positions, overlay opacity | ✅ |
| `LookbookGrid` | 3 cellules éditoriales côte à côte (aussi utilisable en ShopByCategory) | ✅ |
| `FullWidthShelf` | Carousel produits via Catalog API, hover image-swap, flèches nav | ✅ |
| `InstagramFeed` | Grille "GET INSPIRED" — 3-6 images, lien Instagram au hover | ✅ |
| `SizeGuide` | Modal tableau de tailles, injecté PDP via override ProductDetails | ✅ |
| `CountdownBanner` | Barre flash sale avec timer live, disparaît à expiration | ✅ |

**FullWidthShelf** : prop CMS `categoryId` (integer, trouvable dans Admin > Catalog > Categories).

---

## Plan d'évolution du projet

### ✅ Phase 1 — Foundation (terminée 2026-06-03)
- [x] Copie du SE starter FastStore 3.99.6 comme base
- [x] Design system FC Bayern implémenté (couleurs, fonts, border-radius, navbar rouge)
- [x] `discovery.config.js` configuré pour `bayerndemo` (de-DE, EUR, DEU)
- [x] Sections CMS traduites en anglais
- [x] Push sur GitHub

### 🔄 Phase 2 — CMS Headless (en cours)
- [ ] Connecter VTEX CLI au compte `bayerndemo`
- [ ] `yarn cms-sync` — pousser les schémas de sections vers le CMS Headless
- [ ] Configurer les pages dans le CMS : Home, PLP, PDP
- [ ] Créer le contenu initial (sections homepage Bayern)

### 📋 Phase 3 — Contenu & Pages
- [ ] Homepage : HeroBanner avec visuels Bayern, LookbookGrid (catégories jersey), FullWidthShelf, CountdownBanner
- [ ] PLP : personnalisation selon le catalogue Bayern
- [ ] PDP : SizeGuide configuré pour les maillots Bayern
- [ ] Page éditoriale : contenu club/équipe

### 📋 Phase 4 — Nouveaux composants spécifiques Bayern
- [ ] **MatchdayBanner** — bannière avec prochain match (date, adversaire, score live ou CTA billetterie)
- [ ] **PlayerSpotlight** — section "joueur mis en avant" avec stats + lien boutique
- [ ] **TrophyShelf** — timeline palmarès avec années et trophées (éditorial)
- [ ] **ClubNewsGrid** — grille actualités du club (image + titre + lien)

### 📋 Phase 5 — Déploiement
- [ ] Configurer WebOps pour `bayerndemo`
- [ ] Déploiement production
- [ ] Tests Lighthouse
- [ ] Validation finale

---

## Décisions d'architecture

| Date | Décision | Raison |
|------|----------|--------|
| 2026-06-03 | Base sur SE starter FastStore 3.99.6 | Template éprouvé avec 6 sections custom prêtes |
| 2026-06-03 | Navbar rouge pleine | Direction Claude Design — correspond au branding Bayern store (vs. blanc pour le site éditorial) |
| 2026-06-03 | Hanken Grotesk + Archivo | Recommandation design system — géométrique/sport, cohérent avec wordmark Bayern |
| 2026-06-03 | `border-radius: 0px` | Style sporty/carré — identique au site Bayern officiel |
| 2026-06-03 | Catalog API (pas IS) | IS pas toujours indexée sur un compte neuf — Catalog Portal API disponible immédiatement |
| 2026-06-03 | Checkout via `.myvtex.com` | Seul pattern fonctionnel bout-en-bout sur comptes demo |

---

## Known workarounds

**CartSidebar z-index** (dans `se-starter.scss`, hors `@layer theme`) :
```scss
.section-cart-sidebar { position: relative; z-index: 500; }
[data-fs-slide-over] { top: 0 !important; }
```
Raison : SlideOver (`position: fixed`) se cachait derrière la navbar sticky.

**Breadcrumb margin-top** : `margin-top: 6rem !important` pour passer sous la navbar sticky.

---

## Commandes utiles

```bash
yarn dev              # Dev server localhost:3000
yarn build            # Build prod
yarn cms-sync         # Sync schémas CMS vers VTEX Headless CMS
yarn generate         # Régénérer types GraphQL après modif de fragments
vtex login bayerndemo # Connexion VTEX CLI au compte
```

---

## Règles de développement

### Toujours
- Sections custom dans `src/components/sections/` — enregistrer dans `index.tsx` et `sections.json`
- **CSS Modules** (`*.module.scss`) — tokens `--fs-*` pour toutes les valeurs visuelles
- Code et commentaires en **anglais**
- Mettre à jour `CLAUDE.md` après chaque chantier significatif (nouveaux composants, décisions)

### Jamais
- Modifier `node_modules/` ni `@faststore/core` directement
- Hardcoder des couleurs hors tokens `--fs-*`
- Hardcoder des URLs VTEX — toujours via `STORE_ID` env var
- Push direct sur `main` sans test local

---

## Workflow Claude Code

1. **Lire ce fichier** pour retrouver le contexte
2. **MCP `vtex-developer`** si doute sur pattern ou API VTEX
3. **Plan en 5 lignes** avant tout chantier long — attendre OK
4. **Mettre à jour ce fichier** après chaque chantier significatif
5. Répondre en **français**, coder en **anglais**
