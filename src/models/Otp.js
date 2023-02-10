const model = require('mongoose');

// (first_name, last_name, email, phone)


// user schema
const OtpSchema = new model.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
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
const OtpModel = model.model('Otp', OtpSchema);
module.exports = OtpModel