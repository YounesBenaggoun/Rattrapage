const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    console.log(token);
    if (!token) {
        return res.status(401).json({
            message: "Access denied. No token Provided"
        });
    }
    await jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        console.log(decoded);
        if (err) {
            return res.status(401).json({ message: "invalid token" })
        }
        req.user = decoded;
        next();
    })
};