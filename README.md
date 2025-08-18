# TORQUE Monorepo

Nigeria-first viral marketplace with crypto/fiat escrow and social commerce.

- Package manager: pnpm
- Build: Turborepo
- Language: TypeScript

## Getting Started

- Copy `.env.example` files and fill in values
- Install deps: `pnpm install`
- Run dev: `pnpm dev`
- Build: `pnpm build`

## Documentation
- See `DOCUMENTATION.md` for feature overview and team guide.
- See `DEPLOYMENT.md` for deployment instructions (web/mobile/services).

## Marketing & Copy
- Landing page implemented at `apps/web/app/(marketing)/page.tsx` with optimized copy.
- Group buying UI at `apps/web/app/group-buying/page.tsx` and service logic in `services/social`.

## Apps
- Web (Next.js PWA)
- Mobile (React Native + Expo) – placeholder
- Desktop (Electron placeholder)
- WhatsApp Bot
- USSD
- Voice (Twilio)

## Services
- API Gateway (Kong/Tyk configs)
- Auth (KYC tiers)
- Listings (search stub)
- Crypto Escrow (create/connect/convert APIs)
- Fiat Escrow
- Social (WhatsApp sync, group purchases, feed)
- AI Content (moderation stub)
- Blockchain (on-chain utils)
- Voice Processing (STT/TTS stubs)
- Geolocation (Nigeria-optimized stub)
- Compliance (KYC/AML stubs)
- Analytics (events)

## Packages
- shared (types, DTOs, KYC config)
- ui (design system)
- config (i18n, feature flags, Nigeria prefs)
- sdk (client SDK)
