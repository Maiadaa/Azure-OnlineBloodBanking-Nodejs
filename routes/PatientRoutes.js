const {Router} = require('express');

const patientsValidator = require('../validators/patients');

const PatientContoller = require('../controllers/PatientContoller');

const patientRouter = Router();

patientRouter.get('/', PatientContoller.getPatients);

patientRouter.post('/', patientsValidator.validatePostPatient(), PatientContoller.postPatient);

patientRouter.get('/:patientID', PatientContoller.getPatientByID);

patientRouter.get('/viewRequest/:patientID', PatientContoller.viewBagrequest);

patientRouter.put('/modifyRequest/:patientID/:RequesID', patientsValidator.validateBloodBag(), PatientContoller.modifyBagRequest);

patientRouter.put('/requestBloodBag/:patientID', patientsValidator.validateBloodBag(), PatientContoller.requestBloodBag);

patientRouter.put('/acceptBagRequest/:patientID/:RequesID', PatientContoller.accept_bag_request);

patientRouter.put('/managePatient/:patientID', patientsValidator.validateManagePatient(), PatientContoller.managePatient);

module.exports = patientRouter;