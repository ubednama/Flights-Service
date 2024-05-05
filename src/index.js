const express = require('express');
require('dotenv').config();

const { ServerConfig } = require('./config');
const apiRoutes = require('./routes');

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))       //to read urlencoded stuff in url like space or some special characters

app.use('/api', apiRoutes);

app.get("/", (req,res)=>{
    res.send("hello world")
})


app.listen(ServerConfig.PORT, async () => {
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
});


/**
 * Query to check if constraint has been applied
 * SELECT * FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE WHERE TABLE_NAME = 'Airports' AND CONSTRAINT_SCHEMA = "Flights"
 */


//06        45