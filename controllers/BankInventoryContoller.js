const BankInventoryService = require('../services/BankInventory');

module.exports.getBankInventory = async (req, res) => {
    try{
        const BankInventories = await BankInventoryService.FindAllBloodInventory();
        res.send({BankInventories});
    }catch(err){
        res.status(500);
        res.send({
            error: err
        });
    }
};

module.exports.postBankInventory = async (req, res) => {
  try {
    const BankInventoryInfo = {
        HospitalName: req.body.HospitalName,
        BloodBags: req.body.BloodBags
    };
    
      const createdBankInventory = await BankInventoryService.addNewBankInventory(BankInventoryInfo);
      return res.status(201).send({
        msg: 'bank inventory created successfully.',
        BankInventoryId: createdBankInventory._id
      });
    } catch (err) {
      return res.status(500).send({
        error: err.message
      });
    }
};

module.exports.DrRequiestBag = async (req, res) => {
  try{
    const patientID = req.params.patientID;
    const requestInfo = {
      name: req.body.name,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      Address: req.body.Address,
      Condition: req.body.Condition,
      BloodType: req.body.BloodType,
      Request: req.body.Request
    };
    const updatePatient = await BankInventoryService.DrRequestBloodBag(patientID,requestInfo);
    return res.status(201). send({
      msg: 'update patient request',
      BankInventoryId: updatePatient._id
    });
  }catch(err){
    return res.status(500).send({
      error: err.message
    });
  }
}