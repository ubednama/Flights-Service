const { StatusCodes } = require('http-status-codes');
const { ServerConfig } = require('../config');

const info = (req, res) => {
    console.log(`in info of Flight Port: ${ServerConfig.PORT}`)
    return res.status(StatusCodes.OK).json({
        success: true,
        message: 'Flights API is live',
        error: {},
        data: {},
    });
}

module.exports = {
    info
}