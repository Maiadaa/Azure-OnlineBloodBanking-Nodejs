const BloodBankInventoryService = require('../services/BloodBankInventory');

module.exports.postBloodBag = async (req,res) =>
{
    const BloodBagInfo = 
    {
        HBV : req.body.HBV,
        HCV : req.body.HCV,
        HIV : req.body.HIV,
        HTLV : req.body.HTLV,
        syphilis : req.body.syphilis,
        WNV : req.body.WNV,
        TrypanosmaCruzy : req.body.TrypanosmaCruzy,
        CMV : req.body.CMV,
        Babesia : req.body.Babesia,
        BacterialContamination : req.body.BacterialContamination,
        quantity : req.body.quantity,
        status : req.body.status
    };
    try
    {
        const addedBloodBag = await BloodBankInventoryService.InsertBloodBag(BloodBagInfo);

        res.status(201).send({
            msg: 'Blood Bag added successfully.',
            BloodBagID: addedBloodBag._id
        });
    }
    catch(err)
    {
        res.status(500);
        res.send({
            error: err.message
        });
    }
    
};