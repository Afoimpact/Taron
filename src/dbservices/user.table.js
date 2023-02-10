// import { Service } from 'typedi';
// import { ISignup } from '../interfaces';
const UserModel = require('../models/User');
// @Service()
class UserRepo {
  static createUser = async (data) => {
    const new_user = await new UserModel(data).save();
    return new_user;
  };

  static find = async (condition) => {
    const user = await UserModel.findOne(condition);
    return user;
  };

  static findUserByEmail = async (email) => {
    const user = await UserModel.findOne({ email });
    return user;
  };

  static findUserbyId = async (id) => {
    const user = await UserModel.findById(id);
    return user;
  };

  static update = async (
    condition,
    changes
  ) => {
    const update = await UserModel.findOneAndUpdate(condition, changes, {
      returnDocument: 'after',
    });
    return update;
  };
}

module.exports = UserRepo

//550038
