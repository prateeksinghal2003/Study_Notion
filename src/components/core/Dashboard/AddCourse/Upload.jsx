

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

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0]
    if (file) {
      previewFile(file)
      setSelectedFile(file)
    }
  }

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
