//refined code at Line 720

const Course = require("../models/Course")
const Section = require("../models/Section")
const SubSection = require("../models/SubSection")
const User = require("../models/User")
const Category = require("../models/Category")
const RatingAndReview = require("../models/RatingAndReviews");
 const {uploadImageToCloudinary } = require("../utils/imageUploader")




const CourseProgress = require("../models/CourseProgress")
const { convertSecondsToDuration } = require("../utils/secToDurations")

// Function to create a new course

// exports.createCourse = async (req, res) => {
//   try {

//     // Get user ID from request object jo maine append kiya("user" property) in middleware
//     //we are fetching user id to validate that user is instructor
//     const userId = req.user.id

//     // Get all required fields from request body
//     const {
//       courseName,
//       courseDescription,
//       whatYouWillLearn,
//       price,

//       //here tag will conatin an id representing tag doc in db
    
//        category,
//     //   status,
//     //   instructions: _instructions,
//     } = req.body


//     // Get thumbnail image from request files
//     const thumbnail = req.files.thumbnailImage

//     // Convert the tag and instructions from stringified Array to Array
//     // const tag = JSON.parse(_tag)
//     // const instructions = JSON.parse(_instructions)
//     // console.log("tag", tag)
//     // console.log("instructions", instructions)

//     //Start Validation 

//     // Check if any of the required fields are missing
//     if (
//       !courseName ||
//       !courseDescription ||
//       !whatYouWillLearn ||
//       !price ||
//       !category||
//        !thumbnail 
    
    
//     //   !instructions.length
//     ) {
//       return res.status(400).json({
//         success: false,
//         message: "All Fields are Mandatory",
//       })
//     }


//     // if (!status || status === undefined) {
//     //   status = "Draft"
//     // }


    
//     //course schema main instructor id bhi hain ,so i need to fetch instructor id .
//     //so db call
    
//     const instructorDetails = await User.findById(userId
//         // {accountType: "Instructor"}
//     )
 
//     //if response not found 
//     if (!instructorDetails) {
//       return res.status(404).json({
//         success: false,
//         message: "Instructor Details Not Found",
//       })
//     }



//     // Check if the category given is valid
//     const categoryDetails = await Category.findById(category)
//     if (!categoryDetails) {
//       return res.status(404).json({
//         success: false,
//         message: " Category Not Found",
//       })
//     }

//     // Upload the Thumbnail to Cloudinary
//     const thumbnailImage = await uploadImageToCloudinary(
//       thumbnail,
//       process.env.FOLDER_NAME
//     )
//     console.log(thumbnailImage)


//     // Create an entry for  new course with the given details

//     const newCourse = await Course.create({
//       courseName,
//       courseDescription,

//       //instructor is an object id
//       //so i need to fetch instructor id 
//       instructor: instructorDetails._id,
//       whatYouWillLearn: whatYouWillLearn,
//       price,
      
//        category: categoryDetails._id,
//       thumbnail: thumbnailImage.secure_url,
//     //   status: status,
//     //   instructions,
//     })


//     console.log("nayaaa course  ",newCourse)

//     // Add the new course to the User Schema of the Instructor
//     await User.findByIdAndUpdate(
//       {
//         _id: instructorDetails._id,
//       },

//       //push that course id in the courses array 
//       {
//         $push: {
//           courses: newCourse._id,
//         },
//       },

//       //i will get updated response
//       { new: true }
//     )

//     // Add the new course to the Tag Schema

//     const categoryDetails2 = await Category.findByIdAndUpdate(
//         //Finds the document in the Tag collection with the given _id
//       { _id: category }, 
//       {
//         $push: {
//           courses: newCourse._id,
//         },
//       },
//       { new: true }
//     )


//     console.log("Updated Category Doc ", categoryDetails2)
//     // Return the new course and a success message

