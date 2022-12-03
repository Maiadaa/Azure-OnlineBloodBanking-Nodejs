const {Schema, model} = require('mongoose');

const PatientSchema = new Schema({
    name: {
        type: 'String',
        required: true
    },
    email: {
        type: 'String',
        required: true
    },
    PhoneNumber: {
        type: 'String',
        required: true
    },
    Address:{
        type:'String',
        required: true
    },
    Condition:{
        type:'String',
        required: true
    },
    BloodType:{
        type:'String',
        required: true
    },
    hospitalId:{
        type: Schema.Types.ObjectId,
        required: true
    },
    Request: [
        {
            BloodType:
            {
                type: 'String',
                required: true
            },
            Amount:
            {
                type: 'number',
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
        }
    ]
});

const PatientModel = model ('Patient', PatientSchema);

module.exports = PatientModel;