const express = require('express');
const adminRouter = express.Router();

const { setCategory, updateCategory } = require('../controllers/categoriesController');
const { setProducts, updateProducts } = require('../controllers/productController');

// Admin routes for categories
adminRouter.post('/categories', setCategory);
adminRouter.put('/categories/:id', updateCategory);

// Admin routes for products
adminRouter.post('/products', setProducts);
adminRouter.put('/products/:id', updateProducts);

module.exports = adminRouter;
