const { isObjectIdOrHexString } = require('mongoose');
const hospitalsService = require('../services/hospitals');

// add hospital function
module.exports.addHospital = async (req, res) => {
  try {
    //check if hospital name needed to be added is not already in the system

    // using inventory service for the add inventory function 
    const initialInventory = {
      PendingBloodBags: [],
      OBloodBags: [],
      ABloodBags: [],
      BBloodBags: [],
      ABBloodBags: []
    }
    const inventoryService = require('../services/BloodBankInventory');
    const inventoryStatus = await inventoryService.CreateBloodInventory({initialInventory});

    const hospitalinfo = {
      name: req.body.name,
      email: req.body.email,
      Address: req.body.Address,
      inventoryID: new ObjectId(inventoryStatus._id) // reference the above-created inventory instance 
    };
    const hospitalStatus = await hospitalsService.addHospital(hospitalinfo);

    // create an account for the lab manager to manage his hospital
    const accountInfo = {
      username: req.body.name, // hospital's account will be name of the hospital 
      password: inventoryStatus._id, // assign any password to the account
      hospitalName: req.body.hospitalName,
      role: "Lab Manager"
    };
    const accountsService = require('../services/UserAccount'); 
    const accStatus = await accountsService.addAccount(accountInfo);
    // using nodemailer service notify the hospital of their account's on-time login credentials on our system 
    //
    //

    return res.status(201).send({
      hospitalStatus,
      inventoryStatus,
      accStatus, 
      msg: "Hospital, its labManager and blood inventory, were created successfully."
    });

  }  catch (err) {
    return res.status(500).send({error: err.message});
  }
};

module.exports.getHospitals = async (req, res) => {
  try {
    const hospitals = await hospitalsService.getAllHospitals;
    
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
      msg: "Hospital was deleted successfully."
    });

  } catch (err) {
    return res.status(500).send({error: err.message});
  }
};

// Generate report function 
// Multiple services' functions to collect el report object 
// Report object is to be sent to el front end components 
module.exports.generateReport = async (req, res) => {
  try {
    const hospitals = await hospitalsService.getHospitalReport(req.params.hospitalID);
    
    return res.status(201).send({ 
      hospitals,
      msg: "Hospital report generated successfully."
    });

  }  catch (err) {
    return res.status(500).send({error: err.message});
  }
};
