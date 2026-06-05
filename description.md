# WebRTC LiveKit — Plateforme de visioconférence temps réel

> Application de visioconférence multi-participants type « Google Meet / Zoom », construite en monorepo full-stack TypeScript autour du SFU WebRTC **LiveKit**.

---

## En bref

| | |
|---|---|
| **Type de projet** | Application web temps réel (visioconférence WebRTC) |
| **Rôle** | Conception & développement full-stack |
| **Architecture** | Monorepo Turborepo (frontend + backend + packages partagés) |
| **Statut** | En développement |
| **Auteur** | Assadi |

---

## Présentation

Ce projet est une **plateforme de visioconférence en temps réel** permettant de créer ou rejoindre des salles (rooms) et d'échanger des flux audio/vidéo entre plusieurs participants directement depuis le navigateur.

Le cœur média repose sur **LiveKit**, un serveur SFU (Selective Forwarding Unit) WebRTC : le backend Express se limite à l'authentification et à la génération de **JWT** signés, tandis que les flux média transitent en peer-to-server via le serveur LiveKit, garantissant une montée en charge maîtrisée.

L'expérience utilisateur reprend les codes des outils modernes de visioconférence : **salle d'attente** avec prévisualisation et sélection des périphériques (caméra/micro), **grille dynamique** de participants, et **barre de contrôle** (couper le micro, la caméra, quitter l'appel).

---

## Fonctionnalités clés

- 🎥 **Visioconférence multi-participants** en temps réel (audio + vidéo)
- 🚪 **Création et accès aux rooms** via un identifiant partageable
- ⏳ **Salle d'attente** (waiting room) avec prévisualisation du flux local
- 🎛️ **Sélection des périphériques** (caméra, micro) avec énumération dynamique
- 🔇 **Contrôles en appel** : activer/couper micro et caméra, déconnexion
- 🧩 **Grille de participants adaptative** avec fallback (caméra coupée)
- 🔐 **Authentification par JWT** générés côté serveur (clés API LiveKit)
- ⏱️ **Durée d'appel** et indicateurs d'état en direct
- 🌗 **Thème clair/sombre** (next-themes)
- 📋 **Copie de lien** et navigation fluide entre les vues

---

## Stack technique

| Couche | Technologies |
|--------|-------------|
| **Monorepo** | Turborepo 2.9, npm workspaces |
| **Langage** | TypeScript 5.9 (Node.js ≥ 24) |
| **Frontend** | Next.js 16 (App Router, Turbopack), React 19 |
| **UI / Styling** | Tailwind CSS 4, shadcn/ui, Radix UI, Lucide |
| **State management** | Zustand 5 (+ Immer) |
| **Formulaires & validation** | React Hook Form, Zod 4 |
| **Backend** | Express 5, tsyringe (injection de dépendances) |
| **Temps réel / WebRTC** | LiveKit (`livekit-client` v2.19, `livekit-server-sdk` v2.15), Socket.IO |
| **Infrastructure** | Docker / Docker Compose (serveur LiveKit SFU) |
| **Qualité** | ESLint 9, Prettier, configs TS/ESLint partagées |

---

## Architecture

```
webrtc-livekit/  (monorepo Turborepo)
├── apps/
│   ├── web/        # Client Next.js — interface de visioconférence
│   │   ├── home/           → créer / rejoindre une room
│   │   ├── waiting-room/    → preview + choix des périphériques
│   │   └── room/[id]/       → appel WebRTC (grille, contrôles)
│   ├── server/     # API Express — génération de tokens LiveKit (DI tsyringe)
│   └── docs/       # Documentation (placeholder)
└── packages/
    ├── ui/                  # Composants React partagés
    ├── eslint-config/       # Config ESLint commune
    └── typescript-config/   # tsconfig partagés
```

### Flux applicatif

```
Navigateur (apps/web)
  ├── /home              → créer / rejoindre une room
  │      └── POST /api/rooms/token ─┐
  │                                  │  Express (apps/server)
  ├── /waiting-room/[id] ←──────────┘  LiveKitService.generateToken()
  │      └── sélection & preview des périphériques
  └── /room/[id]
         └── WebSocket → Serveur LiveKit (SFU)
               • flux audio/vidéo des participants
               • grille dynamique • contrôles d'appel
```

### API serveur

| Méthode | Route | Description |
|---------|-------|-------------|
| `POST` | `/api/rooms/token` | Génère un JWT LiveKit pour rejoindre une room |
| `GET` | `/api/rooms` | Liste les rooms actives |
| `POST` | `/api/rooms` | Crée une nouvelle room |
| `DELETE` | `/api/rooms/:name` | Supprime une room |

---

## Points techniques mis en avant

- **Architecture monorepo** structurée avec Turborepo (cache de build, tâches partagées, configs mutualisées).
- **Séparation des responsabilités** par *feature* côté serveur, avec **injection de dépendances** (tsyringe) et tokens d'injection.
- **WebRTC en production** : intégration d'un SFU LiveKit dockerisé, gestion des ports média (TCP 7880/7881, UDP 7882).
- **Validation de bout en bout** avec Zod (schémas partagés client/serveur).
- **Gestion fine des périphériques média** via les APIs navigateur (énumération, contraintes, preview).
- **UI moderne et accessible** basée sur Radix/shadcn, avec thème adaptatif et composants réutilisables.
- **Sécurité** : configuration CORS avec validation d'origine, secrets LiveKit côté serveur uniquement.

---

## Compétences démontrées

`TypeScript` · `React 19` · `Next.js 16` · `WebRTC` · `LiveKit / SFU` · `Express` ·
`Architecture monorepo` · `Injection de dépendances` · `Docker` · `Tailwind / shadcn` ·
`State management (Zustand)` · `Validation (Zod)` · `Temps réel / WebSocket`
