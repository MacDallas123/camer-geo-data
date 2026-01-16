# CAMERGD

# Application NodeJS et ExpressJS

## Description
API node.js et express.js permet l'authentification des utilisateurs via génération d'un token d'accès. Elle utilise **Postgresql** comme sgbd, **sequelize** comme ORM;


## 📋 Prérequis

- Node.js (version 22.12.0+)
- npm (version 10.9.0)

## 🛠️ Installation

### Clonage du Projet

```bash
git clone https://github.com/REIMCA/camgd-api.git
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
JWT_SECRET=jwt_secret

# Configuration de la base de données
DB_HOST=localhost
DB_USER=postgres
DB_NAME=camgd_bd
DB_PASSWORD=postgres
DB_PORT=5432

DEFAULT_DB_NAME=postgres

PORT=5000

NODE_ENV=production

ADMIN_FULLNAME=Admin
ADMIN_EMAIL=admin@gmail.com
ADMIN_PHONE=+237680700587
ADMIN_PASSWORD=1234567a

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=handsome.nearby@gmail.com
SMTP_PASS=pwwbogzwonfzhbla
FROM_EMAIL_NAME="CAMGD"
FROM_EMAIL_ADDRESS=handsome.nearby@gmail.com

PORT=3007

NODE_ENV=development
```

3. Créez un fichier `.database.env` à la racine du projet
4. Ajoutez les variables d'environnement suivantes :

