<<<<<<< Updated upstream:controllers/BloodBankInventoryController.js
const BloodBankInventoryService = require('../services/BloodBankInventory');
const hospitalService = require('../services/hospitals');
=======
const BloodBagService = require('../services/bloodBag');
>>>>>>> Stashed changes:controllers/bloodBag.js

module.exports.postBloodBagRequest = async (req,res) =>
{
    const bankInventory = await BloodBagService.findBankInventoryById(req.params.inventoryID);
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
        
        const addedBloodBag = await BloodBagService.InsertBloodBagRequest(BloodBagInfo,bankInventory);

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
module.exports.postBloodBag = async (req,res) =>
{
    const bankInventory = await BloodBagService.findBankInventoryById(req.params.inventoryID);
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
        
        const addedBloodBag = await BloodBagService.InsertBloodBag(BloodBagInfo,bankInventory);

        res.status(201).send({
            msg: 'Blood Bag added to Relevant Blood Type array successfully.',
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
        const addedBloodInventory = await BloodBagService.CreateBloodInventory(BloodInventoryInfo);

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
        const PendingBags = await BloodBagService.FindAllPendingBloodBags(req.params.inventoryID);
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
    try
    {
        const output =  await BloodBagService.AcceptBloodBag(req.params.BloodBagID);
        return res.status(201).send({
            msg: "DONE",
            output
        });
    }
    catch(err)
    {
        res.status(500).send({
            error: err.message
        });
    } 
<<<<<<< Updated upstream:controllers/BloodBankInventoryController.js
};
module.exports.postRejectBloodBag = async (req,res) =>
{
    try
    {
        const BloodBagID = req.params.bloodBagID;
        const hospitalID = req.params.hospitalID;
        const hospital = await hospitalService.findHospitalByID(hospitalID);
        const bankInventory = await BloodBankInventoryService.findBankInventoryById(hospital.inventoryID._id);
        for(var i = 0; i < bankInventory.PendingBloodBags.length; i++){
            if(bankInventory.PendingBloodBags[i]._id == BloodBagID){
              bankInventory.PendingBloodBags.splice(i, 1);
            }
          }
        const status =  await BloodBankInventoryService.RejectBloodBag(bankInventory);
        return res.send({status});
    }
    catch(err)
    {
        res.status(500).send({
            error: err.message
        });
    } 
}
=======
};
>>>>>>> Stashed changes:controllers/bloodBag.js
