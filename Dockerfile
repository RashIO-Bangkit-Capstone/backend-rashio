FROM node:20-bullseye

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Bundle app source
COPY . .

# Expose port 9000
EXPOSE 9000

# Run the app
COPY script.sh /app/script.sh
RUN chmod +x /app/script.sh
CMD [ "/bin/sh", "-c", "/app/script.sh"]
