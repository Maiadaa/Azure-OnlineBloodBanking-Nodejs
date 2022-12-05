const { Schema, model } = require('mongoose');

const BloodBagSchema = new Schema({
    hospital: {
        type: Schema.Types.ObjectId,
        ref: 'hospital',
        required: true
    },
    bloodType: {
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
    TrypanosomaCruzi: {
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
    BacterialContamination: {
        type: 'Boolean',
        required: false
    },
    pending: {
        type: 'Boolean',
        required: true,
        default: true
    }
}
);

const BloodInventoryModel = model('BloodBag', BloodBagSchema);

module.exports = BloodInventoryModel;