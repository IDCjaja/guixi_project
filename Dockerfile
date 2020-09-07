FROM registry.cn-hangzhou.aliyuncs.com/skylark/saler-nginx:1.18.0-alpine
COPY ./guixi/ /usr/share/nginx/html/guixi_app
COPY ./conf.d /etc/nginx/conf.d
WORKDIR /usr/share/nginx/html
EXPOSE 8080
