import { z } from 'zod';

export const vehicleSchema = z.object({
	brand: z.string().min(2, 'Brand must have 2 characters at least'),
	model: z.string().min(2, 'Model must have 2 characters at least'),
	year: z
		.number({
			requiredError: 'Year is required',
			invalidTypeError: 'Year must be a number',
		})
		.int('Year must be an integer')
		.min(1886, 'Year must be at least 1886')
		.max(new Date().getFullYear() + 1, 'Year cannot be in the future'),
	km: z
		.number({
			required_error: 'Km is required',
			invalid_type_error: 'Km must be a number',
		})
		.min(0, 'Km must be a non-negative number'),
});