//     res.status(200).json({
//       success: true,
//       data: newCourse,
//       message: "Course Created Successfully",
//     })
//   } catch (error) {
//     // Handle any errors that occur during the creation of the course
//     console.error(error)
//     res.status(500).json({
//       success: false,
//       message: "Failed to create course",
//       error: message,
//     })
//   }
// }

exports.createCourse = async (req, res) => {
  try {

    
    // Get user ID from request object
    const userId = req.user.id

   
    // Get all required fields from request body
    let {
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,

      //extracts the tag property from req.body and renames it to _tag in your local variable scope.
      tag :_tag,
      category,
      status,
      instructions:_instructions,
    } = req.body

    // Get thumbnail image from request files
    const thumbnail = req.files.thumbnailImage

    // Convert the tag and instructions from stringified Array to Array
     
  //  actually this---> ["frontend", "react"]
  //   but sent like this ---->'["frontend", "react"]'  -->Stringified array


    //is used to convert a JSON string into a JavaScript object or array.
    //A JSON string is just a text version of a JavaScript object or array.
    //You can think of the JSON string as a "save-as-text" version of a JavaScript object.
   //Because data sent over HTTP (e.g., from frontend to backend) must be text.
   //It can’t send this array directly. Instead, it sends it as a string:
   //Then, on the backend, you parse it back into a real array:

    const tag = JSON.parse(_tag)
    const instructions = JSON.parse(_instructions)

    console.log("tag", tag.length)
    console.log(courseName);
    console.log(courseDescription);
    console.log(whatYouWillLearn);
    console.log( price);
    console.log(category);
    console.log(instructions);
    //console.log("instructions", instructions)


   



    // Check if any of the required fields are missing
    /*Falsy Values in JavaScript:
These values behave like false when used in a boolean context:

false

0

"" (empty string)

null

undefined

NaN

Everything else is truthy — even things like:

"0" (a string with zero)

[] (empty array)

{} (empty object)

*/
    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !tag.length 
      ||
       !thumbnail 
      ||
      !category ||!instructions.length
    
    ) {
      return res.status(400).json({
        success: false,
        message: "All Fields are Mandatory",
      })
    }

    //status is of type String so
    // !status can be undefined, empty or null
  
    if (!status) {
      status = "Draft"
   }


    // Check if the user is an instructor
    const instructorDetails = await User.findById(userId
    //   , {
    //   accountType: "Instructor",
    // }
  
  )

    if (!instructorDetails) {
      return res.status(404).json({
        success: false,
        message: "Instructor Details Not Found",
      })
    }


    // const instructorDetails = await User.findById(userId);


    // Check if the category given is valid
    const categoryDetails = await Category.findById(category)
    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Category Details Not Found",
      })
    }
    // Upload the Thumbnail to Cloudinary
    const thumbnailImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    )
    // console.log(thumbnailImage)
    // Create a new course with the given details
    const newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: instructorDetails._id,
      whatYouWillLearn: whatYouWillLearn,
      price,
      tag,
      category: categoryDetails._id,
        thumbnail: thumbnailImage.secure_url,
      status: status,
      instructions: instructions
      
    })

    // Add the new course to the User Schema of the Instructor
    await User.findByIdAndUpdate(
      {
        _id: instructorDetails._id,
      },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true }
    )
    // Add the new course to the Categories
    const categoryDetails2 = await Category.findByIdAndUpdate(
      { _id: category },
      {
        $push: {
          course: newCourse._id,
        },
      },
      { new: true }
    )
    console.log("HEREEEEEEEE", categoryDetails2)

    // Return the new course and a success message
    res.status(200).json({
      success: true,
      data: newCourse,
      message: "Course Created Successfully",
    })
  } catch (error) {
    // Handle any errors that occur during the creation of the course
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Failed to create course",
      error: error.message,
    })
  }
}

// Get all Course List
//find Method
// Parameter     	   Purpose
// query	           What documents you want to find (conditions)
// projection	     What fields you want to include/exclude in the result
// options	         Extra options (like sort, skip, limit, etc.)
// callback	       Optional — if using callbacks instead of await or .then()


