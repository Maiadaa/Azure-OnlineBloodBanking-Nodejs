const { ObjectId } = require('mongoose').Types;

const hospitalModel = require('../models/hospital');
const hospitalController = require('../controllers/hospitals');

module.exports.addHospital = async (hospitalInfo) => {
  try {
    const hospital = new hospitalModel({
      name: hospitalInfo.name,
      email: hospitalInfo.email,
      hotline: hospitalInfo.hotline,
      Address: hospitalInfo.Address,
      imageURL: hospitalInfo.imageURL
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

module.exports.findHospitalByName = async (givenName) => {
  try {
    const hospital = await hospitalModel.find({name: givenName});
    if(hospital.length > 0){
      return true;
    }else{
      return false;
    }
  } catch (err) {
    throw new Error('Could not find hospital.');
  }
};

module.exports.editHospitalInfo = async (hospital, hospitalNewInfo) => {
  try {
    const status = await hospitalModel.findByIdAndUpdate(hospital._id, hospitalNewInfo);
    return status;
  } catch (err) {
    throw new Error('Could not edit hospital info.');
  }
};

module.exports.deleteHospital = async (hospital) => {
  try {
    const status = await hospitalModel.remove(hospital);
    return status;
  } catch (err) {
    throw new Error('Could not delete Hospital.');
  }
};


module.exports.getHospitalReport = async (hospitalID, inventoryReport, donationReport) => {
  try {
    const hospital = await hospitalModel.findOne({_id: hospitalID});
    
    // calculate bags lost due to failing at the test results made on it 
    // aka: number of rejected blood bags from the donation camp 
    // donation camp bags count > inventory bags count
    const bagsLoss = donationReport.donationsCnt - inventoryReport.inventoryBagsCnt;

    const fullReport = new Object({
      _id: hospitalID,
      hospital: hospital,
      inventoryReport,
      donationReport,
      rejetedBagsCnt: bagsLoss
    });
    return fullReport;

  } catch (err) {
    throw new Error('could not generate hospital report.');
  }
};

module.exports.getYearlyReport = async () =>{
  try {
    var fullReport = [];
    const hospitals = this.findAllHospitals();
    for (var i = 0; i < hospitals.length ; i++){
      fullReport.push(hospitalController.generateHospitalReport(hospitals[i]._id));
    }
    return fullReport;

  } catch (err) {
    throw new Error('Could not generate yearly report.');
  }
};
