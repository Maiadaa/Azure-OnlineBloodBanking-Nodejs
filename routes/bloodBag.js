const { Router } = require('express');
const bloodBag = require('../controllers/bloodBag');

const BloodBagRouter = Router();
//BloodBagRouter.post('/CreateBloodBankInventory/',bloodBag.postBloodInventory);
//BloodBagRouter.put('/AddBloodBag/:hospitalID',bloodBag.postBloodBagRequest);
//BloodBagRouter.get('/ShowAllPendingBags/:inventoryID',bloodBag.findPendingBags);
//BloodBagRouter.put('/AcceptBloodBag/:bloodBagID',bloodBag.postAcceptBloodBag);

BloodBagRouter.post('/InsertBloodBag',bloodBag.postBloodBag);
BloodBagRouter.delete('/RemoveBloodBag/:bloodBagID',bloodBag.postRemoveBloodBag);
BloodBagRouter.put('/AcceptBloodBag/:bloodBagID',bloodBag.postAcceptBloodBag);
BloodBagRouter.get('/ViewPendingBloodBags',bloodBag.postViewPendingBloodBags);
BloodBagRouter.get('/ViewAcceptedBloodBags',bloodBag.postViewAcceptedBloodBags);    
BloodBagRouter.get('/ViewAcceptedBloodBagsInHospital/:hospitalID',bloodBag.postViewAcceptedBloodBagsInHospital);  
BloodBagRouter.get('/ViewPendingBloodBagsInHospital/:hospitalID',bloodBag.postViewPendingBloodBagsInHospital);  

//BloodBagRouter.put('/RejectBloodBag/:hospitalID/:bloodBagID',bloodBag.postRejectBloodBag);
module.exports = BloodBagRouter;