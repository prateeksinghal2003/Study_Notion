import React from "react";
import { Link } from "react-router-dom";


//children main hoga -->Learn more / Book  a demo
//active is used to show yellow /black
// In React, children is a special prop that represents the content nested between the opening and closing tags of a component. It’s automatically passed to your component by React — no need to manually pass it like other props.

const Button = ({ children, active, linkto }) => {
  return (

    //whenever click on this button go to whatever value is inside linkto
    <Link to={linkto}>
      <div
        className={`text-center text-[13px] sm:text-[16px] px-6 py-3 rounded-md font-bold shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
        ${ active ? "bg-yellow-50 text-black " : "bg-richblack-800" }
           hover:shadow-none hover:scale-95 transition-all duration-200  `}
      >
        {children}
      </div>
    </Link>
  );
};

export default Button;