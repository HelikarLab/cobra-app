FROM node:10-alpine

WORKDIR /app

RUN set -o errexit -o nounset \
	&& echo "Installing dependencies" \
	&& apk update \
	&& apk add --no-cache \
		bash \
		ca-certificates \
		git \
		python

COPY ./app/client/package.json /app/package.json
COPY ./app/client/yarn.lock    /app/yarn.lock

RUN yarn install --pure-lockfile

COPY ./app/client /app

COPY ./docker/base/web/entrypoint /entrypoint
RUN sed -i 's/\r//' /entrypoint \
	&& chmod +x /entrypoint
	# && chown app /entrypoint

COPY ./docker/base/web/start /start
RUN sed -i 's/\r//' /start \
	&& chmod +x /start
	# && chown app /start

EXPOSE 5000

ENTRYPOINT ["/entrypoint"]