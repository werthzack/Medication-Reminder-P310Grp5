const mongoose = require("mongoose");

// Define the User schema
const userSchema = new mongoose.Schema(
  {
    // Email field
    email: {
      type: String, // Data type is String
      required: true, // Email is required
    },
    // First name field
    firstname: {
      type: String, // Data type is String
      required: true, // First name is required
    },
    // Last name field
    lastname: {
      type: String, // Data type is String
      required: true, // Last name is required
    },
    // Password field
    password: {
      type: String, // Data type is String
      required: true, // Password is required
    },
  },
  { timestamps: true } // Add timestamps to the schema
);

// Create the User model
const User = mongoose.model("User", userSchema);

// Export the User model
module.exports = User;
