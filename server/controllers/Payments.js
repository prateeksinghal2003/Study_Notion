// // What is an Order in Razorpay?
// // In Razorpay, an Order is a unique transaction request that must be created before initiating a payment.
// // When an order is created, it gets a unique Order ID, which is used by Razorpay to track the payment.
// // The Order ID is required when integrating Razorpay Checkout on the frontend.


// // What Happens When instance.orders.create(options) Runs?
// // When this function executes, Razorpay does the following:

// // Receives the Payment Details
// // The options object you passed contains:

// // The amount (converted to paise)
// // The currency
// // A receipt ID (used for tracking the order)
// // Creates a New Order on Razorpay's Server
// // Razorpay processes the request and generates a unique Order ID.
// // The Order ID looks something like: "order_HK3y4Z5e6m7Q8T".
// // The order is now waiting for payment.



// const { instance } = require("../config/razorpay")
// const Course = require("../models/Course")
// const CourseProgress = require("../models/CourseProgress")
// const User = require("../models/User")
// const mailSender = require("../utils/mailSender")
// const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail")
// const { paymentSuccessEmail} = require("../mail/templates/paymentSuccessEmail")

// const crypto = require("crypto")
// const mongoose = require("mongoose")


 

// // Capture the payment and initiate the Razorpay order
// exports.capturePayment = async (req, res) => {

//   //get courseID and UserID
//   //validate
//   //order create
//   //send response

//    const { courses } = req.body
//    //const { course_id } = req.body
 
//  const userId = req.user.id

//  if (courses.length === 0) 
//   {
//     return res.json({ success: false, message: "Please Provide Course ID" })
//   }

//   let total_amount = 0

//   for (const course_id of courses) {
//     let course
//     try {
//       // Find the course by its ID
//       course = await Course.findById(course_id)

//       // If the course is not found, return an error
//       if (!course) {
//         return res
//           .status(200)
//           .json({ success: false, message: "Could not find the Course" })
//       }

        

   
//       // Check if the user is already enrolled in the course
//       const uid = new mongoose.Types.ObjectId(userId)
//       if (course.studentsEnrolled.includes(uid)) {
//         return res
//           .status(200)
//           .json({ success: false, message: "Student is already Enrolled" })
//       }

//       // Add the price of the course to the total amount
//       total_amount += course.price
//     } catch (error) {
//       console.log(error)
//       return res.status(500).json({ success: false, message: error.message })
//     }
//   }


//    //Validate course id
//   // if(!course_id)
//     // {
//     //  return res.status(200).json({ success: false, message: "Could not find the Course" })
//     // }
 
//  //validate course Details form course id

//   //  let course;
//   //   try {
//   //     // Find the course by its ID
//   //     course = await Course.findById(course_id)

//   //     // If the course is not found, return an error
//   //     if (!course) {
//   //       return res
//   //         .status(200)
//   //         .json({ success: false, message: "Could not find the Course" })
//   //     }

//   //     //Check if the user is already enrolled in the course
//   //     //in course schema user id is in the form of object ,here user id is in the form of string 
//   //     //convert it into object id

//   //     const uid = new mongoose.Types.ObjectId(userId)
//   //     if (course.studentsEnrolled.includes(uid)) {
//   //       return res
//   //         .status(200)
//   //         .json({ success: false, message: "Student is already Enrolled" })
//   //     }
   

//   // }catch(error){
//   //   console.log(error)
//   //    return res.status(500).json({ success: false, message: error.message })

//   // }




//    //Create order
//    //ye docs ne bola hai 

//    // const amount=course.price;
//     const currency= "INR";   


//   const options = 
//   {
//     amount: total_amount * 100,
//     currency:currency ,
//     receipt: Date.now().toString(),
//     // notes:{
//     //     courseId:course_id,
//     //     userId
//     // }

//   }

       

//   try {
//     // Initiate the payment using Razorpay

//     //create order
//     const paymentResponse = await instance.orders.create(options)
//     console.log(paymentResponse)

//     //return response
//     return res.json({
//       success: true,
//       message: paymentResponse,
//     })
//   } catch (error) {
//     console.log(error)
//     return res
//       .status(500)
//       .json({ success: false, message: "Could not initiate order." })
//   }
// }



// //after order creation ,authorize the payment

// // What Does the Webhook Request Contain?

