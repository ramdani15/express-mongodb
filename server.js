const express = require('express');
const dotenv = require('dotenv');
const logger = require('./middlewares/logger');
const morgan = require('morgan');
const connectDB = require('./config/db');
const app = express();

// Routes file
const bootcamps = require('./routes/bootcamps');

// Load env vars
dotenv.config({path: './config/config.env'});

// Custom Middleware
// app.use(logger);

// Connect to Database
connectDB();

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Mount routers
app.use('/api/v1/bootcamps', bootcamps);

const PORT = process.env.PORT || 5000;

const server = app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error : ${err.message}`);

    // Close server & exit process
    server.close(() => process.exit(1));
})