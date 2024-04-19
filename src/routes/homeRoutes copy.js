import { Router } from 'express';
import fotoController from '../controllers/FotoController';

const router = new Router();

router.get('/', fotoController.store);

export default router;