// // When Razorpay sends a webhook request, it contains two main parts:
// // 1️⃣ Headers → Includes x-razorpay-signature.
// // 2️⃣ Body → Includes payment details (not encrypted).

// // 🔹 Webhook Request Sent by Razorpay
// // When your server receives a webhook request, it looks something like this:

// // 🔹 Headers (Contains Signature)
// // x-razorpay-signature: f2d2a9b9e02a34c556db945a7bcaff83e2c6a4c8c14de78032f8d3b6e9a3c30a
// // 🔹 This signature is used for verification.

// // 🔹 Body (Contains Payment Details)

// // {
// //   "order_id": "order_HK3y4Z5e6m7Q8T",
// //   "payment_status": "captured",
// //   "amount": 50000,
// //   "currency": "INR"
// // }
// // 🔹 This body is NOT encrypted! It is plain JSON data.

// // 🔹 What Happens at the Server?
// // When your server receives this webhook:
// // ✅ It gets both the header and the body.

// // Step 1️⃣ Extract the Signature from the Header

// // const signature = req.headers["x-razorpay-signature"]; 
// // ✅ Your server has the signature from the header.

// // Step 2️⃣ Recalculate the Signature from the Body

// // const shasum = crypto.createHmac("sha256", webhooksecret);
// // shasum.update(JSON.stringify(req.body)); // Encrypt the body
// // const digest = shasum.digest("hex"); // Convert to hex
// // ✅ Your server takes the webhook body and generates its own signature.

// // Step 3️⃣ Compare Both Signatures

// // if (signature === digest) {
// //     console.log("Payment is verified and authorized");
// // } else {
// //     console.log("Webhook verification failed! Possible fraud.");
// // }
// // ✅ If they match, the webhook is real.
// // ❌ If they don’t match, the webhook is fake or tampered with.


// // -------------------------------------------------------------------------
// // What is This Code Doing?
// // This function verifies that the webhook request (sent by Razorpay) is real and not fake.

// // Scenario:

// // Imagine you're running an online course website where users can pay for a course using Razorpay.

// // After a payment is made, Razorpay sends a notification (webhook request) to your server saying "Payment Successful".

// // But how do you know this request is really from Razorpay and not from a hacker? 🤔

// // This function verifies that the request is real! ✅

// // 🔹 Step-by-Step Explanation of the Code
// // 1️⃣ Webhook Secret Key (Stored in Your Server)

// // const webhooksecret = "12345678"; //ye key sirf server ke pass hai
// // This is a secret password that only your server and Razorpay know.

// // You set this key in the Razorpay dashboard while creating a webhook.

// // This key is never shared with users.

// // 2️⃣ Extract the Signature Sent by Razorpay

// // const signature = req.headers["x-razorpay-signature"]; //jo key razorpay se aayi 
// // When Razorpay sends a webhook request, it includes a signature (x-razorpay-signature).

// // This signature is like a digital fingerprint to prove the request is from Razorpay.

// // You extract this signature from the request headers.

// // 3️⃣ Generate Our Own Signature (HMAC SHA-256)

// // const shasum = crypto.createHmac("sha256", webhooksecret);
// // shasum.update(JSON.stringify(req.body));
// // const digest = shasum.digest("hex");
// // Here, we recreate the signature on our server using the same method Razorpay uses.

// // We use the crypto module to create an HMAC SHA-256 hash.

// // shasum.update(JSON.stringify(req.body)):

// // Takes the payment details (inside req.body).

// // Converts it into a string.

// // Encrypts it using the secret key (webhooksecret).

// // shasum.digest("hex"): Generates the hashed signature (digest).

// // 4️⃣ Compare Both Signatures

// // if(signature === digest)
// // {
// //     console.log("Payment is authorized");
// // }
// // Now, we compare:
// // ✅ The signature sent by Razorpay.
// // ✅ The digest (signature we generated).

// // If they match, it means:

// // The webhook is real.

// // The payment was not tampered with.

// // The payment is verified and authorized.




// exports.verifySignature = async(req,res) =>
// {
//     const webhooksecret = "12345678"; //ye key server ke pass hai

//     //aise hi hota hai
//     const signature = req.headers["x-razorpay-signature"]; //jo key razorpay se aayi 

