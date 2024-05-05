const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app.error");
const { compareTime } = require("../utils/helpers/datetime.helper");

function validateCreateRequest(req, res, next) {
    let {flightNumber, airplaneId, departureAirportId, arrivalAirportId, departureTime, arrivalTime, price, boardingGate, totalSeats} = req.body
    
    const missingFields = [];

    console.log(airplaneId)

    if(!flightNumber) {
        ErrorResponse.error = new AppError([ "Flight Number is not defined" ], StatusCodes.BAD_REQUEST)
    }
    if(!airplaneId) {
        ErrorResponse.error = new AppError([ "Airplane Id is not defined" ], StatusCodes.BAD_REQUEST)
    }
    if(!departureAirportId) {
        ErrorResponse.error = new AppError([ "Departure Airport Id is not defined" ], StatusCodes.BAD_REQUEST)
    }
    if(!arrivalAirportId) {
        ErrorResponse.error = new AppError([ "Arrival Airport Id is not defined" ], StatusCodes.BAD_REQUEST)
    }
    if(!departureTime) {
        ErrorResponse.error = new AppError([ "Departure Time is not defined" ], StatusCodes.BAD_REQUEST)
    }
    if(!arrivalTime) {
        ErrorResponse.error = new AppError([ "Arrival Time is not defined" ], StatusCodes.BAD_REQUEST)
    }
    if(!price) {
        ErrorResponse.error = new AppError([ "Price is not defined" ], StatusCodes.BAD_REQUEST)
    }
    if(!boardingGate) {
        ErrorResponse.error = new AppError([ "Boarding Gate is not defined" ], StatusCodes.BAD_REQUEST)
    }
    if(!totalSeats) {
        ErrorResponse.error = new AppError([ "Total Seats is not defined" ], StatusCodes.BAD_REQUEST)
    }

    if (missingFields.length > 0) {
        ErrorResponse.message = "Error while creating Flight"

        // , StatusCodes.BAD_REQUEST, missingFields);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    if (!compareTime(arrivalTime, departureTime, '23:59', '02:00')) {
        ErrorResponse.message = "Inappropriate time"
        // , StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    // return res 
    //     .status(StatusCodes.BAD_REQUEST)
    //     .json(ErrorResponse);
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