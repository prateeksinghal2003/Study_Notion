const Profile = require("../models/Profile")
const User = require("../models/User")
const CourseProgress = require("../models/CourseProgress")

const Course = require("../models/Course")

const { uploadImageToCloudinary } = require("../utils/imageUploader")
 const mongoose = require("mongoose")
 const { convertSecondsToDuration } = require("../utils/secToDurations")


// Method for updating a profile since User schema ke aandaar object id hain of profile
exports.updateProfile = async (req, res) => {
  try {

    //get data
    //get user id
    //validation
    //find profile
    //update profile
    //return response


  //It pulls values from req.body
  //If a key like firstName exists and has a value, it uses that.
  //If it's undefined or "", it falls back to "" (empty string)

    const {
      firstName = "",
      lastName = "",
      dateOfBirth = "",
      about = "",
      contactNumber = "",
      gender = "",
    } = req.body

    //middle ware main req main user append kiya tha
    const id = req.user.id

    //validation kar lena

    // Find the profile by id
    const userDetails = await User.findById(id)

      //additionalDetails -->schema main dekhoo of User

    const profileid =(userDetails.additionalDetails);
    const profileDetails =await Profile.findById(profileid);


    
    // Update the profile fields
    profileDetails.dateOfBirth = dateOfBirth
    profileDetails.about = about
    profileDetails.contactNumber = contactNumber
    profileDetails.gender = gender

  
    const user = await User.findByIdAndUpdate(id, {
      firstName,
      lastName,
    })

    //to store it in database
    await profileDetails.save()


    //Find the updated user details
    const updatedUserDetails = await User.findById(id)
      .populate("additionalDetails")
      .exec()

    return res.json({
      success: true,
      message: "Profile updated successfully",
      updatedUserDetails,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      error: error.message,
    })
  }
}



//delete account 

exports.deleteAccount = async (req, res) => {
  try {

    //fetch id 
    //validation
    //delete associated profile
    //delete user 
    //return response

    const id = req.user.id
    console.log(id)

    //since user is logged in ,i can fetch user id 
    //user id middleware  pe append ki

    const user = await User.findById(id)
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    // Delete Assosiated Profile with the User
    await Profile.findByIdAndDelete(
     // _id: new mongoose.Types.ObjectId(user.additionalDetails),
     (user.additionalDetails))


     //update course schema
    for (const courseId of user.courses) {
      await Course.findByIdAndUpdate(
        courseId,
        { $pull: { studentsEnrolled: id } },
        { new: true }
      )
    }

    // Now Delete User
    await User.findByIdAndDelete(id)
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    })
   
     await CourseProgress.deleteMany({ userId: id })
    //also update the Course schema because it contains students enrolled key
    //update many is used because in multiple docs of Course ,same user id can be present 
    // const updatedCourses = await Course.updateMany(
		// 	{ studentsEnrolled: id }, // Find courses where studentId exists
		// 	{ $pull: { studentsEnrolled:id } } // Remove studentId from array
		// );
    // if (updatedCourses) {
    //   return res.status(200).json({
    //     success: true,
    //     message: "Students enrolled in courses are updated",
    //   })
    // }
    // await CourseProgress.deleteMany({ userId: id })

    



  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ success: false, message: "User Cannot be deleted successfully" })
  }
}



//get user details

exports.getAllUserDetails = async (req, res) => {
  try {

    //fetch id 
    //validation
    //db call
    //extract all details 
    //return response

    const id = req.user.id

    const userDetails = await User.findById(id)
      .populate("additionalDetails")
      .exec()

    console.log(userDetails)
    
    res.status(200).json({
      success: true,
      message: "User Data fetched successfully",
      data: userDetails,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}


exports.updateDisplayPicture = async (req, res) => {
  try {
    const displayPicture = req.files.displayPicture
    const userId = req.user.id
    const image = await uploadImageToCloudinary(
      displayPicture,
      process.env.FOLDER_NAME,
      1000,
      100
    )
    console.log(image)
    const updatedProfile = await User.findByIdAndUpdate(
       userId ,
      { image: image.secure_url },
      { new: true }
    )
    return res.send({
      success: true,
      message: `Image Updated successfully`,
      data: updatedProfile,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

exports.getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id
    let userDetails = await User.findOne({
      _id: userId,
    })
      .populate({
        path: "courses",
        populate: {
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        },
      })
      .exec()

// Mongoose documents are not normal objects — they include a lot of extra stuff like:
// Metadata
// Helper methods (e.g., .save(), .populate(), etc.)
// Virtuals
// Getters/setters
// When you run .toObject(), you're saying:
// "Give me just the plain object data, without the extra Mongoose methods."


    userDetails = userDetails.toObject()

    var SubsectionLength = 0
    for (var i = 0; i < userDetails.courses.length; i++) {
      let totalDurationInSeconds = 0
      SubsectionLength = 0


        //this loop is traversing across a subsection array of a section doc
      for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {

        totalDurationInSeconds += userDetails.courses[i].courseContent[j]
        . subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)

        //userDetails.courses[i]--->course ki saari details
        //totalDuration ----> key not present
        //totalDuration is not a field defined in the Course schema.
        //This is perfectly valid and will: Not throw an error
        //This won’t be saved in the database unless:
       //You define totalDuration in your Mongoose schema
       //You manually update and save it using .save()
       //You're adding extra info to your data just before you send it to the frontend or API client — but you're not saving that extra info in the database.


        userDetails.courses[i].totalDuration = convertSecondsToDuration(
          totalDurationInSeconds)


 //on first iteration for j , i have total subsection length for a particular section
        SubsectionLength +=
          userDetails.courses[i].courseContent[j].subSection.length
      }

      let courseProgressCount = await CourseProgress.findOne({
        courseID: userDetails.courses[i]._id,
        userId: userId,
      })


      courseProgressCount = courseProgressCount?.completedVideos.length

      if (SubsectionLength === 0) {
        userDetails.courses[i].progressPercentage = 100
      } else {
        // To make it up to 2 decimal point
        const multiplier = Math.pow(10, 2)

//         courseProgressCount = 7
// SubsectionLength = 12
// So: 7 / 12 = 0.583333
// Then * 100 = 58.3333 → convert to percentage
// Then * 100 = 5833.33 → to get 4 digits before decimal (to round to 2 decimal places)
// Math.round(5833.33) = 5833
// Then:
// 5833 / 100 = 58.33


        userDetails.courses[i].progressPercentage =
          Math.round(
            (courseProgressCount / SubsectionLength) * 100 * multiplier
          ) / multiplier
      }
    }

    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find user with id: ${userDetails}`,
      })
    }
    return res.status(200).json({
      success: true,
      data: userDetails.courses,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

exports.instructorDashboard = async (req, res) => {
  try {

    //no findMany
    //find itself return multiple results
    const courseDetails = await Course.find({ instructor: req.user.id })

    const courseData = courseDetails.map( (course) => {
      const totalStudentsEnrolled = course.studentsEnrolled.length
      const totalAmountGenerated = totalStudentsEnrolled * course.price

      // Create a new object with the additional fields
      const courseDataWithStats = {
        _id: course._id,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        // Include other course properties as needed
        totalStudentsEnrolled,
        totalAmountGenerated,
      }

      return courseDataWithStats
    } )

    res.status(200).json({ courses: courseData })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error", error: error })
  }
}