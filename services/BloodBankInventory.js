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