import { Router } from 'express';
import ParsingController from '../controllers/parsingController';

const router = Router();

router.post('/parse', ParsingController.processData);

export default router;