const express = require('express');
const dotenv = require('dotenv');
const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/error');
const morgan = require('morgan');
const connectDB = require('./config/db');
const app = express();

// Body parser
app.use(express.json());

// Routes file
const bootcamps = require('./routes/bootcamps');
const courses = require('./routes/courses');

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
app.use('/api/v1/courses', courses);

app.use(errorHandler);

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