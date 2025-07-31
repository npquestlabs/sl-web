# ARG defines a variable that users can pass at build-time
ARG APP_NAME

#----------------------------------------------------------------#
# 1. Base stage with Node.js
#----------------------------------------------------------------#
FROM node:20-alpine AS base
WORKDIR /app

#----------------------------------------------------------------#
# 2. Pruner stage to isolate the specific app and its dependencies
#----------------------------------------------------------------#
FROM base AS pruner
# First, copy the root package.json and lockfile
COPY package.json package-lock.json ./
# Copy the turbo.json for build configurations
COPY turbo.json turbo.json

# Install dependencies needed to run turbo
RUN npm install -g turbo

# Copy the source code of all apps and packages
COPY . .

# Prune the monorepo to only include the specified app and its dependencies
RUN turbo prune --scope=${APP_NAME} --docker

#----------------------------------------------------------------#
# 3. Development dependencies stage
#----------------------------------------------------------------#
FROM base AS development-dependencies-env
# Copy the pruned dependency definitions
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/package-lock.json ./package-lock.json
# Install all dependencies
RUN npm ci

#----------------------------------------------------------------#
# 4. Production dependencies stage
#----------------------------------------------------------------#
FROM base AS production-dependencies-env
# Copy the pruned dependency definitions
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/package-lock.json ./package-lock.json
# Install only production dependencies
RUN npm ci --omit=dev

#----------------------------------------------------------------#
# 5. Build stage
#----------------------------------------------------------------#
FROM base AS build-env
# Copy the pruned full source code
COPY --from=pruner /app/out/full/ .
# Copy the development node_modules
COPY --from=development-dependencies-env /app/node_modules ./node_modules
# Run the build command for the specific app
RUN npx turbo run build --filter=${APP_NAME}

#----------------------------------------------------------------#
# 6. Final production image
#----------------------------------------------------------------#
FROM node:20-alpine
# Set the working directory, ensuring the app name is considered
WORKDIR /app
# Copy the package.json and lockfile for the final app
COPY ./package.json package-lock.json ./
# Copy the production node_modules
COPY --from=production-dependencies-env /app/node_modules ./node_modules
# Copy the built application from the build-env
# Note: The output path from turbo build might need adjustment based on your project structure
# This example assumes the build output is in `apps/<APP_NAME>/build` within the pruned structure
COPY --from=build-env /app/apps/${APP_NAME}/build ./build
# Set the start command
CMD ["npm", "run", "start"]