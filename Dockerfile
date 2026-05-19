
# Use an official Node runtime as a parent image
FROM node:22.22.3-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your application code
COPY . .

# Disables the lovable-tagger development plugin that caused the ESM crash
ENV LOVABLE_TAGGER_DISABLED=true

# Expose the port your app runs on
EXPOSE 3000

# Command to run your app
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
