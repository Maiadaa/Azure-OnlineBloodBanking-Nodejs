const BloodBagService = require('../services/bloodBag');

module.exports.postBloodBag = async (req,res) =>
{
    const BloodBagInfo = 
    {
        hospital: req.body.hospital,
        bloodType : req.body.bloodType,
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
        pending : req.body.pending
    };
    try
    {
        
        const addedBloodBag = await BloodBagService.InsertBloodBag(BloodBagInfo);

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

module.exports.postAcceptBloodBag = async (req,res) =>
{
    try
    {
        const bloodbag = await BloodBagService.findBloodBagById(req.params.bloodBagID);
        bloodbag.pending = false;
        const output =  await BloodBagService.AcceptBloodBag(bloodbag);
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
};
