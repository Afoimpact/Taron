// import { IUser } from '../models/User';

class Dtos {
  static userDTO = (data) => {
    let user = data.toJSON();
    delete user.password;
    return {
      ...user,
    };
  };
}

module.exports = {Dtos}