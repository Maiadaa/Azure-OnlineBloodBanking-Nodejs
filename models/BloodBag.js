const {Schema, model} = require('mongoose');

const BloodBagSchema = new Schema({
    BloodType:{
        type: 'String',
        required: true
    },
    HBV: {
        type: 'Boolean',
        required: false
    },
    HCV: {
        type: 'Boolean',
        required: false
    },
    HIV: {
        type: 'Boolean',
        required: false
    },
    HTLV: {
        type: 'Boolean',
        required: false
    },
    syphilis: {
        type: 'Boolean',
        required: false
    },
    WNV: {
        type: 'Boolean',
        required: false
    },
    TrypanosomaCruzi : {
        type: 'Boolean',
        required: false
    },
    CMV: {
        type: 'Boolean',
        required: false
    },
    Babesia: {
        type: 'Boolean',
        required: false
    },
    BacterialContamination : {
        type: 'Boolean',
        required: false
    },
    quantity: {
        type: 'number',
        required: true
    }
});

const BloodBagModel = model('BloodBag', BloodBagSchema);

module.exports = BloodBagModel;