```
POSTGRES_USER=reimca
POSTGRES_PASSWORD=reimca
POSTGRES_DB=reimca_db
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

### 🔐 Authentification

- `POST /api/auth/register` - Inscription d'un nouvel utilisateur
- `POST /api/auth/login` - Connexion (génère access token + refresh token)
- `POST /api/auth/logout` - Déconnexion (révoque le refresh token)
- `POST /api/auth/logout-all` - Déconnexion de tous les appareils (révoque tous les tokens)
- `POST /api/auth/refresh` - Rafraîchir le token d'accès
- `POST /api/auth/send-reset-code` - Envoyer le code de réinitialisation du mot de passe par email
- `POST /api/auth/verify-code` - Vérifier le code de réinitialisation
- `POST /api/auth/reset-password` - Réinitialiser le mot de passe à partir du code envoyé par mail

### 👥 Utilisateurs

- `GET /api/users` - Liste de tous les utilisateurs (Accès admin)
- `GET /api/users/:id` - Récupérer un utilisateur par ID (Accès utilisateur)
- `PATCH /api/users/:id` - Modifier un utilisateur (Accès admin)
- `PATCH /api/users/current/update-profile` - Modifier le profil de l'utilisateur courant (Accès utilisateur)
- `PATCH /api/users/current/change-password` - Changer le mot de passe de l'utilisateur courant (Accès utilisateur)
- `DELETE /api/users/:id` - Supprimer un utilisateur (Accès admin)
- `DELETE /api/users/current/delete-profile` - Supprimer le profil de l'utilisateur courant (Accès utilisateur)
- `POST /api/users/create-admin` - Créer un administrateur (Accès admin)

### 🏠 Annonces

- `POST /api/announces` - Créer une nouvelle annonce (Accès utilisateur)
- `GET /api/announces` - Récupérer toutes les annonces (public)
- `GET /api/announces/:id` - Récupérer une annonce par ID (public)
- `PUT /api/announces/:id` - Modifier une annonce (Accès utilisateur)
- `DELETE /api/announces/:id` - Supprimer une annonce (Accès utilisateur)

### 🖼️ Media des Annonces

- `POST /api/announces/:announceId/media` - Ajouter un media à une annonce (Accès utilisateur)
- `DELETE /api/announces/media/:id` - Supprimer un media (Accès utilisateur)
- `PUT /api/announces/media/:id/main` - Définir un media comme principale (Accès utilisateur)

### 💬 Conversations et Messages

- `POST /api/conversations` - Créer une nouvelle conversation (Accès utilisateur)
- `GET /api/conversations` - Récupérer toutes les conversations de l'utilisateur (Accès utilisateur)
- `GET /api/conversations/:id` - Récupérer une conversation par ID (Accès utilisateur)
- `POST /api/conversations/:id/messages` - Ajouter un message à une conversation (Accès utilisateur)
- `DELETE /api/conversations/:id` - Supprimer une conversation (Accès utilisateur)

### 🔔 Notifications

- `POST /api/notifications/users/:userId` - Créer une notification pour un utilisateur (Accès admin)
- `GET /api/notifications` - Récupérer toutes les notifications de l'utilisateur (Accès utilisateur)
- `PUT /api/notifications/:id/read` - Marquer une notification comme lue (Accès utilisateur)
- `PUT /api/notifications/read-all` - Marquer toutes les notifications comme lues (Accès utilisateur)
- `DELETE /api/notifications/:id` - Supprimer une notification (Accès utilisateur)
- `DELETE /api/notifications/read` - Supprimer toutes les notifications lues (Accès utilisateur)

### ❤️ Favoris

- `POST /api/favorites/announces/:announceId` - Ajouter une annonce aux favoris (Accès utilisateur)
- `GET /api/favorites` - Récupérer toutes les annonces favorites (Accès utilisateur)
- `DELETE /api/favorites/announces/:announceId` - Retirer une annonce des favoris (Accès utilisateur)
- `GET /api/favorites/announces/:announceId/check` - Vérifier si une annonce est dans les favoris (Accès utilisateur)

### 🏷️ Tags

- `POST /api/tags` - Créer un nouveau tag (Accès admin)
- `GET /api/tags` - Récupérer tous les tags avec leur nombre d'annonces (public)
- `GET /api/tags/:tagName/announces` - Récupérer toutes les annonces pour un tag spécifique (public)
- `DELETE /api/tags/:id` - Supprimer un tag (Accès admin)
- `POST /api/tags/merge` - Fusionner des tags (Accès admin)

## 📋 Paramètres de Requête

### Filtres pour les Annonces (`GET /api/announces`)
- `type` (string) - Filtrer par type de bien : `HOUSE`, `APARTMENT`, `LAND`, `OFFICE`
- `forSale` (boolean) - Filtrer par vente/location : `true` pour vente, `false` pour location
- `minPrice` (number) - Prix minimum
- `maxPrice` (number) - Prix maximum
- `minArea` (number) - Surface minimum en m²
- `maxArea` (number) - Surface maximum en m²

### Pagination
- `page` (number) - Numéro de page (défaut: 1)
- `limit` (number) - Nombre d'éléments par page (défaut: 10)

### Tri
- `sortBy` (string) - Champ de tri : `createdAt`, `price`, `area`, `updatedAt`
- `order` (string) - Ordre de tri : `ASC` ou `DESC` (défaut: `DESC`)

## 📝 Exemples de Requêtes

### Créer une Annonce
```bash
curl -X POST http://localhost:3000/api/announces \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "geom": {
      "type": "Point",
      "coordinates": [2.3522, 48.8566]
    },
    "cost": "250000",
    "area": 120,
    "type": "HOUSE",
    "forSale": true,
    "mainrooms": 4,
    "bedrooms": 3,
    "levels": 2,
    "fenced": true,
    "furnished": false,
    "moreDescription": "Belle maison avec jardin"
  }'
```

### Connexion avec Tokens
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "identifier": "user@example.com",
    "password": "password123"
  }'
```

