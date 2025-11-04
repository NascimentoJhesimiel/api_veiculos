import { jest } from '@jest/globals';

// Mock de todos os métodos do VehicleRepository ANTES de qualquer importação
const mockRead = jest.fn();
const mockCreate = jest.fn();
const mockUpdate = jest.fn();
const mockDelete = jest.fn();

//vai substituir o módulo inteiro por esse mock
jest.unstable_mockModule('../../../src/models/vehicle-repository.js', () => ({
	VehicleRepository: jest.fn().mockImplementation(() => ({
		read: mockRead,
		create: mockCreate,
		update: mockUpdate,
		delete: mockDelete,
	})),
}));

// Agora importamos todas as funções do controller
// 1. Mock é configurado PRIMEIRO
// 2. jest.unstable_mockModule() substitui o módulo
// 3. DEPOIS fazemos await import()
// 4. vehicle-controller.js carrega com o MOCK já ativo
// 5. const db = new VehicleRepository(); Usa a classe MOCKADA
const {
	getAllVehicles,
	getVehicleById,
	createVehicle,
	updateVehicle,
	deleteVehicle,
} = await import('../../../src/controllers/vehicle-controller.js');

// Helpers para criar mocks de req e res
const mockRequest = (params = {}, body = {}) => ({
	params,
	body,
});

const mockResponse = () => {
	const res = {};
	res.status = jest.fn().mockReturnValue(res);
	res.json = jest.fn().mockReturnValue(res);
	return res;
};

