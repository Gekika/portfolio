# ---- Stage 1: build the Angular app ----
# Temporary machine with Node 24, same as your laptop
FROM node:24-slim AS build
WORKDIR /app

# Dependencies first, so this layer is cached when only code changes
COPY package.json package-lock.json ./
RUN npm ci

# Then the source, then build -> dist/portfolio/browser
COPY . .
RUN npm run build

# ---- Stage 2: the image that actually runs ----
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/portfolio/browser /usr/share/nginx/html
EXPOSE 80