exports.getAllCourses = async (req, res) => {
    try {
      const allCourses = await Course.find(
        // { status: "Published" },

        //for finding no condition is specified but we want when document is fetched 
        //from database these key-value pair i should get only
        {
          courseName: true,
          price: true,
          thumbnail: true,
          instructor: true,
          ratingAndReviews: true,
          studentsEnrolled: true,
        }
      )
      //i am getting instructor  id ,so to get the actual data from that id i am using populate 

        .populate("instructor")
        .exec()
  
      return res.status(200).json({
        success: true,
        data: allCourses,
        message : "data fetched for all courses successfully"
      })
    } catch (error) {
      console.log(error)
      return res.status(404).json({
        success: false,
        message: `Can't Fetch Course Data`,
        error: error.message,
      })
    }
  }



  exports.getCourseDetails = async (req, res) => {
  try {

    //The variable name must match the key inside req.body.
    const { courseId } = req.body


    const courseDetails = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })

     //course ke andar instructor key ki saari details dena
     //instructor is storing the reference of User
     //matlab user ki saaari details dena under instructor key 
    //user ke andar "additionalDetails Key present hai" refering Profile
    //toh profile ki bhi saari details dena  
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",


          //The select key is used to choose which fields you want to include or exclude from the populated document.
          //From each subSection, you want to exclude the videoUrl field.
          //The - sign means "do not include".

          select: "-videoUrl",
        },
      })
      .exec()

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find course with id: ${courseId}`,
      })
    }

    // if (courseDetails.status === "Draft") {
    //   return res.status(403).json({
    //     success: false,
    //     message: `Accessing a draft course is forbidden`,
    //   });
    // }

    // let totalDurationInSeconds = 0
    // courseDetails.courseContent.forEach((content) => {
    //   content.subSection.forEach((subSection) => {
    //     const timeDurationInSeconds = parseInt(subSection.timeDuration)
    //     totalDurationInSeconds += timeDurationInSeconds
    //   })
    // })

     //totalDuration is a String
    // const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        //  totalDuration,
      },
      message: "cousrse details fetched successfully"
    })


  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

  
//----------------------------------------------------------------------------------------
//Edit Course Details
exports.editCourse = async (req, res) => {
  try {
    const { courseId } = req.body
    const updates = req.body
    const course = await Course.findById(courseId)

    if (!course) {
      return res.status(404).json({ error: "Course not found" })
    }

    // If Thumbnail Image is found, update it
    if (req.files) {
      console.log("thumbnail update")
      const thumbnail = req.files.thumbnailImage
      const thumbnailImage = await uploadImageToCloudinary(
        thumbnail,
        process.env.FOLDER_NAME
      )
      course.thumbnail = thumbnailImage.secure_url
    }

    // Update only the fields that are present in the request body
    //This starts a for...in loop to iterate over all the enumerable properties (keys) in the updates object.
    //This checks if the current key is either "tag" or "instructions".
    //These are likely fields that are stored as JSON strings and need to be parsed before assignment.

    //hasOwnProperty-->"Does this key really belong to the updates object itself, 
    // or did it come from somewhere else (like JavaScript's built-in features)?"
    // JavaScript gives all objects some built-in features by default.
    //you might get extra keys that aren’t really part of your data.
    //It filters out anything the object didn’t define itself.
    
    for (const key in updates) {
      if (updates.hasOwnProperty(key)) {
        if (key === "tag" || key === "instructions") {
          course[key] = JSON.parse(updates[key])
        } else {
          course[key] = updates[key]
        }
      }
    }

    await course.save()


     //both populate do the same thing
    const updatedCourse = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")  
      .populate("ratingAndReviews") 
      .populate({ 
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec()

    res.json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })
  }
}


//----------------------------------------------------------------------------------
// // Get One Single Course Details
// // exports.getCourseDetails = async (req, res) => {
// //   try {
// //     const { courseId } = req.body
// //     const courseDetails = await Course.findOne({
// //       _id: courseId,
// //     })
// //       .populate({
// //         path: "instructor",
// //         populate: {
// //           path: "additionalDetails",
// //         },
// //       })
// //       .populate("category")
// //       .populate("ratingAndReviews")
// //       .populate({
// //         path: "courseContent",
// //         populate: {
// //           path: "subSection",
// //         },
// //       })
// //       .exec()
// //     // console.log(
// //     //   "###################################### course details : ",
// //     //   courseDetails,
// //     //   courseId
// //     // );
// //     if (!courseDetails || !courseDetails.length) {
// //       return res.status(400).json({
// //         success: false,
// //         message: `Could not find course with id: ${courseId}`,
// //       })
// //     }

// //     if (courseDetails.status === "Draft") {
// //       return res.status(403).json({
// //         success: false,
// //         message: `Accessing a draft course is forbidden`,
// //       })
// //     }

// //     return res.status(200).json({
// //       success: true,
// //       data: courseDetails,
// //     })
// //   } catch (error) {
// //     return res.status(500).json({
// //       success: false,
// //       message: error.message,
// //     })
// //   }
// // }


//-----------------------------------------------------------------------------------
exports.getFullCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body
    const userId = req.user.id

    const courseDetails = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      // .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec()

    let courseProgressCount = await CourseProgress.findOne({
      courseID: courseId,
      userId: userId,
    })

   // console.log("courseProgressCount : ", courseProgressCount)

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find course with id: ${courseId}`,
      })
    }

    // if (courseDetails.status === "Draft") {
    //   return res.status(403).json({
    //     success: false,
    //     message: `Accessing a draft course is forbidden`,
    //   });
    // }

    let totalDurationInSeconds = 0
    courseDetails.courseContent.forEach((content) => {
      content.subSection.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration)
        totalDurationInSeconds += timeDurationInSeconds
      })
    })

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        totalDuration,

        // ?.----> optional chaining
        // if object is undefined or null , instead of throwing an error  , undefined is return

        completedVideos: courseProgressCount?.completedVideos
          ? courseProgressCount?.completedVideos
          : [],
      },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

