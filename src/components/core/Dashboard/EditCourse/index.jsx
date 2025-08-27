import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"

import {
  fetchCourseDetails,
  getFullDetailsOfCourse,
} from "../../../../services/operations/courseDetailsAPI"
import { setCourse, setEditCourse } from "../../../../slices/courseSlice"
import RenderSteps from "../AddCourse/RenderSteps"

// In React Router (or generally in web routing), params = the dynamic parts of the URL.

// They’re like placeholders you define in the route path with a : prefix.

// Example route definition:
// <Route path="/users/:userId/posts/:postId" element={<PostPage />} />

// If user visits:
// /users/42/posts/99

// Then:
// useParams(); 
// // 👉 { userId: "42", postId: "99" }


// So:

// userId and postId are route params.

// Values always come as strings.

// 🔹 Params ≠ query params.

// Route params: /users/:id → /users/42 → useParams()

// Query params: /users?id=42 → useSearchParams()



// Perfect 👍 let’s break it down in React Router terms:

// 1. Route Params (via useParams)

// Dynamic segments in the path.

// <Route path="/users/:id" element={<UserPage />} />


// URL:

// /users/42


// Code:

// const { id } = useParams();  
// // 👉 { id: "42" }


// Defined in the route path.

// Always string.

// Good for IDs, slugs, etc.

// 2. Query Params (via useSearchParams)

// Extra info after ? in the URL.

// URL:

// /users?id=42&tab=posts


// Code:

// const [searchParams] = useSearchParams();
// searchParams.get("id");   // "42"
// searchParams.get("tab");  // "posts"


// Optional parameters.

// Good for filters, sorting, pagination.

export default function EditCourse() {
  const dispatch = useDispatch()
  const { courseId } = useParams()
  const { course } = useSelector((state) => state.course)
  const [loading, setLoading] = useState(false)
  const { token } = useSelector((state) => state.auth)

  useEffect(() => {
    (async () => {
      setLoading(true)
      const result = await getFullDetailsOfCourse(courseId, token)
      console.log(" seee heeeerrrrrrrrreeeee... " + result?.courseDetails);
      if (result?.courseDetails) 
     {
        dispatch(setEditCourse(true))
        dispatch(setCourse(result?.courseDetails))
      }
      setLoading(false)
    }
   )()
  }, [])


  // flex-1: It expands the element to take up all available space in a flex container.

  if (loading) {
    return (
      <div className="grid flex-1 place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div>

      <h1 className="mb-14 text-3xl font-medium text-richblack-5">
        Edit Course
      </h1>

      <div className="mx-auto max-w-[600px]">
        {course ? (
          <RenderSteps />
        ) : (
          <p className="mt-14 text-center text-3xl font-semibold text-richblack-100">
            Course not found
          </p>
        )}
      </div>

    </div>
  )
}