const express = require('express')

const { FlightController } = require("../../controllers");
const { FlightMiddlewares } = require('../../middlewares');

const router = express.Router();

router.post('/', FlightMiddlewares.validateCreateRequest, FlightController.createFlight)

router.get('/', FlightController.getAllFlights)

router.get('/:id', FlightController.getFlight)

router.patch('/:id/seats', FlightMiddlewares.validateUpdateSeatRequest, FlightController.updateSeats)


// router.patch('/:id', FlightMiddlewares.validateUpdateRequest, FlightController.updateFlight )
// router.delete('/:id',  FlightController.deleteFlight)

module.exports = router