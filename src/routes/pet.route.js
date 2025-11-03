import express from 'express';
import * as VehicleController from '../controllers/vehicle-controller.js';
import { validateCreateVehicle } from '../middlewares/create-vehicle.js';
import { ValidateUpdateVehicle } from '../middlewares/update-vehicle.js';

const router = express.Router();

router.get('/', VehicleController.getAllVehicles);

router.get('/:id', VehicleController.getVehicleById);

router.post('/', validateCreateVehicle, VehicleController.createVehicle);

router.put('/:id', ValidateUpdateVehicle, VehicleController.updateVehicle);

router.delete('/:id', VehicleController.deleteVehicle);

export default router;
