const {Schema, model} = require('mongoose');

const DonorSchema = new Schema({
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
    password: {
        type: 'String',
        required: true
    },
    bloodType: {
        type: 'String',
        required: true
    },
    nationality: {
        type: 'String',
        required: false
    },
    gender:{
        type: 'String',
        required: false
    }
});

const donorModel = model('donor', DonorSchema);

module.exports = donorModel;