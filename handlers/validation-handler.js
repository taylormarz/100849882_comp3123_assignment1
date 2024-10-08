// verification.js
import { body, validationResult } from 'express-validator';

// employee validation
export const validateEmp = () => {
    return [
        body('first_name')
            .isString()
            .matches(/^[A-Za-z]+$/).withMessage('Employee first name can not have digits.')
            .notEmpty().withMessage('Employee first name can not be empty.'),
        
        body('last_name')
            .isString()
            .matches(/^[A-Za-z]+$/).withMessage('Employee last name can not have digits.')
            .notEmpty().withMessage('Employee last name can not be empty.'),
        
        body('email')
            .isEmail().withMessage('Invalid email.'),
        
        body('position')
            .isString()
            .matches(/^[A-Za-z]+$/).withMessage('Employee position can not have digits.')
            .notEmpty().withMessage('Employee position can not be empty.'),
        
        body('salary')
            .isNumeric().withMessage('Invalid salary, must be a number only.')
            .notEmpty().withMessage('Employee salary can not be empty.'),
        
        body('department')
            .isString()
            .matches(/^[A-Za-z]+$/).withMessage('Employee department can not have digits.')
            .notEmpty().withMessage('Employee department can not be empty.'),
    ];
};

// user validation
export const validateUser = () => {
    return [
        body('username')
        .isString()
        .matches(/^[A-Za-z]+$/).withMessage('Username can not have digits.')
        .notEmpty().withMessage('Invalid username.'),
        body('email').isEmail().withMessage('Invalid email.'),
        body('password').isLength({ min: 9 }).withMessage('Invalid password, must be at least 9 characters.'),
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

