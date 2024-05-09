function addRowLockOnFlights(id) {
    return `SELECT * FROM Flights WHERE Flights.id = ${id} FOR UPDATE;`
}

module.exports = {
    addRowLockOnFlights,
}