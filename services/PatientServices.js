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
          hospitalId: pateitnInfo.hospitalId,
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

module.exports.modifyBagRequest = async (patient) => {
  try{
    const status = await PatientModel.findByIdAndUpdate(patient._id, patient);
    return status;
  }catch(err){
    throw new Error('can not modify bag request');
  }
};
/*
module.exports.findBankInventoryById = async (bankInventoryID) => {
  try {
    const inventory = await bankInventoryModel.findById(bankInventoryID);
    return inventory;
  } catch (err) {
    throw new Error('Could not find bank inventory.');
  }
};

module.exports.acceptReqModifyAmount = async (inventory) => {
  try{
    const patientt= await PatientModel.findByIdAndUpdate(inventory._id, inventory);
    return true;
  }catch(arr){
    throw new Error('can not update amount');
  }
}
*/
module.exports.acceptBagRequest = async (patient) => {
  try{
    const patientt= await PatientModel.findByIdAndUpdate(patient._id, patient);
    return true;
  }catch(arr){
    throw new Error('can not update request status');
  }
};