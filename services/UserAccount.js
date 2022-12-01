const { ObjectId } = require('mongoose').Types;

const labManagerModel = require('../models/LabManagerSchema');


module.exports.addAccount = async (accInfo) => {
    try{
        // if role = lab manager 
        const labManager = new labManagerModel({
            username: accInfo.username,
            password: accInfo.password,
            hospital: accInfo.hospitalName,
            role: accInfo.role
        });
        const status = await labManager.save();
        return status;
    } catch (err) {
       throw new Error('Could not add hospital.');
    }

};