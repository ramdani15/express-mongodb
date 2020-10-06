const express = require('express');
const dotenv = require('dotenv');
const logger = require('./middlewares/logger');
const morgan = require('morgan');
const app = express();

// Routes file
const bootcamps = require('./routes/bootcamps');

// Load env vars
dotenv.config({path: './config/config.env'});

// Custom Middleware
// app.use(logger);

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Mount routers
app.use('/api/v1/bootcamps', bootcamps);

const PORT = process.env.PORT || 5000;

app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);