const db = require('../db'); // Adjust path as needed
const express = require('express');
const router = express.Router();
const controller = require('../controllers/categoryController');

router.get('/', controller.list);
router.post('/add', controller.add);
// Show update form
router.get('/update/:id', controller.editForm);

// Handle update form submission
router.post('/update/:id', controller.update);

router.get('/delete/:id', controller.delete);



module.exports = router;
