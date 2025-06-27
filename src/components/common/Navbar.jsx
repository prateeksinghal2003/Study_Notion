import { useEffect, useState } from "react"
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai"
import { BsChevronDown } from "react-icons/bs"
import { useSelector } from "react-redux"
import { Link, matchPath, useLocation } from "react-router-dom"

import logo from "../../assets/Logo/Logo-Full-Light.png"
import { NavbarLinks } from "../../data/navbar-links"

import { apiConnector } from "../../services/apiConnector"
import { categories } from "../../services/apis"
//import { ACCOUNT_TYPE } from "../../utils/constants"
import ProfileDropdown from "../core/Auth/ProfileDropDown"

function Navbar() 
{


  // state{
  //   auth:{
  //   token: some value,
  //   signupData:null,
  //   loading:false

  //   },
  //   profile:{

  //   }
  // }

  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const { totalItems } = useSelector((state) => state.cart)


//   It gives you access to the current URL/location object in your React component.
//   | Property   | Description                           |
// | ---------- | ------------------------------------- |
// | `pathname` | The URL path (`/about`, `/contact`)   |
// | `search`   | Query string (`?id=123`)              |
// | `hash`     | Hash fragment (`#section1`)           |
// | `state`    | Optional data passed via `navigate()` |
// | `key`      | Unique ID for the navigation entry    |

   const location = useLocation()


  //sublinks is used for Pyhton or Web-development , that is catalog section ke under jo data hai vo sublink main jaaaye

  const [subLinks, setSubLinks] = useState([])
  const [loading, setLoading] = useState(false)

//This defines an anonymous async arrow function, wrapped in parentheses so JavaScript treats it as an expression, not a function declaration.
// ()
// These parentheses immediately call the function.
   useEffect(() => {
    (async () => {

      setLoading(true)
      try {

    //       return res.status(200).json({
			
		// 	success: true,
		// 	message: `All Category Fetched successfully`,
    //     data: allCategory,
		// });

    //api connector returns response in "data"  object  as defined by axios instance 

    // res{
    //   data:
    //   {
    //     success:
    //     data:
    //   }
    // }

    
        const res = await apiConnector("GET",categories.COURSE_CATEGORIES_API)

        //console.log("heeeeeeeeeeeerreeeee is  res "+ res.data.data[0].name);
        setSubLinks(res.data.data)  
        // sublinks will have an array of objects , each object having name and description.
      } catch (error) 
      {
        console.log("Could not fetch Catalog list.", error)
      }
      setLoading(false)
    })()
  }, [])


  
  

  // console.log("sub links", subLinks)

//location.pathname gives the path of current page
//route contains path of each navbar link
//If the URL is http://example.com/about,
//location.pathname will return /about.






// matchPath({ path: route }, location.pathname)
// matchPath is a function from react-router-dom.

// It takes:

// An object like { path: "/some/path" }

// A string URL (usually location.pathname)

// It returns:

// A match object if the path matches

// Or null if it doesn’t

// 2. { path: route }
// You're passing the route pattern (like "/dashboard" or "/courses/:id").

// 3. location.pathname
// This is the current URL path, like "/dashboard/settings".

  const matchRoute = (route) => 
  {
    return matchPath({ path: route }, location.pathname)
  }

  return (
    <div
      className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 ${
        location.pathname !== "/" ? "bg-richblack-800" : ""
      } transition-all duration-200`}
    >
     
      {/* ye waali div study notion se lekar signup tak hai  */}
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">

        {/* Logo */}

{/* it is placed inside link tag because when click on logo it should direct me to home page */}
        <Link to="/">
          <img src={logo} alt="Logo" width={160} height={32} loading="lazy" />
        </Link>


        {/* Navigation links */}

        

{/* hidden:::This class hides the element completely (display: none;) on all screen sizes by default.
    md:block:::This class overrides the hidden property on medium (md) screens and larger.
               It applies display: block;, making the element visible when the screen width is ≥ 768px (Tailwind's md breakpoint).

    How It Works:
    On small screens (< 768px): The <nav> is hidden.
    On medium (≥ 768px) and larger screens: The <nav> is visible (display: block). */}

        <nav className="hidden md:block">

          <ul className="flex gap-x-6 text-richblack-25">

            {
              NavbarLinks.map((link, index) => (
              <li key={index}>

              {/* if catalog then usko alag tarike se handle karooo */}

                {
                  link.title === "Catalog" ? 
                (
                  <>
                    <div
                      className={`group relative flex cursor-pointer items-center gap-1 ${
                        matchRoute("/catalog/:catalogName")
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      <p>{link.title}</p>

                      {/* down arrow */}
                      <BsChevronDown />

                      <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em]
                       flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 
                       group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                        
                        {/* box ke upar triangular section */}
                        <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] 
                        translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>


                           {/* for subLink go at last , some code is to be augmented */}
                        { 
                          loading ? (
                          <p className="text-center">Loading...</p>
                        ) 
                        :
                         (subLinks && subLinks.length) ? (
                          <>
                            {
                              subLinks?.map((subLink, i) => (

                                <Link
                                  to={`/catalog/${subLink.name
                                    .split(" ")
                                    .join("-")
                                    .toLowerCase()}`}
                                  className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                  key={i}
                                >
                                  <p>{subLink.name}</p>
                                </Link>
                              ))
                            }
                          </>
                        ) 
                        :
                         (
                          <p className="text-center">No Courses Found</p>
                        )
                    }
                      </div>
                    </div>
                  </>
                ) 
                
          
                : 
                
                (

                  <Link to={link?.path}>

                    <p
                      className={`${
                        matchRoute(link?.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      {link.title}
                    </p>

                  </Link>

                )
            }
              </li>
        )
    )
  }
          </ul>

        </nav>



        {/* Login / Signup / Dashboard */}
        {/* yaha jo useSelector se import kiya vo yaha use hoga */}

        <div className="hidden items-center gap-x-4 md:flex">

        {/* ACCOUNT_TYPE.INSTRUCTOR */}
          {
            user && user?.accountType !== "Instructor"  && ( 

            //whenever click on cart icon go to /dashboard/cart
            <Link to="/dashboard/cart" className="relative">

            {/* //cart icon */}
              <AiOutlineShoppingCart className="text-3xl text-richblack-100" />

              {
                totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100 animate-bounce">
                  {totalItems}
                </span>
              )}
            </Link>
          )
        }


          {/* login aur signup button dikhana hai ki nahi */}
          {/* if token is null so go to login path  */}

          {
            token === null && (
            <Link to="/login">

              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                Log in
              </button>
            </Link>
          )
        }


          {token === null && (
            <Link to="/signup">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                Sign up
              </button>
            </Link>
          )}


          {/* if token is not equal to null =>user is logged in */}
          {token !== null && <ProfileDropdown />}
        </div>

        <button className="mr-4 md:hidden">
          <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
        </button>


      </div>
    </div>
  )
}

export default Navbar









// Line 130 pe lagaana
// // ?.filter(
// //   (subLink) => subLink?.courses?.length > 0
// // )