FROM achillesrasquinha/cobrapy

WORKDIR /app

RUN set -o errexit -o nounset \
	&& echo "Installing dependencies" \
	&& apk update \
	&& apk add --no-cache \
		bash \
		python \
		nodejs \
		yarn \
	\
	&& echo "Adding user and group" \
	&& addgroup -S app \
	&& adduser -S -G app app \
	\
	&& echo "Creating empty node_modules folder" \
	&& mkdir -p /app/node_modules

COPY ./app/server/package.json /app/package.json
COPY ./app/server/yarn.lock    /app/yarn.lock

RUN yarn install --pure-lockfile

COPY ./app/server /app

COPY ./docker/base/app/manage /manage

RUN chmod +x /manage/* \
    && mv /manage/* /usr/local/bin \
    && rmdir /manage

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