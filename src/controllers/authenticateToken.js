const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    // Extract the token from the Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (token == null) {
        return res.sendStatus(401); // if no token found, return 401 Unauthorized
    }

    // Verify the token using your secret
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403); // if token is not valid, return 403 Forbidden
        }
        req.user = user; // set the user in the request object
        next(); // call the next middleware
    });
};

module.exports = authenticateToken;
