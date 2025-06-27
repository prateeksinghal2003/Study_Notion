const Category =require("../models/Category")

//Math.random() generates a float between 0 (inclusive) and 1 (exclusive).

// Multiplying by max gives a float from 0 to < max.

// Math.floor() rounds down to the nearest integer, effectively giving you an integer range [0, max - 1].

function getRandomInt(max) {
  return Math.floor(Math.random() * max)
}

//create Category handler


exports.createCategory =async(req,res) =>
{
     try{

        //fetch data
        const {name,desc}=req.body;
        
        //validation
        if(!name || !desc)
        {
            return res.status(400).json({
                
                success: false,
                message: `All fields are required`,
            });
        }

        //create entry in db
        const categoryDetails= await Category.create({
            name: name,
            description:desc,
            
        })

        return res.status(200).json({
			
			success: true,
			message: `Category created successfully`,
            categoryDetails,
		});


     }catch(error)
     {
        return res.status(500).json({
			error: error.message,
			success: false,
			message: `Some Error in Creating Category`,
		});
     }



   //get All categories
   
  
}

exports.showAllCategory=async(req,res)=>
{
    try{

        const allCategory= await Category.find({} ,{name:true, description:true})
        return res.status(200).json({
			
			success: true,
			message: `All Category Fetched successfully`,
        data: allCategory,
		});


         // Category.find({}): This part is querying the Category collection to fetch all documents.
        // { name: true, description: true }: This specifies the fields to be returned in the documents.
       // It will return only the name and description fields for each document, and exclude all others.
    }catch(error)
    {
       return res.status(500).json({
           error: error.message,
           success: false,
           message: `Some Error in Fetching all Categories`,
       });
    }

    
}


//categoryPageDetails 

// exports.categoryPageDetails = async (req, res) => {
//     try {

//         //get categoryid
//        //uss category ke corresponding jitne course hai unko fetch karo
//        //validation
//        //get courses for different categories

//        //get top selling courses----------Hw
//        //return response

//       const { categoryId } = req.body
//       console.log("PRINTING CATEGORY ID: ", categoryId);

//       // --------------------------------Get courses for the selected category
//       const selectedCategory = await Category.findById(categoryId)
//         .populate({
//           path: "courses",
//         //   match: { status: "Published" },
//         //   populate: "ratingAndReviews",
//         })
//         .exec()

//       // Handle the case when the category is not found
//       if (!selectedCategory) {
//         console.log("Category not found.")
//         return res
//           .status(404)
//           .json({ success: false, message: "Category not found" })
//       }

//     // Handle the case when there are no courses
//     //   if (selectedCategory.courses.length === 0) {
//     //     console.log("No courses found for the selected category.")
//     //     return res.status(404).json({
//     //       success: false,
//     //       message: "No courses found for the selected category.",
//     //     })
//     //   }
  
//       //--------------------------------- Get courses for other categories
//       const differentCategory = await Category.find({

//         //ne-->not equal to
//         _id: { $ne: categoryId },
//       }) .populate({
//         path: "courses",
//       //   match: { status: "Published" },
//       //   populate: "ratingAndReviews",
//       })
//       .exec()



//     //   let differentCategory = await Category.findOne(
//     //     categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
//     //       ._id
//     //   )
//     //     .populate({
//     //       path: "courses",
//     //       match: { status: "Published" },
//     //     })
//     //     .exec()


//       // ------------------------------Get top-selling courses across all categories

//     //   const allCategories = await Category.find()
//     //     .populate({
//     //       path: "courses",
//     //       match: { status: "Published" },
//     //       populate: {
//     //         path: "instructor",
//     //     },
//     //     })
//     //     .exec()
//     //   const allCourses = allCategories.flatMap((category) => category.courses)
//     //   const mostSellingCourses = allCourses
//     //     .sort((a, b) => b.sold - a.sold)
//     //     .slice(0, 10)
//        // console.log("mostSellingCourses COURSE", mostSellingCourses)


//       res.status(200).json({
//         success: true,
//         data: {
//           selectedCategory,
//           differentCategory,
//          // mostSellingCourses,
//         },
//       })
//     } catch (error) {
//       return res.status(500).json({
//         success: false,
//         message: "Internal server error",
//         error: error.message,
//       })
//     }
//   }



///--------------------------------------------Cateogry Page Details------------------------
  exports.categoryPageDetails = async (req, res) => {
    try {
      const { categoryId } = req.body
      console.log("PRINTING CATEGORY ID: ", categoryId);

      // Get courses for the specified category
      const selectedCategory = await Category.findById(categoryId)
        .populate({
          path: "course",
          match: {status:"Published"},
          // populate: "ratingAndReviews",
        })
        .exec()
  
      console.log("SELECTED COURSE", selectedCategory)


      // Handle the case when the category is not found
      if (!selectedCategory) {
        console.log("Category not found.")
        return res
          .status(404)
          .json({ success: false, message: "Category not found" })
      }


      // Handle the case when there are no courses
      if (selectedCategory.course.length === 0) {
        console.log("No courses found for the selected category.")
        return res.status(404).json({
          success: false,
          message: "No courses found for the selected category.",
        })
      }
  
      // Get courses for other categories
      //Filters to exclude the document with _id === categoryId using MongoDB's $ne (not equal) operator.
      const categoriesExceptSelected = await Category.find({
        _id: { $ne: categoryId },
      })


      //fetching a particular Category doc on the basis of doc id, 
      //and that doc id is choosen randomly, from unselected categories.
      let differentCategory = await Category.findOne(
        categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
          ._id
      )
        .populate({
          path: "course",
          match: { status: "Published" },
        })
        .exec()
        //console.log("Different COURSE", differentCategory)
        
      // Get top-selling courses across all categories
      const allCategories = await Category.find()
        .populate({
          path: "course",
          match: { status: "Published" },
          populate: {
            path: "instructor",
        },
        })
        .exec()
 
      //Flat Map
      //Maps each category to its course array.
      //Flattens the result by one level, resulting in a single array of all courses across all categories.


      const allCourses = allCategories.flatMap((category) => category.course)
      

     // since allCourses is an array of objects , so sorting on the basis of some property
      const mostSellingCourses = allCourses

      //sorting in descending order
        .sort((a, b) => b.studentsEnrolled.length - a.studentsEnrolled.length)

        //0 and 10 are the indices 
        //0 is inclusive , 10 is exclusive
        //taking first 10 elements

        .slice(0, 10)
       // console.log("mostSellingCourses COURSE", mostSellingCourses)

       
      res.status(200).json({
        success: true,
        data: {
          selectedCategory,
          differentCategory,
          mostSellingCourses,
        },
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }