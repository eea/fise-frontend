# Based on https://github.com/plone/volto/blob/master/entrypoint.sh

FROM node:10-jessie

RUN apt-get update -y
RUN apt-get install -y git

WORKDIR /opt/fise/

COPY package.json .
RUN yarn install

COPY . .
RUN rm -f package.json.lock

RUN NODE_OPTIONS=--max_old_space_size=4096 RAZZLE_API_PATH=VOLTO_API_PATH RAZZLE_INTERNAL_API_PATH=VOLTO_INTERNAL_API_PATH yarn build

COPY entrypoint-prod.sh entrypoint.sh
RUN chmod +x entrypoint.sh

ENTRYPOINT ["/opt/fise/entrypoint.sh"]
EXPOSE 3000 3001 4000 4001
CMD yarn start:prod
