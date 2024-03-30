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
CMD [ "/bin/sh", "-c", "npm run db:migrate && npm run start"]
