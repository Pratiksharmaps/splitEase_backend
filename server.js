const app = require('./app');
const db = require('./models');
const http = require("http");
const {Server} = require("socket.io");
const initSocket =require('./socket/socket.js');

const PORT = process.env.PORT || 5000;

const socketServer  = http.createServer(app);

const io = new Server(socketServer,{cors:{origin:"*"}});
// Setup socket

initSocket(io);

db.sequelize.authenticate()
  .then(() => {
    console.log('✅ Database connected successfully');
    return db.sequelize.sync({ alter: true });
  })
  .then(() => {
    console.log('📦 Database synced');
    socketServer.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
    // app.listen(PORT, () => {
    //   console.log(`🚀 Server running on port ${PORT}`);
    // });
  })
  .catch(err => {
    console.error('❌ Failed to connect to the database:', err);
  });