//---------------------------------------------------------------------------
// // Get a list of Course for a given Instructor
exports.getInstructorCourses = async (req, res) => {
  try {
    // Get the instructor ID from the authenticated user or request body
    const instructorId = req.user.id

    // Find all courses belonging to the instructor in descending order of creation . 
    const instructorCourses = await Course.find({
      instructor: instructorId,
    }).sort({ createdAt: -1 })

    // Return the instructor's courses
    res.status(200).json({
      success: true,
      data: instructorCourses,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Failed to retrieve instructor courses",
      error: error.message,
    })
  }
}

// Delete the Course
exports.deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.body

    // Find the course
    const course = await Course.findById(courseId)
    if (!course) {
      return res.status(404).json({ message: "Course not found" })
    }

    // // Unenroll students from the course
    const studentsEnrolled = course.studentsEnrolled
    for (const studentId of studentsEnrolled) {
      await User.findByIdAndUpdate(studentId, {
        $pull: { courses: courseId },
      })
    }

    // Delete sections and sub-sections
    const courseSections = course.courseContent
    for (const sectionId of courseSections) {
      // Delete sub-sections of the section
      const section = await Section.findById(sectionId)
      if (section) {
        const subSections = section.subSection
        for (const subSectionId of subSections) {
          await SubSection.findByIdAndDelete(subSectionId)
        }
      }

      // Delete the section
      await Section.findByIdAndDelete(sectionId)
    }

    // Delete the course
    await Course.findByIdAndDelete(courseId)

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
}






//refined code


