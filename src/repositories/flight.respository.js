const CrudRepository = require("./crud.repository");
const db = require("../models")
const { Sequelize } = require("sequelize");
const { addRowLockOnFlights } = require("./queries");
const { Flight, Airplane, Airport } = db;

class FlightRepository extends CrudRepository {
    constructor() {
        super(Flight);
    }

    async getAllFlights(filter, sort) {
        const response = await Flight.findAll({
            where: filter,
            order: sort,
            include: [
                {
                    model: Airplane,
                    required: true,
                    as: 'airplaneDetail'
                },
                {
                    model: Airport,
                    required: true,
                    as: 'departureAirport',
                    on: {
                        col1: Sequelize.where(Sequelize.col("Flight.departureAirportId"), "=", Sequelize.col("departureAirport.code"))
                    },
                    include: {
                        model: City,
                        required: true
                    }
                },
                {
                    model: Airport,
                    required: true,
                    as: 'arrivalAirport',
                    on: {
                        col1: Sequelize.where(Sequelize.col("Flight.departureAirportId"), "=", Sequelize.col("arrivalAirport.code"))
                    },
                    include: {
                        model: City,
                        required: true
                    }
                }

            ]
        })
        return response
    }

    async updateRemainingSeats(flightId, seats, dec = true) {

        //may 28 code
        // db.sequelize.query(addRowLockOnFlights(flightId))
        // const flight = await Flight.findByPk(flightId)
        // if (+dec) {
        //     await flight.decrement('totalAvailableSeats', {by: seats});
        // } else {
        //     await flight.increment('totalAvailableSeats', {by:seats});

        //may 30 missing video code
        const transaction = await db.sequelize.transaction();
        try {
            await db.sequelize.query(addRowLockOnFlights(flightId));
            const flight = await Flight.findByPk(flightId)
            if(+dec) {
                await flight.decrement('totalAvailableSeats', {by: seats}, {transaction: transaction})
            } else {
                await flight.increment('totalAvailableSeats', {by: seats}, {transaction: transaction})
            }
            await transaction.commit();
            console.log(flight)
            return flight
        } catch (error) {
            await transaction.rollback();
            throw error
        }
        // return flight
    }
}

module.exports = FlightRepository;