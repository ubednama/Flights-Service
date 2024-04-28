const { StatusCodes } = require("http-status-codes")

const { AirplaneService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");



/*
    POST: /airplanes
    req-body {modelNumber: 'airbus320', capacity: 200}
*/
async function createAirplane(req, res) {
    try {
        const airplane = await AirplaneService.createAirplane({
            modelNumber: req.body.modelNumber,
            capacity: req.body.capacity
        })
        SuccessResponse.message = "Successfully created an Airplane",
        SuccessResponse.data = airplane
        return res
            .status(StatusCodes.CREATED)
            .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.message = "Failed to create an Airplane"
        ErrorResponse.error = error
        return res
            .status(error.statusCode)
            .json(ErrorResponse)
    }
}


/*
    GET: /airplanes
    req-params {}
*/
async function getAirplanes(req, res) {
    try {
        const airplanes = await AirplaneService.getAirplanes();
         SuccessResponse.data = airplanes;
         return res
            .status(StatusCodes.OK)
            .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res
            .status(error.statusCode)
            .json(ErrorResponse)
    }
}

/*
    POST: /airplanes/:id
    req-params {id}
*/
async function getAirplane(req, res) {
    try {
        const airplane = await AirplaneService.getAirplane(req.params.id);
        SuccessResponse.data = airplane;
        return res
            .status(StatusCodes.OK)
            .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res
            .status(error.statusCode)
            .json(ErrorResponse)
    }
}

async function deleteAirplane(req, res) {
    try {
        const response = await AirplaneService.deleteAirplane(req.params.id);
        SuccessResponse.data = response
        return res
            .status(StatusCodes.OK)
            .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error;
        return res
            .status(error.statusCode)
            .json(ErrorResponse)
    }
}

async function updateAirplane(req, res) {
    try {
        let updateFields = {};
        let {modelNumber, capacity} = req.body;

        if (modelNumber !== undefined) {
            updateFields.modelNumber = modelNumber;
        }
        if (capacity !== undefined) {
            updateFields.capacity = capacity;
        }
        
        const response = await AirplaneService.updateAirplane(req.params.id, updateFields)
        SuccessResponse.data = response
        SuccessResponse.message = "Airplane Data updated Successfully"
        return res
            .status(StatusCodes.OK)
            .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error =error
        return res
            .status(error.statusCode)
            .json(ErrorResponse)
    }
}

module.exports = {
    createAirplane,
    getAirplanes,
    getAirplane,
    deleteAirplane,
    updateAirplane
}