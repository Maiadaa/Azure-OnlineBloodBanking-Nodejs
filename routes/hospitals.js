// import Express Router from express
const { Router } = require('express');

// import our productsController
const hospitalsController = require('../controllers/hospitals');

// create an instance of Express Router.
const hospitalsRouter = Router();

// GET request on products route '/', will invoke the getHospitals method in the hospitals controller.
hospitalsRouter.get('/', hospitalsController.getHospitals);

// export the router instance 
module.exports = hospitalsRouter;