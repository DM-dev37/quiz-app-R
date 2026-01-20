import express from 'express';
import authMiddleware from '../middleware/auth.js'
import { createResult, listResults } from '../controllers/resultController.js';


const resultRoutes = express.Router();

resultRoutes.post('/', authMiddleware, createResult);
resultRoutes.get('/', authMiddleware, listResults);

export default resultRoutes;