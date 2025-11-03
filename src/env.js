import dotenv from 'dotenv';

dotenv.config();

export const env = (varenv) => {
	const variable = process.env[varenv];
	const allowedVars = ['DATABASE_URL', 'API_KEY', 'PORT', 'NODE_ENV'];

	if (typeof varenv !== 'string' || varenv.trim() === '') {
		throw new Error('Invalid environment variable name');
	}

	if (!allowedVars.includes(varenv)) {
		throw new Error(`Environment variable ${varenv} is not allowed`);
	}

	if (!variable) {
		throw new Error(`Enviroment variable ${varenv} don't exist`);
	}

	return variable;
};
