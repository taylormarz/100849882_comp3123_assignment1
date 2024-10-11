// functions and routes for users
// CRUD operations
import { ObjectId } from 'mongodb';
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
        throw new Error;
    }
}

// verify user login
export async function userLogin(email_username, password, collection) {
    try {
        const verifyUser = await collection.findOne({ 
            $or: [
                { email: email_username },
                { username: email_username }
            ]
        });

        if (!verifyUser) {
            throw new Error;
        }

        const isPasswordValid = await bcrypt.compare(password, verifyUser.password);
        if (!isPasswordValid) {
            throw new Error;
        }

        return verifyUser;
    } catch (e) {
        throw new Error;
    }
}
