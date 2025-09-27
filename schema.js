const Joi = require('joi');

// Schema for Categories collection
const categorySchema = Joi.object({
    title: Joi.string().required(),
    brief: Joi.string().required(),
    description: Joi.string().required(),
    imgUrls: Joi.array().items(Joi.string().uri()).required(),
    hasSubCategory: Joi.boolean().required()
});

// Flexible specifications schema where keys can be anything and values must be strings
const specificationsSchema = Joi.object().pattern(
    Joi.string(),            // keys can be any string
    Joi.string().allow('')   // values are strings (can be empty)
);

// Schema for Products collection
const productSchema = Joi.object({
    productName: Joi.string().required(),
    brief: Joi.string().required(),
    description: Joi.string().required(),
    imgUrls: Joi.array().items(Joi.string().uri()).required(),
    categoryId: Joi.string().required(),
    topProduct: Joi.boolean().required(),
    availableSizes: Joi.array().items(Joi.string()).required(),
    applications: Joi.array().items(Joi.string()).required(),
    specifications: specificationsSchema,  // flexible key-value pairs
    productImages: Joi.array().items(Joi.string().uri()).required()
});

const contactSchema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(/^[0-9]{10,15}$/).required(),
    message: Joi.string().min(1).required(),
});


module.exports = {
    categorySchema,
    productSchema,
    contactSchema
};
