import { vehicleSchema } from '../entities/vehicle.js';

export const validateCreateVehicle = (req, res, next) => {
	const result = vehicleSchema.safeParse(req.body);

	if (!result.success) {
		const errors = result.error.errors.map((err) => ({
			field: err.path.join('.'),
			message: err.message,
		}));

		return res.status(400).json({
			message: 'Validation Failed',
			errors,
		});
	}

	req.validatedData = result.data;
	next();
};
