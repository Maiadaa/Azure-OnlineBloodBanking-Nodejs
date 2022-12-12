const bcrypt = require('bcrypt');
const superAdminModel = require('../models/SuperAdmin');
const labManagerModel = require('../models/LabManagerSchema');
const labAdminModel = require('../models/LabAdmin');
const doctorModel = require('../models/Doctor');
const donorModel = require('../models/Donor');
const PatientModel=require('../models/Patient');
const { ObjectId } = require('mongoose').Types;
const JWT = require('jsonwebtoken');
/*module.exports.generateJWT = (user, userRole) => {
    const jwtPlayLoad = {
        userId: user._id,
        username: user.username,
        role: userRole
    };

    const jwtSecret = process.env.JWT_SECRET;
    try{
        let token = JWT.sign(jwtPlayLoad, jwtSecret, {expiresIn:'1h'});
        return token;
    }catch(error){
        throw new Error('Failure to sign in, please try again later.');
    }
};*/
module.exports.generateJWT = (user, role) => {
    try {
        const jwtPayload = {
            userId: user._id,
            username: user.username,
            role: role
        };

        const jwtSecret = process.env.JWT_SECRET;


        let token = JWT.sign(jwtPayload, jwtSecret, { expiresIn: '1h' });
        return token;
    } catch (error) {
        throw new Error('Failure to sign in, please try again later.');
    }
  };

module.exports.chkSuperAdminCreds = async(username, password) => {
    try{
        // find user that has the same username
        const user = await superAdminModel.findOne({
            username: username
        });
    
        // compare the plaintext password with the user's hashed password in the db.
        let isCorrectPassword = bcrypt.compare(password, user.password);
    
        if (isCorrectPassword) {
            return user;
        } else {
            return null;
        }
    }catch(error){
        throw new Error('Error logging in, please try again later.');
    }
};

module.exports.chkLabManagerCreds = async(username, password) => {
    try{
        // find user that has the same username
        const user = await labManagerModel.findOne({
            username: username
        });
  
        // compare the plaintext password with the user's hashed password in the db.
        let isCorrectPassword = bcrypt.compare(password, user.password);
  
        if (isCorrectPassword) {
            return user;
        } else {
            return null;
        }
    }catch(error){
        throw new Error('Error logging in, please try again later.');
    }
};

module.exports.chkLabAdminCreds = async(username, password) => {
    try{
        // find user that has the same username
        const user = await labAdminModel.findOne({
            username: username
        });
  
        // compare the plaintext password with the user's hashed password in the db.
        let isCorrectPassword = bcrypt.compare(password, user.password);
  
        if (isCorrectPassword) {
            return user;
        } else {
            return null;
        }
    }catch(error){
        throw new Error('Error logging in, please try again later.');
    }
};

module.exports.doesUserExist = async(role, username) => {
    var existingUser;
    if (role == "Super Admin"){
        existingUser = await superAdminModel.findOne({
            username: username
        });
    }else if (accInfo.role == "Lab Manager"){
        existingUser = await labManagerModel.findOne({
            username: username
        });
    }else if (accInfo.role == "Lab Admin"){
        existingUser = await labAdminModel.findOne({
            username: username
        });
    }else if (accInfo.role == "Doctor"){
        existingUser = await doctorModel.findOne({
            Username: username
        });
    }else if (accInfo.role == "Donor"){
        existingUser = await donorModel.findOne({
            uname: username
        });
    }

    if (existingUser) {
        return true;
    } else {
        return false;
    }
};

module.exports.superAdminSignup= async (superAdminInfo) => {
    try{
        // hash the password
        let hashedPassword = await bcrypt.hash(superAdminInfo.password, 12);

        const superAdmin = new superAdminModel({
            name: superAdminInfo.name,
            email: superAdminInfo.email,
            PhoneNumber: superAdminInfo.phoneNumber,
            username: superAdminInfo.username,
            password: hashedPassword
        });
        await superAdmin.save();
    }catch (err) {
        throw new Error('Failed to add super admin.');
    }
};

module.exports.labManagerSignUp= async (labManagerInfo) => {
    try{
        // hash the password
        let hashedPassword = await bcrypt.hash(labManagerInfo.password, 12); 

        const labManager = new labManagerModel({
            username: labManagerInfo.username,
            password: hashedPassword,
            hospitalId: new ObjectId(labManagerInfo.hospital)
        });
        const status = await labManager.save();

        return status;
    }catch (err) {
        throw new Error('Failed to add lab manager.');
    }
};

module.exports.labAdminSignUp = async (labAdminInfo) => {
    try{
        // hash the password
        let hashedPassword = await bcrypt.hash(labAdminInfo.password, 12);

        const labAdmin = new labAdminModel({
            name: labAdminInfo.name,
            email: labAdminInfo.email,
            phoneNumber: labAdminInfo.phoneNumber,
            username: labAdminInfo.username,
            password: hashedPassword,
            hospital: labAdminInfo.hospitalId
        });
        await labAdmin.save();
    }catch (err) {
        throw new Error('Failed to add lab admin.');
    }
};

/*assem*/
module.exports.DoctorSignUp = async (DcotorInfo) => {
    try{
        // hash the password
        let hashedPassword = await bcrypt.hash(DcotorInfo.password, 12);

        const Doctor = new doctor({
            name: DcotorInfo.name,
            email: DcotorInfo.email,
            phoneNumber: DcotorInfo.phoneNumber,
            username: DcotorInfo.username,
            password: hashedPassword,
            hospital: new ObjectId(labAdminInfo.hospitalId)
        });
        await Doctor.save();
    }catch (err) {
        throw new Error('Failed to add Doctor.');
    }
};

