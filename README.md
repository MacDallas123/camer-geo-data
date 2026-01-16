# CAMERGD

# Application NodeJS et ExpressJS

## Description
Cette application fournit une API RESTful développée avec Node.js et Express.js pour la gestion de données géographiques. Elle s’appuie sur **PostgreSQL** comme système de gestion de base de données et **Sequelize** comme ORM pour faciliter l’interaction avec la base de données.


## 📋 Prérequis

- Node.js (version 22.12.0+)
- npm (version 10.9.0)

## 🛠️ Installation

### Clonage du Projet

```bash
git clone https://github.com/MacDallas123/camer-geo-data.git
cd camgd-api
```

### Installation des Dépendances

```bash
npm install
```


## 🔧 Configuration

1. Créez un fichier `.env` à la racine du projet
2. Ajoutez les variables d'environnement suivantes :

### version non dockerisée
```
# Configuration de la base de données
DB_HOST=localhost
DB_USER=postgres
DB_NAME=camgd_db
DB_PASSWORD=postgres
DB_PORT=5432

DEFAULT_DB_NAME=postgres

PORT=3007

NODE_ENV=development
```

3. Créez un fichier `.database.env` à la racine du projet
4. Ajoutez les variables d'environnement suivantes :

```
POSTGRES_USER=user
POSTGRES_PASSWORD=password
POSTGRES_DB=camgd_db
```

## 🚦 Démarrage de l'Application

#### Version non dockerisée
```bash
npm run dev
```

#### Version dockerisée
```
docker compose up --build
```

Retirer le *--build* si vous ne souhaitez pas reconstruire l'image


## 📡 Points de Terminaison API

### 🖼️ fichiers

- `GET /api/v1/files/import` - Importer les donnees depuis des geojson dans la BD
- `GET /api/v1/files/by-coordinates-geojson` - A partir d'un point retourner les geojson de la region, departement et arrondissement
- `GET|POST /api/v1/files/by-coordinates` - A partir d'un point retourner les liens des fichiers geojson de la region, departement et arrondissement
- `get /api/v1/fiels/test` - Tester la generation d'image

## 📝 Exemples de Requêtes

### Generer les fichiers geojson qui contiennent le point de latitude longitude donné
```bash
curl -X GET http://localhost:3007/api/v1/files/by-coordinates?lng=10.44&lat=5.80
```

### voir le geojson de la region retourée
```bash
curl -X GET http://localhost:3007/api/v1/generated/reg.geojson
```

## 📊 Codes de Statut HTTP

### Succès
- `200 OK` - Requête réussie
- `201 Created` - Ressource créée avec succès
- `204 No Content` - Requête réussie sans contenu de réponse

### Erreurs Client
- `400 Bad Request` - Requête malformée ou données invalides
- `401 Unauthorized` - Authentification requise ou token invalide
- `403 Forbidden` - Accès interdit (droits insuffisants)
- `404 Not Found` - Ressource non trouvée
- `409 Conflict` - Conflit de données (ex: email déjà utilisé)
- `422 Unprocessable Entity` - Données valides mais non traitées

### Erreurs Serveur
- `500 Internal Server Error` - Erreur interne du serveur
- `503 Service Unavailable` - Service temporairement indisponible

## ⚠️ Gestion des Erreurs

### Format de Réponse d'Erreur
```json
{
  "error": "Description de l'erreur",
  "message": "Message détaillé",
  "statusCode": 400,
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

### Middleware de Sécurité
- **Rate Limiting** - Limitation du nombre de requêtes
- **CORS** - Configuration des origines autorisées
- **Helmet** - Headers de sécurité HTTP
- **Validation** - Validation des données d'entrée


## 🛠️ Outils de Développement

### Scripts NPM Disponibles
```bash
# Démarrage en mode développement
npm run dev

# Démarrage en mode production
npm start

# Tests unitaires
npm test
```

### Outils de Debugging
- **Logs détaillés** en mode développement
- **Validation des données** avec messages d'erreur clairs
- **Gestion des erreurs** centralisée
- **Monitoring** des performances

### Base de Données
- **Migration automatique** au démarrage
- **Seeding** des données de test
- **Backup** automatique recommandé
- **Indexation** optimisée pour les requêtes

## 🧪 Tests

```bash
# Tests unitaires
npm test
```

## 🔒 Sécurité

- **Cookies sécurisés** (httpOnly, Secure, SameSite)
- **Validation des entrées**
- **Protection contre les attaques CSRF et XSS**

## 📦 Dépendances Principales

- Express.js
- dotenv
- cors
- sequelize

## 📝 Structure du Projet

```
app/
│
├── controllers/
├── models/ 
├── resources/
├── routes/
│
├── .env
├── .env.production
├── .gitignore
├── database.env
├── db.js
├── Dockerfile
├── docker-compose.yml
├── package.json
├── sequelize.js
└── README.md
```

## 🤝 Contribution

1. Forkez le projet
2. Créez votre branche de fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Commitez vos modifications (`git commit -m 'Add some AmazingFeature'`)
4. Poussez vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📜 Licence

Distribué sous la licence MIT. Voir `LICENSE` pour plus d'informations.

## 📞 Contact

Mac Dallas - [roylexstephane@gmail.com]

Lien du Projet: [https://github.com/MacDallas123/camer-geo-data.git](https://github.com/MacDallas123/camer-geo-data)