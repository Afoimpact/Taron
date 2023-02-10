const express = require('express');
const {CustomerController} = require('../controller/customer.controller');
const {verify} = require('../middleware/verifyToken')
// const {
//   createUser,
//   login,
//   requestSignUpOtp,
// } = require('../validations/all.validation');
// const { validateReq } = require('../middleware/validate');

const router = express.Router();

router.use(verify)

router.put('/add-interest', CustomerController.addInterestController);

router.delete('/delete-interest', CustomerController.deleteInterestController);

router.put('/update-interest', CustomerController.updateInterestController);

module.exports = router
