import {combineReducers} from "@reduxjs/toolkit";

//pehle sirf authReducer kiya
import authReducer from "../slices/authSlice"
import profileReducer from "../slices/profileSlice";
import cartReducer from "../slices/cartSlice"
import courseReducer from "../slices/courseSlice"
import viewCourseReducer from "../slices/viewCourseSlice"

const rootReducer  = combineReducers({

    //jo key yaha pass hogi, that would be in the global state
    auth: authReducer,
    profile:profileReducer,
    cart:cartReducer,
    course:courseReducer,
    viewCourse:viewCourseReducer,
})

export default rootReducer



// combineReducers is used to combine multiple slice reducers into one rootReducer.

// Each key (like auth, profile, etc.) becomes a top-level key in the global Redux state.

// So, the global state will look like:

// js
// Copy
// Edit
// state = {
//   auth: { ... },         // from authSlice
//   profile: { ... },      // from profileSlice
//   cart: { ... },         // from cartSlice
//   course: { ... },       // from courseSlice
//   viewCourse: { ... },   // from
// }