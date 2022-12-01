const { ObjectId } = require('mongoose').Types;

module.exports.superAdminSignup= async (superAdminInfo) => {
    try{
        const superAdminModel = require('../models/SuperAdmin');
        const superAdmin = new superAdminModel({
            name: superAdminInfo.name,
            email: superAdminInfo.email,
            PhoneNumber: superAdminInfo.PhoneNumber,
            username: superAdminInfo.username,
            password: superAdminInfo.password
        });
        const superAdminStatus = await superAdmin.save();
        return superAdminStatus;
    }catch (err) {
        throw new Error('Failed to add super admin.');
    }
};

module.exports.labManagerSignUp= async (labManagerInfo) => {
    try{
        const labManagerModel = require('../models/LabManagerSchema');
        const labManager = new labManagerModel({
            username: labManagerInfo.username,
            password: labManagerInfo.password,
            hospital: labManagerInfo.hospitalName
        });
        const labManagerStatus = await labManager.save();
        return labManagerStatus;
    }catch (err) {
        throw new Error('Failed to add lab manager.');
    }
};

module.exports.labAdminSignUp = async (labAdminInfo) => {
    try{
        const labAdminModel = require('../models/LabAdmin');
        const labAdmin = new labAdminModel({
            name: labAdminInfo.name,
            email: labAdminInfo.email,
            phoneNumber: labAdminInfo.phoneNumber,
            username: labAdminInfo.username,
            password: labAdminInfo.password,
            hospital: labAdminInfo.hospitalName
        });
        const labAdminStatus = await labAdmin.save();
        return labAdminStatus;
    }catch (err) {
        throw new Error('Failed to add lab admin.');
    }
};

module.exports.addAccount = async (accInfo) => {
    try{
        var status;
        if(accInfo.role == "Super Admin"){
            status = this.superAdminSignup(accInfo);
        }
        else if(accInfo.role == "Lab Manager"){
            status = this.labManagerSignUp(accInfo);
        }
        else if (accInfo.role == "Lab Admin") {
            status = this.labAdminSignUp(accInfo);
        }
        else if (accInfo.role == "Doctor"){
            // status = this.doctorSignUp(accInfo);
        }
        else if (accInfo.role == "Donor") {
            // status = this.donorSignUp(accInfo);
        }
        return status;
    } catch (err) {
       throw new Error('Could not add hospital.');
    }

};