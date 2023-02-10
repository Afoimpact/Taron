// import { Service } from 'typedi';
const OtpModel = require('../models/Otp');
// @Service()
class OtpRepo {
  static create = async (data) => {
    const new_otp = await new OtpModel(data).save();
    return new_otp;
  };

  static find = async (condition) => {
    const otp = await OtpModel.findOne(condition);
    return otp;
  };

  static update = async (condition, changes) => {
    const update = await OtpModel.findOneAndUpdate(condition, changes, {
      returnDocument: 'after',
    });
    return update;
  };
}
//550038

module.exports = OtpRepo

