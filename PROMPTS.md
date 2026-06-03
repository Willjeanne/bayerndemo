# Prompts prêts à l'emploi

Bibliothèque de prompts pour les différentes phases de travail FastStore.
Copie-colle dans Claude Code (`claude` dans le terminal Cursor).

---

## Phase 0 — Smoke test (premier prompt à envoyer)

> Ce prompt vérifie que Claude Code a bien chargé le contexte du projet (CLAUDE.md, MCP, skills).

```
Bonjour. Avant qu'on commence à travailler :

1. Confirme-moi que tu as bien chargé le CLAUDE.md de ce projet (cite-moi 2-3 règles que tu y as lues)
2. Liste les outils MCP que tu as à disposition
3. Liste les VTEX skills qui sont chargés (faststore, headless, architecture)
4. Donne-moi la version de @faststore/core utilisée dans ce projet (cherche dans yarn.lock si nécessaire)

Réponds en français, format compact, pas de blabla.
```

---

## Phase 1 — Exploration du projet

### 1.1 — État des lieux

```
Fais un état des lieux du projet :

1. Liste la structure de src/ (max 2 niveaux de profondeur)
2. Identifie où sont les thèmes (src/themes/)
3. Identifie si src/components/overrides/ et src/components/sections/ existent déjà
4. Lis discovery.config.js et résume-moi : compte VTEX, thème actif, locale, URLs preview

Réponse en français, structurée par sections, pas de paraphrase de fichiers.
```

### 1.2 — Comprendre un composant FastStore

```
Je veux comprendre comment fonctionne le composant ProductCard de FastStore.

1. Via le MCP vtex-developer, cherche la doc "ProductCard FastStore"
2. Liste les sous-composants (ProductCardImage, ProductCardContent, etc.)
3. Liste les attributs data-fs-* qui permettent de cibler ce composant en CSS
4. Donne-moi 1 exemple court de surcharge de style via CSS Module

Pas de code complet, juste l'essentiel pour que je comprenne. Réponse en français.
```

---

## Phase 2 — Theming

### 2.1 — Création d'un thème custom

```
Je veux créer un thème FastStore custom basé sur la palette suivante :
[liste des couleurs en hex ici, ex: primary #C8102E, accent #FFD700, etc.]

Plan en 5 lignes max avant de coder :
1. Quel fichier tu vas créer
2. Quels tokens tu vas définir (--fs-color-main-*, --fs-color-accent-*, etc.)
3. Comment tu vas activer le thème dans discovery.config.js
4. Si tu vas modifier autre chose
5. Comment je teste

J'approuve, tu codes.
```

### 2.2 — Test du thème soft-blue (exemple officiel)

```
Pour mon premier test, je veux appliquer le thème "soft-blue" décrit dans la doc FastStore officielle.

1. Via le MCP vtex-developer, cherche le tutoriel "soft-blue theme"
2. Crée le fichier src/themes/soft-blue.scss avec le contenu de la doc
3. Modifie discovery.config.js pour activer ce thème
4. Dis-moi sur quelle page de localhost:3000 vérifier (la home doit avoir des accents bleus)

Code minimal, pas de refactor du thème custom-theme existant.
```

---

## Phase 3 — Overrides composants

### 3.1 — Setup du dossier overrides

```
Prépare la structure pour les overrides FastStore :

1. Crée src/components/overrides/ et src/components/sections/ si ils n'existent pas
2. Crée ou complète src/components/index.tsx pour exporter les overrides
3. Via le MCP vtex-developer, vérifie la doc "Overriding native components and props" pour la version 3.98.4 du @faststore/cli
4. Confirme-moi la syntaxe exacte de getOverriddenSection() pour notre version

Ne modifie pas encore de composant. Juste la structure + confirmation syntaxe.
```

### 3.2 — Override ProductCard

