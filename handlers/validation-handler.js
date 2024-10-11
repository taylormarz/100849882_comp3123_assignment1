// verification.js
import { body, validationResult } from 'express-validator';

// employee validation
export const validateEmp = () => {
    return [
        body('first_name')
            .notEmpty().withMessage('Employee first name can not be empty.')
            .isString().withMessage('Employee first name must be a string.')
            .custom((value) => {
                if (value && !/^[A-Za-z]+$/.test(value)) {
                    throw new Error('Employee first name can not have digits.');
                }
                return true;
            }),

        body('last_name')
            .notEmpty().withMessage('Employee last name can not be empty.')
            .isString().withMessage('Employee last name must be a string.')
            .custom((value) => {
                if (value && !/^[A-Za-z]+$/.test(value)) {
                    throw new Error('Employee last name can not have digits.');
                }
                return true;
            }),

        body('email')
            .isEmail().withMessage('Invalid email.'),

        body('position')
            .notEmpty().withMessage('Employee position can not be empty.')
            .isString().withMessage('Employee position must be a string.')
            .custom((value) => {
                if (value && !/^[A-Za-z]+$/.test(value)) {
                    throw new Error('Employee position can not have digits.');
                }
                return true;
            }),

        body('salary')
            .notEmpty().withMessage('Employee salary can not be empty.')
            .isNumeric().withMessage('Invalid salary, must be a number only.'),

        body('department')
            .notEmpty().withMessage('Employee department can not be empty.')
            .isString().withMessage('Employee department must be a string.')
            .custom((value) => {
                if (value && !/^[A-Za-z]+$/.test(value)) {
                    throw new Error('Employee department can not have digits.');
                }
                return true;
            }),
    ];
};



// user validation
export const validateUser = () => {
    return [
        body('username')
        .notEmpty().withMessage('Invalid username, can not be empty.')
        .isString(),
        body('email')
        .notEmpty().withMessage('Email can not be empty.')
        .isEmail().withMessage('Invalid email.'),
        body('password')
        .notEmpty().withMessage('Password can not be empty.')
        .isLength({ min: 9 }).withMessage('Invalid password, must be at least 9 characters.'),
    ];
};

// err handling
export const validationErr = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ 
            status: false, 
            message: errors.array().map(err => err.msg)
        });
    }
    next();
};

