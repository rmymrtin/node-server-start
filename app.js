import config from './config';
import Server from './server/server';

global.__config = config; // On met à disposition la configuration dans toute l'application

/**
 * Initialisation du serveur
 * @param port (Port d'écoute du serveur)
 * @param cluster (true pour activer le mode cluster)
 */
new Server(config.app_port, config.cluster_mode).start();