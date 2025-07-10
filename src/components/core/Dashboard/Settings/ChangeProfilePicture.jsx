import { useEffect, useRef, useState } from "react"
import { FiUpload } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"

import { updateDisplayPicture } from "../../../../services/operations/SettingsAPI"
import IconBtn from "../../../common/IconBtn"

export default function ChangeProfilePicture() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [previewSource, setPreviewSource] = useState(null)

  const fileInputRef = useRef(null)

  const handleClick = () => {

//     fileInputRef.current points to the hidden <input type="file" />.
// .click() programmatically triggers a "click" on that hidden input.
// This causes the browser to open the native file picker dialog .
//  Native browser behavior
// The <input type="file" /> element has built-in browser behavior:
// When it is clicked, the browser automatically opens the file picker.
// You don’t need to define an onClick to make that happen.

     fileInputRef.current.click()
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    // console.log(file)

// e :This is the event object.
// It’s passed automatically to handleFileChange when the <input type="file" /> triggers onChange.

// 🔹 e.target
// target refers to the actual DOM element that triggered the event — in this case, the <input type="file" />.
// ✅ So here:
// e.target === <input type="file" ... />

// 🔹 e.target.files
// This is a built-in property on <input type="file" />.
// It contains a FileList object of all selected files.
// Even if you select just one file, it’s still an array-like object.
// Example:

// e.target.files = [ File {}, File {}, ... ]
// 🔹 e.target.files[0]
// Gets the first file in the list (usually the only one unless multiple is enabled).

// files[0] is a File object.

// Example:

// File {
//   name: "profile.png",
//   size: 204800,
//   type: "image/png",
//   lastModified: 1713456789000,
//   ...
// }
// 🔹 if (file)
// If not null or undefined, move on.

//setImageFile(file)
// setImageFile is the state updater from:
    if (file) {
      setImageFile(file)
      previewFile(file)
    }
  }
// const reader = new FileReader()
// FileReader is a built-in browser API.

// It lets you read file contents stored in a File or Blob (like images, PDFs, etc.).

// reader is a new instance of it — your tool for reading the file.

// js
// Copy
// Edit
//   reader.readAsDataURL(file)
// readAsDataURL() is a method on FileReader.

// It tells the reader:

// "Read this file and convert it into a base64 string with a data: URL prefix."

// Example result:

// bash
// Copy
// Edit
// data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...
// This format is usable directly in <img src="..." />.

// js
// Copy
// Edit
//   reader.onloadend = () => {
// This is an event handler.

// It runs when the reading process finishes, whether it succeeds or fails.

// Think of it as: “When the file has been fully read, do the following…”

// js
// Copy
// Edit
//     setPreviewSource(reader.result)
// reader.result now contains the base64 string (the previewable image).

// setPreviewSource() (from your state) stores that value.

// That value is later used in your <img src={previewSource} /> tag.

  const previewFile = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
     // console.log(reader.result);
      setPreviewSource(reader.result)
    }
  }

  const handleFileUpload = () => {
    try {
      console.log("uploading...")
      setLoading(true)
      const formData = new FormData()
      formData.append("displayPicture", imageFile)
      // console.log("formdata", formData)
//       FormData is a built-in JavaScript object.

// It lets you create key-value pairs that simulate a form submission — especially useful when uploading files.

// 🔹 formData.append("displayPicture", imageFile)
// Adds a new entry to the formData.

// "displayPicture" is the key (just like the name attribute in a form input).

// imageFile is the value — a file object (e.g., an image the user selected).
// JSON doesn’t support binary data like images or files.

// imageFile is a complex File object — it can’t be serialized into JSON properly.

// You’ll either get:

// An error

// Or a broken file on the backend

// ✅ Why FormData is needed:
// FormData is built to handle binary files (like .jpg, .pdf) alongside text.

// It creates a multipart/form-data request:

// Each piece (text or file) is wrapped properly
// The server knows how to extract and use each part

//,then()-->This runs after the async action is finished (i.e., the image is uploaded).
      dispatch(updateDisplayPicture(token, formData)).then(() => {
        setLoading(false)
      })
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }

  useEffect(() => {
    if (imageFile) {
      previewFile(imageFile)
    }
  }, [imageFile])
  return (
    <>
      <div className="flex items-center  rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 text-richblack-5">
        
        <div className="flex items-center gap-x-4">

          <img
            src={previewSource || user?.image}
            alt={`img`}
            className="aspect-square w-[78px] rounded-full object-cover"
          />

          <div className="space-y-2">

            <p>Change Profile Picture</p>

            <div className="flex flex-row gap-3">
            
       {/* type="file"
This tells the browser to render a file upload input.

It creates a UI element that allows the user to pick files from their device (e.g., images, PDFs, etc.).

Example (visible one):

html
Copy
Edit
<input type="file" />
🔹 className="hidden"
This applies Tailwind CSS class hidden, which means:

The input element is invisible on the page.

It still exists in the DOM and can be triggered programmatically (like with fileInputRef.current.click()).

Why hide it?

So you can use a custom-styled button instead of the default ugly file input.

🔹 accept="image/png, image/gif, image/jpeg"
This restricts what file types the user can select.

It limits the file picker to only show:

.png images

.gif images

.jpeg or .jpg images

If the user tries to pick other file types (like .pdf or .txt), they won’t be selectable. */}
              <input 
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/png, image/gif, image/jpeg"
              />
              <button
                onClick={handleClick}
                disabled={loading}
                className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
              >
                Select
              </button>

              <IconBtn
                text={loading ? "Uploading..." : "Upload"}
                onclick={handleFileUpload}
              >
                {!loading && (
                  <FiUpload className="text-lg text-richblack-900" />
                )}
              </IconBtn>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}