const mongoose = require('mongoose');
const express = require('express');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cookieParser());

// Defining session instance
const sessionInstance = session({secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false});
app.use(sessionInstance);

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
});

mongoose.connect(process.env.MONGODB_URI)

// Passport middlewares
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate('session'));

// Routes
app.use('/', require('./routes/auth'));
app.use('/', require('./routes/chat'));