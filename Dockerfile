FROM node:22-slim@sha256:43ac6c60b8f89723f746e8a92ce91abd5017e627ce1ddfe4238355d3a30b772c
WORKDIR /lab
COPY --chown=node:node package.json ./
COPY --chown=node:node dist ./dist
COPY --chown=node:node scenarios ./scenarios
USER node
ENTRYPOINT ["node", "--max-old-space-size=64", "dist/cli.js"]
CMD ["verify", "all"]
