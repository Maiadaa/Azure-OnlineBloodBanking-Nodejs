const {Schema, model} = require('mongoose');

const LabManagerSchema = new Schema({
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
    Username: 
    {
        type: 'String',
        required: true
    },
    Password: 
    {
        type: 'String',
        required: true
    }
});

const LabManagerModel = model('LabManager', LabManagerSchema);

module.exports = LabManagerModel;