const {Schema, model} = require('mongoose');

const hospital = new Schema({
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
    hotline: 
    {
        type: 'String',
        required: true
    },
    Address:
    {
        type: 'String',
        required: true
    }
});

const HospitalModel = model('Hospital', hospital);

module.exports = HospitalModel;