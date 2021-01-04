FROM node

WORKDIR /usr/src/functions

COPY functions .

RUN npm install 
RUN npm install playwright
RUN apt-get update && apt-get install -y libnss3 thunderbird libnspr4 libatk1.0-0 libatk-bridge2.0-0 libx11-xcb1 libcups2 libdbus-1-3 libdrm2 libxkbcommon0 libxcomposite1 libxdamage1 libxfixes3 libxrandr2 libgtk-3-0 libpango-1.0-0 libcairo2 libgdk-pixbuf2.0-0 libatspi2.0-0 libasound2 libgbm1
    

EXPOSE 8080

CMD [ "npm", "start" ]