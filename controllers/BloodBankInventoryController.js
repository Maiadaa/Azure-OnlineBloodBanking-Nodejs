const BloodBankInventoryService = require('../services/BloodBankInventory');

module.exports.postBloodBagRequest = async (req,res) =>
{
    const bankInventory = await BloodBankInventoryService.findBankInventoryById(req.params.inventoryID);
    const BloodBagInfo = 
    {
        bloodBagType : req.body.bloodBagType,
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
        status : req.body.status
    };
    try
    {
        
        const addedBloodBag = await BloodBankInventoryService.InsertBloodBagRequest(BloodBagInfo,bankInventory);

        res.status(201).send({
            msg: 'Blood Bag added to pending bags successfully.',
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

module.exports.postBloodInventory = async (req,res) =>
{
    const BloodInventoryInfo = 
    {
        PendingBloodBags : req.body.PendingBloodBags,
        ABloodBags : req.body.ABloodBags,
        ABBloodBags : req.body.ABBloodBags,
        BBloodBags : req.body.BBloodBags,
        OBloodBags : req.body.OBloodBags,
    };
    try
    {
        const addedBloodInventory = await BloodBankInventoryService.CreateBloodInventory(BloodInventoryInfo);

        res.status(201).send({
            msg: 'Blood Inventory added successfully.',
            BloodInventoryID: addedBloodInventory._id
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
module.exports.findPendingBags = async (req, res) => {
    try
    {
        const PendingBags = await BloodBankInventoryService.FindAllPendingBloodBags(req.params.inventoryID);
        res.send({PendingBags});
    }
    catch(err)
    {
        res.status(500);
        res.send({
            error: err
        });
    }
};
module.exports.postAcceptBloodBag = async (req,res) =>
{
    try{
        const status =  BloodBankInventoryService.AcceptBloodBag(req.params.hospitalID, req.params.BloodBagID);
    }catch(err)
    {
        res.status(500).send({
            error: err.message
        });
    }
    
}