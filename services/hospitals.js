const { ObjectId } = require('mongoose').Types;

const BloodInventoryModel = require('../models/BloodInventory');
const DonationCampsModel = require('../models/DonationCampsSchema');
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

module.exports.getHospitalReport = async (hospitalID) => {
  try{
    const hospital = await hospitalModel.findById(hospitalID);
    const inventory = await BloodInventoryModel.findById(hospitalID);
    const donations = await DonationCampsModel.findById(hospitalID);

    var AType, BType, ABType, OType = 0;
    var donor;
    for (var i; i < donations.donorReservations.length ; i++) {
      donor = await donorModel.findById(i.donor._id);
      if(i.bloodType == "AB"){
        AType++;
      }else if(i.bloodType == "B"){
        BType++;
      }else if(i.bloodType == "A"){
        BType++;
      }else if(i.bloodType == "O"){
        BType++;
      }
    }

    const report = {
      hospitalName: hospital.name,
      totalABDonations: ABType,
      ABFemaleDonors: ABFemale,
      ABMaleDonors: ABMale,
      totalBDonations: BType,
      BFemaleDonors: BFemale,
      BMaleDonors: BDonors,
      totalADonations: AType,
      AFemaleDonors: AFemale,
      AmaleDonors: AMale,
      totalODonations: OType,
      OFemaleDonors: OFemale,
      OMaleDonors: OMale,
      totalAB: inventory.ABBloodBags.length,
      totalB: inventory.BBloodBags.length,
      totalA: inventory.ABloodBags.length,
      totalO: inventory.OBloodBags.length
    }
    return report;

  }catch(err){
    throw new Error('Could not delete Hospital.');
  }
}

