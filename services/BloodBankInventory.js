const BloodInventoryModel = require('../models/BloodInventory');
const BloodBagModel = require('../models/BloodInventory');
const HospitalModel = require('../models/hospital');

module.exports.InsertBloodBagRequest = async (bloodBagInfo,bankInventory) =>
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
module.exports.InsertBloodBag = async (bloodBagInfo,bankInventory) =>
{
    try
    {
        bloodType = bloodBagInfo.bloodBagType;
        if(bloodType === "O")
        {
          bankInventory.OBloodBags.push(bloodBagInfo);
        }
        if(bloodType === "A")
        {
          bankInventory.ABloodBags.push(bloodBagInfo);
        }
        if(bloodType === "B")
        {
          bankInventory.BBloodBags.push(bloodBagInfo);
        }
        if(bloodType === "AB")
        {
          bankInventory.ABBloodBags.push(bloodBagInfo);
        }
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
module.exports.AcceptBloodBag = async (hospitalID, BloodBagID) =>
{ 
  try
    {
      const hospital = await HospitalModel.findById(hospitalID);
      const inventory = await BloodInventoryModel.findById(hospital.inventoryID._id);
      const tempBloodBag = await BloodInventoryModel.findById(BloodBagID);

      // remove from pending array 
      const removalStatus = await inventory.PendingBloodBags.pull({_id:BloodBagID});
      
      // update bag status 
      const newBag = tempBloodBag;
      newBag = {
        status: "Accepted"
      };
      console.log(newBag);

      // Add bag details to the relavent array 
      if(tempBloodBag.bloodBagType === "O" )
      {
        inventory.OBloodBags.push(newBag);
      }
      if(tempBloodBag.bloodBagType === "A" )
      {
        inventory.ABloodBags.push(newBag);
      }
      if(tempBloodBag.bloodBagType === "AB" )
      {
        inventory.ABBloodBags.push(newBag);
      }
      if(tempBloodBag.bloodBagType === "B" )
      {
        inventory.BBloodBags.push(newBag);
      }
      const acceptedBloodBag = await BloodBagModel.findByIdAndUpdate(inventory._id, inventory);
      return res.status(201).send({
        removalStatus,
        acceptedBloodBag,
        msg: "Bag marked as accepted successfully."
      });
    }
    catch(error)
    {
        console.log(error);
        throw new Error ('Could not accept Blood Bag / Can not remove from pending and add to the suitable blood type');
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
  try{
    bankInventory.ABloodBags.pop();
    const inventory = await BloodBagModel.findByIdAndUpdate(bankInventory._id, bankInventory);
    return true;
  }catch(arr){
    throw new Error('can not update A bags');
  }
};

module.exports.acceptReqModifyBbags = async (bankInventory) => {
  try{
    bankInventory.BBloodBags.pop();
    const inventory = await BloodBagModel.findByIdAndUpdate(bankInventory._id, bankInventory);
    return true;
  }catch(arr){
    throw new Error('can not update B bags');
  }
};

module.exports.acceptReqModifyABbags = async (bankInventory) => {
  try{
    bankInventory.ABBloodBags.pop();
    const inventory = await BloodBagModel.findByIdAndUpdate(bankInventory._id, bankInventory);
    return true;
  }catch(arr){
    throw new Error('can not update AB bags');
  }
};

module.exports.acceptReqModifyObags = async (bankInventory) => {
  try{
    bankInventory.OBloodBags.pop();
    const inventory = await BloodBagModel.findByIdAndUpdate(bankInventory._id, bankInventory);
    return true;
  }catch(arr){
    throw new Error('can not update O bags');
  }
};