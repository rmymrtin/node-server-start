import { Router } from 'express';
var router = Router();

// Middleware
import { verifyJWT_MW } from '../../middleware/jwt';

// Middlewares Routes
import testMiddlewareIndex from '../middleware/testMiddleware/index';

// Routes 
router.get('/', verifyJWT_MW, testMiddlewareIndex);

// Fin des routes

module.exports = router;