
# Node Server Start

  

Commencez le développement d'API REST avec NodeJS facilement

  

## Installation

  

### Utiliser Git (recommandé)

  

```bash
git clone https://github.com/arwantys/node-server-start.git ./myproject
```

  

### Téléchargement manuel
 1. Télécharger le dépot
 2. Décompresser celui-ci

### Installation des dépendances après installation

npm
```bash
cd myproject
npm install
```
  yarn
  ```bash
cd myproject
yarn add
```

## Usage

Mode Développement
```bash
npm run dev
```

## Usage avec MySQL

Il faut d'abord configurer la variable d'environnement.
Exemple: 
```bash
MySQL_HOST=localhost
MySQL_USER=root
MySQL_PASSWORD=
MySQL_DATABASE=node
```

Assurez-vous que votre configuration utilise bien MySQL
```bash
myproject/config/index.js => database = "mysql"
```

Utilisez la variable global **db** pour créer vos requêtes, celle-ci est disponible sans importation. Exemple:
```javascript
db.query('SELECT * FROM users WHERE id = 1', function(err, results, fields) {
        
    if (err) throw err;
    console.log(results[0].username);
        
});
```

## Usage avec MongoDB

Il faut d'abord configurer la variable d'environnement. Exemple :
```bash
MongoDB_HOST=localhost
MongoDB_DATABASE=node
MongoDB_USER=
MongoDB_PASSWORD=
```

Assurez-vous que votre configuration utilise bien MongoDB
```bash
myproject/config/index.js => database = "mongodb"
```

Pour gérer votre base de données MongoDB j'ai opté pour **mongoose**. Exemple:
```javascript
import mongoose from 'mongoose';

var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
});

const User = mongoose.model('User', UserSchema);

const session = {
    username: "Arwantys"
}

User.create(session, (err, session) => {

    if (err) throw err;
        
    if (session != null) {
        return res.json({ response: 'User ajouté', status: 'success'});
    } else {
        return res.json({ response: 'Oups, un problème est survenue', status: 'error' });
    }
        
})
```

## License

[MIT](https://choosealicense.com/licenses/mit/)