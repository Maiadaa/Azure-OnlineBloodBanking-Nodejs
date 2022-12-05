const { ObjectId } = require('mongoose').Types;
const BloodBagModel = require('../models/BloodBag');

/* module.exports.InsertBloodBagRequest = async (bloodBagInfo, bankInventory) => {
  try {
    bankInventory.PendingBloodBags.push(bloodBagInfo);
    const addedBloodBag = await BloodBagModel.findByIdAndUpdate(bankInventory._id, bankInventory);
    return addedBloodBag;
  }
  catch (error) {
    console.log(error);
    throw new Error('Could not add Blood Bag into Blood Bag inventory');
  }
}; */
module.exports.InsertBloodBag = async (bloodBagInfo) => {
  try {
    const BloodBag = new BloodBagModel(
    {
        hospital: new ObjectId(bloodBagInfo.hospital),
        bloodType : bloodBagInfo.bloodType,
        HBV : bloodBagInfo.HBV,
        HCV : bloodBagInfo.HCV,
        HIV : bloodBagInfo.HIV,
        HTLV : bloodBagInfo.HTLV,
        syphilis : bloodBagInfo.syphilis,
        WNV : bloodBagInfo.WNV,
        TrypanosmaCruzy : bloodBagInfo.TrypanosmaCruzy,
        CMV : bloodBagInfo.CMV,
        Babesia : bloodBagInfo.Babesia,
        BacterialContamination : bloodBagInfo.BacterialContamination,
        pending : bloodBagInfo.pending
    });
    const addedBloodBag = await BloodBag.save();
    return addedBloodBag;
  }
  catch (error) {
    console.log(error);
    throw new Error('Could not add Blood Bag into Blood Bag inventory');
  }
};

module.exports.FindAllPendingBloodBags = async () => {
  try {
    const BloodBags = await BloodBagModel.find({ pending: true });
    return BloodBags;
  }
  catch (err) {
    throw new Error('Can not find any pending blood bags in this inventory');
  }
};
module.exports.FindAllAcceptedloodBags = async () => {
  try {
    const BloodBags = await BloodBagModel.find({ pending: false });
    return BloodBags;
  }
  catch (err) {
    throw new Error('Can not find any accepted blood bags in this inventory');
  }
};

/* module.exports.CreateBloodBag = async (bagInfo) => {
  try {
    const bagModel = new BloodBagModel(
      {

      }
    );
    const createdBag = await bagModel.save();
    return createdInventory;
  } catch (err) {
    throw new Error('could not create blood inventory.');
  }
}; */
module.exports.AcceptBloodBag = async (BloodBag) => {
  try {
    const test = await BloodBagModel.findByIdAndUpdate(BloodBag._id, BloodBag);
    return BloodBagBloodBag;
  }
  catch (error) {
    console.log(error);
    throw new Error('Could not accept Blood Bag / Can not remove from pending and add to the suitable blood type');
  }
};
module.exports.RemoveBloodBag = async (BloodBagID) => {
  try 
  {
    const BloodBag = await BloodBagModel.findById(BloodBagID);
    const removedBloodBag = await BloodBagModel.findOneAndRemove(BloodBag);
    return removedBloodBag;
  }
  catch (error) {
    console.log(error);
    throw new Error('Could not reject blood bag / could not remove the blood bag from the system');
  }
};
/*hagrass*/
module.exports.findBloodBagById = async (BloodBagID) => {
  try {
    const inventory = await BloodBagModel.findById(BloodBagID);
    return inventory;
  } catch (err) {
    throw new Error('Could not find blood bags.');
  }
};

module.exports.deleteBloodBag = async (bloodBag) => {
  try{
    const status = await BloodBagModel.remove(bloodBag);
    return status;
  }catch(err){
    throw new Error('Can not delete from blood bags');
  }
};

module.exports.FindBloodBags = async (BloodType) => {
  try{
      const Bloodbags = await BloodBagModel.find({bloodType: BloodType});
      return Bloodbags;
  }catch (err){
      throw new Error('can not font any blood bags');
  }
};