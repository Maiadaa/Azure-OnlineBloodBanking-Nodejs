const userAccService = require('../services/UserAccount');

module.exports.postUser = async (req, res) => {
  try {
    const accInfo = {
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        email: req.body.email,
        hospital: req.body.hospital,
        phoneNumber: req.body.phoneNumber
    };

    const userExists = await userAccService.doesUserExist(accInfo.role, accInfo.username);
    if (userExists) {
      return res.status(422).send({
        error: 'A user with the same username already exists.'
      });
    }

    if(accInfo.role == "Super Admin"){
        await userAccService.superAdminSignup(accInfo);
    }
    else if(accInfo.role == "Lab Manager"){
        await userAccService.labManagerSignUp(accInfo);
    }
    else if (accInfo.role == "Lab Admin") {
        await userAccService.labAdminSignUp(accInfo);
    }
    else if (accInfo.role == "Doctor"){
        // await userAccService.doctorSignUp(accInfo);
    }
    else if (accInfo.role == "Donor") {
        // await userAccService.donorSignUp(accInfo);
    }
  } catch (error) {
    res.status(500).send({
      error: error.message
    });
  }
};