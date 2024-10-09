FROM node:18
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8083
CMD ["npm", "start"]
