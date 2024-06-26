const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app.error");

function validateCreateRequest(req, res, next) {
    if(!req.body.modelNumber) {
        ErrorResponse.message = 'Error while creating airplane';
        
        ErrorResponse.error = new AppError([ "Model Number is not defined" ], StatusCodes.BAD_REQUEST)
        return res 
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }
    next()
}

function validateUpdateRequest(req, res, next) {
    if(!req.body.modelNumber && !req.body.capacity) {
        ErrorResponse.message = "No update date provided";

        ErrorResponse.error = new AppError(["No fields to update"], StatusCodes.BAD_REQUEST)
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