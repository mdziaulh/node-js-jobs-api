require('dotenv').config();
require('express-async-errors');
const express = require('express');

const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

const app = express();

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const checkUserAuth = require('./middleware/authentication');

// Import Routers
const authRouters = require('./routes/auth');
const jobsRouters = require('./routes/jobs');

app.set('trust proxy', 1);

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100
}));

// extra packages

// routes
app.use('/api/v1/auth', authRouters);
app.use('/api/v1/jobs', checkUserAuth, jobsRouters);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

module.exports = app;