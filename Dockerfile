FROM node:latest

ENV NODE_ENV=production \
  APP_PATH=/www/koa-server

WORKDIR $APP_PATH

# 将当前目录的package.json 拷贝到工作目录下
COPY package.json package-lock.json ./

RUN npm install

# 拷贝当前目录的文件到工作目录(除了.dockerignore中忽略的)

COPY . .

EXPOSE 4000

CMD ["npm", "server"]