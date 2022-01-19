# node enviroment
FROM node

# root directory
WORKDIR /shopify/client
COPY package*.json yarn.lock ./

# install all dependencies
RUN yarn install
COPY . .
# expose client port
EXPOSE 3000 

# command to start
CMD ["yarn", "start"]