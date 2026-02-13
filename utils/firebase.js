const admin = require("firebase-admin");
const serviceAccount = require("../firebase-admin-key.json");

try{
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
console.log("🔥 Firebase Admin initialized");
} catch (error) {
  console.error("🔥 Firebase Admin initialization failed:", error);
}

module.exports = admin;
