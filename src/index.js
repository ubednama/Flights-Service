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

    // bad code
    const {Airport, City} = require('./models');
    const Bengaluru = await City.findByPk(1, {include: {model: Airport}})
    console.log(Bengaluru)

    const newAirport = await Bengaluru.createAirport({name: 'Bangalore International Airport', code: 'BLR'})
    console.log(newAirport)
    // 
});


// 