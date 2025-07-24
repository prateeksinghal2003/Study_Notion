

import { useEffect, useRef, useState } from "react"
import { useDropzone } from "react-dropzone"
import { FiUploadCloud } from "react-icons/fi"
import { useSelector } from "react-redux"

import "video-react/dist/video-react.css"
import { Player } from "video-react"

export default function Upload({
  name,
  label,
  register,
  setValue,
  errors,
  video = false,
  viewData = null,
  editData = null
}) {
// const { course } = useSelector((state) => state.course)
  const [selectedFile, setSelectedFile] = useState(null)

  //previewSource will contain base64 encoded string
  const [previewSource, setPreviewSource] = useState(
    viewData ? viewData : editData ? editData : ""
  )
  const inputRef = useRef(null)

  


//   This is a snippet of React code using the react-dropzone library to handle file uploads via drag-and-drop. Let’s break it down step by step:

// 🔧 1. useDropzone({...})
// This is a custom hook from react-dropzone that gives you file drop functionality.

// You're calling it like this:

// const { getRootProps, getInputProps, isDragActive } = useDropzone({...});
// It returns several helpers:

// getRootProps – attaches props to the drop container (for drag events).

// getInputProps – attaches props to a hidden <input type="file"> element.

// isDragActive – boolean: true when a file is being dragged over the drop area.

// 🧠 2. accept: ...
// This controls what type of files the dropzone will allow.

// accept: !video
//   ? { "image/*": [".jpeg", ".jpg", ".png"] }
//   : { "video/*": [".mp4"] }
// It means:

// If video is falsey, accept images.

// If video is truthy, accept MP4 video files only.

// ✅ It ensures only the right type of files can be dropped/uploaded.

// 📥 3. onDrop
// This is a callback function you define elsewhere in your code. It runs when the user drops files.

// onDrop: someFunction
// It handles what to do with the files (e.g., preview, upload, etc.)

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: !video
      ? { "image/*": [".jpeg", ".jpg", ".png"] }
      : { "video/*": [".mp4"] },
    onDrop,
  })

// onDrop = (acceptedFiles) => {...}
// This is the callback triggered when a user drops or selects files.


// const file = acceptedFiles[0]
// Only handles the first file (even if multiple are selected).

// acceptedFiles is an array of File objects.

// js
// Copy
// Edit
// if (file) {
//   previewFile(file)
//   setSelectedFile(file)
// }
// Calls previewFile(file) to generate a preview.

// Stores the selected file in state (selectedFile), probably to send later via form submission.

// 🔹 previewFile = (file) => {...}
// This function converts the file to a base64 string for preview (typically images or videos).

// js
// Copy
// Edit
// const reader = new FileReader()
// reader.readAsDataURL(file)
// readAsDataURL reads the file and encodes it as a base64 string.

// js
// Copy
// Edit
// reader.onloadend = () => {
//   setPreviewSource(reader.result)
// }
// Once loaded, stores the preview string in state (previewSource).

// This is later used as the src for <img /> or <Player /> (video preview).

//reader.result is a property of the FileReader API that contains the result of reading the file.

// ✅ Summary
// onDrop() handles incoming files.

// previewFile() creates a preview via FileReader.

// This gives you an instant preview before uploading.

// Let me know if you want to handle multiple files or show upload progress.



//base64 is a way to encode binary data (like files or images) into a text string


  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0]
    if (file) {
      previewFile(file)
      setSelectedFile(file)
    }
  }

//    file comes from acceptedFiles[0] in onDrop
// This is a JavaScript File object, representing the uploaded file.

// ✅ A File object contains metadata and binary content. Here's what it includes:
// 🔹 Example:
// js
// Copy
// Edit
// const file = acceptedFiles[0];
// console.log(file);
// You’ll see something like this in the console:

// js
// Copy
// Edit
// File {
//   name: "image.png",
//   lastModified: 1723948200000,
//   lastModifiedDate: Mon Jul 22 2025,
//   size: 349820, // in bytes
//   type: "image/png",
//   webkitRelativePath: "",
//   ...
// }

  const previewFile = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }
  }

  useEffect(() => {
    register(name, { required: true })
  
  }, [register])

  useEffect(() => {
    setValue(name, selectedFile)
   
  }, [selectedFile, setValue])

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm text-richblack-5" htmlFor={name}>
        {label} {!viewData && <sup className="text-pink-200">*</sup>}
      </label>

{/* This spreads the props returned by getRootProps() onto the <div>. It:

Sets up drag-and-drop listeners (like onDragOver, onDrop, etc.).

Makes the entire <div> the drop area.

Handles click events for file selection.

✅ You must apply getRootProps() to the element that should handle file drops and clicks. 


<input {...getInputProps()} ref={inputRef} />
This is the hidden file input that react-dropzone manages.

getInputProps() adds the needed props (type="file", event handlers, accepted types, etc.)

ref={inputRef}: You might use this ref to trigger .click() programmatically elsewhere

It’s "hidden" because getInputProps() applies display: none.

It's still functional because clicks on the parent <div> (via getRootProps()) delegate to this input.*/}

      <div
        {...getRootProps()} 
        className={`${
          isDragActive ? "bg-richblack-600" : "bg-richblack-700"
        } flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-richblack-500`}
      >
        <input {...getInputProps()} ref={inputRef} />  {/* ✅ Must be inside the clickable area */}

        {previewSource ? (
          <div className="flex w-full flex-col p-6">
            {!video ? (
              <img
                src={previewSource}
                alt="Preview"
                className="h-full w-full rounded-md object-cover"
              />
            ) : (
              <Player aspectRatio="16:9" playsInline src={previewSource} />
            )}
            {!viewData && (
              <button
                type="button"
                onClick={() => {
                  setPreviewSource("")
                  setSelectedFile(null)
                  setValue(name, null)
                }}
                className="mt-3 text-richblack-400 underline"
              >
                Cancel
              </button>
            )}
          </div>
        ) : (
          <div className="flex w-full flex-col items-center p-6">

            <div className="grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800">
              <FiUploadCloud className="text-2xl text-yellow-50" />
            </div>

            <p className="mt-2 max-w-[200px] text-center text-sm text-richblack-200">
              Drag and drop the {!video ? "image" : "video"}, or click {" "}
              <span className="font-semibold text-yellow-50">Here</span> to open a
              file
            </p>

            {/* list-disc-->adds bullets */}
            <ul className="mt-10 flex list-disc justify-between space-x-12 text-center  text-xs text-richblack-200">
              <li>Aspect ratio 16:9</li>
              <li>Recommended size 1024x576</li>
            </ul>
          </div>
        )}
      </div>

      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
    </div>
  )
}
