const { ObjectId } = require('mongoose').Types;

const hospitalModel = require('../models/hospital');

module.exports.findAllHospitals = async () => {
  try {
    const hospitals = await hospitalModel.find();
    return hospitals;
  } catch (err) {
    throw new Error('Could not retrieve hospitals.');
  }
};