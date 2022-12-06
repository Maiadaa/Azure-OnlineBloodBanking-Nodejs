const { isObjectIdOrHexString } = require('mongoose');
const hospitalsService = require('../services/hospitals');

const bloodBagService = require('../services/bloodBag');
const donationCampService = require('../services/Donation');

// add hospital function
module.exports.addHospital = async (req, res) => {
  try {
    //check if hospital name needed to be added is not already in the system
    const test = await hospitalsService.findHospitalByName(req.body.name);

    if(!test){
      const hospitalInfo = {
        name: req.body.name,
        email: req.body.email,
        hotline: req.body.hotline,
        Address: req.body.Address
      };
      const status = await hospitalsService.addHospital(hospitalInfo);

      return res.status(201).send({
        status,
        msg: "Hospital was added successfully."
      });
    }else{
      return res.status(500).send({
        msg: "Hospital already exists."
      });
    }
  }  catch (err) {
    return res.status(500).send({error: err.message});
  }
};

module.exports.getHospitals = async (req, res) => {
  try {
    const hospitals = await hospitalsService.findAllHospitals();
    
    return res.send({ hospitals });

  }  catch (err) {
    return res.status(500).send({error: err.message});
  }
};

module.exports.editHospital = async (req, res) => {
  try{
    const hospital = await hospitalsService.findHospitalByID(req.params.hospitalID);
    const hospitalNewInfo = {
      name: req.body.name,
      email: req.body.email,
      PhoneNumber: req.body.PhoneNumber,
      Address: req.body.Address
    };
    const status = await hospitalsService.editHospitalInfo(hospital, hospitalNewInfo);
    return res.status(201).send({
      msg: "Hospital details were edited successfully."
    });

  } catch (err) {
    return res.status(500).send({error: err.message});
  }
};

module.exports.delHospital = async(req, res) => {
  try{
    const hospital = await hospitalsService.findHospitalByID(req.params.hospitalID);
    const status = await hospitalsService.deleteHospital(hospital);
    
    return res.status(201).send({
      status,
      msg: "Hospital was deleted successfully."
    });

  } catch (err) {
    return res.status(500).send({error: err.message});
  }
};

// Generate report function 
module.exports.generateHospitalReport = async (req, res) => {
  try {
    const hospitalID = req.params.hospitalID;

    const inventoryReport = await bloodBagService.cntBagsByHospital(hospitalID);
    const donationCampReport = await donationCampService.cntDonationsByHospital(hospitalID);

    const test = await hospitalsService.getHospitalReport(hospitalID, inventoryReport, donationCampReport);

    return res.status(201).send({ 
      test,
      msg: "Hospital report generated successfully."
    });

  }  catch (err) {
    return res.status(500).send({error: err.message});
  }
};

module.exports.yearlyReport = async (req, res) => {
  try {
    const yearlyReport = await hospitalsService.getYearlyReport();
    
    return res.status(201).send({ 
      yearlyReport,
      msg: "Hospital report generated successfully."
    });

  }  catch (err) {
    return res.status(500).send({error: err.message});
  }
};