module.exports.editPatientAccount = async (patientInfo) => {
    try{
        const hashedPassword = await bcrypt.hash(patientInfo.password, 31);
        patientInfo.password = hashedPassword;
        patientInfo.hospitalId = new ObjectId(patientInfo.hospitalId);
        const status = PatientModel.findByIdAndUpdate(patientInfo._id, patientInfo);
        return status;
    }catch(err){
        throw new Error('Error editing patient account');
    }
};

module.exports.chkDoctorCreds = async(username, password) => {
    try{
        // find user that has the same username
        const user = await doctorModel.findOne({
            username: username
        });
  
        // compare the plaintext password with the user's hashed password in the db.
        let isCorrectPassword = bcrypt.compare(password, user.password);
  
        if (isCorrectPassword) {
            return user;
        } else {
            return null;
        }
    }catch(error){
        throw new Error('Error logging in, please try again later.');
    }
};

module.exports.chkDonorCreds = async(username, password) => {
    try{
        // find user that has the same username
        const user = await donorModel.findOne({
            username: username
        });
  
        // compare the plaintext password with the user's hashed password in the db.
        let isCorrectPassword = bcrypt.compare(password, user.password);
  
        if (isCorrectPassword) {
            return user;
        } else {
            return null;
        }
    }catch(error){
        throw new Error('Error logging in, please try again later.');
    }
};

module.exports.createLabAdminAccount = async (LabAdminInfo) => {
    try {
        const LabAdmin = new labAdminModel(
        {
            name:  LabAdminInfo.name,
            email: LabAdminInfo.email,
            phoneNumber: LabAdminInfo.phoneNumber,
            username: LabAdminInfo.username,
            password: LabAdminInfo.password,
            hospitalId: LabAdminInfo.hospitalId
        });
        const addedLabAdmin = await LabAdmin.save();
        return addedLabAdmin;
      }
      catch (error) {
        console.log(error);
        throw new Error('Could not add Lab Admin account to this hospital');
      }
};
module.exports.createSuperAdminAccount = async (SuperAdminInfo) => {
    try {
        let hashedPassword = await bcrypt.hash(SuperAdminInfo.password, 12);
        const LabAdmin = new superAdminModel(
        {
            name:  SuperAdminInfo.name,
            email: SuperAdminInfo.email,
            phoneNumber: SuperAdminInfo.phoneNumber,
            username: SuperAdminInfo.username,
            password: hashedPassword
        });
        const addedSuperAdmin = await LabAdmin.save();
        return addedSuperAdmin;
      }
      catch (error) {
        console.log(error);
        throw new Error('Could not add Lab Admin account to this hospital');
      }
};
/*hagrass*/
module.exports.editSuperAdminAccount = async (id, superAdminInfo) => {
    try{
        const hashedPassword = await bcrypt.hash(superAdminInfo.password, 12);
        superAdminInfo.password = hashedPassword;
        const status = await superAdminModel.findByIdAndUpdate(id, superAdminInfo);
        return status;
    }catch(err){
        throw new Error('can not edit super admin account');
    }
};

module.exports.ediLabManagerAccount = async (id, labManagerInfo) => {
    try{
        const hashedPassword = await bcrypt.hash(labManagerInfo.password, 12);
        labManagerInfo.password = hashedPassword;
        const status = await labManagerModel.findByIdAndUpdate(id, labManagerInfo);
        return status;
    }catch(err){
        throw new Error('can not edit lab manager account');
    }
};

module.exports.editLabAdminAccount = async (id, labAdminInfo) => {
    try{
        const hashedPassword = await bcrypt.hash(labAdminInfo.password, 12);
        labAdminInfo.password = hashedPassword;
        labAdminInfo.hospitalId = new ObjectId(labAdminInfo.hospitalId);
        const status = await labAdminModel.findByIdAndUpdate(id, labAdminInfo);
        return status;
    }catch(err){
        throw new Error('can not edit lab admin account');
    }
};

module.exports.createDoctorAccount = async (doctorAccountInfo) => {
    try {
        let hashedPassword = await bcrypt.hash(doctorAccountInfo.password, 12);
        const doctor = new doctorModel(
        {
            name:  doctorAccountInfo.name,
            email: doctorAccountInfo.email,
            phoneNumber: doctorAccountInfo.phoneNumber,
            username: doctorAccountInfo.username,
            password: hashedPassword,
            hospitalId: new ObjectId(doctorAccountInfo.hospitalId)
        });
        const addDoctor = await doctor.save();
        return addDoctor;
      }
      catch (error) {
        console.log(error);
        throw new Error('Could not add doctor');
      }
};

module.exports.createDonorAccount = async (donorAccountInfo) => {
    try {
        let hashedPassword = await bcrypt.hash(donorAccountInfo.password, 12);
        const donor = new donorModel(
        {
            name:  donorAccountInfo.name,
            email: donorAccountInfo.email,
            phoneNumber: donorAccountInfo.phoneNumber,
            username: donorAccountInfo.username,
            password: hashedPassword,
            bloodType: donorAccountInfo.bloodType
        });
        const addedDonor = await donor.save();
        return addedDonor;
      }
      catch (error) {
        console.log(error);
        throw new Error('Could not add donor');
      }
};