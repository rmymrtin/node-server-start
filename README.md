
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

Utilisez la variable global **db** pour créer vos requêtes, celle-ci est disponible sans importation.

## License

[MIT](https://choosealicense.com/licenses/mit/)