// import Express Router from express
const { Router } = require('express');

// import our productsController
const accountsController = require('../controllers/userAccount');

// create an instance of Express Router.
const accountsRouter = Router();

accountsRouter.post('/signup', accountsController.postUser);
accountsRouter.post('/signin', accountsController.postLogin);

// export the router instance 
module.exports = accountsRouter;