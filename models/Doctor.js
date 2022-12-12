const {Schema, model} = require('mongoose');

const DoctorSchema = new Schema({
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
    role: {
        type: 'String',
        required:  false,
        default: "General Doctor"
    },
    hospitalId:{
        type: Schema.Types.ObjectId,
        ref: 'hospital',
        required: true
    }
});

const DoctorModel = model ('Doctor', DoctorSchema);
module.exports = DoctorModel;