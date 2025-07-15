import RenderSteps from "./RenderSteps"

export default function AddCourse() {
  return (
    <>
      <div className="flex w-full items-start gap-x-6">

        <div className="flex flex-1 flex-col">

          <h1 className="mb-14 text-3xl font-medium text-richblack-5">
            Add Course
          </h1>

          <div className="flex-1">
            <RenderSteps />
          </div>
        </div>


        {/* Course Upload Tips */}    
        {/* sticky: Makes the element sticky (i.e., it "sticks" to a position while scrolling).
        top: Used only with positioned elements (relative, absolute, fixed, or sticky).
       It shifts the element's position from its original location.
       This keeps the element 40px from the top of the viewport when scrolling. */}

        <div className="sticky top-10 hidden max-w-[400px] flex-1 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 xl:block">
          
          <p className="mb-8 text-lg text-richblack-5">⚡ Course Upload Tips</p>

        {/* list-item:
         Applies display: list-item.
         Makes the element behave like a list item (i.e., adds bullet/marker).
         Useful when you're styling non-<li> tags to look like list items.
        🔹 list-disc:
         Applies list-style-type: disc.
         Sets the bullet style to a solid circle (●), the default for unordered lists. */}
         
          <ul className="ml-5 list-item list-disc space-y-4 text-xs text-richblack-5">

            <li>Set the Course Price option or make it free.</li>
            <li>Standard size for the course thumbnail is 1024x576.</li>
            <li>Video section controls the course overview video.</li>
            <li>Course Builder is where you create & organize a course.</li>
            <li>
              Add Topics in the Course Builder section to create lessons,
              quizzes, and assignments.
            </li>
            <li>
              Information from the Additional Data section shows up on the
              course single page.
            </li>
            <li>Make Announcements to notify any important</li>
            <li>Notes to all enrolled students at once.</li>
          </ul>

        </div>

      </div>
    </>
  )
}