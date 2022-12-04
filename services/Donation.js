const donationCampModel=require('../models/DonationCampsSchema');

module.exports.addDonationCamp= async (donationCampInfo) => {
    try {
      const donationCamp = new donationCampModel({
        hospital: donationCampInfo.hospital,
        PhoneNumber: donationCampInfo.PhoneNumber,
        Location: donationCampInfo.Location,
        Date: donationCampInfo.Date,
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
      const DonorReservation = new DonorReservationModel({
        donorID: AddDonorReservation.donorID,
        timeSlot: AddDonorReservation.timeSlot,
        bloodBagsQty: AddDonorReservation.bloodBagsQty,
      });
      const status = await DonorReservation.save();
      return status;
  
    } catch (err) {
      throw new Error('Error in adding a reservation for a donor, Please try again.');
    }
  };

module.exports.deleteDonorReservation = async (DonorReservation) => {
    try{
      const status = await DonorReservationModel.remove(DonorReservation);
      return status;
    }catch(err){
      throw new Error('Error deleting Donor reservation, Please try again.');
    }
  };

module.exports.ViewDonorReservationsByID = async (donorID) => {
    try {
      const donorReservationID = await DonorReservationModel.find(donorID);
      return donorReservationID;
    } catch (err) {
      throw new Error('Error finding Donor reservation, Please try again.');
    }
  };

module.exports.ViewAllDonorReservations = async () => {
    try {
      const AllDonorReservations = await DonorReservationModel.find();
      return AllDonorReservations;
    } catch (err) {
      throw new Error('Error retrieving donor reservations, Please try again.');
    }
  };