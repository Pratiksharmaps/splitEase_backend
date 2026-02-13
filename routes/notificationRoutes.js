const admin = require("./firebase");

async function sendSilentPush(token, data = {}) {
  const message = {
    token,

    // DATA ONLY (no notification)
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
    const response = await admin.messaging().send(message);
    console.log("🔕 Silent push sent:", response);
  } catch (error) {
    console.error("❌ Silent push failed:", error.message);
  }
}

module.exports = sendSilentPush;
