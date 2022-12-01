const hospitalsService = require('../services/hospitals');

module.exports.getHospitals = async (req, res) => {
  try {
    const hospitals = await hospitalsService.getAllHospitals;
    return res.send({ hospitals });
  } catch (err) {
    // this denotes a server error, therefore status code should be 500.
    res.status(500);
    return res.send({
      error: err.message
    });
  }
};