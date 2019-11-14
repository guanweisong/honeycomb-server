# 设置基础镜像,如果本地没有该镜像，会从Docker.io服务器pull镜像
FROM mhart/alpine-node
# 设置时区
RUN apk --update add tzdata \
    && cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
    && echo "Asia/Shanghai" > /etc/timezone \
    && apk del tzdata

# 创建app目录
RUN mkdir -p /usr/src/node-app

# 设置工作目录
WORKDIR /usr/src/node-app

COPY package.json /usr/src/node-app/package.json
COPY yarn.lock /usr/src/node-app/yarn.lock

# 安装依赖
RUN yarn

# 拷贝所有源代码到工作目录
COPY . /usr/src/node-app

# 暴露容器端口
EXPOSE 7001

# 启动node应用
CMD npm start
