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

module.exports = {
    createAirplane
};