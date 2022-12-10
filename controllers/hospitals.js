const { isObjectIdOrHexString } = require('mongoose');
const hospitalsService = require('../services/hospitals');

const usersAccountService = require('../services/UserAccount');
const bloodBagService = require('../services/bloodBag');
const donationService = require('../services/Donation');

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
        Address: req.body.Address,
        imageURL: req.body.imageURL
      };
      const status = await hospitalsService.addHospital(hospitalInfo);

      const managerInfo = {
        username: status.name,
        password: status.name,
        hospitalId: status._id
      };
      const labManager = await usersAccountService.labManagerSignUp(managerInfo);

      return res.status(201).send({
        status,
        labManager,
        msg: "Hospital was added successfully."
      });
    }else{
      return res.status(500).send({
        msg: "Hospital already exists."
      });
    }
  }  catch (err) {
    return res.status(500).send({msg: err.message});
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
      hotline: req.body.hotline,
      Address: req.body.Address,
      imageURL: req.body.imageURL
    };
    const status = await hospitalsService.editHospitalInfo(hospital, hospitalNewInfo);
    return res.status(201).send({
      status,
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
    const donationReport = await donationService.cntDonationsByHospital(hospitalID);

    const test = await hospitalsService.getHospitalReport(hospitalID, inventoryReport, donationReport);

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

