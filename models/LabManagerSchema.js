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
    phoneNumber: 
    {
        type: 'String',
        required: true
    },
    username: 
    {
        type: 'String',
        required: true
    },
    password: 
    {
        type: 'String',
        required: true
    },
    hospital:{
        type: 'String',
        required: true
    }
});

const LabManagerModel = model('LabManager', LabManagerSchema);

module.exports = LabManagerModel;