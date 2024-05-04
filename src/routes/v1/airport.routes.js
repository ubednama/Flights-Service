const express = require("express")
const { AirportController } = require("../../controllers");
const { AirportMiddlewares } = require("../../middlewares");

const router = express.Router();

router.post('/', AirportMiddlewares.validateCreateRequest,AirportController.createAirport)

router.get('/', AirportController.getAllAirports)

router.get('/:id', AirportController.getAirport)

router.delete('/:id', AirportController.deleteAirport)

router.patch('/:id', AirportMiddlewares.validateUpdateRequest, AirportController.updateAirport)

module.exports = router;