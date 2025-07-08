import * as Icons from "react-icons/vsc"
import { useDispatch } from "react-redux"
import { NavLink, matchPath, useLocation } from "react-router-dom"

import { resetCourseState } from "../../../slices/courseSlice"

export default function SidebarLink({ link, iconName }) {


  // Bracket notation allows dynamic property access using a string.
  // Lets you use a variable or any string to access the property.

  // Icons is an object where each key is iconname .
  // here,iconName is dynamic which would be one of the key in Icons
  // so to extract that particular key during each render dynamic extraction has to be performed , which is done by bracket notation
  const Icon = Icons[iconName]

  // now this Icon  becomes a component


  //agar ye samaj main aayaa ki use location hook kyu use kiya -->good going

  const location = useLocation()     
  const dispatch = useDispatch()

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }

  return (
    <NavLink

      to={link.path}
      onClick={() => dispatch(resetCourseState())}
      className={`relative px-8 py-2 text-sm font-medium ${
        matchRoute(link.path)
          ? "bg-yellow-800 text-yellow-50"
          : "bg-opacity-0 text-richblack-300"
      } transition-all duration-200`}
    >

      {/* displaying of yellow line */}
      <span
        className={`absolute left-0 top-0 h-full w-[0.15rem] bg-yellow-50 ${
          matchRoute(link.path) ? "opacity-100" : "opacity-0"
        }`}
      ></span>


      <div className="flex items-center gap-x-2">
        {/* Icon Goes Here */}
        <Icon className="text-lg" />
        <span>{link.name}</span>
      </div>
      
    </NavLink>

  )
}


// Same as Link but with extra power for styling active links.

// Adds an active class (or lets you apply styles) if the link matches the current URL.

// Used in sidebars, navbars, tabs, etc.

// in NavLink, the isActive prop is provided by default via a function in the className or style prop.

// <NavLink
//   to="/about"
//   className={({ isActive }) => 
//     isActive ? "text-yellow-500 font-bold" : "text-gray-400"
//   }
// />