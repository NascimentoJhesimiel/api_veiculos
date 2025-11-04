import { z } from 'zod';
import { vehicleSchema } from '../entities/vehicle.js';

export const ValidateUpdateVehicle = (req, res, next) => {
	const result = vehicleSchema.safeParse(req.body);

	if (!result.success) {
		const errors = result.error.errors.map((err) => ({
			field: err.path.join('.'),
			message: err.message,
		}));

		return res.status.json({
			message: 'Request not valid',
		});
	}

	req.validatedData = result.data;
	next();
};
