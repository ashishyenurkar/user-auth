import jwt from 'jsonwebtoken';

export const authenticateUser = (req, res, next) => {
    try {
        const token = req.cookies.token; // Get token from cookies

        if (!token) {
            return res.status(401).json({ error: 'Unauthorized: No token provided' });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({ error: 'Forbidden: Invalid token' });
            }
            req.user = decoded; // Store user data in request object
            next();
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
