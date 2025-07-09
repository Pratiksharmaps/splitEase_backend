// // SplitEase - Backend API Documentation (Node.js)

// /**
//  * Backend Stack:
//  * - Node.js with Express.js (REST API)
//  * - MongoDB (Mongoose ODM)
//  * - JWT for Authentication
//  * - Bcrypt for Password Hashing
//  * - Firebase Cloud Messaging (Notifications)
//  */

// // ------------------ API Endpoints Flow ------------------

// // 1. Authentication
// POST   /api/auth/SignUp            // User Registration
// POST   /api/auth/login             // User Login
// POST   /api/auth/forgot-password   // Forgot Password - send otp to email
// GET    /api/auth/reset-password    //Reset Password- to reset 
// GET    /api/auth/verify-otp        //verify otp 

// // 2. Group Management
// POST   /api/create-group                   // Create Group
// POST   /api/groups/:id/invite           // Invite Member to Group
// GET    /api/getUserGroup                   // Get User's Groups
// GET    /api/groups/groupDetail/:id       // Get Group Details
// PUT    /api/groups/edit-group/:id          // Update Group (Admin Only)
// PUT    /api/groups/remove/:id          // remove person



// // 4. Expense Management
// POST   /api/expenses             // Add Expense
// GET    /api/expenses             // Get All Expenses (Group/Partner)
// GET    /api/expenses/:id         // Get Expense Details
// PUT    /api/expenses/:id         // Update Expense (Admin Only)
// DELETE /api/expenses/:id         // Delete Expense (Admin Only)

// // 5. Categories
// GET    /api/categories           // Get Default & Custom Categories
// POST   /api/categories           // Add Custom Category
// DELETE /api/categories/:id       // Remove Custom Category

// // 6. Reports & Analytics
// GET    /api/reports/monthly      // Monthly Expense Report
// GET    /api/reports/summary      // Expense Summary (Category-wise, Individual-wise)

// // 7. Reminders & Notifications
// POST   /api/reminders            // Set Monthly Payment Date (Admin Only)
// GET    /api/reminders            // Get Reminders
// POST   /api/notifications/send   // Send Manual Notification (Admin Only)

// // ------------------ Data Models ------------------

// // User Schema
// {
//   _id,
//   name,
//   email,
//   passwordHash,
//   profilePic,
//   groups: [groupId],
//   partners: [partnerId]
// }

// // Group Schema
// {
//   _id,
//   name,
//   admin: userId,
//   members: [userId],
//   paymentDueDate,
//   createdAt
// }

// // Partner Schema
// {
//   _id,
//   user: userId,
//   partner: userId,
//   expenses: [expenseId]
// }

// // Expense Schema
// {
//   _id,
//   name,
//   amount,
//   date,
//   category,
//   notes,
//   payer: userId,
//   splitWith: [{ userId, amount }],
//   groupId,
//   partnerId
// }

// // Category Schema
// {
//   _id,
//   name,
//   isCustom: Boolean,
//   userId (for custom categories)
// }

// // Reminder Schema
// {
//   _id,
//   groupId,
//   dueDate,
//   reminderFrequency,
//   createdBy: userId
// }

// // Notification Payload Example
// {
//   title,
//   message,
//   recipients: [userId],
//   type: "reminder" | "expense" | "general"
// }

// // ------------------ Authentication Flow ------------------
// // - Register: Hash password with bcrypt, store in DB
// // - Login: Validate credentials, return JWT token
// // - Protect Routes with JWT Middleware
// // - Role Check Middleware for Admin-only Routes

// // ------------------ Future Extensions ------------------
// // - Payment Gateway Integrations
// // - Recurring Expenses Logic
// // - OCR Bill Scanning Microservice
// // - WebSocket for Real-time Updates
// // - API Rate Limiting & Security Enhancements

// // ------------------ Conclusion ------------------
// // Modular, Secure, Scalable Node.js Backend following REST principles for SplitEase.