describe('Vehicle Controller Tests', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('getAllVehicles', () => {
		test('Should return status 200 and vehicles data', async () => {
			const vehicleData = {
				nextId: 3,
				vehicles: [
					{
						id: 1,
						brand: 'Toyota',
						model: 'Corolla',
						year: 2020,
						km: 15_000,
					},
					{
						id: 2,
						brand: 'Porsche',
						model: 'Cayenne',
						year: 2024,
						km: 211,
					},
				],
			};

			mockRead.mockResolvedValue(vehicleData);

			const req = mockRequest();
			const res = mockResponse();

			await getAllVehicles(req, res);

			expect(mockRead).toHaveBeenCalled();
			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalledWith(vehicleData.vehicles);
		});

		test('Should return status 404 when no data found', async () => {
			mockRead.mockResolvedValue(null);

			const req = mockRequest();
			const res = mockResponse();

			await getAllVehicles(req, res);

			expect(mockRead).toHaveBeenCalled();
			expect(res.status).toHaveBeenCalledWith(404);
			expect(res.json).toHaveBeenCalledWith({ message: 'Data not found' });
		});

		test('Should return status 500 on database error', async () => {
			mockRead.mockRejectedValue(new Error('Database error'));

			const req = mockRequest();
			const res = mockResponse();

			await getAllVehicles(req, res);

			expect(mockRead).toHaveBeenCalled();
			expect(res.status).toHaveBeenCalledWith(500);
			expect(res.json).toHaveBeenCalledWith({ error: 'Could not fetch data' });
		});
	});

	describe('getVehicleById', () => {
		test('Should return status 200 and vehicle when found', async () => {
			const vehicleData = {
				nextId: 3,
				vehicles: [
					{
						id: 1,
						brand: 'Toyota',
						model: 'Corolla',
						year: 2020,
						km: 15_000,
					},
				],
			};

			mockRead.mockResolvedValue(vehicleData);

			const req = mockRequest({ id: '1' });
			const res = mockResponse();

			await getVehicleById(req, res);

			expect(mockRead).toHaveBeenCalled();
			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalledWith(vehicleData.vehicles[0]);
		});

		test('Should return status 400 for invalid ID', async () => {
			const req = mockRequest({ id: 'abc' });
			const res = mockResponse();

			await getVehicleById(req, res);

			expect(mockRead).not.toHaveBeenCalled();
			expect(res.status).toHaveBeenCalledWith(400);
			expect(res.json).toHaveBeenCalledWith({ error: 'Invalid ID' });
		});

		test('Should return status 404 when vehicle not found', async () => {
			const vehicleData = {
				nextId: 3,
				vehicles: [
					{
						id: 1,
						brand: 'Toyota',
						model: 'Corolla',
						year: 2020,
						km: 15_000,
					},
				],
			};

			mockRead.mockResolvedValue(vehicleData);

			const req = mockRequest({ id: '999' });
			const res = mockResponse();

			await getVehicleById(req, res);

			expect(mockRead).toHaveBeenCalled();
			expect(res.status).toHaveBeenCalledWith(404);
			expect(res.json).toHaveBeenCalledWith({ error: 'Vehicle not found' });
		});

		test('Should return status 404 when no vehicles data found', async () => {
			mockRead.mockResolvedValue(null);

			const req = mockRequest({ id: '1' });
			const res = mockResponse();

			await getVehicleById(req, res);

			expect(mockRead).toHaveBeenCalled();
			expect(res.status).toHaveBeenCalledWith(404);
			expect(res.json).toHaveBeenCalledWith({
				error: 'No vehicles data found',
			});
		});

		test('Should return status 500 on database error', async () => {
			mockRead.mockRejectedValue(new Error('Database error'));

			const req = mockRequest({ id: '1' });
			const res = mockResponse();

			await getVehicleById(req, res);

			expect(mockRead).toHaveBeenCalled();
			expect(res.status).toHaveBeenCalledWith(500);
			expect(res.json).toHaveBeenCalledWith({
				error: 'Error to fetch vehicle',
			});
		});
	});

	describe('createVehicle', () => {
		test('Should return status 201 and created vehicle', async () => {
			const newVehicleData = {
				brand: 'Honda',
				model: 'Civic',
				year: 2023,
				km: 5000,
			};

			const createdVehicle = {
				id: 3,
				...newVehicleData,
			};

			mockCreate.mockResolvedValue(createdVehicle);

			const req = mockRequest({}, newVehicleData);
			const res = mockResponse();
			const next = jest.fn();

			await createVehicle(req, res, next);

			expect(mockCreate).toHaveBeenCalledWith('Honda', 'Civic', 2023, 5000);
			expect(res.status).toHaveBeenCalledWith(201);
			expect(res.json).toHaveBeenCalledWith(createdVehicle);
			expect(next).toHaveBeenCalled();
		});

		test('Should return status 500 on creation error', async () => {
			const newVehicleData = {
				brand: 'Honda',
				model: 'Civic',
				year: 2023,
				km: 5000,
			};

			mockCreate.mockRejectedValue(new Error('Creation error'));

			const req = mockRequest({}, newVehicleData);
			const res = mockResponse();
			const next = jest.fn();

			await createVehicle(req, res, next);

			expect(mockCreate).toHaveBeenCalled();
			expect(res.status).toHaveBeenCalledWith(500);
			expect(res.json).toHaveBeenCalledWith({
				message: 'Error creating vehicle',
			});
			expect(next).not.toHaveBeenCalled();
		});
	});

	describe('updateVehicle', () => {
		test('Should return status 200 and updated vehicle', async () => {
			const updateData = {
				brand: 'Honda',
				model: 'Civic',
				year: 2023,
				km: 6000,
			};

			const updatedVehicle = {
				id: 1,
				...updateData,
			};

			mockUpdate.mockResolvedValue(updatedVehicle);

			const req = mockRequest({ id: '1' }, updateData);
			const res = mockResponse();

			await updateVehicle(req, res);

			expect(mockUpdate).toHaveBeenCalledWith(1, 'Honda', 'Civic', 2023, 6000);
			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalledWith(updatedVehicle);
		});

		test('Should return status 404 when vehicle not found', async () => {
			const updateData = {
				brand: 'Honda',
				model: 'Civic',
				year: 2023,
				km: 6000,
			};

			mockUpdate.mockResolvedValue(null);

			const req = mockRequest({ id: '999' }, updateData);
			const res = mockResponse();

			await updateVehicle(req, res);

			expect(mockUpdate).toHaveBeenCalled();
			expect(res.status).toHaveBeenCalledWith(404);
			expect(res.json).toHaveBeenCalledWith({ message: 'Vehicle not found' });
		});

		test('Should return status 500 on update error', async () => {
			const updateData = {
				brand: 'Honda',
				model: 'Civic',
				year: 2023,
				km: 6000,
			};

			mockUpdate.mockRejectedValue(new Error('Update error'));

			const req = mockRequest({ id: '1' }, updateData);
			const res = mockResponse();

			await updateVehicle(req, res);

			expect(mockUpdate).toHaveBeenCalled();
			expect(res.status).toHaveBeenCalledWith(500);
			expect(res.json).toHaveBeenCalledWith({
				message: 'Error updating vehicle',
			});
		});
	});

	describe('deleteVehicle', () => {
		test('Should return status 204 when vehicle deleted', async () => {
			const deletedVehicle = {
				id: 1,
				brand: 'Toyota',
				model: 'Corolla',
				year: 2020,
				km: 15_000,
			};

			mockDelete.mockResolvedValue(deletedVehicle);

			const req = mockRequest({ id: '1' });
			const res = mockResponse();

			await deleteVehicle(req, res);

			expect(mockDelete).toHaveBeenCalledWith(1);
			expect(res.status).toHaveBeenCalledWith(204);
			expect(res.json).toHaveBeenCalledWith(deletedVehicle);
		});

		test('Should return status 404 when vehicle not found', async () => {
			mockDelete.mockResolvedValue(null);

			const req = mockRequest({ id: '999' });
			const res = mockResponse();

			await deleteVehicle(req, res);

			expect(mockDelete).toHaveBeenCalled();
			expect(res.status).toHaveBeenCalledWith(404);
			expect(res.json).toHaveBeenCalledWith({ message: 'Vehicle not found' });
		});

		test('Should return status 500 on deletion error', async () => {
			mockDelete.mockRejectedValue(new Error('Deletion error'));

			const req = mockRequest({ id: '1' });
			const res = mockResponse();

			await deleteVehicle(req, res);

			expect(mockDelete).toHaveBeenCalled();
			expect(res.status).toHaveBeenCalledWith(500);
			expect(res.json).toHaveBeenCalledWith({
				message: 'Error deleting vehicle',
			});
		});
	});
});
