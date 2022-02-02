const router = require('express').Router();

const productoGenericoController = require('../controllers/productoGenerico');

router.get('/listarLinea', productoGenericoController.listarLinea);

router.get('/listarSubLinea', productoGenericoController.listarSubLinea);

router.post('/buscar', productoGenericoController.buscar);

router.post('/buscarAll', productoGenericoController.buscarAll);

router.patch('/actualizarEstado/:id_producto_generico', productoGenericoController.actualizarEstado);

router.get('/buscarMaterial', productoGenericoController.buscarMaterial);

router.get('/buscarUnidadMedida', productoGenericoController.buscarUnidadMedida);

router.post('/crear', productoGenericoController.crear);

router.put('/actualizar', productoGenericoController.actualizar);

module.exports = router;