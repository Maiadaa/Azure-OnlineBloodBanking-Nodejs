const { ObjectId } = require('mongoose').Types;


module.exports.addAccount = async (accInfo) => {
    try{
        var status;
        if(accInfo.role == "Lab Manager"){
            const labManagerModel = require('../models/LabManagerSchema');
            const labManager = new labManagerModel({
                username: accInfo.username,
                password: accInfo.password,
                hospital: accInfo.hospitalName,
                role: accInfo.role
            });
            status = await labManager.save();
        }else if (accInfo.role == "Lab Admin") {

        }else if (accInfo.role == "Doctor"){

        }
        return status;
    } catch (err) {
       throw new Error('Could not add hospital.');
    }

};