const {Router} = require('express');

const BankInventoryController = require('../controllers/PatientContoller');

const BankInventoryRouter = Router();

BankInventoryRouter.get('/', BankInventoryController.getBankInventory);

BankInventoryRouter.post('/', BankInventoryController.postBankInventory);

BankInventoryRouter.put('/:patientID', BankInventoryController.DrRequiestBag);

module.exports = BankInventoryRouter;