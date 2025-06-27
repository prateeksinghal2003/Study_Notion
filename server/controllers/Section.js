const Section = require("../models/Section");
const Course = require("../models/Course");
const SubSection = require("../models/SubSection");


// CREATE a new section
exports.createSection = async (req, res) => {
	try {


		//Section page pe aate samay i have course id ,(UI)
		// Extract the required properties from the request body
		const { sectionName, courseId } = req.body;

		// Validate the input
		if (!sectionName || !courseId) {
			return res.status(400).json({
				success: false,
				message: "Missing required properties",
			});
		}

		// Create a new section with the given name
		const newSection = await Section.create({sectionName:sectionName});

       // sectionName:sectionName
       //on lhs key name is sectionName -->models se match karo
       //on RHS value in the variable name is under SectionName  

        //update the Course schema
		// Add the new section to the course's content array

		const updatedCourse = await Course.findByIdAndUpdate(
			courseId,
			{
				$push: {
					courseContent: newSection._id,
				},
			},
			{ new: true }
		)

        // First populate: Replaces courseContent (ObjectId of Section) with the actual Section document.
    //Second populate: Inside the Section document, replaces subSection (ObjectId of SubSection) with the actual SubSection document.

			.populate({
				path: "courseContent",
				populate: {
					path: "subSection",
				},
			})
			.exec();

		// Return the updated course object in the response

	return	res.status(200).json({
			success: true,
			message: "Section created successfully",
			updatedCourse,
		});
	} catch (error) {
		// Handle errors
		return res.status(500).json({
			success: false,
			message: "Unable to Create Section",
			error: error.message,
		});
	}
};




// UPDATE a section
exports.updateSection = async (req, res) => {
	try {

		//data fetch
		//data validate
		//data update
		//return response

		const { sectionName, sectionId,courseId } = req.body;

		//after fetching i just validated 
		if (!sectionName || !sectionId) {
			return res.status(400).json({
				success: false,
				message: "Missing required properties",
			});
		}

		const section = await Section.findByIdAndUpdate(
			
			//search on the basis of sectionId
			sectionId,
			{ sectionName },
			{ new: true }
		);


		//course create kiya aur send kiya as a response 
		//ye frontend ke badd samaj aayega
		

		const course = await Course.findById(courseId)
		.populate({
			path:"courseContent",
			populate:{
				path:"subSection",
			},
		})
		.exec();



		res.status(200).json({
			success: true,
			message: section,
			data:course,
		});
	} catch (error) {
		console.error("Error updating section:", error);
		res.status(500).json({
			success: false,
			message: "Some problem in updating section",
		});
	}
};

// DELETE a section 
exports.deleteSection = async (req, res) => {
	try {

		//assuming sending id in params

		//fetch section id 
		//find by id and delete
		//update course schema ,since it contains section doc ids

		const { sectionId, courseId }  = req.body;

		//validate
		const section = await Section.findById(sectionId);

		if(!section) {
			return res.status(404).json({
				success:false,
				message:"Section not Found",
			})
		}

		//update Section Collection
		await Section.findByIdAndDelete(sectionId);

		//Update Course Schema
		await Course.findByIdAndUpdate(courseId, {
			$pull: {
				courseContent: sectionId,
			}
		})

		
	//	console.log(sectionId, courseId);
		

		//delete sub section
		//"_id includes any of the values in this array"
		await SubSection.deleteMany({_id: {$in: section.subSection}});

		

		//find the updated course and return 
		//"_id includes any of the values in this array"
		const course = await Course.findById(courseId).populate({
			path:"courseContent",
			populate: {
				path: "subSection"
			}
		})
		.exec();



		res.status(200).json({
			success:true,
			message:"Section deleted",
			data:course

		});
	} catch (error) {
		console.error("Error deleting section:", error);
		res.status(500).json({
			success: false,
			message: "Some problem in deleting Section",
		});
	}
};   