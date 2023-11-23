FROM node:20.9

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY prisma ./prisma/

# Install app dependencies
RUN npm install

COPY . .

RUN npm run build

WORKDIR /app

EXPOSE 3000
CMD [ "npm", "run", "start:prod" ]