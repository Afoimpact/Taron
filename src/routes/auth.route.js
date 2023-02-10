// import 'reflect-metadata';
const express = require('express');
// const { signUpValidate } = require("../validations/user.validations");
const {AuthController} = require('../controller/auth.controller');
// import { Container } from 'typedi';
const {
  createUser,
  login,
  requestSignUpOtp,
} = require('../validations/all.validation');
const { validateReq } = require('../middleware/validate');

const router = express.Router();

// const controller = Container.get(authController);

router.post('/login', validateReq(login), AuthController.loginController);

router.post('/signup', AuthController.registerController);

router.post(
  '/request-signup-otp',
  validateReq(requestSignUpOtp),
  AuthController.requestOtpController
);

router.post('/reset-password-otp', AuthController.resetPasswordOtpController);

router.post('/reset-password', AuthController.resetPasswordController);

router.get('/test', AuthController.test);

module.exports = router
// ts-node-dev --respawn --pretty --transpile-only
