const PatientModel = require('../models/Patient');

module.exports.FindAllPatients = async () => {
    try{
        const Patients = await PatientModel.find();
        return Patients;
    }catch (err){
        throw new Error('can not font any patients');
    }
};

module.exports.addNewPatient = async (pateitnInfo) => {
    try {
      const Patient = new PatientModel({
          name: pateitnInfo.name,
          email: pateitnInfo.email,
          PhoneNumber: pateitnInfo.PhoneNumber,
          Address: pateitnInfo.Address,
          Condition: pateitnInfo.Condition,
          BloodType: pateitnInfo.BloodType,
          Request: pateitnInfo.Request
      });
      const createdPatient = await Patient.save();
      return createdPatient;
    } catch (err) {
      throw new Error('Could not create pateitn.');
    }
};

module.exports.findPatientById = async (PatientID) => {
  try {
    const Patient = await PatientModel.findById(PatientID);
    return Patient;
  } catch (err) {
    throw new Error('Could not find product.');
  }
};

module.exports.requestBloodBag = async (patient,requestInfo) => {
  try {
    patient.Request.push(requestInfo);
    const status = await PatientModel.findByIdAndUpdate(patient._id, patient);
    return status;
  } catch (err) {
    throw new Error('Could not update patient.');
  }
};

module.exports.viewBagRequest = async (PatientID) => {
  try{
    const Patient = await PatientModel.findById(PatientID);
    return Patient;
  }catch(err){
    throw new Error('can not get bag request');
  }
};

module.exports.modifyBagRequest = async (patient, newRequest, oldRequest) => {
  try{
    for(var i = 0; i < patient.Request.length; i++){
      if(patient.Request[i] == oldRequest){
        patient.Request[i] = newRequest;
      }
    }
    const status = await PatientModel.findByIdAndUpdate(patient._id, patient);
    return status;
  }catch(err){
    throw new Error('can not modify bag request');
  }
};

module.exports.acceptBagRequest = async () => {
  try{}catch(arr){
    throw new Error('can not update request status');
  }
}