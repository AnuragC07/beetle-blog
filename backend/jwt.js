const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req, res, next) => {

    const authorization = req.headers.authorization
    if (!authorization)
        return res.status(401).json({ error: 'Token not found' });

    const token = req.headers.authorization.split(' ')[1];
    if (!token)
        return res.status(401).json({ error: 'Unauthorized' });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (!decoded.id || !decoded.username) {
            return res.status(401).json({ error: 'Invalid token' });
        }
        console.log("Decoded token:", decoded);
        req.user = decoded
        next();
    }
    catch (err) {
        console.error(err);
        res.status(401).json({ error: 'Invalid token' });
    }
}

//function for creating JWT token
const generateToken = (userData) => {
    return jwt.sign(userData, process.env.JWT_SECRET_KEY, { expiresIn: 86400 });
}

//extract username from current logged in user's jwt token
const extractUsernameFromToken = (req, res, next) => {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader)
        return res.status(401).json({ message: 'Token not found' });

    const token = authorizationHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.username = decoded.username;
        next();
    } catch (err) {
        console.error(err);
        return res.status(401).json({ message: 'Unauthorized' });
    }
};


module.exports = { jwtAuthMiddleware, generateToken, extractUsernameFromToken }