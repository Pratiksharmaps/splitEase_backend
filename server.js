const app = require('./app');
const db = require('./models');
const http = require("http");
const { Server } = require("socket.io");
const initSocket = require('./socket/socket.js');
const sendSilentPush = require("./controllers/notificationContoller");
const admin = require("firebase-admin");
const PORT = process.env.PORT || 5000;

const socketServer = http.createServer(app);

// ⚠️ TEMP: testing token (remove later)
const TEST_FCM_TOKEN =
  "dw_KugcxcEtRtG1i3S5fF9:APA91bG4llm9Ycz7kuTiNdh1tyVp40f4wZgfM4Pg1cHRaVWEsr5ZoJmqsCr0Iz27I2y2Z28rbWjc6cH1CKqrKoDL4lexfdyH8Sh1jcIdLFV72NGBfWXU9Dk";

const io = new Server(socketServer, { cors: { origin: "*" } });
// Setup socket

initSocket(io);

db.sequelize.authenticate()
  .then(() => {
    console.log('✅ Database connected successfully');
    return db.sequelize.sync({ alter: true });
  })
  .then(() => {
    console.log('📦 Database synced');
    socketServer.listen(PORT, async () => {
      console.log(`🚀 Server running on port ${PORT}`);

      // try {
      //   await sendSilentPush(TEST_FCM_TOKEN, {
      //     toke: TEST_FCM_TOKEN,
      //     event: "server_start",
      //     env: process.env.NODE_ENV || "development",
      //     timestamp: Date.now().toString(),
      //   });
      // } catch (err) {
      //   console.error("❌ Startup push notification failed:", err.message);
      // }
    });
  })
  .catch(err => {
    console.error('❌ Failed to connect to the database:', err);
  });
