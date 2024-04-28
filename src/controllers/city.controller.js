const { StatusCodes } = require("http-status-codes");
const { CityService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");


/*
POST: /cities
req.body {name: "xyz"} */
async function createCity(req, res) {
    try {
        const city = await CityService.createCity({name: req.body.name, state:req.body.state})
        SuccessResponse.message = "New City Added";
        SuccessResponse.data = city;
        return res
            .status(StatusCodes.CREATED)
            .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.message = "Failed to add new City";
        ErrorResponse.error = error;
        return res
            .status(error.statusCode)
            .json(ErrorResponse)
    }
}

async function updateCity(req, res) {
    try {
        const {name, state} = req.body
        let updateFields = [];
        
        if(name !== undefined) {
            updateFields.name = name
        }
        if(state !== undefined) {
            updateFields.state = state
        }

        const response = await CityService.updateCity(req.params.id, updateFields)
        SuccessResponse.data = response;
        SuccessResponse.message = "City updated successfully"
        return res
            .status(StatusCodes.OK)
            .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error
        return res
            .status(error.statusCode)
            .json(ErrorResponse)
    }
}

async function deleteCity(req, res) {
    try {
        const response = await CityService.deleteCity(req.params.id)
        SuccessResponse.data = response
        SuccessResponse.message = "City deleted Successfully"
        return res
            .status(StatusCodes.OK)
            .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error
        return res
            .status(error.statusCode)
            .json(ErrorResponse)
    }
}

module.exports = {
    createCity,
    updateCity,
    deleteCity
}