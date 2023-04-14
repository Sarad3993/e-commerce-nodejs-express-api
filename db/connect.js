const mongoose = require('mongoose');

// here we are connecting to the database using the url provided in the .env file and exporting the connection to the caller in the app.js file
const connectDB = (url) => {
    return mongoose.connect(url);
};

module.exports = connectDB;
