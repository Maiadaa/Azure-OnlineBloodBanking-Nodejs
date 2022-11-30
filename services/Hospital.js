const { ObjectId } = require('mongoose').Types;

const hospitalModel = require('../models/HospitalSchema');

module.exports.getAllHospitals = async () => {
  try {
    const hospitals = await hospitalModel.find();
    return hospitals;
  } catch (err) {
    throw new Error('Could not retrieve hospitals.');
  }
};