const bcrypt = require("bcryptjs")
const User = require("../models/User")
const OTP = require("../models/OTP")
const otpGenerator = require("otp-generator")
 const jwt = require("jsonwebtoken")

 const mailSender = require("../utils/mailSender")
 const { passwordUpdated } = require("../mail/templates/passwordUpdate")
const Profile = require("../models/Profile")

require("dotenv").config()

// Signup Controller for Registering Users

exports.signup = async (req, res) => {
  try {
    // Data fetch  from the request body
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      //contact Number is from Profile
      contactNumber,
      otp,
    } = req.body

    //aisa ho sakta hai  ki user ne saari details na daali hoo during sign up aur sign up pe chala gaya ho
    // Check if All Details are there or not
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !otp
    ) 
    {
      return res.status(403).send({
        success: false,
        message: "All Fields are required",
      })
    }

    // Check if password and confirm password match
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message:
          "Password and Confirm Password do not match. Please try again.",
      })
    }

    // Check if user already exists

   

    const existingUser = await User.findOne({ email })
     //The object { email } is shorthand for { email: email }.
    // It means:
   // The key (email) corresponds to the field in the MongoDB database.
   // The value (email) comes from the variable email in your JavaScript code.

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists. Please sign in to continue.",
      })
    }

    // Find the most recent OTP for the email
    //If a user requests multiple OTPs (e.g., clicks "Resend OTP" multiple times),
    //  multiple OTPs might be stored in the database.


    const otpindb = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1)
   //response will contain OTP schema ka sirf ek object/doc
    
      // Find: Searches for all OTPs associated with the given email.
     // Sort: Sorts the OTPs in descending order of their createdAt timestamp (-1 means descending).
    // Limit: Picks only the most recent OTP (the first document in the sorted result).

   // console.log("yahaa   par---------------------")
    console.log("OTP sent by postman ", otp)
    console.log(otpindb[0].otp)

    //validate otp
    if (otpindb.length === 0) {
      // OTP not found for the email
      return res.status(400).json({
        success: false,
        message: "The OTP length is zero",
      })
    }  //else if main "otp" main vo value store hogi jo user dalegaaaaaa during verification
    
    //response.otp -->is the otp defined in OTP schema
    else if (otp !== otpindb[0].otp) {
      // Invalid OTP
      return res.status(400).json({
        success: false,
        message: "The OTP is not valid.......",
      })
    }

    // Hash the password and save in db 
    //password is the response i received 
    const hashedPassword = await bcrypt.hash(password, 10)

 //create  the entry in db 

 
    // Create the Additional Profile For User
    const profileDetails = await Profile.create({
        gender: null,
        dateOfBirth: null,
        about: null,
        contactNumber: null,
      })

    const user = await User.create({
        firstName,
        lastName,
        email,
        contactNumber,
        password: hashedPassword,
        accountType: accountType,
        // approved: approved,
        
        //to get profile object id ,create an entry in db
         additionalDetails: profileDetails._id,

         //image key will store an url
         image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
      })

    // Create the user
    // let approved = ""
    // approved === "Instructor" ? (approved = false) : (approved = true)

    

    return res.status(200).json({
      success: true,
      user,
      message: "User registered successfully",
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "User cannot be registered. Please try again.",
    })
  }
}


// Login controller for authenticating users
exports.login = async (req, res) => {
  try {
    // Get email and password from request body
    const { email, password } = req.body

    //validate data
    //kya pata user ne saari login details na daali ho aur login pe click kar diaa hoo
    // Check if email or password is missing
    if (!email || !password) {
      // Return 400 Bad Request status code with error message
      return res.status(400).json({
        success: false,
        message: `Please Fill up All the Required Fields`,
      })
    }

    // Find user with provided email
    const user = await User.findOne({ email }).populate("additionalDetails")

    //User Schema
//     {
//       "_id": "651234abc123",
//       "name": "John Doe",
//       "email": "john@example.com",
//       "additionalDetails": "65abcd1234ef"  // ObjectId reference
//     }

//     UserDetails Schema
//     {
//       "_id": "65abcd1234ef",
//       "age": 25,
//       "address": "123 Main Street",
//       "phoneNumber": "123-456-7890"
//     }

//     Without .populate("additionalDetails"), the additionalDetails field would just be an ObjectId:

// 
//
// 
// {
//   "_id": "651234abc123",
//   "name": "John Doe",
//   "email": "john@example.com",
//   "additionalDetails": "65abcd1234ef"
// }
//  With .populate("additionalDetails"), Mongoose replaces the ObjectId with the actual document:

// {
//   "_id": "651234abc123",
//   "name": "John Doe",
//   "email": "john@example.com",
//   "additionalDetails": {
//     "_id": "65abcd1234ef",
//     "age": 25,
//     "address": "123 Main Street",
//     "phoneNumber": "123-456-7890"
//   }
// 

    // If user not found with provided email
    if (!user) {
      // Return 401 Unauthorized status code with error message
      return res.status(401).json({
        success: false,
        message: `User is not Registered with Us Please SignUp First`,
      })
    }

    // Compare Password if matches generate json web token  
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(

        //pehla parameter is payload 
        //user._id is the id of the document stored in database ,each doc has a unique id ,
        { email: user.email, id: user._id, accountType: user.accountType },
        process.env.JWT_SECRET,
        {
          expiresIn: "24h",
        }
      )

      // Save token to user document in database
      user.token = token
      user.password = undefined

      // Set cookie for token and return success response
      const options = {
        //3 days expiration date
        //should align cookie expiration time and token time...
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      }

      //send cookie as a response 
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: `User Login Success`,
      })
    } else {
      return res.status(401).json({
        success: false,
        message: `Password is incorrect`,
      })
    }
  } catch (error) {
    console.error(error)
    // Return 500 Internal Server Error status code with error message
    return res.status(500).json({
      success: false,
      message: `Login Failure Please Try Again`,
    })
  }
}


