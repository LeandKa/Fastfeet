<p align="center">
  <img width="250" height="50" src="https://raw.githubusercontent.com/rocketseat-education/bootcamp-gostack-desafio-02/4e6c5db70ac176f78545d5c8a71b5930f72dc13a/.github/logo.png">
</p>


<h1 align="center">:page_with_curl: Descrição do Projeto</h1>

<p>Aplicação Full-Stack para um sistema de Entregas idealizada para ser o desafio final do curso da <A href="https://rocketseat.com.br/">Rocketseat<A/>,fiz esse projeto baseado nesse <A href="https://github.com/rocketseat-education/bootcamp-gostack-desafio-02/blob/4e6c5db70ac176f78545d5c8a71b5930f72dc13a/.github/logo.png">repositorio <A/> 
achado no github projeto sendo feito com ReactJs/Nodejs/React Native/Expo CLi.</p>

<h1 align="center"> 
	:books: Tecnologias 
</h1>

<p align="center">
  BACK-END
</p>

<ul>
    <li><a href="https://www.npmjs.com/package/bcryptjs">BcryptJs</a></li>
    <li><a href="https://redis.io/">Redis</a></li>
    <li><a href="https://www.npmjs.com/package/nodemon/">Nodemon</a></li>
    <li><a href="https://sentry.io/welcome/">Sentry</a></li>
    <li><a href="https://github.com/bee-queue/bee-queue">Bee-Queue</a></li>
    <li><a href="https://date-fns.org/">Data-fns</a></li>
    <li><a href="https://www.npmjs.com/package/multer">Multer</a></li>
    <li><a href="https://nodemailer.com/about/">NodeMailer</a></li>
    <li><a href="https://sequelize.org/master/">Sequelize</a></li>
     <li><a href="https://www.npmjs.com/package/youch">Youch</a></li>
     <li><a href="https://www.npmjs.com/package/yup">Yup</a></li>
     <li><a href="https://expressjs.com/pt-br/">Express</a></li>
</ul>

<p align="center">
  FRONT-END
</p>

<ul>
    <li><a href="https://pt-br.reactjs.org/">ReactJs</a></li>
    <li><a href="https://redux.js.org/">Redux</a></li>
    <li><a href="https://redux-saga.js.org/">Redux-Saga</a></li>
    <li><a href="https://unform.dev/quick-start">Unform</a></li>
    <li><a href="https://date-fns.org/">Data-fns</a></li>
    <li><a href="https://github.com/axios/axios">Axios</a></li>
    <li><a href="https://www.npmjs.com/package/history">History</a></li>
    <li><a href="https://github.com/immerjs/immer">Immer</a></li>
     <li><a href="https://fkhadra.github.io/react-toastify/introduction">React-Toastify</a></li>
     <li><a href="https://styled-components.com/">Style-Components</a></li>
     <li><a href="https://www.npmjs.com/package/yup">Yup</a></li>
     <li><a href="https://react-select.com/home">React-Select</a></li>
     <li><a href="https://react-icons.github.io/react-icons/">React-Icons</a></li>
</ul>

<p align="center">
  MOBILE
</p>

<ul>
    <li><a href="https://reactnative.dev/">ReactNative</a></li>
    <li><a href="https://redux.js.org/">Redux</a></li>
    <li><a href="https://redux-saga.js.org/">Redux-Saga</a></li>
    <li><a href="https://unform.dev/quick-start">Unform</a></li>
    <li><a href="https://date-fns.org/">Data-fns</a></li>
    <li><a href="https://github.com/axios/axios">Axios</a></li>
    <li><a href="https://expo.io/">Expo</a></li>
    <li><a href="https://reactnavigation.org/">React-Navigation</a></li>
     <li><a href="https://styled-components.com/">Style-Components</a></li>
     <li><a href="https://www.npmjs.com/package/yup">Yup</a></li>
     <li><a href="https://github.com/oblador/react-native-vector-icons">React-Native-Vector-Icons</a></li>
</ul>

<h1 align="center"> 
	:books: Instruções 
</h1>

	Após as configurações abaixo veja o arquivo .env examplo para substituir as variaveis

<p>Primeiro precisa ser criado dois container no docker um para o servidor Mysql e o um de Redis que sera usado para o servidor de Email com o nodeMailer </p>

```
# Instale uma imagem do Redis
docker run --name redis-fastfeet -p 6379:6379 -d -t redis:alpine

# Instale uma imagem do MYSQL
docker run --name fastfeet -e MYSQL_PASSWORD=root -p 3306:3306 -d mysql

# Inicie o Redis
docker start redis-fastfeet

# Inicie o Mysql
docker start fastfeet
```

<h1>Iniciando o Back End</h1>

```
# Após te baixado o repositorio 
yarn ou npm install

#Inicialize o Sequelize e rode a seguinte sequencia de comandos para rodar as migrations e seeders no seu banco 

yarn sequelize db:migrate
yarn sequelize db:seed:all

# Iniciando o BackEnd
yarn dev ou Npm run dev

# Iniciando a queue
yarn queue ou npm run queue

```


<h1>Iniciando o Front-End</h1>

```
# Após te baixado o repositorio 
yarn ou npm install

#Simplesmente rode o comando abaixo

yarn start ou npm run start

```


<h1>Iniciando o Mobile</h1>

```
# Após te baixado o repositorio 
yarn ou npm install

#Simplesmente rode o comando abaixo

yarn start ou npm run start

```
