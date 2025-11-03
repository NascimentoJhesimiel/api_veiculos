import express from 'express';
import routers from './routes/index.js';

export const app = express().use(express.json());

app.use('/', routers);
