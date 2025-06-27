// Import necessary modules
const Section = require("../models/Section")
const SubSection = require("../models/SubSection")
const { uploadImageToCloudinary } = require("../utils/imageUploader")

// Create a new sub-section for a given section

exports.createSubSection = async (req, res) => {
  try {
        //fetch data from request body
        //extract file/video
        //validation
        //upload
        //create a sub-section 
        //update section doc with this section id 
        //return response

    // Extract necessary information from the request body

    // const { sectionId, title, timeDuration,description } = req.body
     const { sectionId, title, description } = req.body


    //extract video file 
     const video = req.files.video;

    // if(!video)
    // {
    //   console.log("Video not found");
    // }

    // else
    // {
    //   console.log("Video found");
    // }

    // Check if all necessary fields are provided
    if (!sectionId || !title || !description 
      || !video
      // || !timeDuration
) {
      return res
        .status(400)
        .json({ success: false, message: "All Fields are Required" })
    }
    //console.log(video)

    // Upload the video file to Cloudinary so that in response you can get secure url which you feed in database
    const uploadDetails = await uploadImageToCloudinary(
      video,
      process.env.FOLDER_NAME
    )
    //its response contains a key called duration --telling video/audio length in seconds

    //uploadDetails will contain the secure URL
    // console.log(uploadDetails)


    // Create a new sub-section with the necessary information

    const SubSectionDetails = await SubSection.create({
      title: title,
      //  timeDuration: timeDuration,
       timeDuration: `${uploadDetails.duration}`,
      description: description,
       videoUrl: uploadDetails.secure_url,
    })

    // Update the corresponding section doc with the newly created sub-section
    const updatedSection = await Section.findByIdAndUpdate(
      { _id: sectionId },
      { $push: { subSection: SubSectionDetails._id } },
      { new: true }
    ).populate("subSection") 

//  The subSection field stores ObjectIds referencing another collection (probably SubSection).
// Populate replaces those IDs with the actual SubSection documents, making it easier to access their full data.

    // Return the updated section in the response
    return res.status(200).json({ success: true, data: updatedSection, message : "Sub Section Created successfully" })
  } catch (error) {
    // Handle any errors that may occur during the process
    console.error("Error creating new sub-section:", error)
    return res.status(500).json({
      success: false,
      message: "Error creating new sub-section:",
      error: error.message,
    })
  }
}


exports.updateSubSection = async (req, res) => {
  try {
    // const { sectionId, subSectionId, title, description,timeDuration } = req.body
     const { sectionId, subSectionId, title, description } = req.body
    const subSection = await SubSection.findById(subSectionId)

    if (!subSection) {
      return res.status(404).json({
        success: false,
        message: "SubSection not found",
      })
    }

    if (title !== undefined) {
      subSection.title = title
    }

    // if (timeDuration !== undefined) {
    //   subSection.timeDuration = timeDuration
    // }

    if (description !== undefined) {
      subSection.description = description
    }

    if (req.files && req.files.video !== undefined) {
      const video = req.files.video
      const uploadDetails = await uploadImageToCloudinary(
        video,
        process.env.FOLDER_NAME
      )

      subSection.videoUrl = uploadDetails.secure_url

         subSection.timeDuration = `${uploadDetails.duration}`
     }

    await subSection.save()

    // find updated section and return it
    const updatedSection = await Section.findById(sectionId).populate(
      "subSection"
    )

    console.log("updated section", updatedSection)

    return res.json({
      success: true,
      message: "Section updated successfully",
      data: updatedSection,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the section",
    })
  }
}


exports.deleteSubSection = async (req, res) => {
  try {
    const { subSectionId, sectionId } = req.body

const subSection = await SubSection.findByIdAndDelete(subSectionId)

//validate 
if (!subSection) {
        return res
          .status(404)
          .json({ success: false, message: "SubSection not found" })
      }

      //update Section Schema
    await Section.findByIdAndUpdate(
      { _id: sectionId },
      {
        $pull: {
          subSection: subSectionId,
        },
      }
    )

   

    

    // find updated section and return it
    const updatedSection = await Section.findById(sectionId).populate(
      "subSection"
    )

    return res.json({
      success: true,
      message: "SubSection deleted successfully",
      data: updatedSection,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "An error occurred while deleting the SubSection",
    })
  }
}


