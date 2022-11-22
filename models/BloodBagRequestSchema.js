const {Schema, model} = require('mongoose');

const BloodBagRequestSchema = new Schema({
    BloodType:
    {
        type: 'String',
        required: true
    },
    Amount:
    {
        type: 'String',
        required: true
    },
    Date:
    {
        type: 'String',
        required: true
    },
    Status:
    {
        type: 'String',
        required: true
    },
    Purpose:
    {
        type: 'String',
        required: true
    },
});

const BloodBagRequestModel = model('Blood Bag Request', BloodBagRequestSchema);

module.exports = BloodBagRequestModel;