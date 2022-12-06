// import Express Router from express
const { Router } = require('express');

// import our productsController
const donationsController = require('../controllers/donation');

// create an instance of Express Router.
const donationRouter = Router();
donationRouter.post('/Add-donation-camps',donationController.postdonationCamps);
donationRouter.get('/Retrieve-donation-camps', donationController.getdonationCamps);
donationRouter.post('/Add-donor-reservation',donationController.postDonorreservation);
donationRouter.get('/Retrieve-Donor-reservation',donationController.getDonorReservation);
donationRouter.get('/Retrieve-Donor-reservation-using-ID',donationController.getDonorReservationByID);

// export the router instance 
module.exports = donationRouter;