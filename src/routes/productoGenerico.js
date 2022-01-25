const router = require('express').Router();

const productoGenericoController = require('../controllers/productoGenerico');

router.get('/listarLinea', productoGenericoController.listarLinea);

router.get('/listarSubLinea', productoGenericoController.listarSubLinea);

router.post('/buscar', productoGenericoController.buscar);

module.exports = router;