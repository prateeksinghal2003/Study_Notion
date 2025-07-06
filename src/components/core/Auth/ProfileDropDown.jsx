import { useRef, useState } from "react"
import { AiOutlineCaretDown } from "react-icons/ai"
import { VscDashboard, VscSignOut } from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import useOnClickOutside from "../../../hooks/useOnClickOutside"
import { logout } from "../../../services/operations/authAPI"

export default function ProfileDropdown() {
  const { user } = useSelector((state) => state.profile)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  //internally
  // ref:{
  //   current: null
  // }

// useOnClickOutside(ref, () => setOpen(false));
// This function call happens during render.
// Inside it, you call useEffect(...).

// Edit
// useEffect(() => {
//   // Effect logic
// }, [ref, handler]);
// React sees this effect during render and remembers it.

// But it doesn’t run the effect yet.
// 🧠 When does it actually run?
// After the component renders and mounts
// After ref.current is set
// That’s when the effect logic runs (and adds event listeners)

// 🔁 So the flow is:
// 1. Component renders
//    → runs useOnClickOutside()
//    → registers useEffect (but doesn’t run it yet)

// 2. React mounts the DOM
//    → sets ref.current = <div>...
//    → now runs useEffect
//    → adds event listeners
// ✅ Final takeaway:
// useEffect is declared during render but runs after render.
// That’s why it works with ref.current — it's guaranteed to be set by then.




//   Every time your component renders:
// React creates a brand new function for () => setOpen(false).
// So handler is a new reference each time — even though the logic is identical.

//if open is already false and we did setOpen false then component would not re render
  useOnClickOutside(ref, () => setOpen(false))    

  if (!user) return null

  return (
    <button className="relative" onClick={() => setOpen(true)}>

      <div className="flex items-center gap-x-1">
        <img
          src={user?.image}
          alt={`profile-${user?.firstName}`}
          className="aspect-square w-[30px] rounded-full object-cover"
        />
        <AiOutlineCaretDown className="text-sm text-richblack-100" />
      </div>

{/* e.stopPropagation(): Stops the event from bubbling up the DOM tree.
<div onClick={handleOutsideClick}>
  <div onClick={(e) => e.stopPropagation()}>
    <!-- some popup or modal content -->
  </div>
</div>
The outer div handles clicks outside the modal (e.g., to close it).
The inner div (modal) uses e.stopPropagation() so clicks inside it don’t close it. */}


      {
        open && (
        <div
          onClick={(e) => e.stopPropagation()}
//           divide-y-[1px]
// Adds a 1px vertical divider (border between child elements top-to-bottom).
// Applies to direct children of the element.
// Custom value ([1px]) overrides default Tailwind spacing scale.
// divide-richblack-700
// Sets the color of the divider.
// richblack-700 is a custom color (defined in Tailwind config).
// Works with divide-* utilities.
// overflow-hidden
// Hides any content that goes outside the element's bounds (both x and y axes).
// Often used with rounded corners or to prevent scrollbars.
          className="absolute top-[118%] right-0 z-[1000] divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md border-[1px] border-richblack-700 bg-richblack-800"
          ref={ref}
        >
          <Link to="/dashboard/my-profile" onClick={() => setOpen(false)}>
            <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
              <VscDashboard className="text-lg" />
              Dashboard
            </div>
          </Link>

          <div
            onClick={() => {
              dispatch(logout(navigate))
              // setOpen(false)
            }}
            className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
          >
            <VscSignOut className="text-lg" />
            Logout
          </div>
        </div>
      )
    }
    </button>
  )
}


// logout(naviagte) it returns a function like this
// (dispatch) => {
//     dispatch(setToken(null))
//     dispatch(setUser(null))
//     dispatch(resetCart())
//     localStorage.removeItem("token")
//     localStorage.removeItem("user")
//     toast.success("Logged Out")
//     navigate("/")
//   }

//   so dispatch has-->  dispatch (    (dispatch) => {
//     dispatch(setToken(null))
//     dispatch(setUser(null))
//     dispatch(resetCart())
//     localStorage.removeItem("token")
//     localStorage.removeItem("user")
//     toast.success("Logged Out")
//     navigate("/")
//   }             )

//   because of redux thunk it lets dispatch to accept functions 
//   so inside function executes , and the parameter dispatch gets the real dispatch 