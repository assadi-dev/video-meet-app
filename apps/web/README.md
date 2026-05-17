# apps/web — Client WebRTC LiveKit

Interface de visioconférence Next.js avec Turbopack, connectée à un serveur LiveKit via l'API Express du monorepo.

## Stack

- **Next.js 16.2** (App Router, Turbopack)
- **React 19**
- **TypeScript 5.9**
- **Tailwind CSS 4** + **shadcn/ui** (Radix UI)
- **LiveKit Client 2.19** — WebRTC streaming
- **Zustand 5** — gestion d'état
- **React Hook Form 7** + **Zod 4** — formulaires et validation

## Structure

```
apps/web/
└── app/
    ├── home/               # Page d'accueil — créer ou rejoindre une room
    ├── waiting-room/[id]/  # Salle d'attente — sélection des périphériques
    ├── room/[id]/          # Salle de visioconférence
    ├── components/         # Composants réutilisables (UI, formulaires)
    ├── hooks/              # useLivekitClient, useMediaDevices, useNavigation
    ├── store/              # Zustand stores (préférences utilisateur, périphériques)
    └── lib/                # Utilitaires (API, formatage, générateurs)
```

## Variables d'environnement

Créer un fichier `.env.local` à la racine de `apps/web` :

```env
NEXT_PUBLIC_API_URL=http://localhost:5500
NEXT_PUBLIC_LIVEKIT_URL=ws://localhost:7880
```

## Développement

Depuis la racine du monorepo :

```sh
npm run dev
```

Ou uniquement cette app :

```sh
npx turbo dev --filter=web
```

L'app tourne sur **https://localhost:3000** (HTTPS activé par défaut pour les APIs WebRTC).

## Build de production

```sh
npx turbo build --filter=web
```

## Pages et routing

| Route | Description |
|-------|-------------|
| `/home` | Formulaire de création / rejoindre une room |
| `/waiting-room/[id]` | Prévisualisation caméra/micro et sélection des périphériques |
| `/room/[id]` | Salle de conférence avec grille de participants |

## Hooks principaux

- **`useLivekitClient`** — gère la connexion Room LiveKit, les flux des participants et l'état des périphériques
- **`useMediaDevices`** — énumère et bascule les caméras / micros disponibles
- **`useNavigation`** — gestion de la navigation entre les pages

## Alias de chemins

Configurés dans `tsconfig.json` :

```
@/*           → app/*
@components/* → app/components/*
@hooks/*      → app/hooks/*
@store/*      → app/store/*
@lib/*        → app/lib/*
```
