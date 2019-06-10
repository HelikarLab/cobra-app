FROM node:10

WORKDIR /usr/src/app/client

COPY . .

EXPOSE 3000

RUN curl -o- -L https://yarnpkg.com/install.sh | bash
RUN yarn