
const express = require("express");
const app = express();
const cors = require("cors");
const sequelize = require("./config/dbConnect");

app.use(express.json())
app.use(cors())

sequelize.sync() 
    .then(() => {   
        console.log('Connection has been established successfully.');
    
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
        
    });


const truckRoutes = require("./routes/truckRoutes");
app.use('/caminhoes', truckRoutes);
const localidadeRoutes = require("./routes/localidadeRoutes");
app.use('/localidades', localidadeRoutes);




module.exports = app;