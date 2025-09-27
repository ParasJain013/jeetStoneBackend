const { categorySchema } = require('../schema');
const db = require('../config/firebase');
// Get all categories
const getCategories = async (req, res) => {
    try {
        const snapshot = await db
            .collection('categories')
            .where('status', '==', true) //  only fetch categories where status = true
            .get();

        const categories = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        res.status(200).json(categories);
    } catch (error) {
        console.error("Error getting categories:", error);
        res.status(500).json({ error: error.message });
    }
};

const setCategory = async (req, res) => {
    try {
        const { error, value } = categorySchema.validate(req.body, { abortEarly: false });
        array.forEach(async (item)=>{
            const { error, value } = categorySchema.validate(item, { abortEarly: false });
            const newDoc = await db.collection('categories').add(value);
        })

        if (error) {
            return res.status(400).json({
                message: 'Validation failed',
                details: error.details.map(e => e.message)
            });
        }

        // const newDoc = await db.collection('categories').add(value);

        res.status(201).json({
            message: 'Category added successfully',
            // id: newDoc.id
        });
    } catch (error) {
        console.error("Error adding category:", error);
        res.status(500).json({ error: error.message });
    }
};

// Update an existing category by ID
const updateCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const { error, value } = categorySchema.validate(req.body, { abortEarly: false });

        if (error) {
            return res.status(400).json({
                message: 'Validation failed',
                details: error.details.map(e => e.message)
            });
        }

        const categoryRef = db.collection('categories').doc(categoryId);
        const doc = await categoryRef.get();

        if (!doc.exists) {
            return res.status(404).json({ message: 'Category not found' });
        }

        await categoryRef.update(value);

        res.status(200).json({ message: 'Category updated successfully' });
    } catch (error) {
        console.error("Error updating category:", error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getCategories,
    setCategory,
    updateCategory
};
