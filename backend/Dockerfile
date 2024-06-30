FROM node:20 as pnpm
RUN npm install -g pnpm

FROM pnpm as modules
WORKDIR /api
COPY /prisma ./prisma
COPY /package.json ./
RUN pnpm install

FROM modules as base
COPY /public ./public
COPY /src ./src
COPY /nest* ./
COPY /tsconfig* ./

FROM base as development
ENV NODE_ENV=development

FROM base as production
ENV NODE_ENV=production
RUN pnpm build
RUN chown -R node /api
USER node