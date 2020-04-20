
# Node Server Start

  

Commencez le développement d'API REST avec NodeJS facilement

 - Utilisation de ExpressJS pour gérer les routes
 - Support de MySQL et MongoDB
 - Support de JWT

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

Mode Production
```bash
npm start
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

Utilisez la variable global **db** pour créer vos requêtes, celle-ci est disponible sans importation.  
Exemple:
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

const user_data = {
    username: "Arwantys"
}

User.create(user_data, (err, u) => {

    if (err) throw err;
        
    if (u != null) {
        return res.json({ response: 'User ajouté', status: 'success'});
    } else {
        return res.json({ response: 'Oups, un problème est survenue', status: 'error' });
    }
        
})
```

## Protection des routes avec JWT

Le projet intègre déjà les fonctionnalités de base de JWT.

 - Création de token
 - Vérification
 - Protection des routes 

Pour utiliser ceux pour la création et la vérification importez le module situé dans **myproject/services/jwt.js**.  
Exemple :
```javascript
import ServiceJWT from  '../../../services/jwt';
```

Utilisation: 
Créer un token
```javascript
new ServiceJWT().createToken({exemple: 'data'});
```

Vérifier un token
```javascript
var check_token = new ServiceJWT().verifyToken(token);
if(check_token) {
    // Token valide
} else {
    // Token invalid
}
```

Pour protéger une route avec JWT, importez le module **myproject/middleware/jwt.js** dans le **Controller** souhaité, exemple **myproject/routes/controllers/testController.js**  
Pour envoyer le **Token**, utilisez le **Header** **Authorization** (req.headers.authorization)  
Exemple : 

```javascript
import { Router } from 'express';
var router = Router();

// Middleware
import { verifyJWT_MW } from '../../middleware/jwt';

// Middlewares Routes
import testMiddlewareIndex from '../middleware/testMiddleware/index';

// Routes 
router.get('/', verifyJWT_MW, testMiddlewareIndex); // Utilise la protection JWT
router.get('/', testMiddlewareIndex); // Sans la protection JWT

// Fin des routes

module.exports = router;
```

## License

[MIT](https://choosealicense.com/licenses/mit/)