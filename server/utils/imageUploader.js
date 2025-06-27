//import cloudinary
const cloudinary = require('cloudinary').v2


exports.uploadImageToCloudinary  = async (file, folder, height, quality) => {
    

    //shorthand for 
    // options{
    //     folder: folder
    // }
    const options = {folder};

    //if height available include in options
    if(height) {
        options.height = height;
    }

    //if quality available include in options
    if(quality) {
        options.quality = quality;
    }
    //This tells Cloudinary to:
    //Automatically detect the type of file I’m uploading — whether it’s an image, video, PDF, etc
    
    options.resource_type = "auto";


//     It's the temporary location on your server where the uploaded file is stored after being received from the client 
//     options is an object, e.g., { folder: "some-folder-name" }, that configures how the file is stored in Cloudinary.
// cloudinary.uploader.upload(...) is the Cloudinary method that uploads the file.
// await waits for the upload to complete.
// return sends the result (usually a Cloudinary response object) back to the caller.
// This response contains useful info like:
// public_id: to refer to the image later
// secure_url: the HTTPS URL to access the image




    return await cloudinary.uploader.upload(file.tempFilePath, options);
}