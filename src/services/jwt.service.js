import { jwt } from 'jsonwebtoken';
import { env } from '../env.js';

export const generateToken = (payload) => {
	return jwt.sign(payload, env('JWT_SECRET'), { expiresIn: '1h' });
};

export const verifyToken = (token, tokenDecoder) => {
	return jwt.verify(token, env('JWT_SECRET'), tokenDecoder);
};
