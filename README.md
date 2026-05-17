# WebRTC LiveKit — Monorepo

Application de visioconférence temps réel basée sur LiveKit (WebRTC), construite dans un monorepo Turborepo avec Next.js (Turbopack) côté client et Express.js côté serveur.

## Stack technique

| Couche | Technologie |
|--------|-------------|
| Monorepo | Turborepo 2.9 |
| Runtime | Node.js >= 24 |
| Langage | TypeScript 5.9 |
| Frontend | Next.js 16.2 + React 19 + Turbopack |
| Styling | Tailwind CSS 4 + shadcn/ui |
| État | Zustand 5 |
| Backend | Express 5.1 |
| WebRTC | LiveKit (client v2.19 / server-sdk v2.15) |
| Validation | Zod 4 |
| DI (serveur) | tsyringe |

## Structure du monorepo

```
webrtc-livekit/
├── apps/
│   ├── web/        # Client Next.js — interface de visioconférence
│   ├── server/     # API Express — génération de tokens LiveKit
│   └── docs/       # Placeholder documentation
├── packages/
│   ├── ui/                  # Composants React partagés
│   ├── eslint-config/       # Config ESLint commune
│   └── typescript-config/   # tsconfig.json partagés
├── turbo.json
└── package.json
```

## Prérequis

- Node.js >= 24
- npm >= 11
- Un serveur LiveKit (auto-hébergé ou [LiveKit Cloud](https://livekit.io))

## Installation

```sh
# Installer toutes les dépendances
npm install
```

## Variables d'environnement

**`apps/web` — créer `.env.local`**

```env
NEXT_PUBLIC_API_URL=http://localhost:5500
NEXT_PUBLIC_LIVEKIT_URL=ws://localhost:7880
```

**`apps/server` — créer `.env`**

```env
HTTP_PORT=5500
LIVEKIT_URL=http://localhost:7880
LIVEKIT_API_KEY=<votre-api-key>
LIVEKIT_API_SECRET=<votre-api-secret>
```

## Développement

Lancer tous les services simultanément :

```sh
npm run dev
```

Ou un service spécifique :

```sh
npx turbo dev --filter=web
npx turbo dev --filter=server
```

| Service | URL |
|---------|-----|
| Web (HTTPS + Turbopack) | https://localhost:3000 |
| API Express | http://localhost:5500 |

## Scripts disponibles

```sh
npm run dev          # Lance tous les services en mode développement
npm run build        # Build de production (tous les apps)
npm run start        # Démarre les builds de production
npm run lint         # ESLint sur l'ensemble du monorepo
npm run check-types  # Vérification TypeScript
npm run format       # Formatage Prettier
```

## Flux de fonctionnement

```
Navigateur (apps/web)
  │
  ├── /home            → Créer ou rejoindre une room
  │     └── POST /api/rooms/token   ─┐
  │                                   │ Express (apps/server)
  ├── /waiting-room/[id]  ←──────────┘  LiveKitService.generateToken()
  │     └── Sélection et prévisualisation des périphériques
  │
  └── /room/[id]
        └── Connexion WebSocket → Serveur LiveKit (SFU)
              • Flux vidéo/audio des participants
              • Grille de participants dynamique
              • Contrôles (micro, caméra, déconnexion)
```

## API serveur

| Méthode | Route | Description |
|---------|-------|-------------|
| POST | `/api/rooms/token` | Génère un JWT LiveKit pour rejoindre une room |
| GET | `/api/rooms` | Liste les rooms actives |
| POST | `/api/rooms` | Crée une nouvelle room |
| DELETE | `/api/rooms/:name` | Supprime une room |

## Cache distant (Turborepo)

Pour partager le cache de build entre machines ou CI/CD :

```sh
npx turbo login
npx turbo link
```

## Liens utiles

- [LiveKit Documentation](https://docs.livekit.io)
- [Turborepo Documentation](https://turborepo.dev/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui](https://ui.shadcn.com)
