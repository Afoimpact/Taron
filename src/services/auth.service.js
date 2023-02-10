const httpStatus = require('http-status');
// const { v4 } = require('uuid');
const bcrypt = require('bcryptjs');
const Helpers = require('../utils/helper.service');
const { generateToken } = require('../utils/tokenManagement');
const { abortIf } = require('../utils/responder');
const { generate_random_password, hash } = require('../utils/passwordHash');
// import path from 'path';
const { paginate, paginateOptions } = require('../utils/paginate');
const UserRepo = require('../dbservices/user.table');
const moment = require('moment');
const OtpRepo = require('../dbservices/otp.table');
const {Dtos} = require('../Dto/user.dto');
const {EmailUtils} = require('../utils/emailUtils');
const NotificationService = require('./Thirdparty/notification.service');

// @Service()
class AuthService {
  /**
   *
   */
  static register = async (data) => {
    const user = await UserRepo.find({ email: data.email });
    abortIf(user, httpStatus.BAD_REQUEST, 'Email already Exists');
    abortIf(
      data.password !== data.confirmPassword,
      httpStatus.BAD_REQUEST,
      'Passwords do not match'
    );
    data.password = data.password.trim();
    abortIf(
      !Helpers.isPasswordStrong(data.password),
      httpStatus.BAD_REQUEST,
      'Password is not strong enough'
    );
    const hashed_password = await hash(data.password);
    //create provider
    const find_otp = await OtpRepo.find({
      email: data.email,
      otp: data.otp,
    });
    abortIf(!find_otp, httpStatus.BAD_REQUEST, 'This OTP does not exist');
    const _data = {
      email: data.email.toLowerCase().trim(),
      password: hashed_password,
      DOB: data.DOB,
      active: true,
      interests: data.interests,
      suspended: false,
      firstName: data.firstName,
      lastName: data.lastName,
      companyName: data.companyName,
      //userName: Helpers.slugifyName(data.fullName),
      geoLocation: data.geoLocation,
      country: data.country,
      currency: data.currency,
      profileUlr: data.profileUlr,
      state: data.state,
      street: data.street,
    };
    const create = await UserRepo.createUser(_data);
    await EmailUtils.sendTemplateEmail({
      email: data.email.toLowerCase().trim(),
      template: 'WelcomeEmail',
      template_data: '{ "otp":"' +data.email+ '"}'
    });
    const userDto = Dtos.userDTO(create);
    const token = await generateToken(userDto);
    return { ...userDto, token };
  };

  static requestOtp = async (data) => {
    //generate otp
    const otp = Helpers.generateRandom(4, 'numeric');
    //store otp on DB
    const create_otp = await OtpRepo.create({
      otp,
      email: data.email.toLowerCase().trim(),
    });
    //send otp via email
    // await NotificationService.sendEmail({
    //   template: 'otp',
    //   email: data.email.toLowerCase().trim(),
    //   otp,
    // });
    await EmailUtils.sendTemplateEmail({
      email: data.email.toLowerCase().trim(),
      template: 'Otp',
      template_data: '{ "otp":"' + otp + '"}'
    });
    return {};
  };

  static forgotPasswordOtp = async (data) => {
    //generate otp
    const otp = Helpers.generateRandom(4, 'numeric');
    //store otp on DB
    const create_otp = await OtpRepo.create({
      otp,
      email: data.email.toLowerCase().trim(),
    });
    //send otp via email
    await EmailUtils.sendTemplateEmail({
      email: data.email.toLowerCase().trim(),
      template: 'Password-Reset',
      template_data: '{ "otp":"' + otp + '"}'
    });
    return {};
  };

  static test = async () => {
    return {};
  };

  static resetPassword = async (data) => {
    const { password, confirmPassword, otp, email } = data;
    abortIf(
      password !== confirmPassword,
      httpStatus.BAD_REQUEST,
      'Passwords do not match'
    );
    const find_otp = await OtpRepo.find({
      email,
      otp,
    });
    abortIf(!find_otp, httpStatus.BAD_REQUEST, 'Invalid OTP');
    const user = await UserRepo.find({ email });
    abortIf(!user, httpStatus.BAD_REQUEST, 'User does not exist');
    const update = await UserRepo.update({ email }, { password: await hash(data.password) });
    return update;
  };

  static verifyAuthOtp = async (data) => {
    const find_otp = OtpRepo.find({ email: data.email, otp: data.otp });
    abortIf(!find_otp, httpStatus.BAD_REQUEST, 'This OTP does not exist');
  };

  static login = async (data) => {
    let { email, password } = data;
    email = email.trim().toLowerCase();
    password = password.trim();
    let user = await UserRepo.find({ email });
    abortIf(!user, httpStatus.BAD_REQUEST, 'Invalid Credentials');
    const password_check = await bcrypt.compare(password, user.password);
    abortIf(!password_check, httpStatus.BAD_REQUEST, 'Invalid Credentials');
    const userDto = Dtos.userDTO(user);
    const token = await generateToken(userDto);
    /**
     *  ==> Call Notification Service <==
     */
    
    return { ...userDto, token };
  };
}

module.exports = {AuthService}