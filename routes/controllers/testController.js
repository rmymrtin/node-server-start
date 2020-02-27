import { Router } from 'express';
var router = Router();

// Middlewares
import testMiddlewareIndex from '../middleware/testMiddleware/index';

// Routes 
router.get('/', testMiddlewareIndex);

// Fin des routes

module.exports = router;