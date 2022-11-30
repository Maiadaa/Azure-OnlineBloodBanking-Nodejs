const PatientModel = require('../models/Patient');

/*module.exports.FindAllBloodInventory = async () => {
    try{
        const BloodInventories = await BloodInventoryModel.find();
        return BloodInventories;
    }catch (err){
        throw new Error('can not font any blood inventory');
    }
};

module.exports.addNewBankInventory = async (BankInventoryInfo) => {
    try {
      const BankInventory = new BloodInventoryModel({
            HospitalName: BankInventoryInfo.HospitalName,
            BloodBags: BankInventoryInfo.BloodBags
      });
      const createdBankInventory = await BankInventory.save();
      return createdBankInventory;
    } catch (err) {
      throw new Error('Could not create bank inventory.');
    }
};*/

/*module.exports.findPatientById = async (PatientID) => {
  try {
    const Patient = await PatientModel.findById(PatientID);
    return Patient;
  } catch (err) {
    throw new Error('Could not find product.');
  }
};*/

module.exports.DrRequestBloodBag = async (PatientID,requestInfo) => {
  try {
    const status = await PatientModel.findByIdAndUpdate(PatientID, requestInfo);
    return status;
  } catch (err) {
    throw new Error('Could not update patient.');
  }
};