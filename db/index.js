import mysql from 'mysql';

export default class DB {

    connect() {

        if(__config.database === 'mysql') {
            var connection = mysql.createConnection({
                host     : process.env.MySQL_HOST,
                user     : process.env.MySQL_USER,
                password : process.env.MySQL_PASSWORD,
                database: process.env.MySQL_DATABASE
              });
               
              connection.connect(function(err) {
                if (err) {
                  console.error('Erreur de connexion: ' + err.stack);
                  return;
                }
               
                console.log('Base de données connecté');
              });

              return connection;
        }

    }

}