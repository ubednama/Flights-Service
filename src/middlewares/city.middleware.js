const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app.error");

function validateCreateRequest(req, res, next) {
    if(!req.body.name || !req.body.state) {
        ErrorResponse.message = 'Something went wrong while creating city';
        ErrorResponse.error = new AppError(['City & state name cannot be empty'], StatusCodes.BAD_REQUEST)
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }
    next();
}

function validateUpdateRequest(req, res, next) {
    if(!req.body.name && !req.body.state) {
        ErrorResponse.message = 'No update date provided';
        ErrorResponse.error = new AppError(['Provide fields to update value'], StatusCodes.BAD_REQUEST)
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse)
    }
    next();
}

module.exports = {
    validateCreateRequest,
    validateUpdateRequest
}