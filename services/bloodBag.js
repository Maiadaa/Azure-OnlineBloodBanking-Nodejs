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
  try
  {
    const BloodBags = await BloodBagModel.find({ pending: true });
    return BloodBags;
  }
  catch (err) {
    throw new Error('Can not find any pending blood bags in this inventory');
  }
};
module.exports.FindAllPendingBloodBagsInHospital = async (hospitalID) => {
  try
  {
    const BloodBags = await BloodBagModel.find({ pending: true , hospital: hospitalID});
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
module.exports.FindAllAcceptedloodBagsInHospital = async (hospitalID) => {
  try {
    const BloodBags = await BloodBagModel.find({ pending: false, hospital: hospitalID});
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
    const removedBloodBag = await BloodBagModel.findByIdAndDelete(BloodBagID);
    return removedBloodBag;
  }
  catch (error) {
    console.log(error);
    throw new Error('Could not reject blood bag / could not remove the blood bag from the system');
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



/*** MAIADA ***/
module.exports.cntBagsByHospital = async (hospitalID) => {
  try{
      // count number of bags of each blood type: A, B, O, AB
    const cntABlood = await BloodBagModel.countDocuments({hospital: hospitalID, bloodType: "A"});
    const cntBBlood = await BloodBagModel.countDocuments({hospital: hospitalID, bloodType: "B"});
    const cntABBlood = await BloodBagModel.countDocuments({hospital: hospitalID, bloodType: "AB"});
    const cntOBlood = await BloodBagModel.countDocuments({hospital: hospitalID, bloodType: "O"});
    // count total number of bags in inventory 
    const bagsTotal = cntABlood + cntBBlood + cntOBlood + cntABBlood ;

    const inventorySummary = new Object({
      inventoryBagsCnt: bagsTotal,

      AType: cntABlood,
      BType: cntBBlood,
      OType: cntOBlood,
      ABType: cntABBlood
    });
    return inventorySummary;
  }catch (err){
      throw new Error('can not generate hospital inventory sumamry');
  }
};