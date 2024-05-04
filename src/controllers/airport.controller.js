const { StatusCodes } = require("http-status-codes")

const { AirportService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");



/*
    POST: /airports
    req-body {modelNumber: 'airbus320', capacity: 200}
*/
async function createAirport(req, res) {
    try {
        const airport = await AirportService.createAirport({
            name: req.body.name,
            code: req.body.code,
            address: req.body.address,
            cityId: req.body.cityId
        })
        SuccessResponse.message = "Successfully created an Airport",
        SuccessResponse.data = airport
        return res
            .status(StatusCodes.CREATED)
            .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.message = "Failed to create an Airport"
        ErrorResponse.error = error
        return res
            .status(error.statusCode)
            .json(ErrorResponse)
    }
}


/*
    GET: /airports
    req-params {}
*/
async function getAllAirports(req, res) {
    try {
        const airports = await AirportService.getAllAirports();
         SuccessResponse.data = airports;
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
    POST: /airports/:id
    req-params {id}
*/
async function getAirport(req, res) {
    try {
        const airport = await AirportService.getAirport(req.params.id);
        SuccessResponse.data = airport;
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

async function deleteAirport(req, res) {
    try {
        const response = await AirportService.deleteAirport(req.params.id);
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


// fix update in airport
async function updateAirport(req, res) {
    try {
        let updateFields = {};
        let {modelNumber, capacity} = req.body;

        if (modelNumber !== undefined) {
            updateFields.modelNumber = modelNumber;
        }
        if (capacity !== undefined) {
            updateFields.capacity = capacity;
        }
        
        const response = await AirportService.updateAirport(req.params.id, updateFields)
        SuccessResponse.data = response
        SuccessResponse.message = "Airport Data updated Successfully"
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
    createAirport,
    getAllAirports,
    getAirport,
    deleteAirport,
    updateAirport
}