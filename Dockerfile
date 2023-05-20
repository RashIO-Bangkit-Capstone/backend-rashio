FROM node:16.13.1-alpine3.14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Bundle app source
COPY . .

# Expose port 9000
EXPOSE 9000

# Run the app
CMD [ "npm", "start" ]
