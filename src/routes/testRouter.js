const router = require('express').Router();

const testController = require('../controllers/testController');

router.get('/timeout', testController.timeout);

router.get('/node_fetch_timeout', testController.node_fetch_timeout);

module.exports = router;