# --- Stage 1: Build the React Application ---
FROM node:20-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
# and install dependencies. This is layered to cache dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app for production
# This command should match whatever your build script is (e.g., 'npm run build')
RUN npm run build 

# --- Stage 2: Serve the Build using Nginx ---
FROM nginx:alpine

# Copy the Nginx configuration file (we'll create this next)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built files from the 'build' stage into the Nginx public folder
# The 'build' directory name depends on your React setup (often 'build' or 'dist')
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the standard HTTP port
EXPOSE 80

# The default command runs Nginx
CMD ["nginx", "-g", "daemon off;"]