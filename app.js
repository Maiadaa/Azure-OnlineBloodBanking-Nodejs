// Imports 
const express = require('express');

const initiateDBConnection = require('./config/db');

const patientRouter = require('./routes/PatientRoutes');
const hospitalsRouter = require('./routes/hospitals');
const BloodBagRouter = require('./routes/bloodBag');
const donationCampsRouter = require('./routes/donation');
const userAccountRouter = require('./routes/userAccount');



// Access the port environment variable using process.env
const PORT = process.env.PORT;

const app = express();

app.use(express.json());


app.use('/patient', patientRouter);
app.use('/hospitals', hospitalsRouter);
app.use('/BloodBag', BloodBagRouter);
app.use('/donations', donationCampsRouter);
app.use('/auth', userAccountRouter);

app.listen(PORT, async() => {
    console.log(`Server has been started and is listening to port ${PORT}`);
    // Call the asynchronous function to initiate DB connection once the server starts listening 
    await initiateDBConnection();
});

