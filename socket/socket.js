const { User, Group, Expense } = require('../models');

function initSocket(io) {
  io.on("connection", (socket) => {
    console.log("✅ User connected:", socket.id);

    // --- JOIN GROUP ---
    socket.on("joinGroup", async ({ groupId, userId }) => {
      try {
        const group = await Group.findByPk(groupId, { include: User });

        if (!group) {
          socket.emit("error", "Group not found");
          return;
        }

        socket.join(groupId); // 👈 join the socket room
        console.log(`📌 User ${userId} joined group ${groupId}`);

        socket.emit("joinedGroup", { groupId, userId });
      } catch (e) {
        console.error("joinGroup error:", e);
        socket.emit("error", "Failed to join group");
      }
    });

    // --- SEND MESSAGE ---
    socket.on("sendMessage", async ({ groupId, userId, message }) => {
      console.log(`💬 Message in group ${groupId}:`, message);

      // broadcast to all in group
      io.to(groupId).emit("newMessage", { groupId, userId, message });
    });

    // --- LOG EXPENSE ---
    socket.on("logExpense", async ({ groupId, userId, amount, title, description }) => {
      try {
        const expense = await Expense.create({
          groupId,
          title,
          description,
          amount,
          createdBy: userId,
        });

        io.to(groupId).emit("newExpense", expense);
      } catch (e) {
        console.error("logExpense error:", e);
        socket.emit("error", "Failed to log expense");
      }
    });

    // --- DISCONNECT ---
    socket.on("disconnect", () => {
      console.log("❌ Client disconnected:", socket.id);
    });
  });
}

module.exports = initSocket;
