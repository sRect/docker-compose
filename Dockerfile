FROM alpine:3.15 AS base

ENV NODE_ENV=production \
  APP_PATH=/www/node-server/ 

WORKDIR ${APP_PATH}

# 使用apk命令安装 nodejs 
RUN apk add --no-cache --update nodejs=16.13.1-r0

# 基于基础镜像安装项目依赖
FROM base AS install

# 将当前目录的package.json 拷贝到工作目录下
COPY package.json package-lock.json ./

RUN npm install

# 基于基础镜像进行最终构建
FROM base

# 拷贝 上面生成的 node_modules 文件夹复制到最终的工作目录下
COPY --from=install ${APP_PATH}/node_modules ./node_modules

# 拷贝当前目录的文件到工作目录(除了.dockerignore中忽略的)
COPY . .

EXPOSE 4000

CMD ["npm", "run", "server"]