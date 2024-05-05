const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app.error");

function validateCreateRequest(req, res, next) {
    if(!req.body.name || !req.body.code || !req.body.cityId) {
        ErrorResponse.message = 'Error while creating airplane';
        
        if(!req.body.name) {
            ErrorResponse.error = new AppError([ "Name is not defined" ], StatusCodes.BAD_REQUEST)
        }
        if(!req.body.code) {
            ErrorResponse.error = new AppError([ "Airport Code is not defined" ], StatusCodes.BAD_REQUEST)
        }
        if(!req.body.cityId) {
            ErrorResponse.error = new AppError([ "City ID is not defined" ], StatusCodes.BAD_REQUEST)
        }
        return res 
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }
    next()
}



//fix tihs
function validateUpdateRequest(req, res, next) {
    if(!req.body.name && !req.body.code && !req.body.cityId) {
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