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
      var hospital = await HospitalModel.findById(hospitalID);
      var inventory = await BloodBagModel.findById(hospital.inventoryID._id);
      var tempBloodBag = await BloodBagModel.find(BloodBagID);
      
      // update bag status 
      newBag = 
      {
        bloodBagType: tempBloodBag.bloodBagType,
        status: "Accepted",
        HBV: tempBloodBag.HBV,
        HCV: tempBloodBag.HCV,
        HIV: tempBloodBag.HIV,
        HTLV: tempBloodBag.HTLV,
        syphilis: tempBloodBag.syphilis,
        BacterialContamination: tempBloodBag.BacterialContamination,
        Babesia: tempBloodBag.Babesia,
        CMV: tempBloodBag.CMV,
        TrypanosomaCruzi: tempBloodBag.TrypanosomaCruzi,
        WNV: tempBloodBag.WNV
      };

      // Add bag details to the relavent array 
      const addedBag = await this.InsertBloodBag(newBag,inventory);
      // remove from pending array 
      const bagIdx = inventory.PendingBloodBags.indexOf({_id: BloodBagID});
      inventory.PendingBloodBags.splice(bagIdx, 1);
      const status = await BloodBagModel.findByIdAndUpdate(inventory._id, inventory);

     return status;
    }
    catch(error)
    {
        console.log(error);
        throw new Error ('Could not accept Blood Bag / Can not remove from pending and add to the suitable blood type');
    }
};
module.exports.RejectBloodBag = async (bankInventory) =>
{
    try
    { 
        const addedBloodBag = await BloodBagModel.findByIdAndUpdate(bankInventory._id, bankInventory);
        return addedBloodBag;
    }
    catch(error)
    {
        console.log(error);
        throw new Error ('Could not reject blood bag (remove it from the pending bags)');
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
  
module.exports.acceptReqModifyAmount = async (inventory) => {
  try{
    const inventory = await BloodBagModel.findByIdAndUpdate(inventory._id, inventory);
    return true;
  }catch(arr){
    throw new Error('can not update amount');
  }
}