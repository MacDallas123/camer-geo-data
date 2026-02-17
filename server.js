require('dotenv').config();
const express = require('express');
const db = require("./db");
const sequelize = require("./sequelize");
const cors = require("cors");
const bodyParser = require('body-parser');
const geojsonRoutes = require('./routes/geojson');
const http = require('http');
const path = require('path');

const app = express();

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));
app.use(bodyParser.json());

app.use(cors({
  origin: '*',  // Autoriser toutes les origines
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// app.options('*', cors());

// Start of any route

let routeHead = "/api";
// Version 1
let version1 = "/v1";
app.use(`${routeHead}${version1}/files`, geojsonRoutes)
app.use(`${routeHead}${version1}/generated`, express.static(path.join(__dirname, "resources", "generated")))
//app.use(`${routeHead}/uploads`, express.static(path.join(__dirname, "uploads")))

// Version 2
// let version2 = "/v2";
// app.use(`${routeHead}${version2}/files`, geojsonRoutes)
// app.use(`${routeHead}${version2}/generated`, express.static(path.join(__dirname, "resources", "generated")))

// Gestion des erreurs 404
app.use((req, res) => {
    res.status(404).json({ message: 'Route non trouvée' });
});

const port = process.env.PORT || 3007;

async function dbConfigurations() {
  // créer la base de donées si elle n'existe pas
  console.log("Synchronisation de la bd...");
  await db.createDb(process.env.DB_NAME || 'camergd_db');
  
  // Synchroniser les modèles avec la base de données
  //sequelize.sync({ force: true })
  sequelize.sync({ alter: true })
  .then(async () => {
    console.log("Les tables ont été synchronisées");
    // await createInit();
  })
  .catch((err) => console.log("Erreur : " + err));
}

// Routes
async function startApplication() {
  try {
    await dbConfigurations();

    const server = http.createServer(app);

    server.listen(port, () => {
        console.log(`L'API (et WebSocket) est disponible via localhost:${port}`);
    });
  } catch (err) {
    console.error('Erreur lors du démarrage de l\'application : ' + err);
    process.exit(1);
  }
}

// Gestion de l'arrêt propre de l'application
process.on('SIGINT', async () => {
    console.log('\n🛑 Arrêt de l\'application...');
    try {
        // Fermer la connexion à la base de données
        await sequelize.close();
        console.log('✅ Base de données fermée proprement');
        
        console.log('✅ Application arrêtée proprement');
        process.exit(0);
    } catch (error) {
        console.error('❌ Erreur lors de l\'arrêt:', error);
        process.exit(1);
    }
});

process.on('SIGTERM', async () => {
    console.log('\n🛑 Arrêt de l\'application (SIGTERM)...');
    try {
        await sequelize.close();
        console.log('✅ Application arrêtée proprement');
        process.exit(0);
    } catch (error) {
        console.error('❌ Erreur lors de l\'arrêt:', error);
        process.exit(1);
    }
});

startApplication().then(() => { console.log("APPLICATION START SUCCESSFULLY"); }).catch((err) => { console.log("ERROR", err) });