# Use an official Node runtime as a parent image
FROM node:20

# Set the working directory in the container
WORKDIR /usr/src/app


COPY package*.json ./

# Install any dependencies
RUN yarn install

# Bundle the source code inside the docker image
COPY . .

RUN yarn build

EXPOSE 80

# Define the command to run the app
CMD ["yarn", "start:prod"]
