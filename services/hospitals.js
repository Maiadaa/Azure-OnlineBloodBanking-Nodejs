const { ObjectId } = require('mongoose').Types;

const hospitalModel = require('../models/hospital');

module.exports.addHospital = async (hospitalInfo) => {
  try {
    const hospital = new hospitalModel({
      name: hospitalInfo.name,
      email: hospitalInfo.email,
      Address: hospitalInfo.Address,
      //inventoryID: new ObjectId(hospitalInfo.inventoryID)
    });

    const status = await hospital.save();
    return status;

  } catch (err) {
    throw new Error('Could not add hospital.');
  }
};

module.exports.findAllHospitals = async () => {
  try {
    const hospitals = await hospitalModel.find();
    return hospitals;
  } catch (err) {
    throw new Error('Could not retrieve hospitals.');
  }
};

module.exports.findHospitalByID = async (hospitalID) => {
  try {
    const hospital = await hospitalModel.findById(hospitalID);
    return hospital;
  } catch (err) {
    throw new Error('Could not find hospital.');
  }
};

module.exports.editHospitalInfo = async (hospital, hospitalNewInfo) => {
  try{
    const status = await hospitalModel.findByIdAndUpdate(hospital._id, hospitalNewInfo);
    return status;
  }catch(err){
    throw new Error('Could not edit hospital info.');
  }
};

module.exports.deleteHospital = async (hospital) => {
  try{
    const status = await hospitalModel.remove(hospital);
    return status;
  }catch(err){
    throw new Error('Could not delete Hospital.');
  }
};