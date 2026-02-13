const admin = require("../utils/firebase.js");

async function sendSilentPush(token, data = {}) {
  if (!token) {
    console.warn("⚠️ No FCM token provided. Silent push skipped.");
    return;
  }

  const message = {
    token, // ✅ REQUIRED

    data: {
      ...data,
      silent: "true",
    },

    android: {
      priority: "high",
    },

    apns: {
      headers: {
        "apns-push-type": "background",
        "apns-priority": "5",
      },
      payload: {
        aps: {
          "content-available": 1,
        },
      },
    },
  };

  try {
    console.log("🔥 Debug: admin.apps.length:", admin.apps.length);
    const response = await admin.messaging().send(message);
    console.log("🔕 Silent push sent:", response);
  } catch (error) {
    console.error("❌ Silent push failed:", error.message);
  }
}

module.exports = sendSilentPush;
