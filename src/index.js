const express = require('express');
require('dotenv').config();
const { createProxyMiddleware } = require('http-proxy-middleware');

const { ServerConfig } = require('./config');
const apiRoutes = require('./routes');

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))       //to read urlencoded stuff in url like space or some special characters

app.use('/api', apiRoutes);

// app.use(
//     '/flights/bookings',
//     createProxyMiddleware({
//       target: 'http://localhost:3000/api/v1/bookings/',
//       changeOrigin: true,
//     }),
// );


app.listen(ServerConfig.PORT, async () => {
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
});


/**
 * Query to check if constraint has been applied
 * SELECT * FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE WHERE TABLE_NAME = 'Airports' AND CONSTRAINT_SCHEMA = "Flights"
 */