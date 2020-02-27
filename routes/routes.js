import { Router } from 'express';

// Controllers
import testController from './controllers/testController';

export default class Routes {

    constructor() {

        // Initialisation du Router
        this.router = Router();

        /**
         * Routes Controller
         */

        this.router.use('/test', testController)

        /** Fin des routes Controller */

        // Retourner le router
        return this.router

    }

}