//     //webhooksecret is encrypted
//     const shasum = crypto.createHmac("sha256", webhooksecret);
//     shasum.update(JSON.stringify(req.body));
//     const digest=shasum.digest("hex");

//     if(signature === digest)
//     {
//          console.log("Payemnt is authorized");

//          //after payment is autorised what action to be taken

//          //req is from razorpay
//          //abhi aisaa hi samaj loo
//          //ye testing se pata chala ki notes kaha par hai
//          const{courseId,userId}=req.body.payload.payment.entity.notes;


//          try{

//               //find the course and student ko enroll karo

//               //enrolled course will contain that course document 
//               //which has been updated

//               const enrolledCourse = await Course.findOneAndUpdate(
//                          { _id: courseId },
//                          { $push: { studentsEnroled: userId } },
//                          { new: true })

//                          if (!enrolledCourse) 
//                             {
//                                 return res.status(500).json({ success: false, error: "Course not found" })
//                             }
//                 console.log("Updated course: ", enrolledCourse)   
           
//               //find the student and uske schema main enrolled courses ke under update maro

//               const enrolledStudent = await User.findByIdAndUpdate(
//                         userId,
//                         {
//                           $push: {
//                             courses: courseId,
//                            // courseProgress: courseProgress._id,
//                           },
//                         },
//                         { new: true } )

//                console.log("Updated course schema of a student ",enrolledStudent)


//                 //mail notification send kar do
//                 const emailResponse = await mailSender(
//                             enrolledStudent.email,
//                             "Congratulations",
//                             `Successfully Enrolled into ${enrolledCourse.courseName}`)

//                  console.log(emailResponse)      
                 
//                  return res
//                  .status(200)
//                  .json({ success: true, message: "Course added." })    
                    


//          }catch(error)
//          {
//             console.log(error)
//     return res
//       .status(500)
//       .json({ success: false, message:error.message })
//          }

//       }  // if close

//       else  //signature not valid
//       {
//         return res
//         .status(400)
//         .json({ success: false, message:"Invalid signature" })
//       }
//   }



// // verify the payment 
// exports.verifyPayment = async (req, res) => {
//   const razorpay_order_id = req.body?.razorpay_order_id
//   const razorpay_payment_id = req.body?.razorpay_payment_id
//   const razorpay_signature = req.body?.razorpay_signature
//   const courses = req.body?.courses

//   const userId = req.user.id

//   if (
//     !razorpay_order_id ||
//     !razorpay_payment_id ||
//     !razorpay_signature ||
//     !courses ||
//     !userId
//   ) {
//     return res.status(200).json({ success: false, message: "Payment Failed" })
//   }

//   let body = razorpay_order_id + "|" + razorpay_payment_id

//   const expectedSignature = crypto
//     .createHmac("sha256", process.env.RAZORPAY_SECRET)
//     .update(body.toString())
//     .digest("hex")

//   if (expectedSignature === razorpay_signature) {
//     await enrollStudents(courses, userId, res)
//     return res.status(200).json({ success: true, message: "Payment Verified" })
//   }

//   return res.status(200).json({ success: false, message: "Payment Failed" })
// }


// // // Send Payment Success Email
// exports.sendPaymentSuccessEmail = async (req, res) => {
//   const { orderId, paymentId, amount } = req.body

//   const userId = req.user.id

//   if (!orderId || !paymentId || !amount || !userId) {
//     return res
//       .status(400)
//       .json({ success: false, message: "Please provide all the details" })
//   }

//   try {
//     const enrolledStudent = await User.findById(userId)

//     await mailSender(
//       enrolledStudent.email,
//       `Payment Received`,
//       paymentSuccessEmail(
//         `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
//         amount / 100,
//         orderId,
//         paymentId
//       )
//     )
//   } catch (error) {
//     console.log("error in sending mail", error)
//     return res
//       .status(400)
//       .json({ success: false, message: "Could not send email" })
//   }
// }

// // enroll the student in the courses
// exports.enrollStudents = async (courses, userId, res) => {
//   if (!courses || !userId) {
//     return res
//       .status(400)
//       .json({ success: false, message: "Please Provide Course ID and User ID" })
//   }

//   //traverse each course , and in the schema of course enter the userid in "studentsenrolled" list 
//   for (const courseId of courses) {
//     try {
//       // Find the course and enroll the student in it
//       const enrolledCourse = await Course.findOneAndUpdate(
//         { _id: courseId },
//         { $push: { studentsEnroled: userId } },
//         { new: true }
//       )

