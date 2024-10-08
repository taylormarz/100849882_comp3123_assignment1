// functions and routes for users
// CRUD operations
import { ObjectId } from 'mongodb';
import { errHandle } from '../handlers/error-handler.js';
import bcrypt from 'bcrypt';

// create new user
export async function createUser(username, email, password, collection) {
    const saltRounds = 10;
    const hashPass = await bcrypt.hash(password, saltRounds);

    const insertNewUser = {
        _id: new ObjectId(),
        username: username,
        email: email,
        password: hashPass,
        created_at: new Date(),
        updated_at: new Date()
    };

    try {
        await collection.insertOne(insertNewUser);
        return insertNewUser;
    } catch (e) {
        errHandle(null, 'Error creating new user: ' + e);
    }
}

// verify user login
export async function userLogin(email_username, password, collection) {
    try {
        const verifyUser = await collection.findOne({ 
            // user can use email OR username for verification
            $or: [
                { email: email_username },
                { username: email_username }
            ]
         });

        if (verifyUser && await bcrypt.compare(password, verifyUser.password)) {
            console.log('login successful')
        }
    } catch (e) {
        errHandle(null, 'Login failed: ' + e);
    } 
}