// const Course = require("../models/Course")
// const Category = require("../models/Category")
// const Section = require("../models/Section")
// const SubSection = require("../models/SubSection")
// const User = require("../models/User")
// const { uploadImageToCloudinary } = require("../utils/imageUploader")
// const CourseProgress = require("../models/CourseProgress")
// const { convertSecondsToDuration } = require("../utils/secToDuration")
// // Function to create a new course
// exports.createCourse = async (req, res) => {
//   try {
//     // Get user ID from request object
//     const userId = req.user.id

//     // Get all required fields from request body
//     let {
//       courseName,
//       courseDescription,
//       whatYouWillLearn,
//       price,
//       tag: _tag,
//       category,
//       status,
//       instructions: _instructions,
//     } = req.body
//     // Get thumbnail image from request files
//     const thumbnail = req.files.thumbnailImage

//     // Convert the tag and instructions from stringified Array to Array
//     const tag = JSON.parse(_tag)
//     const instructions = JSON.parse(_instructions)

//     console.log("tag", tag)
//     console.log("instructions", instructions)

//     // Check if any of the required fields are missing
//     if (
//       !courseName ||
//       !courseDescription ||
//       !whatYouWillLearn ||
//       !price ||
//       !tag.length ||
//       !thumbnail ||
//       !category ||
//       !instructions.length
//     ) {
//       return res.status(400).json({
//         success: false,
//         message: "All Fields are Mandatory",
//       })
//     }
//     if (!status || status === undefined) {
//       status = "Draft"
//     }
//     // Check if the user is an instructor
//     const instructorDetails = await User.findById(userId, {
//       accountType: "Instructor",
//     })

//     if (!instructorDetails) {
//       return res.status(404).json({
//         success: false,
//         message: "Instructor Details Not Found",
//       })
//     }

//     // Check if the tag given is valid
//     const categoryDetails = await Category.findById(category)
//     if (!categoryDetails) {
//       return res.status(404).json({
//         success: false,
//         message: "Category Details Not Found",
//       })
//     }
//     // Upload the Thumbnail to Cloudinary
//     const thumbnailImage = await uploadImageToCloudinary(
//       thumbnail,
//       process.env.FOLDER_NAME
//     )
//     console.log(thumbnailImage)
//     // Create a new course with the given details
//     const newCourse = await Course.create({
//       courseName,
//       courseDescription,
//       instructor: instructorDetails._id,
//       whatYouWillLearn: whatYouWillLearn,
//       price,
//       tag,
//       category: categoryDetails._id,
//       thumbnail: thumbnailImage.secure_url,
//       status: status,
//       instructions,
//     })

//     // Add the new course to the User Schema of the Instructor
//     await User.findByIdAndUpdate(
//       {
//         _id: instructorDetails._id,
//       },
//       {
//         $push: {
//           courses: newCourse._id,
//         },
//       },
//       { new: true }
//     )
//     // Add the new course to the Categories
//     const categoryDetails2 = await Category.findByIdAndUpdate(
//       { _id: category },
//       {
//         $push: {
//           courses: newCourse._id,
//         },
//       },
//       { new: true }
//     )
//     console.log("HEREEEEEEEE", categoryDetails2)
//     // Return the new course and a success message
//     res.status(200).json({
//       success: true,
//       data: newCourse,
//       message: "Course Created Successfully",
//     })
//   } catch (error) {
//     // Handle any errors that occur during the creation of the course
//     console.error(error)
//     res.status(500).json({
//       success: false,
//       message: "Failed to create course",
//       error: error.message,
//     })
//   }
// }
// // Edit Course Details
// exports.editCourse = async (req, res) => {
//   try {
//     const { courseId } = req.body
//     const updates = req.body
//     const course = await Course.findById(courseId)

//     if (!course) {
//       return res.status(404).json({ error: "Course not found" })
//     }

//     // If Thumbnail Image is found, update it
//     if (req.files) {
//       console.log("thumbnail update")
//       const thumbnail = req.files.thumbnailImage
//       const thumbnailImage = await uploadImageToCloudinary(
//         thumbnail,
//         process.env.FOLDER_NAME
//       )
//       course.thumbnail = thumbnailImage.secure_url
//     }

