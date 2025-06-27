import React from "react";
import CTAButton from "./Button";
import { TypeAnimation } from "react-type-animation";
import { FaArrowRight } from "react-icons/fa";
//import HighlightText from "./HighlightText"

const CodeBlocks = ({
  position,
  heading,
  subheading,
  ctabtn1,
  ctabtn2,
  codeblock,
  backgroundGradient,
  codeColor,
}) => {
  return (
    <div className={`flex ${position} my-20 justify-between flex-col lg:gap-10 gap-8`}>


      {/* Section 1  */}
      <div className="w-[100%] lg:w-[50%] flex flex-col gap-8">
        {heading}

        {/* Sub Heading */}
        <div className="text-richblack-300 text-base font-bold w-[85%] -mt-3">
          {subheading}
        </div>

        {/* Button Group */}
        <div className="flex gap-7 mt-7">

          <CTAButton active={ctabtn1.active} linkto={ctabtn1.link}>
            <div className="flex items-center gap-2">
              {ctabtn1.btnText}
              <FaArrowRight />
            </div>
          </CTAButton>

          <CTAButton active={ctabtn2.active} linkto={ctabtn2.link}>
            {ctabtn2.btnText}
          </CTAButton>
        </div>

      </div>

    {/* right side vala part */}
      {/* Section 2 */}
      <div className="h-fit code-border flex flex-row py-3 text-[10px] sm:text-sm leading-[18px] sm:leading-6 relative w-[100%] lg:w-[470px]">
        {backgroundGradient}
        
        {/* Indexing */}
        {/* font-inter using Inter font family */}
        <div className="text-center flex flex-col   w-[10%] select-none text-richblack-400 font-inter font-bold ">
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
          <p>11</p>
        </div>

        {/* Codes */}
        <div
          className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-1`}
        >
          <TypeAnimation
            sequence={[codeblock, 1000, ""]}
            cursor={true}
            repeat={Infinity}
            style={{
              whiteSpace: "pre-line",
              display: "block",
            }}
            omitDeletionAnimation={true}
          />
        </div>
      </div>
    </div>
  );
};

export default CodeBlocks;



// 1. ✅ sequence={[codeblock, 1000, ""]}
// This defines what is typed and in what order.

// Breakdown:
// codeblock: A variable (string) that will be typed out.

// 1000: Wait 1000ms (1 second) after finishing typing.

// "": Clear the text (erase it all).

// So it does:

// Type codeblock → wait 1s → delete text → repeat...

// 2. ✅ cursor={true}
// Shows a blinking cursor (|) while typing.

// 3. ✅ repeat={Infinity}
// Repeats the animation forever.


// 4. ✅ style={{ whiteSpace: "pre-line", display: "block" }}
// This applies inline styles to the element.
// 🔹 whiteSpace: "pre-line"
// Keeps line breaks (\n) from the string.
// Like writing in a code editor — new lines are respected.
// <div style={{ whiteSpace: "pre-line" }}>
//   Hello     world
//   Next line here.
// </div>

// Output:
// Hello world
// Next line here.
// ✔️ Keeps the line break

// 🔹 display: "block"
// Makes sure the element acts like a block (e.g., like a <div> or <p>), not inline.
// Ensures full-width layout or consistent spacing.

// 5. ✅ omitDeletionAnimation={true}
// Skips the typing "backspace" animation.
// Instead of deleting letters one by one, it just clears the text instantly.
// const text = "Hello     world\nNext line here.";
// With whiteSpace: "pre-line":


