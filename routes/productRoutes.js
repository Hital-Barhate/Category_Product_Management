const express = require('express');
const router = express.Router();
const controller = require('../controllers/productController');

router.get('/', controller.list);
router.post('/add', controller.add);
router.post('/update/:id', controller.update);
router.get('/delete/:id', controller.delete);

module.exports = router;
