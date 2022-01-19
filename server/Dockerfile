# default node enviroment
FROM node

# specify node enviroment matching package.json
ENV NODE_VERSION 17.3.0

# root directory
WORKDIR /shopify/server
COPY package.json yarn.lock ./
# install all dependencies
RUN yarn install
COPY . .
EXPOSE 4000

# command to start
CMD ["yarn", "dev"]