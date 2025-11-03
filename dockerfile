#FROM: Baixa a imagem base do node
FROM node:22

#WORKDIR: Define o diretorio de trabalho da imagem baixada
WORKDIR /home/node/app

#COPY: Copias os arquivos base declarados no regex
COPY package*.json ./

#RUN: Executa o comando de instalar as libs
RUN npm install

#Copia os arquivos raiz de src
COPY ./src /home/node/app/src

#EXPOSE: Define a porta da aplicacao
EXPOSE 3000

#CMD: 
CMD [ "node", "./src/server.js" ]