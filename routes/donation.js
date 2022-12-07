// import Express Router from express
const { Router } = require('express');

// import our productsController
const donationController = require('../controllers/donation');

// create an instance of Express Router.
const donationRouter = Router();
donationRouter.post('/Add-donation-camps',donationController.postDonationCamp);
donationRouter.get('/Retrieve-donation-camps', donationController.getDonationcamps);
donationRouter.delete('/Retrieve-donation-camps/:donationCampID', donationController.delDonationCamp);
donationRouter.post('/Add-donor-reservation',donationController.postDonorReservation);
donationRouter.get('/Retrieve-Donor-reservation',donationController.getAllDonorReservations);
donationRouter.delete('/Retrieve-Donor-reservation/:reservationID', donationController.deletDonorReservation);

// export the router instance 
module.exports = donationRouter;