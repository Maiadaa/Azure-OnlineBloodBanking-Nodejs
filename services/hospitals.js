const { ObjectId } = require('mongoose').Types;

const hospitalModel = require('../models/hospital');
const donorModel = require('../models/Donor');

module.exports.addHospital = async (hospitalInfo) => {
  try {
    const hospital = new hospitalModel({
      name: hospitalInfo.name,
      email: hospitalInfo.email,
      Address: hospitalInfo.Address
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

module.exports.getHospitalReport = async (hospitalID) => {
  try {
    const BloodBagModel = require('../models/BloodBag');
    // count number of bags of each blood type: A, B, O, AB
    const cntABlood = await BloodBagModel.countDocuments({hospital: hospitalID, bloodType: "A"});
    const cntBBlood = await BloodBagModel.countDocuments({hospital: hospitalID, bloodType: "B"});
    const cntABBlood = await BloodBagModel.countDocuments({hospital: hospitalID, bloodType: "AB"});
    const cntOBlood = await BloodBagModel.countDocuments({hospital: hospitalID, bloodType: "O"});

    // count number of donations made per gender in donation camps of this hospital
    const DonationCampsModel = require('../models/DonationCampsSchema');
    const cntFemaleDonors = await DonationCampsModel.countDocuments({hospital: hospitalID, donorReservations:{donorID:{gender: "Female"}}});

    return cntFemaleDonors;

  } catch (err) {
    throw new Error('could not generate hospital report.');
  }
};

module.exports.getYearlyReport = async () =>{
  try {
    
    const report = await hospitalModel.remove(hospital);
    return report;

  } catch (err) {
    throw new Error('Could not delete Hospital.');
  }
};

