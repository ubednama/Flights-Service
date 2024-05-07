const { StatusCodes } = require("http-status-codes")

const { FlightService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");



/*
    POST: /flights
    req-body {modelNumber: 'airbus320', capacity: 200}
*/
async function createFlight(req, res) {
    console.log("flight controller")
    let {flightNumber,airplaneId,departureAirportId,arrivalAirportId,departureTime,arrivalTime,price,boardingGate,totalSeats} = req.body

    try {
        const flight = await FlightService.createFlight({
            flightNumber: flightNumber,
            airplaneId: airplaneId,
            departureAirportId: departureAirportId,
            arrivalAirportId: arrivalAirportId,
            departureTime: departureTime,
            arrivalTime: arrivalTime,
            price: price,
            boardingGate: boardingGate,
            totalSeats: totalSeats,
        })
        SuccessResponse.message = "Successfully created an Flight",
        SuccessResponse.data = flight
        return res
            .status(StatusCodes.CREATED)
            .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.message = "Failed to create an Flight"
        ErrorResponse.error = error
        return res
            .status(error.statusCode)
            .json(ErrorResponse)
    }
}


/*
    GET: /flights
    req-params {}
*/
async function getAllFlights(req, res) {
    // console.log("controller ",req.query)
    try {
        const flights = await FlightService.getAllFlights(req.query);
         SuccessResponse.data = flights;
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
    POST: /flights/:id
    req-params {id}
*/
async function getFlight(req, res) {
    try {
        const flight = await FlightService.getFlight(req.params.id);
        SuccessResponse.data = flight;
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

//fix this for flight
async function deleteFlight(req, res) {
    try {
        const response = await FlightService.deleteFlight(req.params.id);
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



async function updateFlight(req, res) {
    try {
        let updateFields = {};
        let {modelNumber, capacity} = req.body;

        if (modelNumber !== undefined) {
            updateFields.modelNumber = modelNumber;
        }
        if (capacity !== undefined) {
            updateFields.capacity = capacity;
        }
        
        const response = await FlightService.updateFlight(req.params.id, updateFields)
        SuccessResponse.data = response
        SuccessResponse.message = "Flight Data updated Successfully"
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
    createFlight,
    getAllFlights,
    getFlight,
    // deleteFlight,
    // updateFlight
}