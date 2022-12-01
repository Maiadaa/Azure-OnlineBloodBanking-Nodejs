// import Express Router from express
const { Router } = require('express');

// import our productsController
const hospitalsController = require('../controllers/hospitals');

// create an instance of Express Router.
const hospitalsRouter = Router();

// whenever we receive a GET request on products route '/',
// we will invoke the getProducts method in the products controller.
hospitalsRouter.get('/', hospitalsController.getHospitals);