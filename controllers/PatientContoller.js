const {validationResult} = require('express-validator');
const pateitnService = require('../services/PatientServices');
const BloodBagsService = require('../services/bloodBag');

module.exports.getPatients = async (req, res) => {
    try{
        const patietns = await pateitnService.FindAllPatients();
        res.send({patietns});
    }catch(err){
        res.status(500);
        res.send({
            error: err
        });
    }
};

module.exports.getPatientByID = async (req, res) => {
  
  try{
      const patientID = req.params.patientID;
      const patient = await pateitnService.findPatientById(patientID);
      res.send({patient});
  }catch(err){
      res.status(500);
      res.send({
          error: err
      });
  };
};

module.exports.postPatient = async (req, res) => {
  const validationErrors = validationResult(req).array();
  if(validationErrors.length > 0){
    return res.status(422).send({ validationErrors });
  }
  try {
    const patientInfo = {
        name: req.body.name,
        email: req.body.email,
        PhoneNumber: req.body.PhoneNumber,
        Address: req.body.Address,
        Condition: req.body.Condition,
        BloodType: req.body.BloodType,
        hospitalId: req.body.hospitalId,
        Request: req.body.Request
    };
    
      const createdPatient = await pateitnService.addNewPatient(patientInfo);
      return res.status(201).send({
        msg: 'patient created successfully.',
        patient_ID: createdPatient._id
      });
    } catch (err) {
      return res.status(500).send({
        error: err.message
      });
    }
};

module.exports.requestBloodBag = async (req, res) => {
  const validationErrors = validationResult(req).array();
  if(validationErrors.length > 0){
    return res.status(422).send({ validationErrors });
  }
  try{
    const patientID = req.params.patientID;
    const patient = await pateitnService.findPatientById(patientID);
    const requestInfo = {
        BloodType:  req.body.BloodType,
        Amount: req.body.Amount,
        Date: req.body.Date,
        Status: req.body.Status,
        Purpose: req.body.Purpose
    };
    for(let request of patient.Request){
      if(request.Status == 'pending'){
        return res.send({
          msg: 'there is already pending request',
        });
      }
    } 
    const updatePatient = await pateitnService.requestBloodBag(patient, requestInfo);
    return res.status(201). send({
      msg: 'updated successfully',
      Patient_Id: updatePatient._id
    });
  }catch(err){
    return res.status(500).send({
      error: err.message
    });
  }
};

module.exports.viewBagrequest = async (req, res) => {
  try{
      const patientID = req.params.patientID;
      const patient = await pateitnService.viewBagRequest(patientID);
      var viewRequest = null;
      for(let request of patient.Request){
        if(request.Status == 'pending'){
          viewRequest = request;
        }
      } 
      if(viewRequest != null){
        res.send({viewRequest});
      }else{
        res.send({msg: "empty"});
      }
  }catch(err){
      res.status(500);
      res.send({
          error: err
      });
  };
};

module.exports.modifyBagRequest = async (req, res) => {
  const validationErrors = validationResult(req).array();
  if(validationErrors.length > 0){
    return res.status(422).send({ validationErrors });
  }
  try{
    const patientID = req.params.patientID;
    const requestID = req.params.RequesID;
    const patient = await pateitnService.findPatientById(patientID);
    const requestInfo = {
      BloodType:  req.body.BloodType,
      Amount: req.body.Amount,
      Date: req.body.Date,
      Status: req.body.Status,
      Purpose: req.body.Purpose
    };
    var oldRequest;
    for(let request of patient.Request){
      if(request._id == requestID){
        oldRequest = request;
      }
    }
    for(var i = 0; i < patient.Request.length; i++){
      if(patient.Request[i] == oldRequest){
        patient.Request[i] = requestInfo;
      }
    }
    const status = await pateitnService.modifyBagRequest(patient);
    return res.status(201). send({
      msg: 'modify successfully',
      Patient_Id: status._id
    });
  }catch(err){
    res.status(500);
    res.send({
      error: err
    });
  }
};

module.exports.accept_bag_request = async (req, res) => {
  try{
    const patientID = req.params.patientID;
    const requestID = req.params.RequesID;
    const patient = await pateitnService.findPatientById(patientID);
    var counter = 0;

    for(var i = 0; i < patient.Request.length; i++){
      if(patient.Request[i]._id == requestID && patient.Request[i].Status == 'pending'){
        const BloodBags = await BloodBagsService.FindBloodBags(patient.Request[i].BloodType);
        if(patient.Request[i].Amount <= BloodBags.length){
          for(var l = 0; l < patient.Request[i].Amount; l++){
            const returnBloodbag = await BloodBagsService.deleteBloodBag(BloodBags[l]);
            if(returnBloodbag != null){
              counter++;
            }
          }
        }else{
          patient.Request[i].Status = 'Rejected';
          const returnPatient = await pateitnService.acceptBagRequest(patient);
          return res.status(201). send({
            msg: 'Not enough bags',
            Patient_Id: [returnPatient._id]
          });
        }
        if(counter == patient.Request[i].Amount){
          patient.Request[i].Status = 'Accepted';
          const returnPatient = await pateitnService.acceptBagRequest(patient);
          return res.status(201). send({
            msg: 'accepted successfully',
            Patient_Id: [patient.Request[i]._id]
          });
        }
      }
    }
    return res.status(201). send({
      msg: 'the request rejected',
      Patient_Id: [returnPatient._id]
    });
  }catch(err){
    res.status(500);
    res.send({
      error: err
    });
  }
};

module.exports.managePatient = async (req, res) => {
  const validationErrors = validationResult(req).array();
  if(validationErrors.length > 0){
    return res.status(422).send({ validationErrors });
  }
  try {
    const id = req.params.patientID;
    const patientInfo = {
        _id: id,
        name: req.body.name,
        email: req.body.email,
        PhoneNumber: req.body.PhoneNumber,
        Address: req.body.Address,
        Condition: req.body.Condition,
        BloodType: req.body.BloodType,
        hospitalId: req.body.hospitalId
    };
    
      const createdPatient = await pateitnService.managePatient(patientInfo);
      return res.status(201).send({
        msg: 'patient updates successfully.',
        patient_ID: createdPatient._id
      });
    } catch (err) {
      return res.status(500).send({
        error: err.message
      });
    }
};