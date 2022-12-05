const {Schema, model} = require('mongoose');

const DonationCampsSchema = new Schema({
    hospital: 
    {
        type: Schema.Types.ObjectId,
        ref: 'hospital',
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
            type: Schema.Types.ObjectId,
            required: true
        },
        timeSlot: {
            type: 'String',
            required: true
        }
    }]
});

const DonationCampsModel = model('DonationCamp', DonationCampsSchema);

module.exports = DonationCampsModel;