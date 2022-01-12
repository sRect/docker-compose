FROM alpine:3.15

ENV NODE_ENV=production \
  APP_PATH=/app

WORKDIR $APP_PATH

# 使用apk命令安装 nodejs 
RUN apk add --no-cache --update nodejs=16.13.1-r0

# 将当前目录的package.json 拷贝到工作目录下
COPY package.json package-lock.json ./

RUN npm install

# RUN npm install pm2 -g

# 基于基础镜像进行最终构建

# 拷贝当前目录的文件到工作目录(除了.dockerignore中忽略的)
COPY . .

EXPOSE 4000

CMD ["npm", "server"]