FROM node:22-bookworm-slim

RUN useradd -m -u 1000 user
WORKDIR /app

COPY --chown=user package.json package-lock.json ./
RUN npm ci

COPY --chown=user . .
USER user
ENV NODE_ENV=production

RUN npm run build

EXPOSE 7860
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "7860"]
