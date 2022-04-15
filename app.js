const express = require('express');
const app = express();
const morgan = require('morgan');
const consumerRoutes = require('./src/routes/consumer')

app.use(morgan('dev'));
app.use(express.json())

//Consumer Routes
app.use(consumerRoutes);

app.use('/',(req,res)=>{
    _res.send({
        credit:"This App is Developed by Asheesh Singh"
    })
})

module.exports = app;