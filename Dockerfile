# 使用 node:14-alpine 基础镜像
# 带有 alpine 标签的基础镜像基于最小化的操作系统 alpine，拥有更小的体积
FROM node:14-alpine
WORKDIR /
COPY . .
RUN yarn install --production

# create-react-app 中 build 为最后的静态资源目录
# 如果你不是使用 cra 构建的，此处的 ./build 需要更改为你的静态资源目录
CMD http-server ./dist -p 80
EXPOSE 80