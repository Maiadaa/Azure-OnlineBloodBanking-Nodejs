const {Schema, model} = require('mongoose');

const SuperAdminSchema = new Schema({
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
    }
});

const SuperAdminModel = model('SuperAdmin', SuperAdminSchema);

module.exports = SuperAdminModel;