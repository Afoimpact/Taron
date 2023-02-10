  // const catchAsync = require('../utils/catchAsync');
const { catchAsync } = require('../utils/catchAsync');
const {AuthService} = require('../services/auth.service');
const {
  successResponse,
  abortIf,
  errorResponse,
  download,
  downloadFile,
} = require('../utils/responder');
// import httpStatus from 'http-status';
// import { Service } from 'typedi';
// import { paginateOptions } from '../utils/paginate';
// import console from 'console';

// @Service()
class AuthController {
  /**
   *
   */
  // constructor(private readonly authService: AuthService) {}
  static loginController = catchAsync(
    async (req, res, next) => {
      const _create = await AuthService.login(req.body);
      return successResponse(req, res, _create);
    }
  );

  static registerController = catchAsync(
    async (req, res, next) => {
      const _update = await AuthService.register(req.body);
      return successResponse(req, res, _update);
    }
  );

  static requestOtpController = catchAsync(
    async (req, res, next) => {
      const _update = await AuthService.requestOtp(req.body);
      return successResponse(req, res, _update);
    }
  );

  static resetPasswordOtpController = catchAsync(
    async (req, res, next) => {
      const _update = await AuthService.forgotPasswordOtp(req.body);
      return successResponse(req, res, _update);
    }
  );

  static resetPasswordController = catchAsync(
    async (req, res, next) => {
      const _update = await AuthService.resetPassword(req.body);
      return successResponse(req, res, _update);
    }
  );

  static test = catchAsync(async (req, res, next) => {
    const _update = await AuthService.test();
    return successResponse(req, res, _update);
  });
}

module.exports = {AuthController}