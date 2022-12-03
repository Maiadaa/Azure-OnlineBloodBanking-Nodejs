const {Schema, model} = require('mongoose');

const LabAdminSchema = new Schema({
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
    hospitalId:{
        type: Schema.Types.ObjectId,
        required: true
    }
});

const LabAdminModel = model('LabAdmin', LabAdminSchema);

module.exports = LabAdminModel;