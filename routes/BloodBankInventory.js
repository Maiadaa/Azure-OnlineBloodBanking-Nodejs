const { Router } = require('express');
const InventoryController = require('../controllers/BloodBankInventoryController');

const BloodBankInventoryRouter = Router();
BloodBankInventoryRouter.post('/CreateBloodBankInventory/',InventoryController.postBloodInventory);
BloodBankInventoryRouter.put('/AddBloodBag/:inventoryID',InventoryController.postBloodBag);
BloodBankInventoryRouter.get('/ShowAllPendingBags/:inventoryID',InventoryController.findPendingBags);
BloodBankInventoryRouter.get('/AcceptBloodBag/:inventoryID',InventoryController.findPendingBags);
module.exports = BloodBankInventoryRouter;