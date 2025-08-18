FROM node:22-alpine
WORKDIR /app
COPY ../../package.json ../../pnpm-workspace.yaml ../../tsconfig.base.json ../../turbo.json ./
RUN corepack enable && corepack prepare pnpm@10.11.1 --activate
COPY ../../ .
RUN pnpm install --frozen-lockfile=false
WORKDIR /app/services/fiat-escrow
EXPOSE 4040
CMD ["pnpm","dev"]

