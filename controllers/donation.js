const {validationResult} = require('express-validator');
const donationService = require('../services/Donation');

//Passing donation camps
module.exports.postDonationCamp = async (req, res) => {
    const validationErrors = validationResult(req).array();
    if(validationErrors.length > 0){
      return res.status(422).send({ validationErrors });
    }
    try {
      const AddingDonationCamp = {
        hospital: req.body.hospital,
        PhoneNumber: req.body.PhoneNumber,
        Location: req.body.Location,
        Date: req.body.Date
      };
      
        const addedDonorReservation = await donationService.addDonationCamp(AddingDonationCamp);
        return res.status(201).send({
          msg: 'DonationCamp added successfully.',
          addedDonorReservation
        });
      } catch (err) {
        return res.status(500).send({
          error: err.message
        });
      }
  };

//Getting all donation camps
module.exports.getDonationcamps = async (req, res) => {
    try{
        const camps = await donationService.ViewDonationCamps();
        res.send({camps});
    }catch(err){
        res.status(500);
        res.send({
            error: err
        });
    }
};
//Pass donor reservation
module.exports.postDonorReservation = async (req, res) => {
    const validationErrors = validationResult(req).array();
    if(validationErrors.length > 0){
      return res.status(422).send({ validationErrors });
    }
    try {
      const AddDonorReservation = {
        donorID: req.body.donorID,
        timeSlot: req.body.timeSlot,
        bloodBagsQty: req.body.bloodBagsQty,
      };
      
        const addedDonorReservation = await reservationService.addDonorReservation(AddDonorReservation);
        return res.status(201).send({
          msg: 'Reservation created successfully.',
          Reservation_ID: createdReservation._id
        });
      } catch (err) {
        return res.status(500).send({
          error: err.message
        });
      }
  };
//View Donor reservation by ID
module.exports.getDonorReservationByID= async (req, res) => {  
    try{
        const donorID = req.params.donorID;
        const donors = await donationService.ViewDonorReservationsByID(donorID);
        res.send({donors});
    }catch(err){
        res.status(500);
        res.send({
            error: err
        });
    };
  };
//Getting all donor reservations
module.exports.getAllDonorReservations = async (req, res) => {
    try{
        const reservations = await donationService.ViewAllDonorReservations();
        res.send({reservations});
    }catch(err){
        res.status(500);
        res.send({
            error: err
        });
    }
};

module.exports.deletDonorReservation = async (req, res) => {
  try{
    const status = await donationService.deleteDonorReservation(req.params.reservationID);
    return status;

  }catch(err){
      res.status(500);
      res.send({
          error: err
      });
  }
};

module.exports.deletDonationCamp = async (req, res) => {
  try{
    const status = await donationService.removeDonationCamp(req.params.donationCampID);
    return status;
      
  }catch(err){
      res.status(500);
      res.send({
          error: err
      });
  }
};
