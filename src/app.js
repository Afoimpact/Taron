const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
// import fileUpload from 'express-fileupload';
const httpStatus = require('http-status');
const ApiError = require('./utils/ApiError');
const cors = require('cors');
// import { agenda } from './utils/schedules.job';

const mongoose = require('mongoose');

const app = express();

const { authRoutes, customerRoutes } = require('./routes');
const { errorConverter, errorHandler } = require('./middleware/error');

const db = require('./db');

//mondodb connection
db.mongo;
// agenda queueing
// agenda;

// app.use(fileUpload({ useTempFiles: true, tempFileDir: '/tmp/' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/customer', customerRoutes)

app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

app.use(errorConverter);
app.use(errorHandler);

module.exports = app;

// app.listen(3004, () => console.log(`Listening on: 3004`));

// module.exports.handler = serverless(app);

//"include": ["src/**/*"]