//       if (!enrolledCourse) {
//         return res
//           .status(500)
//           .json({ success: false, error: "Course not found" })
//       }
//       console.log("Updated course: ", enrolledCourse)

//       const courseProgress = await CourseProgress.create({
//         courseID: courseId,
//         userId: userId,
//         completedVideos: [],
//       })

//       // Find the student and add the course to their list of enrolled courses
//       const enrolledStudent = await User.findByIdAndUpdate(
//         userId,
//         {
//           $push: {
//             courses: courseId,
//             courseProgress: courseProgress._id,
//           },
//         },
//         { new: true }
//       )

//       console.log("Enrolled student: ", enrolledStudent)


//       // Send an email notification to the enrolled student
//       const emailResponse = await mailSender(
//         enrolledStudent.email,
//         `Successfully Enrolled into ${enrolledCourse.courseName}`,
//         courseEnrollmentEmail(
//           enrolledCourse.courseName,
//           `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
//         )
//       )

//       console.log("Email sent successfully: ", emailResponse.response)
//       return res.status(200).json({ success: true })
//     } catch (error) {
//       console.log(error)
//       return res.status(400).json({ success: false, error: error.message })
//     }
//   }
// } //loop close

// // exports.enrollStudents = async (req, res) => {
// //   const { courseId, courses } = req.body
// //   const userId = req.user.id
  
// //   if (!userId) {
// //     return res
// //       .status(400)
// //       .json({ success: false, message: "Please Login first" })
// //   }

// //   if(!courseId && courses){
// //     //check whether courses is an array or not
// //     if(Array.isArray(courses)){
// //       for(let index = 0; index<courses.length; index++){
// //         try{
// //           //Find the course and enroll the student in it
// //           const enrolledCourse = await Course.findOneAndUpdate({_id:courses[index]}, {$push:{studentsEnrolled:userId}}, {new:true});
// //           if(!enrolledCourse){
// //             return res.status(500).json({
// //               success:false,
// //               error:"Course not found"
// //             });
// //           }
// //           console.log("Updated course: ", enrolledCourse);

// //           const courseProgress = await CourseProgress.create({
// //             courseID:courses[index],
// //             userId:userId,
// //             completedVideos:[],
// //           });
// //           //Find the student and add the course to their list of enrolled courses
// //           const enrolledStudent = await User.findByIdAndUpdate(userId, {$push:{courses:courses[index], courseProgress:courseProgress._id}}, {new:true});
// //           console.log("Updated student: ", enrolledStudent);

// //           //Send an email notification to the enrolled student
// //           await mailSender(enrolledStudent.email, `Successfully Enrolled into ${enrolledCourse.courseName}`, courseEnrollmentEmail(enrolledCourse.courseName, `${enrolledStudent.firstName} ${enrolledStudent.lastName}`));
// //         } catch(error){
// //           console.log(error);
// //           return res.status(400).json({
// //             success:false,
// //             error:error.message
// //           });
// //         }
// //       }
// //       return res.status(200).json({ success: true, message: "Student Enrolled" })
// //     }
// //     else{
// //       return res.status(400).json({ success: false, message: "Please provide courseIds" })
// //     }
// //   }

// //   try {
// //     // Find the course and enroll the student in it
// //     const enrolledCourse = await Course.findOneAndUpdate(
// //       { _id: courseId },
// //       { $push: { studentsEnrolled: userId } },
// //       { new: true }
// //     )

// //     if (!enrolledCourse) {
// //       return res
// //         .status(500)
// //         .json({ success: false, error: "Course not found" })
// //     }
// //     console.log("Updated course: ", enrolledCourse)

// //     const courseProgress = await CourseProgress.create({
// //       courseID: courseId,
// //       userId: userId,
// //       completedVideos: [],
// //     })
// //     // Find the student and add the course to their list of enrolled courses
// //     const enrolledStudent = await User.findByIdAndUpdate(
// //       userId,
// //       {
// //         $push: {
// //           courses: courseId,
// //           courseProgress: courseProgress._id,
// //         },
// //       },
// //       { new: true }
// //     )

