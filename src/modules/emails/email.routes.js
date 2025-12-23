const express = require('express');
const router = express.Router();
const controller = require('./email.controller');
const registeredEmailCheck = require('../../middleware/registeredEmail.middleware');

router.post(
  '/products', 
  registeredEmailCheck, 
  controller.ingest
);

module.exports = router;