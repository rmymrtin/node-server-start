import mysql from 'mysql';
import mongoose from 'mongoose';

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
        } else  if(__config.database === 'mongodb') {
            mongoose.connect('mongodb://'+process.env.MongoDB_HOST+':27017/'+process.env.MongoDB_DATABASE, {
              user: process.env.MongoDB_USER,
              pass: process.env.MongoDB_PASSWORD,
              useNewUrlParser: true,
              useUnifiedTopology: true
            }, function(err) {
              if(err) throw err;
              console.log('Base de données connecté')
            });

            mongoose.set('useCreateIndex', true);
            mongoose.set('useFindAndModify', false);

            return mongoose.connection;
        }

    }

}