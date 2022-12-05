const { Router } = require('express');
const bloodBag = require('../controllers/bloodBag');

const BloodBagRouter = Router();
//BloodBagRouter.post('/CreateBloodBankInventory/',bloodBag.postBloodInventory);
//BloodBagRouter.put('/AddBloodBag/:hospitalID',bloodBag.postBloodBagRequest);
//BloodBagRouter.get('/ShowAllPendingBags/:inventoryID',bloodBag.findPendingBags);
//BloodBagRouter.put('/AcceptBloodBag/:bloodBagID',bloodBag.postAcceptBloodBag);

BloodBagRouter.post('/InsertBloodBag',bloodBag.postBloodBag);
BloodBagRouter.delete('/RejectBloodBag/:bloodBagID',bloodBag.postRejectloodBag);
BloodBagRouter.put('/AcceptBloodBag/:bloodBagID',bloodBag.postAcceptBloodBag);
//BloodBagRouter.put('/RejectBloodBag/:hospitalID/:bloodBagID',bloodBag.postRejectBloodBag);
module.exports = BloodBagRouter;