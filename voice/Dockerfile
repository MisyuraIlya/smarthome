# Use an official Node.js runtime as the base image
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install application dependencies
RUN npm install

# Download and unzip the Vosk Russian model
RUN apt-get update && apt-get install -y wget unzip && \
    wget https://alphacephei.com/vosk/models/vosk-model-ru-0.22.zip && \
    unzip vosk-model-ru-0.22.zip && \
    rm vosk-model-ru-0.22.zip

# Copy the rest of the application code
COPY . .

# Ensure microphone support by installing ALSA utilities
RUN apt-get update && apt-get install -y \
    alsa-utils \
    libasound2-dev \
    && rm -rf /var/lib/apt/lists/*

# Expose any ports (if necessary)
EXPOSE 3000

# Start the Node.js application
CMD ["node", "your-script-name.js"]
