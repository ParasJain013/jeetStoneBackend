const db = require('../config/firebase');
const { productSchema } = require('../schema');

// Get all products
const getProducts = async (req, res) => {
    try {
        const snapshot = await db.collection('products').get();
        const products = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        res.status(200).json(products);
    } catch (error) {
        console.error("Error getting products:", error);
        res.status(500).json({ error: error.message });
    }
};

// Add a new product

const array = [
  {
    "productName": "Fossil Mint Sandstone",
    "brief": "This is brief for fossil mint sandstone.",
    "description": "This is description for fossil mint sandstone. This is description for fossil mint sandstone. This is description for fossil mint sandstone. This is description for fossil mint sandstone.",
    "categoryId": "7JBCPm3gt7Q5Frgez3Nd",
    "topProduct": false,
    "availableSizes": [
      "300*300",
      "600*300",
      "600*600",
      "600*900"
    ],
    "applications": [
      "Flooring",
      "Paving"
    ],
    "specifications": {
      "Material Type": "Sandstone",
      "Finish": "Natural",
      "Thickness": "15 - 30 mm",
      "Edge Profile": "Hand Dressed"
    },
    "productImages": [
      "https://www.google.com/imgres?q=sandstone%20paving%20images&imgurl=https%3A%2F%2Fmeltonstone.co.uk%2Fmedia%2Fcatalog%2Fproduct%2Fcache%2F90ffec3369cd111374b6fe82b09ffa8d%2Ff%2Fi%2Ffile_000_2.png&imgrefurl=https%3A%2F%2Fmeltonstone.co.uk%2Findian-sandstone-paving.html&docid=FDAw6673Rb7OkM&tbnid=qZ6-Yy2sB3U8JM&vet=12ahUKEwiF2tCLweWPAxVcTGwGHVkZGUQQM3oECBgQAA..i&w=800&h=800&hcb=2&ved=2ahUKEwiF2tCLweWPAxVcTGwGHVkZGUQQM3oECBgQAA",
      "https://www.google.com/imgres?q=sandstone%20paving%20images&imgurl=https%3A%2F%2Fmeltonstone.co.uk%2Fmedia%2Fcatalog%2Fproduct%2Fcache%2F90ffec3369cd111374b6fe82b09ffa8d%2Ff%2Fi%2Ffile_000_2.png&imgrefurl=https%3A%2F%2Fmeltonstone.co.uk%2Findian-sandstone-paving.html&docid=FDAw6673Rb7OkM&tbnid=qZ6-Yy2sB3U8JM&vet=12ahUKEwiF2tCLweWPAxVcTGwGHVkZGUQQM3oECBgQAA..i&w=800&h=800&hcb=2&ved=2ahUKEwiF2tCLweWPAxVcTGwGHVkZGUQQM3oECBgQAA"
    ],
    "imgUrls": [
      "https://www.google.com/imgres?q=sandstone%20paving%20images&imgurl=https%3A%2F%2Fmeltonstone.co.uk%2Fmedia%2Fcatalog%2Fproduct%2Fcache%2F90ffec3369cd111374b6fe82b09ffa8d%2Ff%2Fi%2Ffile_000_2.png&imgrefurl=https%3A%2F%2Fmeltonstone.co.uk%2Findian-sandstone-paving.html&docid=FDAw6673Rb7OkM&tbnid=qZ6-Yy2sB3U8JM&vet=12ahUKEwiF2tCLweWPAxVcTGwGHVkZGUQQM3oECBgQAA..i&w=800&h=800&hcb=2&ved=2ahUKEwiF2tCLweWPAxVcTGwGHVkZGUQQM3oECBgQAA"
    ],
    "createTime": "2025-09-19T19:07:44.260001Z",
    "updateTime": "2025-09-19T19:13:42.119120Z"
  },
  {
    "productName": "Walling Stone",
    "brief": "This is walling stone product.",
    "description": "This is description for walling stone. This is description for walling stone. This is description for walling stone. This is description for walling stone.",
    "categoryId": "qsLbJSogw0BxnLdmT9iF",
    "topProduct": false,
    "availableSizes": [
      "300*300",
      "600*300",
      "600*600"
    ],
    "applications": [
      "Flooring",
      "Table tops",
      "Walling"
    ],
    "specifications": {
      "Material Type": "Sandstone",
      "Finish": "Natural",
      "Thickness": "15 cm - 35 cm (Customizable)",
      "Edge Profile": "Sawn & Tumbled"
    },
    "productImages": [
      "https://www.google.com/imgres?q=sandstone%20paving%20images&imgurl=https%3A%2F%2Ftalasey.co.uk%2Fwp-content%2Fuploads%2F2024%2F10%2FNatural-Paving-Classicstone-Graphite-Stone-Paving-with-Twin-Planter-raised-Patio-Entrance-scaled.jpg&imgrefurl=https%3A%2F%2Ftalasey.co.uk%2Fproduct%2Fgraphite-sandstone-patio-paving%2F&docid=XW_HI3JSq_JC7M&tbnid=0XRA8ZIRMVkzzM&vet=12ahUKEwiF2tCLweWPAxVcTGwGHVkZGUQQM3oECBsQAA..i&w=2560&h=2560&hcb=2&ved=2ahUKEwiF2tCLweWPAxVcTGwGHVkZGUQQM3oECBsQAA",
      "https://www.google.com/imgres?q=sandstone%20paving%20images&imgurl=https%3A%2F%2Ftalasey.co.uk%2Fwp-content%2Fuploads%2F2024%2F10%2FNatural-Paving-Classicstone-Graphite-Stone-Paving-with-Twin-Planter-raised-Patio-Entrance-scaled.jpg&imgrefurl=https%3A%2F%2Ftalasey.co.uk%2Fproduct%2Fgraphite-sandstone-patio-paving%2F&docid=XW_HI3JSq_JC7M&tbnid=0XRA8ZIRMVkzzM&vet=12ahUKEwiF2tCLweWPAxVcTGwGHVkZGUQQM3oECBsQAA..i&w=2560&h=2560&hcb=2&ved=2ahUKEwiF2tCLweWPAxVcTGwGHVkZGUQQM3oECBsQAA"
    ],
    "imgUrls": "https://www.google.com/imgres?q=sandstone%20paving%20images&imgurl=https%3A%2F%2Ftalasey.co.uk%2Fwp-content%2Fuploads%2F2024%2F10%2FNatural-Paving-Classicstone-Graphite-Stone-Paving-with-Twin-Planter-raised-Patio-Entrance-scaled.jpg&imgrefurl=https%3A%2F%2Ftalasey.co.uk%2Fproduct%2Fgraphite-sandstone-patio-paving%2F&docid=XW_HI3JSq_JC7M&tbnid=0XRA8ZIRMVkzzM&vet=12ahUKEwiF2tCLweWPAxVcTGwGHVkZGUQQM3oECBsQAA..i&w=2560&h=2560&hcb=2&ved=2ahUKEwiF2tCLweWPAxVcTGwGHVkZGUQQM3oECBsQAA",
    "createTime": "2025-09-19T19:01:22.528129Z",
    "updateTime": "2025-09-19T19:02:29.227824Z"
  },
  {
    "productName": "Yellow Mint Sandstone",
    "brief": "This is yellow mint sandstone paving.",
    "description": "This is description for yellow mint sandstone paving. This is description for yellow mint sandstone paving.",
    "categoryId": "7JBCPm3gt7Q5Frgez3Nd",
    "topProduct": true,
    "availableSizes": [
      "600x300",
      "600x600",
      "600x900",
      "400x400",
      "600x400",
      "800x400"
    ],
    "applications": [
      "Flooring",
      "Table tops",
      "Commercial spaces",
      "Wall claddings"
    ],
    "specifications": {
      "Material Type": "Sandstone",
      "Colour": "Yellow Mint",
      "Finish": "Natural",
      "Thickness": "15 cm - 35 cm (Customizable)",
      "Edge Profile": "Sawn Edges",
      "Packaging": "Wooden crate with plastic banding strap."
    },
    "productImages": ["https://www.google.com/imgres?imgurl=https%3A%2F%2Fimages.squarespace-cdn.com%2Fcontent%2Fv1%2F6526cbce796a5a3db71574cd%2Ffbbf2641-061f-4027-bb52-6ceccc489cd2%2FBUFF%2BSTEPPING%2BSTONES.jpg&tbnid=VZXFrMvGeDsixM&vet=12ahUKEwiDiOXRjNiPAxXca2wGHRynMpgQxiAoBnoECAAQMA..i&imgrefurl=https%3A%2F%2Fwww.newenglandsilica.com%2Fstepping-stones&docid=rzKJVPm8NOLqOM&w=500&h=667&itg=1&q=australian%20style%20sandstone%20stepping%20stones&ved=2ahUKEwiDiOXRjNiPAxXca2wGHRynMpgQxiAoBnoECAAQMA"]
    }
]
const setProducts = async (req, res) => {
    try {
        array.forEach(async (item) => {
            const { error, value } = productSchema.validate(item, { abortEarly: false });
            const newDoc = await db.collection('products').add(value);
        });
        // const { error, value } = productSchema.validate(req.body, { abortEarly: false });

        // if (error) {
        //     return res.status(400).json({
        //         message: 'Validation failed',
        //         details: error.details.map(e => e.message)
        //     });
        // }

        // const newDoc = await db.collection('products').add(value);

        res.status(201).json({
            message: 'Product added successfully',
            // id: newDoc.id
        });
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ error: error.message });
    }
};

// Update an existing product by ID
const updateProducts = async (req, res) => {
    try {
        const productId = req.params.id;
        const { error, value } = productSchema.validate(req.body, { abortEarly: false });

        if (error) {
            return res.status(400).json({
                message: 'Validation failed',
                details: error.details.map(e => e.message)
            });
        }

        const productRef = db.collection('products').doc(productId);
        const doc = await productRef.get();

        if (!doc.exists) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await productRef.update(value);

        res.status(200).json({ message: 'Product updated successfully' });
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getProducts,
    setProducts,
    updateProducts
};
