// func to handle err messages and status code
export const errHandle = (res, message, statusCode = 500) => {
    console.error(message);
    return res.status(statusCode).json({ error: message });
};