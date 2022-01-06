FROM node:10-stretch-slim
WORKDIR /app
COPY . /app
RUN apt-get update && apt-get install --yes python3 && npm install;
EXPOSE 3000
CMD ["npm", "start"]
