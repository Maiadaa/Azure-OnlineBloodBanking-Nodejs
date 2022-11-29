const {Schema, model} = require('mongoose');

const DonationCampsSchema = new Schema({
    name: 
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
        }
    }]
});

const DonationCampsModel = model('Donation Camps', DonationCampsSchema);

module.exports = DonationCampsModel;