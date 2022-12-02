const { Router } = require('express');
const InventoryController = require('../controllers/BloodBankInventoryController');

const BloodBankInventoryRouter = Router();
BloodBankInventoryRouter.post('/',InventoryController.postBloodBag);
module.exports = BloodBankInventoryRouter;