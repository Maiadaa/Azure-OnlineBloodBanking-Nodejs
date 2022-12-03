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
    PhoneNumber: {
        type: 'String',
        required: true
    },
    Username: {
        type: 'String',
        required: true
    },
    Password: {
        type: 'String',
        required: true
    },
    Speciality: {
        type: 'String',
        required: true 
    },
    hospitalId:{
        type: Schema.Types.ObjectId,
        required: true
    }
});

const DoctorModel = model ('Doctor', DoctorSchema);
module.exports = DoctorModel;