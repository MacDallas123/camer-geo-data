const express = require('express');
const router = express.Router();
const geojsonController = require('../controllers/geojsonController');

// Route to import GeoJSON data
router.get('/import', geojsonController.importData);

// Route to get geojson by coordinates
router.get('/by-coordinates-geojson', geojsonController.getGeojsonByCoordinates);
router.get('/by-coordinates', geojsonController.saveGeojsonFilesByCoordinates);
router.post('/by-coordinates', geojsonController.saveGeojsonFilesByCoordinates);


// Route to generate map image from geojson
router.get('/test', geojsonController.testMapImageCom);

module.exports = router;
