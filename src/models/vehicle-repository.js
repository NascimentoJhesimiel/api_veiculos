import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const encoding = 'utf-8';

export class VehicleRepository {
	constructor() {
		this.repoPath = path.join(__dirname, 'vehicle.json');
	}

	async read() {
		const data = await fs.readFile(this.repoPath, { encoding });
		return JSON.parse(data);
	}

	async create(brand, model, year, km) {
		try {
			const data = await this.read();

			const newVehicle = { id: data.nextId, brand, model, year, km };

			data.vehicles.push(newVehicle);
			data.nextId++;

			await fs.writeFile(this.repoPath, JSON.stringify(data, null, 2), {
				encoding,
			});

			return newVehicle;
		} catch (error) {
			return '403: Error to create vehicle';
		}
	}

	async update(id, brand, model, year, km) {
		const data = await this.read();
		const vehicleIndex = data.vehicles.findIndex(
			(vehicle) => vehicle.id === id,
		);

		if (vehicleIndex === -1) {
			return 'Vehicle not found';
		}

		data.vehicles[vehicleIndex] = { id, brand, model, year, km };
		await fs.writeFile(this.repoPath, JSON.stringify(data, null, 2), {
			encoding,
		});

		return data.vehicles[vehicleIndex];
	}

	async delete(id) {
		const data = await this.read();
		const vehicleIndex = data.vehicles.findIndex(
			(vehicle) => vehicle.id === id,
		);

		if (vehicleIndex === -1) {
			return null;
		}

		const vehicleToBeDeleted = data.vehicles[vehicleIndex];
		data.vehicles.splice(vehicleIndex, 1);
		await fs.writeFile(this.repoPath, JSON.stringify(data, null, 2), {
			encoding,
		});

		return vehicleToBeDeleted;
	}
}
