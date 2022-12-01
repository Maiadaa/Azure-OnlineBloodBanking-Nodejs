const pateitnService = require('../services/PatientServices');
const hospitalService = require('../services/hospitals');
const bankInventoryService = require('../services/BloodBankInventory');

module.exports.getPatients = async (req, res) => {
    try{
        const pateitns = await pateitnService.FindAllPatients();
        res.send({pateitns});
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
      const pateitns = await pateitnService.findPatientById(patientID);
      res.send({pateitns});
  }catch(err){
      res.status(500);
      res.send({
          error: err
      });
  };
};

module.exports.postPatient = async (req, res) => {
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
      var viewRequest;
      for(let request of patient.Request){
        if(request.Status == 'pending'){
          viewRequest = request;
        }
      } 
      res.send({viewRequest});
  }catch(err){
      res.status(500);
      res.send({
          error: err
      });
  };
};

module.exports.modifyBagRequest = async (req, res) => {
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
    var oldRequest;
    for(let request of patient.Request){
      if(request.Status == 'pending'){
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

module.exports.accept_bag_request = async (req, ser) => {
  try{
    const patientID = req.params.patientID;
    const patient = await pateitnService.findPatientById(patientID);
    const hospital = await hospitalService.findHospitalById(patient.hospitalId);
    const inventory = await bankInventoryService.findBankInventoryById(hospital.inventoryID);
    const ReqInfo = {
      BloodType:  req.body.BloodType,
      Amount: req.body.Amount,
      Date: req.body.Date,
      Status: req.body.Status,
      Purpose: req.body.Purpose
    };
    for(var i = 0; i < patient.Request.length; i++){
      if(patient.Request[i] == ReqInfo && patient.Request[i].Status == 'pending'){
        for(var j = 0; j < inventory.BloodBags.length; j++){
          if(inventory.BloodBags[j].bloodType == patient.Request[i].BloodType && inventory.BloodBags[j].quantity >= patient.Request[i].Amount){
            inventory.BloodBags[j].quantity -=  patient.Request[i].Amount;
            patient.Request[i].Status = 'Accepted';
            const returnPatient = await pateitnService.acceptBagRequest(patient);
            const returnInventory = await bankInventoryService.acceptReqModifyAmount(inventory);
            if(returnPatient && returnInventory){
              return res.status(201). send({
                msg: 'accepted successfully',
                Patient_Id: [patient._id]
              });
            }
          }
        }
      }else {
        patient.Request[i].Status = 'Rejected';
        const returnPatient = await pateitnService.acceptBagRequest(patient);
        if(returnPatient){
          return res.status(201). send({
            msg: 'the request rejected',
            Patient_Id: [patient._id]
          });
        }
      }
    }
  }catch(err){
    res.status(500);
    res.send({
      error: err
    });
  }
};