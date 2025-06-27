const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
  name: {
    type: String
  },
  description: {
    type:String
  },

  //array of videos,each video is a subsection
  course:[
     {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ]
  
})

module.exports = mongoose.model("Category",categorySchema )