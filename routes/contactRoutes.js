const express = require('express');
const contactRouter = express.Router();
const { sendMessage } = require('../controllers/contactController');

contactRouter.post('/', sendMessage);

module.exports = contactRouter;