//     // Update only the fields that are present in the request body
//     for (const key in updates) {
//       if (updates.hasOwnProperty(key)) {
//         if (key === "tag" || key === "instructions") {
//           course[key] = JSON.parse(updates[key])
//         } else {
//           course[key] = updates[key]
//         }
//       }
//     }

//     await course.save()

//     const updatedCourse = await Course.findOne({
//       _id: courseId,
//     })
//       .populate({
//         path: "instructor",
//         populate: {
//           path: "additionalDetails",
//         },
//       })
//       .populate("category")
//       .populate("ratingAndReviews")
//       .populate({
//         path: "courseContent",
//         populate: {
//           path: "subSection",
//         },
//       })
//       .exec()

//     res.json({
//       success: true,
//       message: "Course updated successfully",
//       data: updatedCourse,
//     })
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({
//       success: false,
//       message: "Internal server error",
//       error: error.message,
//     })
//   }
// }
// // Get Course List
// exports.getAllCourses = async (req, res) => {
//   try {
//     const allCourses = await Course.find(
//       { status: "Published" },
//       {
//         courseName: true,
//         price: true,
//         thumbnail: true,
//         instructor: true,
//         ratingAndReviews: true,
//         studentsEnrolled: true,
//       }
//     )
//       .populate("instructor")
//       .exec()

//     return res.status(200).json({
//       success: true,
//       data: allCourses,
//     })
//   } catch (error) {
//     console.log(error)
//     return res.status(404).json({
//       success: false,
//       message: `Can't Fetch Course Data`,
//       error: error.message,
//     })
//   }
// }
// // Get One Single Course Details
// // exports.getCourseDetails = async (req, res) => {
// //   try {
// //     const { courseId } = req.body
// //     const courseDetails = await Course.findOne({
// //       _id: courseId,
// //     })
// //       .populate({
// //         path: "instructor",
// //         populate: {
// //           path: "additionalDetails",
// //         },
// //       })
// //       .populate("category")
// //       .populate("ratingAndReviews")
// //       .populate({
// //         path: "courseContent",
// //         populate: {
// //           path: "subSection",
// //         },
// //       })
// //       .exec()
// //     // console.log(
// //     //   "###################################### course details : ",
// //     //   courseDetails,
// //     //   courseId
// //     // );
// //     if (!courseDetails || !courseDetails.length) {
// //       return res.status(400).json({
// //         success: false,
// //         message: `Could not find course with id: ${courseId}`,
// //       })
// //     }

// //     if (courseDetails.status === "Draft") {
// //       return res.status(403).json({
// //         success: false,
// //         message: `Accessing a draft course is forbidden`,
// //       })
// //     }

// //     return res.status(200).json({
// //       success: true,
// //       data: courseDetails,
// //     })
// //   } catch (error) {
// //     return res.status(500).json({
// //       success: false,
// //       message: error.message,
// //     })
// //   }
// // }
// exports.getCourseDetails = async (req, res) => {
//   try {
//     const { courseId } = req.body
//     const courseDetails = await Course.findOne({
//       _id: courseId,
//     })
//       .populate({
//         path: "instructor",
//         populate: {
//           path: "additionalDetails",
//         },
//       })
//       .populate("category")
//       .populate("ratingAndReviews")
//       .populate({
//         path: "courseContent",
//         populate: {
//           path: "subSection",
//           select: "-videoUrl",
//         },
//       })
//       .exec()

//     if (!courseDetails) {
//       return res.status(400).json({
//         success: false,
//         message: `Could not find course with id: ${courseId}`,
//       })
//     }

//     // if (courseDetails.status === "Draft") {
//     //   return res.status(403).json({
//     //     success: false,
//     //     message: `Accessing a draft course is forbidden`,
//     //   });
//     // }

//     let totalDurationInSeconds = 0
//     courseDetails.courseContent.forEach((content) => {
//       content.subSection.forEach((subSection) => {
//         const timeDurationInSeconds = parseInt(subSection.timeDuration)
//         totalDurationInSeconds += timeDurationInSeconds
//       })
//     })

//     const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

//     return res.status(200).json({
//       success: true,
//       data: {
//         courseDetails,
//         totalDuration,
//       },
//     })
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     })
//   }
// }
// exports.getFullCourseDetails = async (req, res) => {
//   try {
//     const { courseId } = req.body
//     const userId = req.user.id
//     const courseDetails = await Course.findOne({
//       _id: courseId,
//     })
//       .populate({
//         path: "instructor",
//         populate: {
//           path: "additionalDetails",
//         },
//       })
//       .populate("category")
//       .populate("ratingAndReviews")
//       .populate({
//         path: "courseContent",
//         populate: {
//           path: "subSection",
//         },
//       })
//       .exec()

