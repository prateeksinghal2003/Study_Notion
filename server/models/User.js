// Import the Mongoose library
const mongoose = require("mongoose");

// Define the user schema using the Mongoose Schema constructor
const userSchema = new mongoose.Schema(
	{
		// Define the name field with type String, required, and trimmed
		firstName: {
			type: String,
			required: true,
			trim: true,
		},
		lastName: {
			type: String,
			required: true,
			trim: true,
		},
		// Define the email field with type String, required, and trimmed
		email: {
			type: String,
			required: true,
			trim: true,
		},

		// Define the password field with type String and required
		password: {
			type: String,
			required: true,
		},
		// Define the role field with type String and enum values of "Admin", "Student", or "Instructor"
		accountType: {
			type: String,
			enum: ["Admin", "Student", "Instructor"],
			required: true,
		},

		// active: {
		// 	type: Boolean,
		// 	default: true,
		// },
		// approved: {
		// 	type: Boolean,
		// 	default: true,
		// },

        //profile details which are not entered by user during sign up
		additionalDetails: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,

            //Profile is a model name
			ref: "Profile",
		},
		courses: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Course",
			},
		],

		//these two properties are added beacuse of reset password (see ResetPassword.js)
		token: {
			type: String,
		},
		resetPasswordExpires: {
			type: Date,
		},

        //type is string because it is url
		image: {
			type: String,
			required: true,
		},
		courseProgress: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "courseProgress",
			},
		],

		// Add timestamps for when the document is created and last modified
	}
	// { timestamps: true }
);

// Export the Mongoose model for the user schema, and assign the name "user"
module.exports = mongoose.model("user", userSchema);