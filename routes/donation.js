// import Express Router from express
const { Router } = require('express');

// import our productsController
const donationsController = require('../controllers/donation');

// create an instance of Express Router.
const donationRouter = Router();

donationRouter.get('/', donationController.getdonations);

// export the router instance 
module.exports = donationRouter;