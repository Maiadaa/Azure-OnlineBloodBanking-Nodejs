const BloodBagModel = require('../models/BloodInventory');

module.exports.InsertBloodBag = async (bloodBagInfo,bankInventory) =>
{
    try
    {
        bankInventory.PendingBloodBags.push(bloodBagInfo);
        const addedBloodBag = await BloodBagModel.findByIdAndUpdate(bankInventory._id,bankInventory);
        return addedBloodBag;
    }
    catch(error)
    {
        console.log(error);
        throw new Error ('Could not add Blood Bag into Blood Bag inventory');
    }
};

module.exports.FindAllPendingBloodBags = async (inventoryID) => 
{
  try
  {
      const BloodBags = await BloodBagModel.findById(inventoryID);
      return BloodBags.PendingBloodBags;
  }
  catch (err)
  {
      throw new Error('Can not find any blood bags in this inventory');
  }
};  

module.exports.CreateBloodInventory = async (inventoryInfo) =>
{
  try {
    const BloodInventory = new BloodBagModel(
      {
        PendingBloodBags: inventoryInfo.PendingBloodBags,
        OBloodBags: inventoryInfo.OBloodBags,
        ABloodBags: inventoryInfo.ABloodBags,
        BBloodBags: inventoryInfo.BBloodBags,
        ABBloodBags: inventoryInfo.ABBloodBags
      }
    );
    const createdInventory = await BloodInventory.save();
    return createdInventory;
  } catch (err) {
    throw new Error('could not create blood inventory.');
  }
};
module.exports.AcceptBloodBag = async (BloodBagID,) =>
{
  const tempBloodBag = await BloodBagModel.PendingBloodBags.findById(BloodBagID);
  try
    {
      if(BloodBagInfo.bloodBagType === "O" )
      {
        bankInventory.OBloodBags.push(tempBloodBag);
      }
      if(BloodBagInfo.bloodBagType === "A" )
      {
        bankInventory.ABloodBags.push(tempBloodBag);
      }
      if(BloodBagInfo.bloodBagType === "AB" )
      {
        bankInventory.ABBloodBags.push(tempBloodBag);
      }
      if(BloodBagInfo.bloodBagType === "B" )
      {
        bankInventory.BBloodBags.push(tempBloodBag);
      }
        BloodBagModel.PendingBloodBags.pull({_id:BloodBagID});
        const acceptedBloodBag = await BloodBagModel.findByIdAndUpdate(bankInventory._id,bankInventory);
        return acceptedBloodBag;
    }
    catch(error)
    {
        console.log(error);
        throw new Error ('Could not accept Blood Bag / Can not remove from pending and add to the suitable blood type');
    }
};
module.exports.findBankInventoryById = async (bankInventoryID) => {
    try {
      const inventory = await BloodBagModel.findById(bankInventoryID);
      return inventory;
    } catch (err) {
      throw new Error('Could not find bank inventory.');
    }
  };
  
  module.exports.acceptReqModifyAmount = async (inventory) => {
    try{
      const inventory = await BloodBagModel.findByIdAndUpdate(inventory._id, inventory);
      return true;
    }catch(arr){
      throw new Error('can not update amount');
    }
  }