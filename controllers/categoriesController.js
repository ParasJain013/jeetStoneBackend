// const {db} = require('../config/firebase');
const { categorySchema } = require('../schema'); // or categoryValidation if separated
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


// const array =[
//   {
//     "title": "Artifacts",
//     "brief": "This is brief for artifacts.",
//     "description": "This is description for artifacts. This is description for artifacts. This is description for artifacts. This is description for artifacts.",
//     "hasSubCategory": true,
//     "imgUrls": [
//       "https://www.google.com/imgres?imgurl=https%3A%2F%2Fwickistone.com%2Fwp-content%2Fuploads%2F2022%2F03%2FHand-cut-Roundish-Rainbow-Stepping-Stone-Sample.jpg&tbnid=pDgdXigoRcXViM&vet=12ahUKEwjl4cPgntiPAxUdaGwGHRfiA8UQxiAoC3oECAAQOg..i&imgrefurl=https%3A%2F%2Fwickistone.com%2Fhand-cut-rounded-stepping-stones%2F&docid=V7DTuHm4gM58fM&w=900&h=600&itg=1&q=australian%20style%20sandstone%20stepping%20stones&ved=2ahUKEwjl4cPgntiPAxUdaGwGHRfiA8UQxiAoC3oECAAQOg"
//     ]
//   },
//   {
//     "title": "Limestone Paving",
//     "brief": "This is brief for Limestone Paving.",
//     "description": "This is description for Limestone Paving.",
//     "hasSubCategory": true,
//     "imgUrls": [
//       "https://www.google.com/imgres?imgurl=https%3A%2F%2Fwickistone.com%2Fwp-content%2Fuploads%2F2022%2F03%2FHand-cut-Roundish-Rainbow-Stepping-Stone-Sample.jpg&tbnid=pDgdXigoRcXViM&vet=12ahUKEwjl4cPgntiPAxUdaGwGHRfiA8UQxiAoC3oECAAQOg..i&imgrefurl=https%3A%2F%2Fwickistone.com%2Fhand-cut-rounded-stepping-stones%2F&docid=V7DTuHm4gM58fM&w=900&h=600&itg=1&q=australian%20style%20sandstone%20stepping%20stones&ved=2ahUKEwjl4cPgntiPAxUdaGwGHRfiA8UQxiAoC3oECAAQOg"
//     ]
//   },
//   {
//     "title": "Wall Panels",
//     "brief": "This is brief for wall panels.",
//     "description": "This is description for wall panels. This is description for wall panels. This is description for wall panels. This is description for wall panels.",
//     "hasSubCategory": true,
//     "imgUrls": [
//       "https://www.google.com/imgres?imgurl=https%3A%2F%2Fwickistone.com%2Fwp-content%2Fuploads%2F2022%2F03%2FHand-cut-Roundish-Rainbow-Stepping-Stone-Sample.jpg&tbnid=pDgdXigoRcXViM&vet=12ahUKEwjl4cPgntiPAxUdaGwGHRfiA8UQxiAoC3oECAAQOg..i&imgrefurl=https%3A%2F%2Fwickistone.com%2Fhand-cut-rounded-stepping-stones%2F&docid=V7DTuHm4gM58fM&w=900&h=600&itg=1&q=australian%20style%20sandstone%20stepping%20stones&ved=2ahUKEwjl4cPgntiPAxUdaGwGHRfiA8UQxiAoC3oECAAQOg"
//     ]
//   },
//   {
//     "title": "Wall cappings & Pier caps",
//     "brief": "This is brief for Wall cappings & Pier caps.",
//     "description": "This is description for Wall cappings & Pier caps. This is description for Wall cappings & Pier caps. This is description for Wall cappings & Pier caps. This is description for Wall cappings & Pier caps.",
//     "hasSubCategory": true,
//     "imgUrls": [
//       "https://www.google.com/imgres?imgurl=https%3A%2F%2Fwickistone.com%2Fwp-content%2Fuploads%2F2022%2F03%2FHand-cut-Roundish-Rainbow-Stepping-Stone-Sample.jpg&tbnid=pDgdXigoRcXViM&vet=12ahUKEwjl4cPgntiPAxUdaGwGHRfiA8UQxiAoC3oECAAQOg..i&imgrefurl=https%3A%2F%2Fwickistone.com%2Fhand-cut-rounded-stepping-stones%2F&docid=V7DTuHm4gM58fM&w=900&h=600&itg=1&q=australian%20style%20sandstone%20stepping%20stones&ved=2ahUKEwjl4cPgntiPAxUdaGwGHRfiA8UQxiAoC3oECAAQOg"
//     ]
//   },
//   {
//     "title": "Stepping Stones",
//     "brief": "This is brief for stepping stones.",
//     "description": "This is description for stepping stones. This is description for stepping stones. This is description for stepping stones. This is description for stepping stones.",
//     "hasSubCategory": false,
//     "imgUrls": [
//       "https://www.google.com/imgres?imgurl=https%3A%2F%2Fwickistone.com%2Fwp-content%2Fuploads%2F2022%2F03%2FHand-cut-Roundish-Rainbow-Stepping-Stone-Sample.jpg&tbnid=pDgdXigoRcXViM&vet=12ahUKEwjl4cPgntiPAxUdaGwGHRfiA8UQxiAoC3oECAAQOg..i&imgrefurl=https%3A%2F%2Fwickistone.com%2Fhand-cut-rounded-stepping-stones%2F&docid=V7DTuHm4gM58fM&w=900&h=600&itg=1&q=australian%20style%20sandstone%20stepping%20stones&ved=2ahUKEwjl4cPgntiPAxUdaGwGHRfiA8UQxiAoC3oECAAQOg"
//     ]
//   },
//   {
//     "title": "Walling STone",
//     "brief": "This is brief about walling stone.",
//     "description": "This is description about sandstone walling stone. This is description about sandstone walling stone.",
//     "hasSubCategory": false,
//     "imgUrls": [
//       "https://www.google.com/imgres?q=australian%20style%20sandstone%20stepping%20stones&imgurl=https%3A%2F%2Fwww.stonelife.com.au%2Fwp-content%2Fuploads%2F2020%2F11%2F50mm-Stepping-Stones-Oxidising-Buff-2.jpg&imgrefurl=https%3A%2F%2Fwww.stonelife.com.au%2Fproduct%2Fbanded-sandstone-stepping-stones%2F&docid=kopa5qqfuhXZ5M&tbnid=SU3eMmdI7xweKM&vet=12ahUKEwilh76G3caPAxU0TGwGHepiMDkQM3oECDwQAA..i&w=1024&h=1024&hcb=2&ved=2ahUKEwilh76G3caPAxU0TGwGHepiMDkQM3oECDwQAA"
//     ]
//   },
//   {
//     "title": "Cobbles",
//     "brief": "This is brief for Cobbles.",
//     "description": "This is description for Cobbles. This is description for Cobbles. This is description for Cobbles. This is description for Cobbles.",
//     "hasSubCategory": true,
//     "imgUrls": [
//       "https://www.google.com/imgres?imgurl=https%3A%2F%2Fwickistone.com%2Fwp-content%2Fuploads%2F2022%2F03%2FHand-cut-Roundish-Rainbow-Stepping-Stone-Sample.jpg&tbnid=pDgdXigoRcXViM&vet=12ahUKEwjl4cPgntiPAxUdaGwGHRfiA8UQxiAoC3oECAAQOg..i&imgrefurl=https%3A%2F%2Fwickistone.com%2Fhand-cut-rounded-stepping-stones%2F&docid=V7DTuHm4gM58fM&w=900&h=600&itg=1&q=australian%20style%20sandstone%20stepping%20stones&ved=2ahUKEwjl4cPgntiPAxUdaGwGHRfiA8UQxiAoC3oECAAQOg"
//     ]
//   },
//   {
//     "title": "Bullnosed Coppings",
//     "brief": "This is brief for bullnosed wall coppings.",
//     "description": "This is description for bullnosed wall coppings. This is description for bullnosed wall coppings.",
//     "hasSubCategory": false,
//     "imgUrls": [
//       "https://www.google.com/imgres?q=sagar%20black%20sandstone%20pier%20caps&imgurl=https%3A%2F%2Fnaturalstonedepot.com%2Fwp-content%2Fuploads%2F2018%2F08%2FSagar-Black-Limestone.jpg&imgrefurl=https%3A%2F%2Fnaturalstonedepot.com%2Fproduct%2Fsagar-black-sandstone%2F&docid=uT7KUYBnc8aBzM&tbnid=hDHCCKHhQRGnyM&vet=12ahUKEwjksvfhjNiPAxUUTGwGHdOHOawQM3oECBwQAA..i&w=700&h=329&hcb=2&ved=2ahUKEwjksvfhjNiPAxUUTGwGHdOHOawQM3oECBwQAA"
//     ]
//   },
//   {
//     "title": "Lintels",
//     "brief": "This is brief for Lintels.",
//     "description": "This is description for Lintels. This is description for Lintels. This is description for Lintels. This is description for Lintels.",
//     "hasSubCategory": true,
//     "imgUrls": [
//       "https://www.google.com/imgres?q=sagar%20black%20sandstone%20pier%20caps&imgurl=https%3A%2F%2Fnaturalstonedepot.com%2Fwp-content%2Fuploads%2F2018%2F08%2Fproduct1-300x300.jpg&imgrefurl=https%3A%2F%2Fnaturalstonedepot.com%2Fproduct%2Fsagar-black-sandstone%2F&docid=uT7KUYBnc8aBzM&tbnid=Hc7UlmcbqCMHYM&vet=12ahUKEwjksvfhjNiPAxUUTGwGHdOHOawQM3oECF0QAA..i&w=300&h=300&hcb=2&ved=2ahUKEwjksvfhjNiPAxUUTGwGHdOHOawQM3oECF0QAA"
//     ]
//   },
//   {
//     "title": "Sandstone Paving",
//     "brief": "This is beautifully crafted yellow mint paving.",
//     "description": "This is description of beautifully crafted yellow mint paving. This is description of beautifully crafted yellow mint paving.",
//     "hasSubCategory": true,
//     "imgUrls": [
//       "https://www.google.com/imgres?imgurl=https%3A%2F%2Fsandstonesupplies.co.uk%2Fwp-content%2Fuploads%2F2022%2F08%2FRaj-Green-Natural-Coping.jpg&tbnid=N-u-o1dfOz3kKM&vet=10CBMQxiAoB2oXChMIwKeD5uzTjwMVAAAAAB0AAAAAEBo..i&imgrefurl=https%3A%2F%2Fsandstonesupplies.co.uk%2Fshop%2Fwalling%2Fraj-green-natural-coping-900x300x50mm%2F&docid=eIPLieJnLZF9_M&w=700&h=800&itg=1&q=yellow%20mint%20sandstone%20wall%20coppings&ved=0CBMQxiAoB2oXChMIwKeD5uzTjwMVAAAAAB0AAAAAEBo"
//     ]
//   },
//   {
//     "title": "Crazy & Corners",
//     "brief": "This is brief for crazy and corners.",
//     "description": "This is description for crazy and corners. This is description for crazy and corners. This is description for crazy and corners. This is description for crazy and corners.",
//     "hasSubCategory": true,
//     "imgUrls": [
//       "https://www.google.com/imgres?imgurl=https%3A%2F%2Fwickistone.com%2Fwp-content%2Fuploads%2F2022%2F03%2FHand-cut-Roundish-Rainbow-Stepping-Stone-Sample.jpg&tbnid=pDgdXigoRcXViM&vet=12ahUKEwjl4cPgntiPAxUdaGwGHRfiA8UQxiAoC3oECAAQOg..i&imgrefurl=https%3A%2F%2Fwickistone.com%2Fhand-cut-rounded-stepping-stones%2F&docid=V7DTuHm4gM58fM&w=900&h=600&itg=1&q=australian%20style%20sandstone%20stepping%20stones&ved=2ahUKEwjl4cPgntiPAxUdaGwGHRfiA8UQxiAoC3oECAAQOg"
//     ]
//   },
//   {
//     "title": "Palasides & Edgings",
//     "brief": "This is brief for Palasides and Edgings.",
//     "description": "This is description for Palasides and Edgings. This is description for Palasides and Edgings. This is description for Palasides and Edgings. This is description for Palasides and Edgings.",
//     "hasSubCategory": false,
//     "imgUrls": [
//       "https://www.google.com/imgres?imgurl=https%3A%2F%2Fwickistone.com%2Fwp-content%2Fuploads%2F2022%2F03%2FHand-cut-Roundish-Rainbow-Stepping-Stone-Sample.jpg&tbnid=pDgdXigoRcXViM&vet=12ahUKEwjl4cPgntiPAxUdaGwGHRfiA8UQxiAoC3oECAAQOg..i&imgrefurl=https%3A%2F%2Fwickistone.com%2Fhand-cut-rounded-stepping-stones%2F&docid=V7DTuHm4gM58fM&w=900&h=600&itg=1&q=australian%20style%20sandstone%20stepping%20stones&ved=2ahUKEwjl4cPgntiPAxUdaGwGHRfiA8UQxiAoC3oECAAQOg"
//     ]
//   },
//   {
//     "title": "Circle Kits",
//     "brief": "This is brief for Circle Kits.",
//     "description": "This is description for Circle Kits. This is description for Circle Kits. This is description for Circle Kits. This is description for Circle Kits.",
//     "hasSubCategory": false,
//     "imgUrls": [
//       "https://www.google.com/imgres?imgurl=https%3A%2F%2Fkashmiripebbles.com.au%2Fwp-content%2Fuploads%2F2022%2F12%2FSawn-sandstone-steppers-2-1-1-scaled.jpg&tbnid=OuqxzFr9HR7NxM&vet=12ahUKEwiDiOXRjNiPAxXca2wGHRynMpgQxiAoB3oECAAQOA..i&imgrefurl=https%3A%2F%2Fkashmiripebbles.com.au%2Fproducts%2Fpaving-stepping-stones%2Fsandstone-organic-stepper-50-60x3cm%2F&docid=ZQ7PDQ2k_A9aqM&w=2560&h=1920&"
//     ]
//   }
// ]
// Add a new category




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