// //     // Send an email notification to the enrolled student
// //     await mailSender(
// //       enrolledStudent.email,
// //       `Successfully Enrolled into ${enrolledCourse.courseName}`,
// //       courseEnrollmentEmail(
// //         enrolledCourse.courseName,
// //         `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
// //       )
// //     )
// //     return res.status(200).json({ success: true, message: "Student Enrolled" })
// //   } catch (error) {
// //     console.log(error)
// //     return res.status(400).json({ success: false, error: error.message })
// //   }

// // }






//-------------------------------------------------------------------------------------------------------------------------


//COMPLETE COPY
//const { instance } = require("../config/razorpay")
const Course = require("../models/Course")
const crypto = require("crypto")
const User = require("../models/User")
const mailSender = require("../utils/mailSender")
const mongoose = require("mongoose")
const {
  courseEnrollmentEmail,
} = require("../mail/templates/courseEnrollmentEmail")
const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessEmail")
const CourseProgress = require("../models/CourseProgress")

// Capture the payment and initiate the Razorpay order
// exports.capturePayment = async (req, res) => {
//   const { courses } = req.body
//   const userId = req.user.id
//   if (courses.length === 0) {
//     return res.json({ success: false, message: "Please Provide Course ID" })
//   }

//   let total_amount = 0

//   for (const course_id of courses) {
//     let course
//     try {
//       // Find the course by its ID
//       course = await Course.findById(course_id)

//       // If the course is not found, return an error
//       if (!course) {
//         return res
//           .status(200)
//           .json({ success: false, message: "Could not find the Course" })
//       }

//       // Check if the user is already enrolled in the course
//       const uid = new mongoose.Types.ObjectId(userId)
//       if (course.studentsEnroled.includes(uid)) {
//         return res
//           .status(200)
//           .json({ success: false, message: "Student is already Enrolled" })
//       }

//       // Add the price of the course to the total amount
//       total_amount += course.price
//     } catch (error) {
//       console.log(error)
//       return res.status(500).json({ success: false, message: error.message })
//     }
//   }

//   const options = {
//     amount: total_amount * 100,
//     currency: "INR",
//     receipt: Math.random(Date.now()).toString(),
//   }

//   try {
//     // Initiate the payment using Razorpay
//     const paymentResponse = await instance.orders.create(options)
//     console.log(paymentResponse)
//     res.json({
//       success: true,
//       data: paymentResponse,
//     })
//   } catch (error) {
//     console.log(error)
//     res
//       .status(500)
//       .json({ success: false, message: "Could not initiate order." })
//   }
// }

// // verify the payment
// exports.verifyPayment = async (req, res) => {
//   const razorpay_order_id = req.body?.razorpay_order_id
//   const razorpay_payment_id = req.body?.razorpay_payment_id
//   const razorpay_signature = req.body?.razorpay_signature
//   const courses = req.body?.courses

//   const userId = req.user.id

//   if (
//     !razorpay_order_id ||
//     !razorpay_payment_id ||
//     !razorpay_signature ||
//     !courses ||
//     !userId
//   ) {
//     return res.status(200).json({ success: false, message: "Payment Failed" })
//   }

//   let body = razorpay_order_id + "|" + razorpay_payment_id

//   const expectedSignature = crypto
//     .createHmac("sha256", process.env.RAZORPAY_SECRET)
//     .update(body.toString())
//     .digest("hex")

//   if (expectedSignature === razorpay_signature) {
//     await enrollStudents(courses, userId, res)
//     return res.status(200).json({ success: true, message: "Payment Verified" })
//   }

//   return res.status(200).json({ success: false, message: "Payment Failed" })
// }

