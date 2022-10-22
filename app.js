// Note: to run our app.js file, we can simply write in the terminal: npm run dev

// Imports 
const express = require('express');
const dotenv = require('dotenv');
const initiateDBConnection = require('./config/db');

// Let the dotenv package read and parse environment variables in the ./config/.env file
dotenv.config({ 
    path: './config/.env' 
});

// Access the port environment variable using process.env
const PORT = process.env.PORT;

const app = express();

app.listen(PORT, async() => {
    console.log(`Server has been started and is listening to port ${PORT}`);
    // Call the asynchronous function to initiate DB connection once the server starts listening 
    await initiateDBConnection();
});

