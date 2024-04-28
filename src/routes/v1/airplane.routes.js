const express = require("express")
const { AirplaneController } = require("../../controllers");
const { AirplaneMiddlewares } = require("../../middlewares");
// const { createAirplane } = require("../../services/Airplane.service");

const router = express.Router();

router.post('/', AirplaneMiddlewares.validateCreateRequest,AirplaneController.createAirplane)

router.get('/', AirplaneController.getAirplanes)

router.get('/:id', AirplaneController.getAirplane)

router.delete('/:id', AirplaneController.deleteAirplane)

module.exports = router;