import express from 'express';
import authMiddleware from '../middleware/auth.js'
import { createResult, listResult } from '../controllers/resultController.js';


const resultRoutes = express.Router();

resultRoutes.post('/', authMiddleware, createResult);
resultRoutes.get('/', authMiddleware, listResult);

export default resultRoutes;