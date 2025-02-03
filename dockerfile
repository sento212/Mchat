##run server of pogram and envaroment
FROM node:20.15-slim

## copy all project to file directory
COPY . /app

##move directory
WORKDIR /app

# Install dependencies
RUN npm install

## confiugre listening port 
EXPOSE 3000

## make command to execute when we run the docker
CMD npm run dev