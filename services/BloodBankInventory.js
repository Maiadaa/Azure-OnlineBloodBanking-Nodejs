const BloodBagModel = require('../models/BloodInventory');

module.exports.InsertBloodBag = async (bloodBagInfo) =>
{
    const BloodBag = new BloodBagModel 
    (
        {
          HBV : bloodBagInfo.HBV,
          HCV : bloodBagInfo.HCV,
          HIV : bloodBagInfo.HIV,
          HTLV : bloodBagInfo.HTLV,
          syphilis: bloodBagInfo.syphilis,
          WNV : bloodBagInfo.WNV,
          TrypanosmaCruzy: bloodBagInfo.TrypanosmaCruzy,
          CMV : bloodBagInfo.CMV,
          Babesia : bloodBagInfo.Babesia,
          BacterialContamination : bloodBagInfo.BacterialContamination,
          quantity : bloodBagInfo.quantity,
          status : 'Pending'
        }
    );
    try
    {
        const addedBloodBag = await BloodBag.save();
        return addedBloodBag;
    }
    catch(error)
    {
        console.log(error);
        throw new Error ('Could not add Blood Bag into Blood Bag inventory');
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