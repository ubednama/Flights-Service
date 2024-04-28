const { StatusCodes } = require("http-status-codes");
const CityRepository = require("../repositories/city.respository");
const AppError = require("../utils/errors/app.error");

const cityRepository = new CityRepository();

async function createCity(data) {
    try {
        const response = await cityRepository.create(data)
        return response
    } catch (error) {
        if(error.name == 'SequelizeValidationError' || error.name == 'SequelzeUniqueConstraintError') {
            let desc = [];
            error.errors.forEach((err) => {
                desc.push(err.message);
            })
            throw new AppError(desc, StatusCodes.BAD_REQUEST)
        }
        throw new AppError("Failed to add new City", StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function getCities() {

}

async function updateCity(id, data) {
    try {
        const response = await cityRepository.update(id, data)
        console.log(response)
        return response;
    } catch (error) {
        console.log(error)
        if(error.statusCode == StatusCodes.NOT_FOUND) throw new AppError("The requested record doesnt exists", StatusCodes.NOT_FOUND)
        throw new AppError("Cannot update data of Airplane", StatusCodes.INTERNAL_SERVER_ERROR) 
    }
}

async function deleteCity(data) {
    try {
        const response = await cityRepository.destroy(data)
        return response
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) throw new AppError("The requested record doesnt exists", StatusCodes.NOT_FOUND)
        throw new AppError("Cannot delete data of City", StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

module.exports ={
    createCity,
    updateCity,
    deleteCity
}