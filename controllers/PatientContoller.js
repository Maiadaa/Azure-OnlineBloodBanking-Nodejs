const pateitnService = require('../services/PatientServices');

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
        hospitalName: req.body.hospitalName,
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
    const status = await pateitnService.modifyBagRequest(patient, requestInfo, oldRequest);
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

