const express = require("express")
const { AirplaneController } = require("../../controllers");
const { AirplaneMiddlewares } = require("../../middlewares");
// const { createAirplane } = require("../../services/Airplane.service");

const router = express.Router();

router.post('/', AirplaneMiddlewares.validateCreateRequest,AirplaneController.createAirplane)

router.get('/', AirplaneController.getAllAirplanes)

router.get('/:id', AirplaneController.getAirplane)

router.delete('/:id', AirplaneController.deleteAirplane)

router.patch('/:id', AirplaneMiddlewares.validateUpdateRequest, AirplaneController.updateAirplane)

module.exports = router;