// functions and routes for users
// CRUD operations
import { ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';

// create new user func
export async function createUser(username, email, password, collection) {
    // number of hash rounds for algo
    const saltRounds = 10;
    // hash algo for password encyption
    const hashPass = await bcrypt.hash(password, saltRounds);

    // schema initialization for obj representing new user document 
    const insertNewUser = {
        _id: new ObjectId(),
        username: username,
        email: email,
        password: hashPass,
        created_at: new Date(),
        updated_at: new Date()
    };

    // inserts new user doc into collection
    try {
        await collection.insertOne(insertNewUser);
        return insertNewUser;
    } catch (e) {
        throw new Error;
    }
}

// verify user login func
export async function userLogin(email_username, password, collection) {
    try {
        // findOne method to find user doc with username/email field that matches specified username/email
        const verifyUser = await collection.findOne({ 
            // mongodb syntax to let user login by email OR username
            $or: [
                { email: email_username },
                { username: email_username }
            ]
        });

        // if the user can't be found throw error
        if (!verifyUser) {
            throw new Error;
        }

        // var to check password validation using compare method on hashed pass
        const isPasswordValid = await bcrypt.compare(password, verifyUser.password);
        // if the password isn't valid throw error
        if (!isPasswordValid) {
            throw new Error;
        }

        return verifyUser;
        // catches any other errors or invalid user login
    } catch (e) {
        throw new Error;
    }
}
