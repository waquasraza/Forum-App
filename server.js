const express = require('express');
const app = express();

// enviroment variable setup
const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });
const PORT = process.env.PORT;

// Db Connection
const mongoose = require('mongoose');
const connectDB = require('./config/db');
connectDB(process.env.MONGO_URI, process.env.DB_NAME);

// middlewares
app.use(express.json());

// logger
const morgan = require('morgan');
app.use(morgan('dev'));

// auth routes
const auth = require('./routes/auth');
app.use('/api/v1/auth/', auth);

// threads route
const thread = require('./routes/thread');
app.use('/api/v1/threads/', thread);

app.listen(PORT, () => console.log(`Server is runnning on PORT: ${PORT}`));
