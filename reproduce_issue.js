const app = require('./app.js'); // Load app to trigger side effects like dotenv
const sendSilentPush = require("./controllers/notificationContoller.js");

async function test() {
    console.log("Testing sendSilentPush...");
    // Use a dummy token
    await sendSilentPush("dummy_token");
}

test();
