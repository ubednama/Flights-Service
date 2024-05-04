const { StatusCodes } = require("http-status-codes");
const { AirplaneRepository } = require("../repositories");
const AppError = require("../utils/errors/app.error");

const airplaneRepository = new AirplaneRepository();

async function createAirplane(data) {
    try {
        const airplane = await airplaneRepository.create(data);
        return airplane;
    } catch (error) {
        if(error.name == 'SequelizeValidationError') {
            let desc = [];
            console.log("15", error.errors)
            error.errors.forEach((err) => {
                desc.push(err.message)
            })
            throw new AppError(desc, StatusCodes.BAD_REQUEST)
        }
        throw AppError('Failed to create a new Airplane object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAllAirplanes() {
    try {
        const airplanes = await airplaneRepository.getAll();
        return airplanes;
    } catch (error) {
        throw new AppError('Cannot fetch data of all the airplanes', StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function getAirplane(data) {
    try {
        const airplane = await airplaneRepository.get(data);
        return airplane;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError("The requested record doesnt exists", error.statusCode)
        }
        throw new AppError("Cannot fetch data of given airplane", StatusCodes.INTERNAL_SERVER_ERROR)
    }
}


async function deleteAirplane(data) {
    try {
        const response = await airplaneRepository.destroy(data)
        return response;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) throw new AppError("The requested record doesnt exists", StatusCodes.NOT_FOUND)
        throw new AppError("Cannot delete data of Airplane", StatusCodes.INTERNAL_SERVER_ERROR)
    }
}


async function updateAirplane(id, data) {
    try {
        const response = await airplaneRepository.update(id, data)
        return response
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) throw new AppError("The requested record doesnt exists", StatusCodes.NOT_FOUND)
        throw new AppError("Cannot update data of Airplane", StatusCodes.INTERNAL_SERVER_ERROR)     
    }
}

module.exports = {
    createAirplane,
    getAllAirplanes,
    getAirplane,
    deleteAirplane,
    updateAirplane
};