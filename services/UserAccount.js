const bcrypt = require('bcrypt');

const superAdminModel = require('../models/SuperAdmin');
const labManagerModel = require('../models/LabManagerSchema');
const labAdminModel = require('../models/LabAdmin');

module.exports.generateJWT = (user, userRole) => {
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

    }else if (accInfo.role == "Donor"){

    }else{

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
            PhoneNumber: superAdminInfo.PhoneNumber,
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
        let hashedPassword = await bcrypt.hash(superAdminInfo.password, 12); 

        const labManager = new labManagerModel({
            username: labManagerInfo.username,
            password: hashedPassword,
            hospital: labManagerInfo.hospitalName
        });
        await labManager.save();
    }catch (err) {
        throw new Error('Failed to add lab manager.');
    }
};

module.exports.labAdminSignUp = async (labAdminInfo) => {
    try{
        // hash the password
        let hashedPassword = await bcrypt.hash(superAdminInfo.password, 12);

        const labAdmin = new labAdminModel({
            name: labAdminInfo.name,
            email: labAdminInfo.email,
            phoneNumber: labAdminInfo.phoneNumber,
            username: labAdminInfo.username,
            password: hashedPassword,
            hospital: labAdminInfo.hospitalName
        });
        await labAdmin.save();
    }catch (err) {
        throw new Error('Failed to add lab admin.');
    }
};

