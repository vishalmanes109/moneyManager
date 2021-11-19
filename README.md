
<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)

* [Architecture](#architecture)

* [Built With](#built-with)
* [Getting Started](#getting-started)
* [Prerequisites](#prerequisites)
* [Installation](#installation)



<!-- ABOUT THE PROJECT -->
## About The Project

### MoneyManager:
* What is MoneyManager?
MoneyManager is microservice based web app that helps to manage your finances by keeping track of expenses. 
`vishalmanes109`, `MoneyManager`, `finance`

### screnshots
   
<img align="center" src="mockups/homepage_laptop_cr.jpg" alt="desktop homepage" width="80%" height="80%">
<br>
<br>
   
<img align="center" src="mockups/tablet_cr.jpg" alt="tablet homeage" width="80%" height="80%">
<br>
<br>
<img align="center" src="mockups/mobile.jpg" alt="sc4" width="80%" height="80%">
<br>
<br>
<img align="center" src="mockups/post_tablet.jpg" alt="sc2" width="80%" height="80%">


## Architecture

### Checkout https://github.com/vishalmanes109/financewala for Backend Code.


### Overview:

* Entire WebApp modularized into 3 micro-services.
    1. userService: Handles user profile, authentication.
    2. transactionService: Handles transactions.
    3. statsService: Handles graphicle representation.

* statsService depends on transactionService for it's data.

* Eventbus service use for async operations.

* If transactionService failed to send data to statsService then it sends to evenBus and eventBus asyncronously sends it to statsService.

### READ and WRITE Operations:
1. READ is possible for all 3 services.
2. WRITE is allowed only for userService and transactionService. 
3. statsSerivce and eventBus service does not provide endpoints for WRITE request to users.

### Database:
1. PostgreSQL is used by userService, transactionService and statsService. 
2. MongoDB is used by only eventBus.
3. stastService DB is populated from transactionService DB or from eventBud DB.
  
### Caching
* In memory caching (Redis) is used. 
* COmbination of  side aside and write back caching technique is used for caching.
    


#### Basic Architcture 
<img align="center" src="img/basic_arch.png" alt="Basic Architecture" width="80%" height="80%">
<br>
<br>

* Client sends request to the server. if it is read request then it is fetched from cache. the there is miss fault then request transers to the web server. web server querys PostgreSQL and sends response to the client and simultaniously updates the cache. 


#### Database Schema

<img align="center" src="img/DB_Schema.jpg" alt="Database Schema" width="80%" height="80%">
<br>    
<br>

#### userService Architecture
<img align="center" src="img/UserService.png" alt="User Service Architecture" width="80%" height="80%">
<br>    
<br>

#### transactionService and statsService    
* READ Operations    
<img align="center" src="img/readOps.png" alt="Read Operations" width="80%" height="80%">
<br>    
<br>

* Write Operations
<img align="center" src="img/write_ops.png" alt="Write Operations" width="80%" height="80%">
<br>    
<br>

### Built With

* [ React ]( https://reactjs.org/)
* [ Material UI](https://mui.com/)
* [NodeJs]( https://nodejs.org/en/)
* [Express]( https://expressjs.com/)
* [PostgreSQL]( https://www.postgresql.org/)
* [MongoDB]( https://www.mongodb.com/)
* [Redis]( https://redis.io/)
* [Docker]( https://www.docker.com/)



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
* nodejs
* PostgreSQL
* express

* npm
```sh
npm install npm@latest -g
```
* nodemon
```sh
npm install nodemon -g
```

### Installation

1. Clone the repo

Fontend
```sh
git clone https://github.com/vishalmanes109/moneyManager.git
```
Backend
```sh
git clone https://github.com/vishalmanes109/moneyManager.git
```

 
2. Install NPM packages
```sh
npm install
```
  


### Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
