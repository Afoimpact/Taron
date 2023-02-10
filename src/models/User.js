const model = require('mongoose');

// (company name, frist name, last name, email, password)

// user schema
const UserSchema = new model.Schema(
  {
    companyName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    // confirmPassword: {
    //   type: String,
    //   required: true,
    // },
    suspended: {
      type: Boolean,
      default: false,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    // country: {
    //   type: String,
    // },
    // state: {
    //   type: String,
    // },
    // geoLocation: {
    //   type: String,
    // },
    // currency: {
    //   type: String,
    // },
    // street: {
    //   type: String,
    // },
    profileUlr: {
      type: String,
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  }
);

// create and export user model
const UserModel = model.model('User', UserSchema);
module.exports = UserModel