const { ObjectId } = require('mongoose').Types;

const BloodInventoryModel = require('../models/BloodInventory');
const DonationCampsModel = require('../models/DonationCampsSchema');
const hospitalModel = require('../models/hospital');
const donorModel = require('../models/Donor');

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
    // annual report for a specific hospital 

    const hospital = await hospitalModel.findById(hospitalID);
    const inventory = await BloodInventoryModel.findById(hospital.inventoryID);
    const donations = await DonationCampsModel.find({ hospital: hospitalID});

    var AType, BType, ABType, OType = 0; // Num of donations per each blood type 
    var AFemale, BFemale, ABFemale, OFemale = 0; // num of female donors for each blood type
    var AMale, BMale, ABMale, OMale = 0; // num of male donors for each blood type
    var donor;

    for (var i; i < donations.donorReservations.length ; i++) {
      donor = await donorModel.findById(i.donorID._id);

      if(donor.bloodType == "AB"){
        AType++;
        if(donor.gender == "M"){
          AMale++;
        }else{
          AFemale++;
        }
      }else if(donor.bloodType == "B"){
        BType++;
        if(donor.gender == "M"){
          BMale++;
        }else{
          BFemale++;
        }
      }else if(donor.bloodType == "A"){
        AType++;
        if(donor.gender == "M"){
          AMale++;
        }else{
          AFemale++;
        }
      }else if(donor.bloodType == "O"){
        OType++;
        if(donor.gender == "M"){
          OMale++;
        }else{
          OFemale++;
        }
      }
    }

    const report = {
      hospitalName: hospital.name,
      totalABDonations: ABType,
      ABFemaleDonors: ABFemale,
      ABMaleDonors: ABMale,
      totalBDonations: BType,
      BFemaleDonors: BFemale,
      BMaleDonors: BMale,
      totalADonations: AType,
      AFemaleDonors: AFemale,
      AmaleDonors: AMale,
      totalODonations: OType,
      OFemaleDonors: OFemale,
      OMaleDonors: OMale,
      // Num of blood bags in the inventory per each blood type 
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

