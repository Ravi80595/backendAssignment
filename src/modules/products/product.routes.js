const express = require('express');
const router = express.Router();
const controller = require('./product.controller');
const validator = require('./product.validator');
const auth = require('../../middleware/auth.middleware');
const role = require('../../middleware/role.middleware');

router.use(auth);

router.get('/', role('Admin', 'Staff'), controller.getAll);

router.post('/', role('Admin'), validator.validateCreate, controller.create);

router.put('/:id', role('Admin'), controller.update);

router.delete('/:id', role('Admin', 'Staff'), controller.delete);

module.exports = router;