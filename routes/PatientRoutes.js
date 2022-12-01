const {Router} = require('express');

const patientsValidator = require('../validators/patients');

const PatientContoller = require('../controllers/PatientContoller');

const patientRouter = Router();

patientRouter.get('/', PatientContoller.getPatients);

patientRouter.post('/', patientsValidator.validateBloodBag(), PatientContoller.postPatient);

patientRouter.get('/:patientID', PatientContoller.getPatientByID);

patientRouter.get('/viewRequest/:patientID', PatientContoller.viewBagrequest);

patientRouter.put('/modifyRequest/:patientID', patientsValidator.validateBloodBag(), PatientContoller.modifyBagRequest);

patientRouter.put('/requestBloodBag/:patientID', patientsValidator.validateBloodBag(), PatientContoller.requestBloodBag);

patientRouter.put('/acceptBagRequest/:patientID', patientsValidator.validateBloodBag(), PatientContoller.accept_bag_request);

module.exports = patientRouter;