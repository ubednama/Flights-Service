const { StatusCodes } = require("http-status-codes");
const { FlightRepository } = require("../repositories");
const AppError = require("../utils/errors/app.error");

const flightRepository = new FlightRepository();

async function createFlight(data) {
    console.log("flight service")
    try {
        const flight = await flightRepository.create(data);
        return flight;
    } catch (error) {
        if(error.name == 'SequelizeValidationError') {
            let desc = [];
            console.log("15", error.errors)
            error.errors.forEach((err) => {
                desc.push(err.message)
            })
            throw new AppError(desc, StatusCodes.BAD_REQUEST)
        }
        throw AppError('Failed to create a new Flight object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAllFlights() {
    try {
        const flights = await flightRepository.getAll();
        return flights;
    } catch (error) {
        throw new AppError('Cannot fetch data of all the Flights', StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function getFlight(data) {
    try {
        const flight = await flightRepository.get(data);
        return flight;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError("The requested record doesnt exists", error.statusCode)
        }
        throw new AppError("Cannot fetch data of given Flight", StatusCodes.INTERNAL_SERVER_ERROR)
    }
}


async function deleteFlight(data) {
    try {
        const response = await flightRepository.destroy(data)
        return response;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) throw new AppError("The requested record doesnt exists", StatusCodes.NOT_FOUND)
        throw new AppError("Cannot delete data of Flight", StatusCodes.INTERNAL_SERVER_ERROR)
    }
}


async function updateFlight(id, data) {
    try {
        const response = await flightRepository.update(id, data)
        return response
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) throw new AppError("The requested record doesnt exists", StatusCodes.NOT_FOUND)
        throw new AppError("Cannot update data of Flight", StatusCodes.INTERNAL_SERVER_ERROR)     
    }
}

module.exports = {
    createFlight,
    getAllFlights,
    getFlight
    // deleteFlight,
    // updateFlight
};