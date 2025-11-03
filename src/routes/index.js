import express from 'express';
import router from './pet.route.js';

const routers = express.Router();

routers.use("/vehicles", router);

export default routers;