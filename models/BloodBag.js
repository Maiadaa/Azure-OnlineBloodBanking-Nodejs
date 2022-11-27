const {Schema, model} = require('mongoose');

const BloodBagSchema = new Schema({

});

const BloodBagModel = model('BloodBag', BloodBagSchema);

module.exports = BloodBagModel;