FROM node:alpine

WORKDIR /app

COPY . .

EXPOSE 5000

CMD ["npm", "server"]