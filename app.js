import config from './config';
import Server from './server/server';
require('dotenv').config()

global.__config = config; // On met à disposition la configuration dans toute l'application
global.__base_folder = __dirname;

/**
 * Initialisation du serveur
 * @param port (Port d'écoute du serveur)
 * @param cluster (true pour activer le mode cluster)
 */
new Server(config.app_port, config.cluster_mode).start();