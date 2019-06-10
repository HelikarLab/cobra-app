FROM nikolaik/python-nodejs:python3.7-nodejs10

WORKDIR /usr/src/app/server

COPY . .

EXPOSE 5000

RUN curl -o- -L https://yarnpkg.com/install.sh | bash
RUN yarn
RUN pip install cobra
