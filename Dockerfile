# Based on https://github.com/plone/volto/blob/master/entrypoint.sh

FROM node:10-jessie

ARG NPM_CONFIG_REGISTRY
ARG MAX_OLD_SPACE_SIZE=2048

ENV NODE_OPTIONS=--max_old_space_size=$MAX_OLD_SPACE_SIZE

RUN apt-get update -y \
 && apt-get install -y git bsdmainutils vim-nox mc \
 && rm -rf /var/lib/apt/lists/*

WORKDIR /opt/frontend/

COPY docker-image.txt /
COPY . .

RUN mkdir -p /opt/frontend/src/addons

RUN chown -R node /opt/frontend

USER node

RUN echo "prefix = \"/home/node\"\n" > /home/node/.npmrc
RUN rm -rf node_modules .git

RUN npm install mr-developer

RUN node_modules/.bin/mrdeveloper --config=jsconfig.json --no-config --output=addons

RUN make activate-all
RUN NPM_CONFIG_REGISTRY=$NPM_CONFIG_REGISTRY npm install

RUN make clean-addons
RUN rm -f package-lock.json

RUN RAZZLE_API_PATH=VOLTO_API_PATH RAZZLE_INTERNAL_API_PATH=VOLTO_INTERNAL_API_PATH yarn build

COPY entrypoint-prod.sh entrypoint.sh
# RUN chmod +x entrypoint.sh

ENTRYPOINT ["/opt/frontend/entrypoint.sh"]
EXPOSE 3000 3001 4000 4001
CMD yarn start:prod
