const { StatusCodes } = require("http-status-codes");
const { FlightRepository } = require("../repositories");
const AppError = require("../utils/errors/app.error");
const { Op } = require("sequelize");
const { getCurrentTime, getCurrentDate } = require("../utils/helpers/currentDateTime.helper");

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

async function getAllFlights(query) {
    
    let {trips, price, travellers, tripDate, sort} = query
    
    console.log(query)
    
    let customFilter = {}
    let sortFilter = []

    let dayStart = getCurrentTime();
    let dayEnd = " 23:59:00";
    let currentDate = getCurrentDate();

    if(trips) {
        [departureAirportId, arrivalAirportId] = trips.split("-")
        customFilter.departureAirportId = departureAirportId;
        customFilter.arrivalAirportId = arrivalAirportId;

        //ToDo: add checks that they are not same
    }
    
    if(price) {
        [minPrice, maxPrice] = price.split('-')
        customFilter.price = {
            [Op.between]: [((minPrice === undefined) ? 1000:minPrice), ((maxPrice == undefined) ? 20000:maxPrice)]
        }
    }

    if(travellers) {
        customFilter.totalSeats = {
            [Op.gte]: travellers
        }
    }

    if(tripDate) {
        // console.log(tripDate, dayStart, dayEnd)
        let checkDate = (tripDate < currentDate) ? currentDate : tripDate
        customFilter.departureTime = {
            [Op.between]: [ checkDate + dayStart, checkDate + dayEnd]
        }
    } else {
        customFilter.departureTime = {
            [Op.between]: [currentDate + dayStart, currentDate + dayEnd]
        }
    }

    if(sort) {
        const params = sort.split(',');
        const sortFilters = params.map((param)=> param.split('_'));
        sortFilter = sortFilters
    }

    console.log(customFilter, sortFilter)

    try {
        const flights = await flightRepository.getAllFlights(customFilter, sortFilter);
        console.log(flights)
        return flights;
    } catch (error) {
        throw new AppError('Cannot fetch data of all the Flights', StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

//fix this both
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


//fix this both
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