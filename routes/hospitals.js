// import Express Router from express
const { Router } = require('express');

// import our productsController
const hospitalsController = require('../controllers/hospitals');

// create an instance of Express Router.
const hospitalsRouter = Router();

hospitalsRouter.post('/addHospital', hospitalsController.addHospital);
hospitalsRouter.get('/', hospitalsController.getHospitals);
hospitalsRouter.put('/editHospital/:hospitalID', hospitalsController.editHospital);
hospitalsRouter.delete('/:hospitalID', hospitalsController.delHospital);

hospitalsRouter.get('/report/:hospitalID', hospitalsController.generateHospitalReport);
hospitalsRouter.get('/report', hospitalsController.yearlyReport);


// export the router instance 
module.exports = hospitalsRouter;