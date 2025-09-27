const admin = require('firebase-admin');
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

admin.initializeApp({
  credential: admin.credential.cert(
    {
  "type": process.env.FIREBASE_TYPE,
  "project_id": process.env.FIREBASE_PROJECT_ID,
  "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID,
  "private_key": process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  "client_email": process.env.FIREBASE_CLIENT_EMAIL,
  "client_id": process.env.FIREBASE_CLIENT_ID,
  "auth_uri": process.env.FIREBASE_AUTH_URI,
  "token_uri": process.env.FIREBASE_TOKEN_URI,
  "auth_provider_x509_cert_url": process.env.FIREBASE_AUTH_PROVIDER,
  "client_x509_cert_url": process.env.FIREBASE_CLIENT_CERT_URL,
  "universe_domain": process.env.FIREBASE_UNIVERSE_DOMAIN
    }
  )
});

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// })

const db = admin.firestore();
// console.log(db)
async function listAllCollections() {
  try {
    const collections = await db.listCollections();
    console.log('Available collections:');
    collections.forEach(col => console.log(col.id));
  } catch (error) {
    console.error('Error listing collections:', error);
  }
}

// listAllCollections();
module.exports = db;