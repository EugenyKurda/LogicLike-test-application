import { Router } from 'express';
import ideasRoutes from './ideas.routes';

const router = Router();

router.use('/ideas', ideasRoutes);

export default router;