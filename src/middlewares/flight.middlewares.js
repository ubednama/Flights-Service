const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app.error");
const { compareTime } = require("../utils/helpers/datetime.helper");

function validateCreateRequest(req, res, next) {
    let {flightNumber, airplaneId, departureAirportId, arrivalAirportId, departureTime, arrivalTime, price, boardingGate, totalAvailableSeats} = req.body
    
    const missingFields = [];

    if(!flightNumber) {
        missingFields.push( "Flight Number is not defined")
    }
    if(!airplaneId) {
        missingFields.push( "Airplane Id is not defined")
    }
    if(!departureAirportId) {
        missingFields.push( "Departure Airport Id is not defined")
    }
    if(!arrivalAirportId) {
        missingFields.push( "Arrival Airport Id is not defined")
    }
    if(!departureTime) {
        missingFields.push( "Departure Time is not defined")
    }
    if(!arrivalTime) {
        missingFields.push( "Arrival Time is not defined")
    }
    if(!price || Number(price) <= 0) {
        missingFields.push( "Price is not defined")
    }
    if(!boardingGate) {
        missingFields.push("Boarding Gate is not defined")
    }
    if(!totalAvailableSeats || Number(totalAvailableSeats) === 0) {
        missingFields.push( "Total Seats is not defined")
    }

    if (missingFields.length > 0) {
        ErrorResponse.message = "Error while creating Flight"
        ErrorResponse.error = new AppError(missingFields, StatusCodes.BAD_REQUEST)
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    if (!compareTime(arrivalTime, departureTime, '23:59', '02:00')) {
        ErrorResponse.message = "Inappropriate time"

        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    next()
}

function validateUpdateSeatRequest(req, res, next) {

    if(!req.body.seats) {
        ErrorResponse.message = "No update date provided";
        ErrorResponse.error = new AppError('Seat details not found', StatusCodes.BAD_REQUEST)
        return res 
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse)
    }
    next();
}

module.exports = {
    validateCreateRequest,
    validateUpdateSeatRequest
}