### Rafraîchir un Token
```bash
curl -X POST http://localhost:3000/api/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{
    "refreshToken": "your_refresh_token_here"
  }'
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

### Erreurs Courantes

#### Authentification
```json
{
  "error": "Token d'accès requis",
  "message": "Veuillez vous connecter pour accéder à cette ressource"
}
```

#### Validation
```json
{
  "error": "Données invalides",
  "message": "Le champ 'email' doit être une adresse email valide"
}
```

#### Autorisation
```json
{
  "error": "Accès interdit",
  "message": "Vous n'avez pas les droits pour effectuer cette action"
}
```

## 👥 Rôles et Permissions

### Rôles Disponibles
- **DEFAULT** - Utilisateur standard
- **AGENT** - Agent immobilier
- **ADMIN** - Administrateur système

### Permissions par Rôle

#### DEFAULT (Utilisateur Standard)
- ✅ Consulter les annonces
- ✅ Créer/modifier/supprimer ses propres annonces
- ✅ Gérer ses favoris
- ✅ Participer aux conversations
- ✅ Gérer ses notifications
- ✅ Modifier son profil
- ❌ Accès aux fonctionnalités admin

#### AGENT (Agent Immobilier)
- ✅ Toutes les permissions DEFAULT
- ✅ Créer des annonces pour d'autres utilisateurs
- ✅ Accès aux statistiques de base
- ❌ Gestion des utilisateurs
- ❌ Gestion des tags

#### ADMIN (Administrateur)
- ✅ Toutes les permissions
- ✅ Gestion complète des utilisateurs
- ✅ Création/suppression de tags
- ✅ Accès aux statistiques avancées
- ✅ Gestion des notifications système
- ✅ Modération du contenu

## 🔧 Configuration Avancée

### Variables d'Environnement Supplémentaires
```env
# Configuration des tokens
JWT_ACCESS_TOKEN_EXPIRY=15m
JWT_REFRESH_TOKEN_EXPIRY=7d

# Configuration des uploads
MAX_FILE_SIZE=5242880
ALLOWED_IMAGE_TYPES=jpg,jpeg,png,gif,webp

# Configuration des emails
SMTP_SECURE=false
SMTP_REQUIRE_TLS=true

# Configuration de la base de données
DB_POOL_MAX=10
DB_POOL_MIN=0
DB_POOL_ACQUIRE=30000
DB_POOL_IDLE=10000
```

### Middleware de Sécurité
- **Rate Limiting** - Limitation du nombre de requêtes
- **CORS** - Configuration des origines autorisées
- **Helmet** - Headers de sécurité HTTP
- **Validation** - Validation des données d'entrée

## 📚 Documentation API

### Swagger UI
L'API est documentée avec Swagger UI accessible à l'adresse :
```
http://localhost:3000/api-docs
```

### Endpoints de Documentation
- `GET /api-docs` - Interface Swagger UI
- `GET /api-docs.json` - Spécification OpenAPI au format JSON
- `GET /api-docs.yaml` - Spécification OpenAPI au format YAML

### Exemples de Documentation Swagger
Chaque endpoint est documenté avec :
- **Description** détaillée de la fonctionnalité
- **Paramètres** d'entrée avec types et validation
- **Réponses** possibles avec codes de statut
- **Exemples** de requêtes et réponses
- **Authentification** requise ou non

## 🛠️ Outils de Développement

### Scripts NPM Disponibles
```bash
# Démarrage en mode développement
npm run dev

# Démarrage en mode production
npm start

# Tests unitaires
npm test

# Test du système de tokens
node test-tokens.js

# Exemple d'utilisation client
node examples/client-example.js
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

# Test du système de tokens
node test-tokens.js

# Exemple d'utilisation client
node examples/client-example.js
```

## 🔒 Sécurité

- **Système de tokens d'accès et de rafraîchissement**
  - Access tokens (15 minutes) pour l'authentification API
  - Refresh tokens (7 jours) pour renouveler les access tokens
  - Révocation automatique lors de la déconnexion
  - Nettoyage automatique des tokens expirés
- **Cookies sécurisés** (httpOnly, Secure, SameSite)
- **Validation des entrées**
- **Protection contre les attaques CSRF et XSS**
- **Hachage des mots de passe avec bcrypt**

## 📦 Dépendances Principales

- Express.js
- bcrypt
- jsonwebtoken
- dotenv
- cors
- sequelize
- amqplib
- eureka-js-client

## 📝 Structure du Projet

```
app/
│
├── controllers/
├── db/
├── docs/
├── examples/
├── middleware/
├── models/ 
├── routes/
├── services/
├── uploads/
│
├── .env
├── .env.development
├── .gitignore
├── database.env
├── db.js
├── Dockerfile
├── docker-compose.yml
├── package.json
├── redis-config.js
├── swagger.js
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

Lien du Projet: [https://github.com/REIMCA/reimca-api.git](https://github.com/REIMCA/reimca-api)