//     let courseProgressCount = await CourseProgress.findOne({
//       courseID: courseId,
//       userId: userId,
//     })

//     console.log("courseProgressCount : ", courseProgressCount)

//     if (!courseDetails) {
//       return res.status(400).json({
//         success: false,
//         message: `Could not find course with id: ${courseId}`,
//       })
//     }

//     // if (courseDetails.status === "Draft") {
//     //   return res.status(403).json({
//     //     success: false,
//     //     message: `Accessing a draft course is forbidden`,
//     //   });
//     // }

//     let totalDurationInSeconds = 0
//     courseDetails.courseContent.forEach((content) => {
//       content.subSection.forEach((subSection) => {
//         const timeDurationInSeconds = parseInt(subSection.timeDuration)
//         totalDurationInSeconds += timeDurationInSeconds
//       })
//     })

//     const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

//     return res.status(200).json({
//       success: true,
//       data: {
//         courseDetails,
//         totalDuration,
//         completedVideos: courseProgressCount?.completedVideos
//           ? courseProgressCount?.completedVideos
//           : [],
//       },
//     })
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     })
//   }
// }

// // Get a list of Course for a given Instructor
// exports.getInstructorCourses = async (req, res) => {
//   try {
//     // Get the instructor ID from the authenticated user or request body
//     const instructorId = req.user.id

//     // Find all courses belonging to the instructor
//     const instructorCourses = await Course.find({
//       instructor: instructorId,
//     }).sort({ createdAt: -1 })

//     // Return the instructor's courses
//     res.status(200).json({
//       success: true,
//       data: instructorCourses,
//     })
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({
//       success: false,
//       message: "Failed to retrieve instructor courses",
//       error: error.message,
//     })
//   }
// }
// // Delete the Course
// exports.deleteCourse = async (req, res) => {
//   try {
//     const { courseId } = req.body

//     // Find the course
//     const course = await Course.findById(courseId)
//     if (!course) {
//       return res.status(404).json({ message: "Course not found" })
//     }

//     // Unenroll students from the course
//     const studentsEnrolled = course.studentsEnroled
//     for (const studentId of studentsEnrolled) {
//       await User.findByIdAndUpdate(studentId, {
//         $pull: { courses: courseId },
//       })
//     }

//     // Delete sections and sub-sections
//     const courseSections = course.courseContent
//     for (const sectionId of courseSections) {
//       // Delete sub-sections of the section
//       const section = await Section.findById(sectionId)
//       if (section) {
//         const subSections = section.subSection
//         for (const subSectionId of subSections) {
//           await SubSection.findByIdAndDelete(subSectionId)
//         }
//       }

//       // Delete the section
//       await Section.findByIdAndDelete(sectionId)
//     }

//     // Delete the course
//     await Course.findByIdAndDelete(courseId)

//     return res.status(200).json({
//       success: true,
//       message: "Course deleted successfully",
//     })
//   } catch (error) {
//     console.error(error)
//     return res.status(500).json({
//       success: false,
//       message: "Server error",
//       error: error.message,
//     })
//   }
// }

