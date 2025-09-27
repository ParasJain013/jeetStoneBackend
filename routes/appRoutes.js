const express = require('express');
const appRouter = express.Router();

const { getCategories } = require('../controllers/categoriesController');
const { getProducts } = require('../controllers/productController');

// Public GET routes
appRouter.get('/categories', getCategories);
appRouter.get('/products', getProducts);

module.exports = appRouter;
