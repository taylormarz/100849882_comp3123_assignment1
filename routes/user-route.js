// routes for user API endpoints
import { validateUser, validationErr } from '../handlers/validation-handler.js';
import { errHandle } from '../handlers/error-handler.js';
import { createUser, userLogin } from '../modules/user.js';

// route for post request to create new user
export async function createUserRoute(app, userCollection) {
    app.post('/api/v1/user/signup', validateUser(), validationErr, async (req, res) => {

        const { username, email, password } = req.body;

        try {
            const create = await createUser(username, email, password, userCollection);
            res.status(201).json({ 
                message: 'User created successfully. ',
                user_id: create._id
            });
        } catch (e) {
            errHandle(null, 'Error creating new user: ' + e);
        }
    });
}

// route to verify user login credentials
export async function verifyUserRoute(app, userCollection) {
    app.post('/api/v1/user/login', async (req, res) => {
        const { email_username, password } = req.body;

        try {
            await userLogin(email_username, password, userCollection);
            res.status(200).json({ message: 'Login successful.' });
        } catch (e) {
            return res.status(401).json({ message: 'Login failed.' });
        }
    });
}