// // Send Payment Success Email
exports.sendPaymentSuccessEmail = async (req, res) => {
  const { orderId, paymentId, amount } = req.body

  const userId = req.user.id

  if (!orderId || !paymentId || !amount || !userId) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all the details" })
  }

  try {
    const enrolledStudent = await User.findById(userId)

    await mailSender(
      enrolledStudent.email,
      `Payment Received`,
      paymentSuccessEmail(
        `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
        amount / 100,
        orderId,
        paymentId
      )
    )
  } catch (error) {
    console.log("error in sending mail", error)
    return res
      .status(400)
      .json({ success: false, message: "Could not send email" })
  }
}

// enroll the student in the courses
// exports.enrollStudents = async (courses, userId, res) => {
//   if (!courses || !userId) {
//     return res
//       .status(400)
//       .json({ success: false, message: "Please Provide Course ID and User ID" })
//   }

//   for (const courseId of courses) {
//     try {
//       // Find the course and enroll the student in it
//       const enrolledCourse = await Course.findOneAndUpdate(
//         { _id: courseId },
//         { $push: { studentsEnroled: userId } },
//         { new: true }
//       )

//       if (!enrolledCourse) {
//         return res
//           .status(500)
//           .json({ success: false, error: "Course not found" })
//       }
//       console.log("Updated course: ", enrolledCourse)

//       const courseProgress = await CourseProgress.create({
//         courseID: courseId,
//         userId: userId,
//         completedVideos: [],
//       })
//       // Find the student and add the course to their list of enrolled courses
//       const enrolledStudent = await User.findByIdAndUpdate(
//         userId,
//         {
//           $push: {
//             courses: courseId,
//             courseProgress: courseProgress._id,
//           },
//         },
//         { new: true }
//       )

//       console.log("Enrolled student: ", enrolledStudent)
//       // Send an email notification to the enrolled student
//       const emailResponse = await mailSender(
//         enrolledStudent.email,
//         `Successfully Enrolled into ${enrolledCourse.courseName}`,
//         courseEnrollmentEmail(
//           enrolledCourse.courseName,
//           `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
//         )
//       )

//       console.log("Email sent successfully: ", emailResponse.response)
//       return res.status(200).json({ success: true })
//     } catch (error) {
//       console.log(error)
//       return res.status(400).json({ success: false, error: error.message })
//     }
//   }
// }

exports.enrollStudents = async (req, res) => {
  const { courseId, courses } = req.body
  const userId = req.user.id
  
  if (!userId) {
    return res
      .status(400)
      .json({ success: false, message: "Please Login first" })
  }

  if(!courseId && courses){
    //check whether courses is an array or not
    if(Array.isArray(courses)){
      for(let index = 0; index<courses.length; index++){
        try{
          //Find the course and enroll the student in it
          const enrolledCourse = await Course.findOneAndUpdate({_id:courses[index]}, {$push:{studentsEnrolled:userId}}, {new:true});
          if(!enrolledCourse){
            return res.status(500).json({
              success:false,
              error:"Course not found"
            });
          }
          console.log("Updated course: ", enrolledCourse);

          const courseProgress = await CourseProgress.create({
            courseID:courses[index],
            userId:userId,
            completedVideos:[],
          });
          //Find the student and add the course to their list of enrolled courses
          const enrolledStudent = await User.findByIdAndUpdate(userId, {$push:{courses:courses[index], courseProgress:courseProgress._id}}, {new:true});
          console.log("Updated student: ", enrolledStudent);

          //Send an email notification to the enrolled student
          await mailSender(enrolledStudent.email, `Successfully Enrolled into ${enrolledCourse.courseName}`, courseEnrollmentEmail(enrolledCourse.courseName, `${enrolledStudent.firstName} ${enrolledStudent.lastName}`));
        } catch(error){
          console.log(error);
          return res.status(400).json({
            success:false,
            error:error.message
          });
        }
      }
      return res.status(200).json({ success: true, message: "Student Enrolled" })
    }
    else{
      return res.status(400).json({ success: false, message: "Please provide courseIds" })
    }
  }

  try {
    // Find the course and enroll the student in it
    const enrolledCourse = await Course.findOneAndUpdate(
      { _id: courseId },
      { $push: { studentsEnrolled: userId } },
      { new: true }
    )

    if (!enrolledCourse) {
      return res
        .status(500)
        .json({ success: false, error: "Course not found" })
    }
    console.log("Updated course: ", enrolledCourse)

    const courseProgress = await CourseProgress.create({
      courseID: courseId,
      userId: userId,
      completedVideos: [],
    })
    // Find the student and add the course to their list of enrolled courses
    const enrolledStudent = await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          courses: courseId,
          courseProgress: courseProgress._id,
        },
      },
      { new: true }
    )

    // Send an email notification to the enrolled student
    await mailSender(
      enrolledStudent.email,
      `Successfully Enrolled into ${enrolledCourse.courseName}`,
      courseEnrollmentEmail(
        enrolledCourse.courseName,
        `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
      )
    )
    return res.status(200).json({ success: true, message: "Student Enrolled" })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ success: false, error: error.message })
  }

}