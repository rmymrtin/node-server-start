import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import fs from 'fs';
import cluster from 'cluster';
import colors from 'colors';
import morgan  from 'morgan';
import Routes from '../routes/routes';
import DB from '../db/index';

export default class Server {

    constructor(port, cluster) {
        this.port = port;
        this.cluster = cluster;
    }

    expressServer(port) {
        const app = express();

        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
        
        app.use(helmet());
        
        if(__config.production === false) {
            app.use(morgan('dev'));
        }

        app.use(function (req, res, next) {

            res.setHeader('Access-Control-Allow-Origin', '*');

            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,authorization');

            res.setHeader('Access-Control-Allow-Credentials', true);

            next();
        });

        const db = new DB().connect();
        global.db = db;

        var server = http.createServer(app).listen(port, '0.0.0.0', () => {

            if(__config.production === false) {
                if(this.cluster) {
                    console.log('Serveur' + ` #${cluster.worker.id}`.green + ' en écoute')
                } else {
                    console.log('Serveur en écoute')
                }
            }
        });

        app.use(new Routes);

        app.use(function (req, res, next) {
            const send = {
                response: 'Not Found',
                status: 'error',
                statusCode: '404'
            }
            res.status(404).send(send);
        });

        return app;
    }

    clusterMode () {
        let workers = [];
        // to read number of cores on system
        let numCores = require('os').cpus().length;
        //console.log('Master cluster setting up ' + numCores + ' workers');
    
        // iterate on number of cores need to be utilized by an application
        // current example will utilize all of them
        for(let i = 0; i < numCores; i++) {
            // creating workers and pushing reference in an array
            // these references can be used to receive messages from workers
            workers.push(cluster.fork());
    
            // to receive messages from worker process
            workers[i].on('message', function(message) {
                console.log(message);
            });
        }
    
        // process is clustered on a core and process id is assigned
        cluster.on('online', function(worker) {
            if(__config.production === false) {
                console.log('Worker '.yellow + worker.process.pid + ' is listening'.green);
            }
        });
    
        // if any of the worker process dies then start a new one by simply forking another one
        cluster.on('exit', function(worker, code, signal) {
            console.log('Worker '.yellow + worker.process.pid + ' died with code: '.red + code + ', and signal: '.red + signal);
            console.log('Starting a new worker');
            cluster.fork();
            workers.push(cluster.fork());
            // to receive messages from worker process
            workers[workers.length-1].on('message', function(message) {
                console.log(message);
            });
        });
    };

    start() {

        // Si le mode cluster est activé
        if(this.cluster && cluster.isMaster) {
            this.clusterMode();
        } // Sinon on lance le serveur normalement 
         else {
            this.expressServer(this.port)
        }
    }

}