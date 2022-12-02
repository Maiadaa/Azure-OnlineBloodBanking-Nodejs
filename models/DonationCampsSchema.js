const {Schema, model} = require('mongoose');

const DonationCampsSchema = new Schema({
    hospitalName: 
    {
        type: 'String',
        required: true
    },
    PhoneNumber: 
    {
        type: 'String',
        required: true
    },
    Location:
    {
        type: 'String',
        required: true
    },
    Date:
    {
        type: 'String',
        required: true
    },
    donorReservations:[{
        donorID: {
            type: 'String',
            required: true
        },
        timeSlot: {
            type: 'String',
            required: true
        },
        bloodBagsQty:{
            type: 'Number',
            required: true
        }
    }]
});

const DonationCampsModel = model('DonationCamp', DonationCampsSchema);

module.exports = DonationCampsModel;