  // const catchAsync = require('../utils/catchAsync');
  const { catchAsync } = require('../utils/catchAsync');
  const {CustomerService} = require('../services/customer.service');
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
  class CustomerController {
    /**
     *
     */
    // constructor(private readonly authService: AuthService) {}
    static addInterestController = catchAsync(
      async (req, res, next) => {
        const _create = await CustomerService.addInterest(req.body, req.auth);
        return successResponse(req, res, _create);
      }
    );

    static updateInterestController = catchAsync(
      async (req, res, next) => {
        const _create = await CustomerService.updateInterest(req.body, req.auth);
        return successResponse(req, res, _create);
      }
    );

    static deleteInterestController = catchAsync(
      async (req, res, next) => {
        const _create = await CustomerService.deleteInterest(req.query.interests, req.auth);
        return successResponse(req, res, _create);
      }
    );
  }
  
  module.exports = {CustomerController}