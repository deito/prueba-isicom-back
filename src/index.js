const winston = require('./utils/winston');
const express = require('express');
const morgan = require('morgan');

const app = express();

// middlewares
app.use(morgan('combined', { stream: { write: message => winston.info(message.trim()) }}));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//for cors
app.use(function(req, res, next) {
    //Enabling CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,PATCH");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
    next();
});

// Routes
app.use('/test', require('./routes/testRouter'));
app.use('/productoGenerico', require('./routes/productoGenerico'));

// Export the app instance
module.exports = app;