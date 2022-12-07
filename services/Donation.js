const donationCampModel=require('../models/DonationCampsSchema');
const donorModel = require('../models/Donor');

module.exports.addDonationCamp= async (donationCampInfo) => {
    try {
      const donationCamp = new donationCampModel({
        hospital: donationCampInfo.hospital,
        PhoneNumber: donationCampInfo.PhoneNumber,
        Location: donationCampInfo.Location,
        Date: donationCampInfo.Date
      });
      const status = await donationCamp.save();
      return status;
    } catch (err) {
      throw new Error('Error in adding donation camp, Please try again.');
    }
  };

module.exports.ViewDonationCamps = async () => {
    try {
      const donationCamp = await donationCampModel.find();
      return donationCamp;
    } catch (err) {
      throw new Error('Error finding donation camp, Please try again.');
    }
  };

module.exports.addDonorReservation= async (AddDonorReservation) => {
    try {
      const DonorReservation = new donationCampModel({
        donorID: AddDonorReservation.donorID,
        timeSlot: AddDonorReservation.timeSlot,
        bloodBagsQty: AddDonorReservation.bloodBagsQty
      });
      const status = await DonorReservation.save();
      return status;
  
    } catch (err) {
      throw new Error('Error in adding a reservation for a donor, Please try again.');
    }
  };

/* module.exports.deleteDonorReservation = async (DonorReservation) => {
    try{
      const status = await donationCampModel.deleteOne({_id: DonorReservation});
      return status;
    }catch(err){
      throw new Error('Error deleting Donor reservation, Please try again.');
    }
  }; */

  module.exports.removeDonationCamp = async (campID) =>{
    try{
      const camp = await donationCampModel.findOne({_id: campID});
      const status = await donationCampModel.deletOne(campID);
      return status;
    }catch(err){
      throw new Error('Error deleting Donor reservation, Please try again.');
    }
  };

module.exports.ViewDonorReservationsByID = async (donorID) => {
    try {
      const donorReservationID = await donationCampModel.find(donorID);
      return donorReservationID;
    } catch (err) {
      throw new Error('Error finding Donor reservation, Please try again.');
    }
  };

module.exports.ViewAllDonorReservations = async () => {
    try {
      const AllDonorReservations = await donationCampModel.find();
      return AllDonorReservations;
    } catch (err) {
      throw new Error('Error retrieving donor reservations, Please try again.');
    }
  };

  /*** MAIADA ***/
  module.exports.cntDonationsByHospital = async (hospitalID) => {
    try{
      const camp = await donationCampModel.findOne({hospital: hospitalID});

      // num of donations made per gender in donation camps of this hospital
      var FDonor = 0; var MDonor = 0;
      // overall percentage of each gender in donation camps of this hospital
      var FPercentage = 0.0; var MPercentage = 0.0;
      // num of each gender's donations per blood type in donation camps of this hospital
      var FAType = 0; var FBType = 0; var FOType = 0; var FABType = 0;
      var MAType = 0; var MBType = 0; var MOType = 0; var MABType = 0;

      for(var i = 0; i < camp.donorReservations.length; i++){
        const donor = await donorModel.findById(camp.donorReservations[i].donorID);
        if(donor.gender == "Female"){
          FDonor++;
          if(donor.bloodType == "A"){
            FAType++;
          }else if (donor.bloodType == "B"){
            FBType++;
          }else if (donor.bloodType == "O"){
            FOType++;
          }else {
            FABType++;
          }
        }else{
          MDonor++;
          if(donor.bloodType == "A"){
            MAType++;
          }else if (donor.bloodType == "B"){
            MBType++;
          }else if (donor.bloodType == "O"){
            MOType++;
          }else {
            MABType++;
          }
        }
      }
      //total donations count 
      const donationsTotal = FDonor + MDonor;
      FPercentage = (FDonor/donationsTotal) * 100;
      MPercentage = (MDonor/donationsTotal) * 100;

      const donationReport = new Object ({
        campLocation: camp.Location,
        campDate: camp.Date,

        donationsCnt: donationsTotal,
  
        femaleDonors: FPercentage,
        maleDonors: MPercentage,
  
        ATypeFemales: FAType,
        BTypeFemales: FBType,
        OTypeFemales: FOType,
        ABTypeFemales: FABType,
  
        ATypeMales: MAType,
        BTypeMales: MBType,
        OTypeMales: MOType,
        ABTypeMales: MABType
      });

      return donationReport;
    }catch (err) {
      throw new Error('Error retrieving donation report, Please try again.');
    }
  };