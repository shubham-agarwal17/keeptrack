# Dockerfile
 
# Use an existing node alpine image as a base image.
FROM bitnami/node:18.19.0
 
# Set the working directory.
# WORKDIR /app

# Copy the rest of the application files.
COPY . .

# Install application dependencies.
RUN npm install
 
# Expose the port.
EXPOSE 8080

RUN echo "Node: " && node -v
RUN echo "NPM: " && npm -v

# Run the application.
CMD ["npm", "start"]