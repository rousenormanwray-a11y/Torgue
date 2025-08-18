# Deployment Guide

## Prerequisites
- Node.js 18+ (we use 22 in dev), pnpm 10+
- Docker and Docker Compose
- Cloud: AWS (recommended), Cloudflare CDN
- Environment variables configured per `.env.example`

## Web (Next.js PWA)

### Local
1. Copy env: `cp .env.example .env` and fill values.
2. Install: `pnpm install`
3. Dev: `pnpm --filter @torque/web dev` then open http://localhost:3000

### Docker (local)
- `docker compose up web`

### Production build
1. Build: `pnpm --filter @torque/web build`
2. Start: `pnpm --filter @torque/web start`
3. Reverse proxy with Nginx/Caddy, enable gzip and service worker caching.

### Container image
- Build inside `apps/web`: `docker build -t torque/web:latest .`
- Run: `docker run -p 3000:3000 --env-file .env torque/web:latest`

### Cloud
- Provision AWS ECS or Kubernetes.
- Attach Cloudflare CDN to web origin.
- Configure environment variables via Secrets Manager.
- Autoscale based on CPU/RPS.

## Mobile (Expo React Native)

The `apps/mobile` is an Expo-compatible placeholder.

### Local run
1. Install Expo CLI: `pnpm dlx expo-cli@latest` or `npm i -g expo`.
2. From `apps/mobile`: `npx expo start`.
3. Use Android emulator or Expo Go on device to scan QR.

### Build
- Cloud Build: `eas build -p android --profile preview` (requires EAS setup)
- APK local: use `gradlew assembleRelease` after ejecting to bare React Native if needed.

## Services (Node + Express)

- Start specific service: `pnpm --filter @torque/wallet dev`
- Docker: `docker compose up wallet`
- For all: `pnpm dev` (starts multiple; ensure ports are free).

## Environment and Secrets
- Copy `.env.example` to `.env` and set provider keys.
- In production, store secrets in AWS Secrets Manager or SSM Parameter Store and inject at runtime.

## Monitoring
- Add DataDog/Sentry DSNs via env.
- Health endpoints: `/health` on each service.