FROM node:latest
WORKDIR /app
COPY package.json yarn.lock ./ 
RUN yarn
COPY . .
EXPOSE 80
CMD ["yarn", "start"]