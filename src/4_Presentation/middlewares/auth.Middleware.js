import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            message: "Access denied. No token Provided",
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "invalid token" });
        }

        req.user = decoded;
        next();
    });
};

export default authMiddleware;