const admin = require("firebase-admin");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(
      JSON.parse(process.env.FIREBASE_KEY)
    ),
    // ADD THIS LINE: Replace with your actual Firebase Storage bucket URL
    // (e.g., "my-project-12345.appspot.com")
    storageBucket: "gs://tilive-research.firebasestorage.app" 
  });
}

const db = admin.firestore();
const bucket = admin.storage().bucket(); // Initialize the storage bucket

// Export both the database and the bucket
module.exports = { db, bucket };