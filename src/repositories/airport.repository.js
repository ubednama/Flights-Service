const { Airplane } = require("../models");
const CrudRepository = require("./crud.repository");

class AirportRepository extends CrudRepository {
    constructor() {
        super(Airplane)
    }
}

module.exports = AirportRepository;