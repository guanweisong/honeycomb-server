FROM mhart/alpine-node AS Builder

# 设置工作目录
WORKDIR /usr/src/node-app

COPY package.json yarn.lock /usr/src/node-app/

# 安装依赖
RUN yarn

RUN chmod 777 -R /usr/local/share/.cache/yarn

COPY . .

FROM mhart/alpine-node
# 设置时区
RUN apk --update add tzdata \
    && cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
    && echo "Asia/Shanghai" > /etc/timezone \
    && apk del tzdata

WORKDIR /usr/src/node-app

# 拷贝所有源代码到工作目录
COPY --from=builder /usr/src/node-app .

# 暴露容器端口
EXPOSE 7001

# 启动node应用
CMD npm start
