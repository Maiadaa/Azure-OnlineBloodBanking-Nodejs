const {Schema, model} = require('mongoose');
const hospital = require('HospitalSchema');

const LabAdminSchema = new Schema({
    name: {
        type: 'String',
        required: true
    },
    email: {
        type: 'String',
        required: true
    },
    phoneNumber: {
        type: 'String',
        required: true
    },
    username: {
        type: 'String',
        required: true
    },
    hassword: {
        type: 'String',
        required: true
    },
    hospital:{
        type: 'String',
        required: true
    }
});

const LabAdminModel = model('LabAdmin', LabAdminSchema);

module.exports = LabAdminModel;