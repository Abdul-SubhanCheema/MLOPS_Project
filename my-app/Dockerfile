# Use an official Node.js runtime as a parent image
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy only package.json from the current directory (my-app)
COPY ./package.json ./

# Install dependencies
RUN npm install  

# Copy the rest of the application files from the current directory
COPY ./ ./

# Expose the port your frontend will run on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
