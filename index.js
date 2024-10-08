// COMP3123 - Fullstack Development, Assignment 01
// Taylor Martin, Student ID: 100849882

import express from 'express';
import { MongoClient } from 'mongodb';
import { createUserRoute, verifyUserRoute } from './routes/user-route.js';
import { createNewEmpRoute, readEmpRoute, readEmpByIdRoute, updateEmpRoute, 
    deleteEmpRoute } from './routes/employee-route.js';
import 'dotenv/config'
import csrf from 'csurf';
import cookieParser from 'cookie-parser';

const url = process.env.ME_CONNECTION_STRING;
const client = new MongoClient(url);
const dbName = process.env.DATABASE_NAME;
const app = express();
const SERVER_PORT = process.env.PORT;
const token = csrf({ cookie: true });

app.use(cookieParser());
app.use(express.json());
app.use(token);

app.get('/csrf-token', (req, res) => {
    res.json({ csrfToken: req.csrfToken() });
});

async function dbConnection() {
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const userCollection = db.collection('users');
    const employeeCollection = db.collection('employees');

    return { userCollection, employeeCollection };
}

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


app.listen(SERVER_PORT, () => {
    console.log(`Server running on http://localhost:${SERVER_PORT}`);
});
