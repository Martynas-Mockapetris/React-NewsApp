import express from 'express';
import * as newsController from '../controllers/newsController.js';

const router = express.Router();

// GET - Pasiimti visas naujienas
router.get('/', newsController.getAllNews);

// GET - Pasiimti vieną naujieną pagal ID
router.get('/:id', newsController.getNewById);

// POST - Sukurti naujieną
router.post('/', newsController.createNew);

// PUT - Atnaujinti naujieną pagal ID
router.put('/:id', newsController.updateNew);

// DELETE - Pašalinti naujieną pagal ID
router.delete('/:id', newsController.deleteNew);

export default router;
