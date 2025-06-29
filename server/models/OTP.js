const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
//  const emailTemplate = require(" ../mail/templates/emailVerificationTemplate");
const otpTemplate = require("../mail/templates/emailVerificationTemplate");


const OTPSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
	},

    //otp value
	otp: {
		type: String,
		required: true,
	},

	createdAt: {
		type: Date,
		default: Date.now,
		expires: 60 * 5, // The document will be automatically deleted after 5 minutes of its creation time
	},
});


// Define a function to send emails

//kisko mail bhejo ,aur kya otp bhejuuu
async function sendVerificationEmail(email, otp) {
	// Create a transporter to send emails

	// Define the email options

	// Send the email
	try {

         // await:
        // The await keyword is used to pause the execution of the code until the mailSender function completes.
       // This means mailResponse will hold the result returned by mailSender.

		const mailResponse = await mailSender(
			email,
			"Verification Email",
			 otpTemplate(otp));
			 
		console.log("Email sent successfully: ", mailResponse);
	} catch (error) {
		console.log("Error occurred while sending email: ", error);
		throw error;
	}
}

//use premiddleware
// Define a pre-save hook to send email
//before saving document , send email..

OTPSchema.pre("save", async function (next) {
	// console.log("New document saved to database");

	// // Only send an email when a new document is created
	if (this.isNew) {
		await sendVerificationEmail(this.email, this.otp);
	}

	//await sendVerificationEmail(this.email, this.otp);
	next();
});


//This code defines a Mongoose pre-save hook that performs specific actions before a document is saved to a MongoDB database.


//OTPSchema.pre("save", ...):
// This is a Mongoose middleware that is triggered before a document is saved to the database.
// It is attached to the OTPSchema, meaning it applies to any document created using this schema.
// The "save" indicates that this middleware runs during the save operation.
// async function (next) {:}

// This hook is defined as an async function, allowing asynchronous operations (e.g., sending an email) to occur.
// next is a callback function provided by Mongoose. It must be called to indicate that the middleware has finished its work.


    // Only send an email when a new document is created
    // if (this.isNew)     

// if (this.isNew) {:}
// this refers to the current document being saved.
// this.isNew is a Mongoose property that is true if the document is newly created (as opposed to being updated).
// This ensures that the email is sent only for new documents and not when an existing document is updated.
        
// await sendVerificationEmail(this.email, this.otp):
// Calls the sendVerificationEmail function to send an email.
// Passes this.email (the recipient’s email address) and this.otp (the OTP for verification) as arguments.
// The use of await ensures the email is sent before proceeding to the next steps.


// next();
// This tells Mongoose to proceed with the save operation after the middleware has finished executing.
// Without calling next(), the save operation would remain stuck and not complete.

module.exports = mongoose.model("OTP", OTPSchema);

