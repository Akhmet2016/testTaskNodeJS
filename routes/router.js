const express = require('express');
const carsController = require('../controllers/cars.controller')

const router = express.Router();

router.get('/cars/:brand', carsController.getAll);
router.get('/cars/:brand/:engine', carsController.getByEngine);

module.exports = router;