// import Express Router from express
const { Router } = require('express');

// import our productsController
const accountsController = require('../controllers/userAccount');

// create an instance of Express Router.
const accountsRouter = Router();

accountsRouter.post('/signup', accountsController.postUser);
accountsRouter.post('/signin', accountsController.postLogin);
accountsRouter.put('/userAccount/UpdateSuperAdmin/:superId', accountsController.manageSuperAdminAccount);
accountsRouter.put('/userAccount/UpdateLabManager/:labmanagerId', accountsController.manageLabManagerAccount);
accountsRouter.put('/userAccount/UpdateLabAdmin/:labAdminId', accountsController.manageLabAdmin);

//authRouter.post('/signin', accountsController.postLogin);

// export the router instance 
module.exports = accountsRouter;