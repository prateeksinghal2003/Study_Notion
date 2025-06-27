const RatingAndReview = require("../models/RatingAndReviews");
const Course = require("../models/Course");
 const { mongo, default: mongoose } = require("mongoose");

//createRating
exports.createRating = async (req, res) => {
    try{
 
        //user ne course ke page pe jaaakar  rating aur review diaaa aur submit kiya
        //this how request will contain rating,review ,course id ,user id 
        //get user id


        //fetch data from req body
        //check if user is enrolled or not 
        //user should review it once
        //update course schema
        //return response

       
        const userId = req.user.id;
        //fetchdata from req body
        const {rating, review, courseId} = req.body;

        //check if user is enrolled or not
        //$elemMatch is a query operator used inside a MongoDB query. 
        // It tells MongoDB to match documents where at least one element in an array matches the given condition(s).
       //So, it's used to filter documents
       //$eq is a MongoDB comparison operator.
      //It stands for "equals".
     //It checks if a field  value is equal to key value.

     //eleMatch is representing an element of array , if the condition specified is true , return that doc...


        const courseDetails = await Course.findOne(
                                    {_id:courseId,
                                    studentsEnrolled: {$elemMatch: {$eq: userId} },
                                });

        if(!courseDetails) {
            return res.status(404).json({
                success:false,
                message:'Student is not enrolled in the course',
            });
        }

        //check if user already reviewed the course
        const alreadyReviewed = await RatingAndReview.findOne({
                                                user:userId,
                                                course:courseId,
                                            });
        if(alreadyReviewed) {
                    return res.status(403).json({
                        success:false,
                        message:'Course is already reviewed by the user',
                    });
                }

        //create rating and review
        const ratingReview = await RatingAndReview.create({
                                        rating, review, 
                                        course:courseId,
                                        user:userId,
                                    });
       
        //update course with this rating/review
        const updatedCourseDetails = await Course.findByIdAndUpdate(courseId,
                                    {
                                        $push: {
                                            ratingAndReviews: ratingReview._id,
                                        }
                                    },
                                    {new: true});
        console.log(updatedCourseDetails);
        //return response
        return res.status(200).json({
            success:true,
            message:"Rating and Review created Successfully",

            //here your key-name is same as variable name  
            ratingReview,
        })
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}



//getAverageRating 
exports.getAverageRating = async (req, res) => {
    try {
            //get course ID
            //calculate avg rating
            //return rating

            const courseId = req.body.courseId;

//             .aggregate([...]) in code
// You pass an array of stages, each doing something:

// Model.aggregate([
//   { $match: { ... } },     // Filter data
//   { $group: { ... } },     // Group and calculate
//   { $sort: { ... } },      // Sort result
//   { $project: { ... } }    // Shape result
// ]);


//match stage
// Filters the documents.

// Keeps only those where the course field matches the courseId you passed in.

// new mongoose.Types.ObjectId(courseId) is used to convert the string ID into a MongoDB ObjectId 
// (if it's stored as an ObjectId in the DB).


//group stage
// This groups all the matched documents together (because _id: null means "treat all documents as one group").
// It calculates the average of the rating field using $avg.
//$group collects documents together based on a shared value and lets you calculate things like totals, averages, counts, etc., for each group.

//result will be an array like:
//[ { _id: null, averageRating: 4.0 } ]



           
            const result = await RatingAndReview.aggregate([
                {
                    //match--Filter by courseId
                   //Filters the RatingAndReview collection to only include reviews for the given course.
                  //mongoose.Types.ObjectId(courseId) ensures courseId is in the correct ObjectId format.
                  // Groups all matched reviews together (since we only need one final result).

                 //$avg: "$rating" → Computes the average of all rating values.
                //  {
                //     $group: {
                //       _id: <expression>,  // Field to group by
                //       field1: { <accumulator>: "$fieldName" }, 
                //       field2: { <accumulator>: "$fieldName" }
                //     }
                //   }

                //If we set _id: null, it means we are grouping all documents together (no categories).
//                 _id → Defines the grouping criterion (which field to group by).
                   // 2️⃣ field1, field2, etc. → New fields created after grouping, using accumulators like $sum, $avg, etc.
                   // 3️⃣ $accumulator → Defines how to aggregate values, e.g.,

                  // $sum: Adds values

                // $avg: Computes the average
                 // $max: Finds the maximum value
                // $min: Finds the minimum value
                // $push: Creates an array of values


              //  The final result is an array containing one object with averageRating.
            //   [
            //     { "averageRating": 4 }  // (4 + 5 + 3) / 3 = 4
            //   ]

                    $match:{

                        //courseId was in string ,so converted into object is
                        course: new mongoose.Types.ObjectId(courseId),
                    },
                },
                {
                    $group:{
                        _id:null,
                        averageRating: { $avg: "$rating"},
                    }
                }
            ])

           
            if(result.length > 0) {

                return res.status(200).json({
                    success:true,
                    averageRating: result[0].averageRating,
                })

            }
            
            //if no rating/Review exist

            return res.status(200).json({
                success:true,
                message:'Average Rating is 0, no ratings given till now',
                averageRating:0,
            })
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}


//getAllRatingAndReviews

exports.getAllRating = async (req, res) => {
    try{
            const allReviews = await RatingAndReview.find({})
                                    .sort({rating: "desc"})
                                    .populate({
                                        path:"user",
                                        select:"firstName lastName email image",
                                    })
                                    .populate({
                                        path:"course",
                                        select: "courseName",
                                    })
                                    .exec();

            return res.status(200).json({
                success:true,
                message:"All reviews fetched successfully",
                data:allReviews,
            });
    }  
     
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    } 
}