FROM node:lts as dependencies
#FROM node:14.6.0 as dependencies
WORKDIR /aicollect-web-app
COPY package.json package-lock.json ./
RUN npm install -u --frozen-lockfile

FROM node:lts as builder
WORKDIR /aicollect-web-app
COPY . .
COPY --from=dependencies /aicollect-web-app/node_modules ./node_modules
RUN yarn build

FROM node:lts as runner
WORKDIR /aicollect-web-app
ENV NODE_ENV production
# If you are not using a custom next.config.js file, comment this line.
COPY --from=builder /aicollect-web-app/next.config.js ./
COPY --from=builder /aicollect-web-app/public ./public
COPY --from=builder /aicollect-web-app/.next ./.next
COPY --from=builder /aicollect-web-app/node_modules ./node_modules
COPY --from=builder /aicollect-web-app/package.json ./package.json

EXPOSE 3000
CMD ["npm", "start"]
