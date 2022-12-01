// import Express Router from express
const { Router } = require('express');

// import our productsController
const hospitalsController = require('../controllers/hospitals');

// create an instance of Express Router.
const hospitalsRouter = Router();

// GET request on products route '/', will invoke the getHospitals method in the hospitals controller.
hospitalsRouter.post('/', hospitalsController.addHospital);
hospitalsRouter.get('/', hospitalsController.getHospitals);
hospitalsRouter.put('/:hospitalID', hospitalsController.editHospital);
hospitalsRouter.delete('/:hospitalID', hospitalsController.delHospital);

// export the router instance 
module.exports = hospitalsRouter;