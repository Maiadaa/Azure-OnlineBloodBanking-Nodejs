const BloodBagModel = require('../models/BloodBag');

module.exports.InsertBloodBagRequest = async (bloodBagInfo, bankInventory) => {
  try {
    bankInventory.PendingBloodBags.push(bloodBagInfo);
    const addedBloodBag = await BloodBagModel.findByIdAndUpdate(bankInventory._id, bankInventory);
    return addedBloodBag;
  }
  catch (error) {
    console.log(error);
    throw new Error('Could not add Blood Bag into Blood Bag inventory');
  }
};
module.exports.InsertBloodBag = async (bloodBagInfo, bankInventory) => {
  try {
    bloodType = bloodBagInfo.bloodBagType;
    if (bloodType === "O") {
      bankInventory.OBloodBags.push(bloodBagInfo);
    }
    if (bloodType === "A") {
      bankInventory.ABloodBags.push(bloodBagInfo);
    }
    if (bloodType === "B") {
      bankInventory.BBloodBags.push(bloodBagInfo);
    }
    if (bloodType === "AB") {
      bankInventory.ABBloodBags.push(bloodBagInfo);
    }
    const addedBloodBag = await BloodBagModel.findByIdAndUpdate(bankInventory._id, bankInventory);
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
    throw new Error('Can not find any blood bags in this inventory');
  }
};

module.exports.CreateBloodBag = async (bagInfo) => {
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
};
module.exports.AcceptBloodBag = async (BloodBagID) => {
  try {
    const test = await BloodBagModel.updateOne({"_id": BloodBagID}, {"pending": false});

    return test;
  }
  catch (error) {
    console.log(error);
    throw new Error('Could not accept Blood Bag / Can not remove from pending and add to the suitable blood type');
  }
};

/*hagrass*/
module.exports.findBankInventoryById = async (bankInventoryID) => {
  try {
    const inventory = await BloodBagModel.findById(bankInventoryID);
    return inventory;
  } catch (err) {
    throw new Error('Could not find bank inventory.');
  }
};

module.exports.acceptReqModifyAbags = async (bankInventory) => {
  try {
    bankInventory.ABloodBags.pop();
    const inventory = await BloodBagModel.findByIdAndUpdate(bankInventory._id, bankInventory);
    return true;
  } catch (arr) {
    throw new Error('can not update A bags');
  }
};

module.exports.acceptReqModifyBbags = async (bankInventory) => {
  try {
    bankInventory.BBloodBags.pop();
    const inventory = await BloodBagModel.findByIdAndUpdate(bankInventory._id, bankInventory);
    return true;
  } catch (arr) {
    throw new Error('can not update B bags');
  }
};

module.exports.acceptReqModifyABbags = async (bankInventory) => {
  try {
    bankInventory.ABBloodBags.pop();
    const inventory = await BloodBagModel.findByIdAndUpdate(bankInventory._id, bankInventory);
    return true;
  } catch (arr) {
    throw new Error('can not update AB bags');
  }
};

module.exports.acceptReqModifyObags = async (bankInventory) => {
  try {
    bankInventory.OBloodBags.pop();
    const inventory = await BloodBagModel.findByIdAndUpdate(bankInventory._id, bankInventory);
    return true;
  } catch (arr) {
    throw new Error('can not update O bags');
  }
};