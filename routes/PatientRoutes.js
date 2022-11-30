const {Router} = require('express');

const PatientContoller = require('../controllers/PatientContoller');

const patientRouter = Router();

patientRouter.get('/', PatientContoller.getPatients);

patientRouter.post('/', PatientContoller.postPatient);

patientRouter.get('/:patientID', PatientContoller.getPatientByID);

patientRouter.get('/viewRequest/:patientID', PatientContoller.viewBagrequest);

patientRouter.put('/:patientID', PatientContoller.requestBloodBag);

module.exports = patientRouter;