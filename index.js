// COMP3123 - Fullstack Development, Assignment 01
// Taylor Martin, Student ID: 100849882

import express from 'express';
// importing object of mongo client from driver
import { MongoClient } from 'mongodb';
import { createUserRoute, verifyUserRoute } from './routes/user-route.js';
import { createNewEmpRoute, readEmpRoute, readEmpByIdRoute, updateEmpRoute, 
    deleteEmpRoute } from './routes/employee-route.js';
import 'dotenv/config'
import csrf from 'csurf';
import cookieParser from 'cookie-parser';

// database url - stored as env var for security
const url = process.env.ME_CONNECTION_STRING;
// creating new client object that uses url variable to identify what database to connect to
const client = new MongoClient(url);
// database name - stored as env var for security
const dbName = process.env.DATABASE_NAME;
// 
const app = express();
const SERVER_PORT = process.env.PORT;
const token = csrf({ cookie: true });

app.use(cookieParser());
app.use(express.json());
app.use(token);

// i kept getting an error asking for a csrfToken when POSTman would try to connect to my db,
// i think this is from my use of docker containers for mongodb and mongo express.
// so i added this in to generate a token everytime i use POSTman 
app.get('/csrf-token', (req, res) => {
    res.json({ csrfToken: req.csrfToken() });
});

// storing db connection in function
async function dbConnection() {
    // connection method for db
    await client.connect();
    console.log('Connected successfully to server');
    // connects to db after client connection opperation completes
    const db = client.db(dbName);
    // sending two handles to db called 'users' and 'employees'
    const userCollection = db.collection('users');
    const employeeCollection = db.collection('employees');

    return { userCollection, employeeCollection };
}

// utilizing function for db connection then setting up routes
dbConnection()
    .then(({ userCollection, employeeCollection}) => {
        createUserRoute(app, userCollection);
        verifyUserRoute(app, userCollection);
        createNewEmpRoute(app, employeeCollection);
        readEmpRoute(app, employeeCollection);
        readEmpByIdRoute(app, employeeCollection);
        updateEmpRoute(app, employeeCollection);
        deleteEmpRoute(app, employeeCollection);
    })
    .catch(console.error)

// starting server and listening to incoming requests
app.listen(SERVER_PORT, () => {
    console.log(`Server running on http://localhost:${SERVER_PORT}`);
});
