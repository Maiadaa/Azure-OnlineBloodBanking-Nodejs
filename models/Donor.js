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
    uname: {
        type: 'String',
        required: true
    },
    pwd: {
        type: 'String',
        required: true
    },
    bloodType: {
        type: 'String',
        required: true
    },
    nationality: {
        type: 'String',
        required: true
    }
});