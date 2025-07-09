// SplitEase - OpenAPI 3.0 Specification (Swagger JSON)

const { post } = require("../routes/authRoutes");

const openApiSpec = {
  openapi: "3.0.3",
  info: {
    title: "SplitEase API",
    version: "1.0.0",
    description: "Expense Management API for Groups, Partners, and Shared Expenses"
  },
  servers: [
    { url: "http://localhost:5001/api" }
  ],
  tags: [
    { name: "Auth", description: "Authentication & User Management" },
    { name: "Groups", description: "Group Creation and Management" },
    { name: "Partners", description: "Partner Expense Sharing" },
    { name: "Expenses", description: "Expense Tracking and Splitting" },
    { name: "Categories", description: "Expense Categories" },
    { name: "Reports", description: "Analytics & Reports" },
    { name: "Reminders", description: "Payment Reminders & Notifications" }
  ],
  paths: {
    "/auth/signUp": { 
      /* existing code */ 
      post:{
        tags:["Auth"],
        summary: "SignUp new User",
        requestBody:{
          required : true,

          content:{
          "application/json":{
             schema: {
                type: "object",
                required: ["partnerId"],
                properties: {
                  name: {type: "string"},
                  email : { type: "string" },
                   mobile:{type: "string"}, 
                   password:{type: "string"},

                }
              }

          }
        }
        },
           responses: {
          201: { description: "SignUp Successful, Check your email and verify your Email" },
          400: { description: "Invalid input" },
          500: {description:"Server Error"}
        }
      }
      

    },
    "auth/login": { 
      post:{
        tags:["Auth"],
      summary: "Login User",
        requestBody:{
          required : true,

          content:{
          "application/json":{
             schema: {
                type: "object",
                required: ["partnerId"],
                properties: {
                   email : { type: "string" },
                   password:{type: "string"},

                }
              }

          }
        }
        },
           responses: {
          200: { description: "OTP Sent to your email!" },
          400: { description: "User does not Exist!!" },
          400: { description: "Incorrect Password!!" },
          500: {description:"Server Error"}
        }
      },
    },
    "auth/forgot-password": { 
      post:{
        tags:["Auth"],
      summary: "Verify OTP",
        requestBody:{
          required : true,

          content:{
          "application/json":{
             schema: {
                type: "object",
                required: ["partnerId"],
                properties: {
                   email : { type: "string" },
                }
              }

          }
        }
        },
           responses: {
          200: { description: "OTP Verified Successfully!" },
          400: { description: "User does not Exist!!" },
          400: { description: "Invalid OTP" },
          400: { description: "Expired OTP" },
          400: { description: "Incorrect Password!!" },
          500: {description:"Server Error"}
        }
      },
    },
    "auth/verify-otp": { 
      post:{
        tags:["Auth"],
      summary: "Verify OTP",
        requestBody:{
          required : true,

          content:{
          "application/json":{
             schema: {
                type: "object",
                required: ["partnerId"],
                properties: {
                   email : { type: "string" },
                  otp:{type:"string"},
                }
              }

          }
        }
        },
           responses: {
          200: { description: "Verification Otp Sent to Email" },
          400: { description: "User does not Exist!!" },
          500: {description:"Server Error"}
        }
      },
    },
    
    "auth/reset-password": { 
      post:{
        tags:["Auth"],
      summary: "Verify OTP",
        requestBody:{
          required : true,

          content:{
          "application/json":{
             schema: {
                type: "object",
                required: ["partnerId"],
                properties: {
                   email : { type: "string" },
                   otp : { type: "string" },
                   newPassword : { type: "string" },
                }
              }

          }
        }
        },
           responses: {
          200: { description: "Verification Otp Sent to Email" },
          400: { description: "User does not Exist!!" },
          500: {description:"Server Error"}
        }
      },
    },
    "/groups": {
      
      
      /* existing code */ },
    "/expenses": { /* existing code */ },

    

    "/categories": {
      get: {
        tags: ["Categories"],
        summary: "Get all categories",
        responses: {
          200: { description: "List of categories" }
        }
      },
      post: {
        tags: ["Categories"],
        summary: "Add a custom category",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["name"],
                properties: {
                  name: { type: "string" }
                }
              }
            }
          }
        },
        responses: {
          201: { description: "Category created successfully" },
          400: { description: "Invalid input" }
        }
      }
    },

    "/reports/monthly": {
      get: {
        tags: ["Reports"],
        summary: "Generate monthly expense report",
        responses: {
          200: { description: "Monthly report generated" }
        }
      }
    },
    "/reports/summary": {
      get: {
        tags: ["Reports"],
        summary: "Get expense summary",
        responses: {
          200: { description: "Summary of expenses by category and person" }
        }
      }
    },

    "/reminders": {
      post: {
        tags: ["Reminders"],
        summary: "Set monthly payment reminder (Admin only)",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["groupId", "dueDate"],
                properties: {
                  groupId: { type: "string" },
                  dueDate: { type: "string", format: "date" },
                  reminderFrequency: { type: "string" }
                }
              }
            }
          }
        },
        responses: {
          201: { description: "Reminder set successfully" },
          400: { description: "Invalid input" }
        }
      },
      get: {
        tags: ["Reminders"],
        summary: "Get all reminders",
        responses: {
          200: { description: "List of reminders" }
        }
      }
    }
  },

  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT"
      }
    }
  },
  security: [{ bearerAuth: [] }]
};

module.exports = openApiSpec;
