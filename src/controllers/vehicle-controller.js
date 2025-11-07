import { VehicleRepository } from '../models/vehicle-repository.js';

const db = new VehicleRepository();

export const getAllVehicles = async (req, res) => {
	try {
		const data = await db.read();

		if (!data) {
			return res.status(404).json({ message: 'Data not found' });
		}

		return res.status(200).json(data.vehicles);
	} catch (error) {
		return res.status(500).json({ error: 'Could not fetch data' });
	}
};

export const getVehicleById = async (req, res) => {
	try {
		const vehicleId = Number.parseInt(req.params.id, 10);

		if (Number.isNaN(vehicleId) || vehicleId < 0) {
			return res.status(400).json({ error: 'Invalid ID' });
		}

		const data = await db.read();

		if (!data || !data.vehicles || !Array.isArray(data.vehicles)) {
			return res.status(404).json({ error: 'No vehicles data found' });
		}

		const vehicle = data.vehicles.find((v) => v.id === vehicleId);

		if (!vehicle) {
			return res.status(404).json({ error: 'Vehicle not found' });
		}

		return res.status(200).json(vehicle);
	} catch (error) {
		return res.status(500).json({ error: 'Error to fetch vehicle' });
	}
};

export const createVehicle = async (req, res, next) => {
	try {
		const newVehicle = req.body;

		const data = await db.create(
			newVehicle.brand,
			newVehicle.model,
			newVehicle.year,
			newVehicle.km,
		);

		res.status(201).json(data);

		next();
	} catch (error) {
		return res.status(500).json({ message: 'Error creating vehicle' });
	}
};

export const updateVehicle = async (req, res) => {
	try {
		const updatedVehicle = req.body;

		const data = await db.update(
			Number.parseInt(req.params.id, 10),
			updatedVehicle.brand,
			updatedVehicle.model,
			updatedVehicle.year,
			updatedVehicle.km,
		);

		if (!data) {
			return res.status(404).json({ message: 'Vehicle not found' });
		}

		res.status(200).json(data);
	} catch (error) {
		res.status(500).json({ message: 'Error updating vehicle' });
	}
};

export const deleteVehicle = async (req, res) => {
	try {
		const data = await db.delete(Number.parseInt(req.params.id, 10));

		if (!data) {
			return res.status(404).json({ message: 'Vehicle not found' });
		}

		res.status(204);
	} catch (error) {
		return res.status(500).json({ message: 'Error deleting vehicle' });
	}
};
