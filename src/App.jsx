import "./App.css";
//import { BrowserRouter } from "react-router-dom";
import {Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home"
import Navbar from "./components/common/Navbar"
import { Provider } from "react-redux";
import OpenRoute from "./components/core/Auth/OpenRoute"
import About from "./pages/About";
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import Contact from "./pages/Contact";
import MyProfile from "./components/core/Dashboard/MyProfile";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import Cart from "./components/core/Dashboard/Cart";
import { ACCOUNT_TYPE } from "./utils/constants";
import { useDispatch, useSelector } from "react-redux";
import Settings from "./components/core/Dashboard/Settings";
import AddCourse from "./components/core/Dashboard/AddCourse";
import MyCourses from "./components/core/Dashboard/MyCourses";
import EditCourse from "./components/core/Dashboard/EditCourse";
import Catalog from "./pages/Catalog";
import CourseDetails from "./pages/CourseDetails";
import ViewCourse from "./pages/ViewCourse";
import VideoDetails from "./components/core/ViewCourse/VideoDetails";
import Instructor from "./components/core/Dashboard/InstructorDashboard/Instructor";


function App() 
{
  const { user } = useSelector((state) => state.profile)

  return (
   <div  className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">

   <Navbar/>

   <Routes>
    <Route path="/" element ={<Home/>} ></Route>
    
    <Route path="catalog/:catalogName" element={<Catalog/>} />
    <Route path="courses/:courseId" element={<CourseDetails/>} />

      
    <Route
          path="signup"
          element={

            //OpenRoute is for not logged in users ,they can access it
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
    <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />


       <Route
          path="forgot-password"
          element={

            
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        /> 

{/* the route is hit because of /:id, which allows the dynamic ID value to be matched */}
        <Route
          path="update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />   


         <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />  

          <Route
          path="about"
          element={
            
              <About />
            
          }
        />

{/* 
This top-level <Route> wraps child routes and provides a layout or guard (like PrivateRoute) for them.
Since it doesn't handle a specific path directly, no path is needed.
If a user goes to /dashboard/my-profile, the parent route’s element (i.e., PrivateRoute -> Dashboard) renders first.
Inside Dashboard, a <Outlet /> should be used where the matched nested child component (like MyProfile, Cart, etc.) should appear.
It helps:
Reuse layout components (Dashboard) across multiple dashboard sub-routes. */}




       <Route element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      } >


<Route path="dashboard/my-profile" element={<MyProfile />} />


      {
        user?.accountType === ACCOUNT_TYPE.STUDENT && (
          <>
          <Route path="dashboard/cart" element={<Cart />} />
          <Route path="dashboard/enrolled-courses" element={<EnrolledCourses />} />
          </>
        )
      }

      {
        user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
          <>
          <Route path="dashboard/instructor" element={<Instructor />} />
          <Route path="dashboard/add-course" element={<AddCourse />} />
          <Route path="dashboard/my-courses" element={<MyCourses />} />
          <Route path="dashboard/edit-course/:courseId" element={<EditCourse />} />
          
          </>
        )
      }

     



      </Route>

<Route path="/contact" element={<Contact />} />





<Route path="dashboard/Settings" element={<Settings />} />
{/* Even though Settings is a folder, it has an index.js file, so when you import from ./Settings, React/Node automatically looks for:
./Settings/index.js */}

 
      <Route element={
        <PrivateRoute>
          <ViewCourse />
        </PrivateRoute>
      }>

      {
        user?.accountType === ACCOUNT_TYPE.STUDENT && (
          <>
          <Route 
            path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
            element={<VideoDetails />}
          />
          </>
        )
      }

      </Route>



   </Routes>

   </div>
  );
}

export default App;
