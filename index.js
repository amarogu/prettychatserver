const mongoose = require('mongoose');
const express = require('express');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
    // Start your server or perform other operations here
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

const app = express();
app.use(express.json());
app.use(cookieParser());

// Defining session instance
const sessionInstance = session({secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false});
app.use(sessionInstance);

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
});

// Passport middlewares
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate('session'));

// Routes
app.use('/', require('./routes/auth'));
