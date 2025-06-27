import React from "react";


const HighlightText = ({text}) => {
  return (
    <span className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold">
      {" "}
      {text}
    </span>
  );
};

export default HighlightText;

// The <span> tag in HTML is an inline container used to 
// style or manipulate a small piece of text without breaking the flow of content.



// Gradient Background
// ✅ bg-gradient-to-b
// Creates a linear gradient background that flows from top to bottom ("to bottom").

// to-b = to bottom

// ✅ from-[#1FA2FF]
// Sets the start color at the top of the gradient to #1FA2FF (a bright blue).

// ✅ via-[#12D8FA]
// Sets the middle color of the gradient to #12D8FA (a lighter blue-cyan).

// ✅ to-[#A6FFCB]
// Sets the end color at the bottom to #A6FFCB (a light green-mint color).

// 🧼 Text Gradient Setup
// ✅ text-transparent
// Makes the actual text color invisible.

// ✅ bg-clip-text
// Clips the background gradient to the shape of the text — so the gradient fills the text.

// These two combined (text-transparent + bg-clip-text) make the gradient appear inside the text.

// 🅱️ Bold Text
// ✅ font-bold
// Applies bold font weight to the text.

// 📌 What This All Does
// It makes text that looks like this:

// 🌀 Gradient-colored bold text that goes from blue → cyan → mint green, top to bottom.