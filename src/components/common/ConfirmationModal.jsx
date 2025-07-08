import IconBtn from "./IconBtn"
// 🧠 JavaScript Closure Recap
// In JavaScript, functions remember the variables from where they were created, not from where they are called.

// So even if dispatch is undefined in the child:

// It's used in the parent.

// And that logic is frozen into the function passed down.

// ✅ Final Answer
// Yes, dispatch works in the child even if it’s undefined there — because the function that uses it was created in the parent, and closures carry that context.




export default function ConfirmationModal({ modalData }) {
  return (

// overflow-auto: Adds scrollbars if content overflows vertically or horizontally.
// bg-white: Sets background color to white.
// bg-opacity-10: Makes the background white but only 10% visible (mostly transparent).
// backdrop-blur-sm: Adds a small blur effect behind the modal (on elements beneath it).
// inset-0 in Tailwind:
// It’s shorthand for setting all four sides of a positioned element to 0:
// This makes the element stretch across the entire screen — perfect for modals, backdrops, or overlays.
// So yes — inset-0 means full-screen coverage when combined with fixed or absolute.

    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">

      <div className="w-11/12 max-w-[350px] rounded-lg border border-richblack-400 bg-richblack-800 p-6">

        <p className="text-2xl font-semibold text-richblack-5">
          {modalData?.text1}
        </p>

        <p className="mt-3 mb-5 leading-6 text-richblack-200">  
          {modalData?.text2}
        </p>

        <div className="flex items-center gap-x-4">
          <IconBtn
            onclick={modalData?.btn1Handler}
            text={modalData?.btn1Text}
          />

          <button
            className="cursor-pointer rounded-md bg-richblack-200 py-[8px] px-[20px] font-semibold text-richblack-900"
            onClick={modalData?.btn2Handler}
          >

            {modalData?.btn2Text}
          </button>
          
        </div>

      </div>

    </div>
  )
}