// Send OTP For Email Verification
exports.sendotp = async (req, res) => {
  try {

    //fetch email
    const { email } = req.body

    // Check if user is already present
    // Find user with provided email in db
    const checkUserPresent = await User.findOne({ email })
    // to be used in case of signup

    // If user found with provided email
    if (checkUserPresent) {
      // Return 401 Unauthorized status code with error message
      return res.status(401).json({
        success: false,
        message: `User is Already Registered`,
      })
    }

    //generate otp 

     //see docs :https://www.npmjs.com/package/otp-generator?activeTab=readme
    var otpgen = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    })

    //to check for unique otp generation
    const result = await OTP.findOne({ otp: otpgen })

//     { otp: otpgen } is an object literal in JavaScript.
// The key (otp) refers to the field in the MongoDB collection.
// The value (otpgen) refers to the variable in your JavaScript code.
// For example:

// If the variable otp holds the value '123456', the query becomes { otp: '123456' }.
// This tells MongoDB to find a document where the otp field has the value '123456'.
    
    console.log("OTP", otpgen)

    //console.log("Result", result)

    //until i am getting existing otp
    //generate new otp
    //not a good way 
    while (result) {
      otpgen = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false});

         result = await OTP.findOne({ otp: otpgen })

      
    }

    //after creating a unique otp ,store it in db by creating an object so that when user enters the otp ,we want to make sure user has entered correct otp 
  
    //third property has not been defined because it has been set default 
    const otpPayload = { email:email, otp:otpgen }
    
    //insert in database 

    console.log("creating entry in database");
   const otpBody = await OTP.create(otpPayload)
    console.log("OTP Body", otpBody)

    res.status(200).json({
      success: true,
      message: `OTP Sent Successfully`,
      otpgen,
    })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({ success: false, message: error.message })
  }
}

// Controller for Changing Password
//this would get call ---->in UI , go to settings , update password
exports.changePassword = async (req, res) => {
  // try {
    
  //  //When a user logs in, a JWT token is created that contains user data like id, email, and role. 
  //  // req.user contains the data that  comes from the JWT token payload, which is set when the token is generated.
  //  //Once the user sends this token in a request, the authentication middleware extracts the data and appends it to req.user.
  //   //const userDetails = await User.findById(req.user.id)
  // }

  // catch{

  // }


  try {
    // Get user data from req.user
    const userDetails = await User.findById(req.user.id)

    // Get old password, new password, and confirm new password from req.body
    const { oldPassword, newPassword } = req.body

    // Validate old password
    const isPasswordMatch = await bcrypt.compare(
      oldPassword,

      //old password in encrypted form
      userDetails.password
    )
    if (!isPasswordMatch) {
      // If old password does not match, return a 401 (Unauthorized) error
      return res
        .status(401)
        .json({ success: false, message: "The password is incorrect" })
    }

    // Update password
    const encryptedPassword = await bcrypt.hash(newPassword, 10)
    const updatedUserDetails = await User.findByIdAndUpdate(
      req.user.id,
      { password: encryptedPassword },
      { new: true }
    )

    // Send notification email
    try {
      const emailResponse = await mailSender(
        updatedUserDetails.email,
        "Password for your account has been updated",
        passwordUpdated(
          updatedUserDetails.email,
          `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
        )
      )
      console.log("Email sent successfully:", emailResponse.response)
    } catch (error) {
      // If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
      console.error("Error occurred while sending email:", error)
      return res.status(500).json({
        success: false,
        message: "Error occurred while sending email",
        error: error.message,
      })
    }

    // Return success response
    return res
      .status(200)
      .json({ success: true, message: "Password updated successfully" })
  } catch (error) {
    // If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
    console.error("Error occurred while updating password:", error)
    return res.status(500).json({
      success: false,
      message: "Error occurred while updating password",
      error: error.message,
    })
  }
}