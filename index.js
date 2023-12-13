const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB');
        // Start your server or perform other operations here
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
