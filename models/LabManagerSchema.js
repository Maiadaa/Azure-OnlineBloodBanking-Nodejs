const {Schema, model} = require('mongoose');

const LabManagerSchema = new Schema({
    name: 
    {
        type: 'String',
        required: false
    },
    email: 
    {
        type: 'String',
        required: false
    },
    phoneNumber: 
    {
        type: 'String',
        required: false
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
    hospitalId:{
        type: Schema.Types.ObjectId,
        ref: 'hospital',
        required: true
    }
});

const LabManagerModel = model('LabManager', LabManagerSchema);

module.exports = LabManagerModel;