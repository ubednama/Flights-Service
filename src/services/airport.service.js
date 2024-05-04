const { StatusCodes } = require("http-status-codes");
const { AirportRepository } = require("../repositories");
const AppError = require("../utils/errors/app.error");

const airportRepository = new AirportRepository();

async function createAirport(data) {
    try {
        const airport = await airportRepository.create(data);
        return airport;
    } catch (error) {
        if(error.name == 'SequelizeValidationError') {
            let desc = [];
            console.log("15", error.errors)
            error.errors.forEach((err) => {
                desc.push(err.message)
            })
            throw new AppError(desc, StatusCodes.BAD_REQUEST)
        }
        throw AppError('Failed to create a new Airport object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAllAirports() {
    try {
        const airports = await airportRepository.getAll();
        return airports;
    } catch (error) {
        throw new AppError('Cannot fetch data of all the Airports', StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function getAirport(data) {
    try {
        const airport = await airportRepository.get(data);
        return airport;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError("The requested record doesnt exists", error.statusCode)
        }
        throw new AppError("Cannot fetch data of given Airport", StatusCodes.INTERNAL_SERVER_ERROR)
    }
}


async function deleteAirport(data) {
    try {
        const response = await airportRepository.destroy(data)
        return response;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) throw new AppError("The requested record doesnt exists", StatusCodes.NOT_FOUND)
        throw new AppError("Cannot delete data of Airport", StatusCodes.INTERNAL_SERVER_ERROR)
    }
}


async function updateAirport(id, data) {
    try {
        const response = await airportRepository.update(id, data)
        return response
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) throw new AppError("The requested record doesnt exists", StatusCodes.NOT_FOUND)
        throw new AppError("Cannot update data of Airport", StatusCodes.INTERNAL_SERVER_ERROR)     
    }
}

module.exports = {
    createAirport,
    getAllAirports,
    getAirport,
    deleteAirport,
    updateAirport
};