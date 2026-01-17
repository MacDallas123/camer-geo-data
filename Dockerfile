FROM node:22.10.0

RUN mkdir /app
WORKDIR /app

VOLUME /tmp

# Install dependencies first to leverage Docker layer caching
COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

# Install nodemon locally instead of globally to optimize build time
RUN yarn add nodemon --dev

COPY . .

CMD ["npm", "run", "dev"]
