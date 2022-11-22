const {Schema, model} = require('mongoose');

const HospitalSchema = new Schema({
    name: 
    {
        type: 'String',
        required: true
    },
    email: 
    {
        type: 'String',
        required: true
    },
    PhoneNumber: 
    {
        type: 'String',
        required: true
    },
    Address:
    {
        type: 'String',
        required: true
    },
});

const HospitalModel = model('Hospital', HospitalSchema);

module.exports = HospitalModel;