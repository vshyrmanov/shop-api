const jwt = require('jsonwebtoken');
// const config = require('config');

module.exports = function (role) {
    return function (req, res, next) {
        if (req.method === 'OPTIONS') {
            return next()
        }
        try {
            const token = req.headers.authorization.split(' ')[1]

            if (!token) {
                return res.status(401).json({message: "No authorization"})
            }
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            if (decoded.role !== role) {
                return res.status(403).json({message: "Access denied"})
            }
            req.user = decoded;
            next()

        } catch (e) {
            res.status(401).json({message: "No authorization"})
        }
    }
}
