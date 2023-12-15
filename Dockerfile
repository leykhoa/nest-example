# Step 1: Build the application in a node container
FROM node:16 AS builder

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available) to the container
COPY package*.json ./

# Install all dependencies
RUN npm install

# Copy the rest of your application's source code from your host to your image filesystem.
COPY . .

# Build the NestJS application
RUN npm run build

# Step 2: Use a smaller base image to run the application
FROM node:16-alpine

WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available) to the container
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Copy the compiled app from the builder stage
COPY --from=builder /usr/src/app/dist ./dist

# Your app binds to port 3000 so you'll use the EXPOSE instruction to have it mapped by the docker daemon
EXPOSE 3000

# Define the command to run your app (adjust "main" to your app's entry point file)
CMD [ "node", "dist/main" ]
