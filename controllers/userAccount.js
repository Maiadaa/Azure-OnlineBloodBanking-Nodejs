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

module.exports.postLogin = async (req, res) => {
  const { role, username, password } = req.body;
  try {
    var acc; 
    if(role == "Super Admin"){
      acc = await userAccService.chkSuperAdminCreds(username, password);
    }else if (role == "Lab Manager"){
      acc = await userAccService.chkLabManagerCreds(username, password);
    }else if (role == "Lab Admin"){
      acc = await userAccService.chkLabAdminCreds(username, password);
    }else if (role == "Doctor"){
      // acc = await userAccService.chkDoctorCreds(username, password);
    }else if (role == "Donor"){
      // acc = await userAccService.chkDonorCreds(username ,password);
    }

    if (!acc) {
      return res.status(401).send({
        error:
          'Invalid credentials, please enter the correct username and password.'
      });
    }

    const jwt = await userAccService.generateJWT(acc, role);

    res.send({
      userId: acc._id,
      username: acc.username,
      jwt: jwt,
      role: role,
      message: 'Logged in successfully.'
    });

  } catch (err) {
    res.status(500).send({
      error: error.message
    });
  }
};

module.exports.manageSuperAdminAccount = async (req, res) => {
  try{
    const superAdminInfo = {
      name: req.body.name,
      email: req.body.email,
      PhoneNumber: req.body.PhoneNumber,
      username: req.body.username,
      password: req.body.password
    };
    const status = await userAccService.editSuperAdminAccount(superAdminInfo);
    return status;
  }catch (error) {
    res.status(500).send({
      error: error.message
    });
  }
};

module.exports.manageLabManagerAccount = async (req, res) => {
  try{
    const labManagerInfo = {
      name: req.body.name,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      username: req.body.username,
      password: req.body.password,
      hospital: req.body.hospital,
    };
    const status = await userAccService.ediLabManagerAccount(labManagerInfo);
    return status;
  }catch (error) {
    res.status(500).send({
      error: error.message
    });
  }
};

module.exports.manageSuperAdminAccount = async (req, res) => {
  try{
    const labAdminInfo = {
      name: req.body.name,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      username: req.body.username,
      password: req.body.password,
      hospital: req.body.hospital,
    };
    const status = await userAccService.editLabAdminAccount(labAdminInfo);
    return status;
  }catch (error) {
    res.status(500).send({
      error: error.message
    });
  }
};