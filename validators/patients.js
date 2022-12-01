const {check} = require('express-validator');

module.exports.validatePostPatient = () => {
    const validationMiddlewares = [
        check('name').notEmpty().withMessage('patient name can not be empty'),
        check('email').isEmail.withMessage('you should enter of form of email'),
        check('PhoneNumber').notEmpty().withMessage('patient number can not be empty'),
        check('Address').notEmpty().withMessage('patient address can not be empty'),
        check('Condition').notEmpty().withMessage('patient condition can not be empty'),
        check('BloodType').notEmpty().withMessage('patient blood type can not be empty'),
        check('hospitalId').notEmpty().withMessage('patient hospital id can not be empty'),
        check('Request').isArray.withMessage('request should be in form of arrray'),
    ];
    return validationMiddlewares;
}