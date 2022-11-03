require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const checkUserAuth = require('./middleware/authentication');

// Import Routers
const authRouters = require('./routes/auth');
const jobsRouters = require('./routes/jobs');

app.use(express.json());
// extra packages

// routes
app.use('/api/v1/auth', authRouters);
app.use('/api/v1/jobs', checkUserAuth, jobsRouters);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

module.exports = app;