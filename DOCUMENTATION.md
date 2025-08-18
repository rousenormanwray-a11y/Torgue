# TORQUE Documentation

This guide explains the architecture, features, and how teams (technical and non-technical) can work with the system.

## What is TORQUE?
A Nigeria-first marketplace optimized for low-data, offline-friendly experiences, with crypto and fiat escrow, social commerce, and banking integrations.

## Key Features (Plain English)
- Prices in Naira (₦), optimized for 2G/3G networks.
- Voice notes for chat, local languages (English, Pidgin, Hausa, Yoruba, Igbo).
- Crypto escrow (USDT/USDC/etc.) and fiat escrow (bank transfers, USSD, POS agents).
- Social shopping with WhatsApp/TikTok/Instagram integrations.

## Apps
- Web: PWA that works offline.
- Mobile: Expo-based app (placeholder scaffold) to be expanded.
- Desktop: Electron placeholder.
- Bots: WhatsApp, USSD, and Voice apps for alternative access.

## Services
- Auth: KYC tiers and authentication.
- Listings: Search and listing endpoints (to be expanded with Elasticsearch).
- Crypto Escrow: Create/connect/convert crypto escrow.
- Fiat Escrow & Wallet: Wallet APIs with provider abstraction (Monnify/Paystack).
- Social: Catalog sync, group buying, discovery feed.
- Compliance: KYC/AML checks stubs.
- Geolocation, Voice Processing, Blockchain utilities, Analytics.

## Wallet System (Monnify + Paystack)
- Provider-agnostic interfaces in `@torque/wallet-core`.
- Monnify and Paystack services implement customer, virtual accounts, webhook verification, settlements (stubs for now).
- Wallet service exposes REST endpoints for initialization, transactions, withdrawals, virtual accounts, and webhooks.

## Configuration
Edit `.env` variables (see `.env.example`).
- Primary vs fallback providers.
- Monnify/Paystack credentials.
- Wallet thresholds and fees.

## How Non-Technical Teams Use It
- Web app: open the site, browse, and perform actions. Offline support keeps core pages functional.
- Language: switch language from header to Pidgin or local languages.
- Payments: wallet system supports local bank transfers; crypto is optional for advanced users.

## Development Flow (Technical)
1. Install: `pnpm install`
2. Dev (web): `pnpm --filter @torque/web dev`
3. Dev (wallet service): `pnpm --filter @torque/wallet dev`
4. Build all: `pnpm build`
5. Docker local: `docker compose up wallet web`

## Testing (To Expand)
- Unit tests for providers and webhook verification.
- Integration tests for wallet flows and social catalog sync.
- Load tests for high RPS.

## Roadmap
- Replace placeholder implementations with real external API calls and DB persistence (PostgreSQL + Prisma).
- Add telco/bank adapters behind feature flags.
- Expand mobile app with full flows and offline caching.

## Support
- Health endpoints at `/health` for each service.
- Logs printed to stdout (wire to DataDog/Sentry in production).