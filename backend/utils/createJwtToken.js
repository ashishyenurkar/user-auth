import jwt from 'jsonwebtoken';

export const createJwtToken = (user) => {
    return jwt.sign(
        { id: user.id, email: user.email, type: user.type }, // Payload
        process.env.JWT_SECRET, // Secret Key from .env
        { expiresIn: '1d' } // Token expiration (1 day)
    );
};
