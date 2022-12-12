const userAccService = require('../services/UserAccount');

module.exports.postUser = async (req, res) => {
  try {
    const accInfo = {
      username: req.body.username,
      password: req.body.password,
      name: req.body.name,
      email: req.body.email,
      hospital: req.body.hospital,
      phoneNumber: req.body.phoneNumber,
      role: req.body.role
    };

    if (accInfo.role == "Super Admin") {
      await userAccService.createSuperAdminAccount(accInfo);
    }
    else if (accInfo.role == "Doctor") {
      await userAccService.createDoctorAccount(accInfo);
    }
    else if (accInfo.role == "Donor") {
      await userAccService.createDonorAccount(accInfo);
    }
    res.send({
      message: "User registered successfully."
    });

  } catch (error) {
    res.status(500).send({
      error: error.message
    });
  }
};

module.exports.postLogin = async (req, res) => {
  const { role, username, password } = req.body;
  try {
    var acc = null;
    if (role == "Super Admin") {
      acc = await userAccService.chkSuperAdminCreds(username, password);
    } else if (role == "Lab Manager") {
      acc = await userAccService.chkLabManagerCreds(username, password);
    } else if (role == "Lab Admin") {
      acc = await userAccService.chkLabAdminCreds(username, password);
    } else if (role == "Doctor") {
      // acc = await userAccService.chkDoctorCreds(username, password);
      acc = null;
    } else if (role == "Donor") {
      // acc = await userAccService.chkDonorCreds(username ,password);
      acc = null;
    }

    if (acc == null) {
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
      hospitalId: acc.hospitalId,
      message: 'Logged in successfully.'
    });

  } catch (err) {
    res.status(500).send({
      error: err.message
    });
  }
};

module.exports.manageSuperAdminAccount = async (req, res) => {
  try {
    const id = req.params.superId;
    const superAdminInfo = {
      name: req.body.name,
      email: req.body.email,
      PhoneNumber: req.body.PhoneNumber,
      username: req.body.username,
      password: req.body.password
    };
    const status = await userAccService.editSuperAdminAccount(id, superAdminInfo);
    res.send(status);
  }catch (error) {
    res.status(500).send({
      error: error.message
    });
  }
};

module.exports.manageLabManagerAccount = async (req, res) => {
  try {
    const id = req.params.labmanagerId;
    const labManagerInfo = {
      name: req.body.name,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      username: req.body.username,
      password: req.body.password
    };
    const status = await userAccService.ediLabManagerAccount(id, labManagerInfo);
    res.send(status);
  }catch (error) {
    res.status(500).send({
      error: error.message
    });
  }
};

module.exports.manageLabAdmin = async (req, res) => {
  try {
    const id = req.params.labAdminId;
    const labAdminInfo = {
      name: req.body.name,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      username: req.body.username,
      password: req.body.password
    };
    const status = await userAccService.editLabAdminAccount(id, labAdminInfo);
    res.send(status);
  }catch (error) {
    res.status(500).send({
      error: error.message
    });
  }
};
module.exports.postLabAdmin = async (req,res) =>
{
    const LabAdminInfo = 
    {
      name:  req.body.name,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      username: req.body.username,
      password: req.body.password,
      hospitalId: req.body.hospitalId
    };
    try
    {
        
        const addedLabAdmin = await userAccService.createLabAdminAccount(LabAdminInfo);

        res.status(201).send({
            msg: 'Lab Admin created for your hospital successfully'
            
        });
    }
    catch(err)
    {
        res.status(500);
        res.send({
            error: err.message
        });
    }
    
};
module.exports.postSuperAdmin = async (req,res) =>
{
    const SuperAdminInfo = 
    {
      name:  req.body.name,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      username: req.body.username,
      password: req.body.password
    };
    try
    {
        
        const addedLabAdmin = await userAccService.createSuperAdminAccount(SuperAdminInfo);

        res.status(201).send({
            msg: 'Super Admin created for your hospital successfully'
            
        });
    }
    catch(err)
    {
        res.status(500);
        res.send({
            error: err.message
        });
    }
    
};