```
Override le composant ProductCard.

⚠️ AVANT TOUT : préviens-moi si on doit toucher à __experimentalProductCard, à cause de l'impact analytics Intelligent Search. Si oui, propose une alternative plus safe.

Plan en 5 lignes max avant de coder :
1. Quel composant exact tu vas override
2. Dans quel fichier
3. Quelles props/styles tu changes
4. Comment tu utilises les tokens FastStore (pas de hardcode)
5. Sur quelle page je vérifie

Branche à créer : feat/custom-product-card.
J'approuve, tu codes.
```

### 3.3 — Override PLP

```
Adapte la PLP (Product Listing Page).

Focus :
1. Layout de la grille produits (colonnes, gaps, responsive)
2. Header de catégorie (titre, breadcrumb, count produits)
3. Style des filtres latéraux

Utilise les composants natifs (ProductGrid, ProductGridItem) avec le CustomProductCard déjà créé.
Plan en 5 lignes avant de coder. Branche : feat/custom-plp.
```

### 3.4 — Override PDP

```
Adapte la PDP (Product Details Page).

Sections à customiser dans ProductDetails :
1. ImageGallery — layout
2. ProductTitle — typo
3. Prix — display
4. BuyButton — style et label

Approche :
- Override la section ProductDetails avec une CustomProductDetails
- Garde les hooks (usePDP) pour préserver les données
- Style via CSS Modules + tokens FastStore

Via le MCP, vérifie d'abord la doc "Overriding ProductDetails section" pour notre version.
Plan en 5 lignes. Branche : feat/custom-pdp.
```

---

## Phase 4 — Itération et debug

### 4.1 — Comparer rendu vs cible (avec screenshot)

```
[Drag-drop ici 2 screenshots : screenshot-actuel.png et screenshot-cible.png]

Image 1 = mon rendu actuel.
Image 2 = la cible visuelle.

Liste les 3 différences principales (couleur, espacement, typo, layout).
Pour chaque différence, propose 1 fix précis (token à modifier, propriété CSS à ajuster).
Ne modifie rien encore — j'approuve avant.
```

### 4.2 — Mode questions inversées

```
Je veux [TÂCHE].

Avant que tu commences, pose-moi les 3 à 5 questions qui te manquent pour faire un bon job.
Une question par ligne, courte. Je réponds en 1 ligne chacune, puis tu codes.
```

### 4.3 — Vérifier l'impact analytics

```
Avant de merger ma branche actuelle, vérifie :
1. Est-ce que j'ai touché des composants qui impactent les analytics Intelligent Search ?
2. Via le MCP, lis la doc "List of Native Sections and Overridable Components"
3. Si risque détecté, dis-moi quoi tester manuellement (DevTools Network → events)

Réponse courte, format checklist.
```

### 4.4 — Préparer un commit

```
Prépare un commit propre :
1. Liste les fichiers modifiés (git status)
2. Propose un message Conventional Commits (feat/fix/style/etc.)
3. Je valide, tu push sur la branche actuelle
4. Rappelle-moi si je dois créer une PR sur GitHub
```

---

## Phase 5 — Pré-démo

### 5.1 — Smoke test final

```
Smoke test avant démo :
1. yarn build — confirme que ça passe sans erreur
2. yarn dev — vérifie pages /, /outillage, /scie-sauteuse-pst650-easy-500w---bosch/p
3. Liste les 3 plus gros risques visuels (alignement, couleur, mobile responsive)
4. Pour chaque, suggère un fix < 5 min

Format : checklist actionnable. Pas de roman.
```

---

## Tips généraux pour mes prompts

- **Toujours en français** dans les réponses (tu peux écrire les prompts en anglais ou français, peu importe)
- **Plan avant code** sur tout override > 50 lignes
- **Screenshots** : drag-droppe les images au lieu de décrire en mots
- **Compact** : demande "format compact" ou "checklist" pour éviter les pavés en CLI
- **Branches** : toujours `feat/nom-court` pour ne jamais polluer main