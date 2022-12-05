const { Router } = require('express');
const InventoryController = require('../controllers/bloodBag');

const BloodBankInventoryRouter = Router();
BloodBankInventoryRouter.post('/CreateBloodBankInventory/',InventoryController.postBloodInventory);
BloodBankInventoryRouter.put('/AddBloodBag/:inventoryID',InventoryController.postBloodBagRequest);
BloodBankInventoryRouter.get('/ShowAllPendingBags/:inventoryID',InventoryController.findPendingBags);
<<<<<<< Updated upstream:routes/BloodBankInventory.js
=======
BloodBankInventoryRouter.put('/AcceptBloodBag/:bloodBagID',InventoryController.postAcceptBloodBag);
>>>>>>> Stashed changes:routes/bloodBag.js
BloodBankInventoryRouter.put('/InsertBloodBag/:inventoryID',InventoryController.postBloodBag);
BloodBankInventoryRouter.put('/AcceptBloodBag/:hospitalID/:bloodBagID',InventoryController.postAcceptBloodBag);
BloodBankInventoryRouter.put('/RejectBloodBag/:hospitalID/:bloodBagID',InventoryController.postRejectBloodBag);
module.exports = BloodBankInventoryRouter;